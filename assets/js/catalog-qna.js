/* Q&A 재배상담 (contactus/qna.html) - 목록, 작물 필터, 상담 접수, 사진 첨부 */
(function () {
    'use strict';

    var root = document.querySelector('[data-qna]');
    if (!root) return;

    var API = '/api/qna';
    var PAGE = 20;
    var CROPS = [
        ['all', '전체', 'qi-all'], ['벼', '벼', 'qi-rice'], ['고추', '고추', 'qi-pepper'], ['사과', '사과', 'qi-apple'],
        ['배', '배', 'qi-pear'], ['복숭아', '복숭아', 'qi-peach'], ['포도', '포도', 'qi-grape'],
        ['시설채소', '시설', 'qi-house'], ['기타', '기타', 'qi-sprout']
    ];
    var ICON = {};
    CROPS.forEach(function (c) { ICON[c[0]] = c[2]; });
    var PRODUCT_PAGE = {
        'silicate-fertilizer': 'products-line', 'limestone-fertilizer': 'products-line', 'calcium-sulfur-fertilizer': 'products-line',
        'organic-silicate': 'organic', 'organic-limestone': 'organic', 'organic-mag-sulfur': 'organic',
        'vita-40': 'vita', 'vita-gold': 'vita'
    };
    var PRODUCT_SHORT_TAGS = {
        'silicate-fertilizer': '규산', 'organic-silicate': '규산',
        'limestone-fertilizer': '산성 석회', 'organic-limestone': '산성 석회',
        'calcium-sulfur-fertilizer': '칼슘', 'organic-mag-sulfur': '칼슘'
    };
    var MAX_PHOTOS = 3;

    var $ = function (sel) { return root.querySelector(sel); };
    var state = { items: [], crop: 'all', filter: 'all', shown: PAGE, picked: '', photos: [], openedAt: Date.now(), loaded: false };

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function ic(id) { return '<svg aria-hidden="true"><use href="#' + id + '"/></svg>'; }

    /* ── 외국어 안내 ── */
    function syncLang() {
        var lang = window.CatalogLang && window.CatalogLang.get ? window.CatalogLang.get() : 'ko';
        var note = $('[data-qna-intl]');
        if (note) note.hidden = lang === 'ko';
    }
    document.addEventListener('catalog:langchange', syncLang);

    /* ── 작물 버튼 ── */
    var rail = $('[data-qna-rail]');
    CROPS.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'qna-crop';
        b.innerHTML = ic(c[2]) + '<span>' + c[1] + '</span>';
        b.setAttribute('aria-pressed', String(c[0] === 'all'));
        b.addEventListener('click', function () {
            state.crop = c[0];
            state.shown = PAGE;
            Array.prototype.forEach.call(rail.children, function (x) { x.setAttribute('aria-pressed', String(x === b)); });
            render();
        });
        rail.appendChild(b);
    });
    var mini = $('[data-qna-mini]');
    CROPS.slice(1).forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button';
        b.dataset.v = c[0];
        b.innerHTML = ic(c[2]) + '<span>' + c[1] + '</span>';
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
            state.picked = state.picked === c[0] ? '' : c[0];
            Array.prototype.forEach.call(mini.children, function (x) { x.setAttribute('aria-pressed', String(x.dataset.v === state.picked)); });
            check();
        });
        mini.appendChild(b);
    });

    root.querySelectorAll('[data-qna-seg] button').forEach(function (b) {
        b.addEventListener('click', function () {
            state.filter = b.dataset.f;
            state.shown = PAGE;
            root.querySelectorAll('[data-qna-seg] button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
            render();
        });
    });
    $('#qna-search').addEventListener('input', function () { state.shown = PAGE; render(); });

    /* ── 목록 ── */
    function track(done) {
        return '<div class="qna-track" aria-label="진행 상황"><span class="is-on">접수</span><b class="is-on"></b><span class="is-on">담당자 확인</span><b class="' + (done ? 'is-on' : '') + '"></b><span class="' + (done ? 'is-on' : '') + '">답변 게시</span></div>';
    }

    function answerHtml(it) {
        var a = it.answer || {};
        var prod = '';
        if (a.product && PRODUCT_PAGE[a.product.id]) {
            prod = '<dt>관련 제품</dt><dd><a class="qna-prod" href="../products/' + PRODUCT_PAGE[a.product.id] + '.html#' + esc(a.product.id) + '"><i>한일</i>' + esc(a.product.name) + ' <span>상세 보기 →</span></a></dd>';
            var st = PRODUCT_SHORT_TAGS[a.product.id];
            if (st) prod += '<dt>1분 영상</dt><dd><div class="shorts-related-wrap" data-shorts-related data-tags="' + st + '" data-label="관련 흙 이야기"></div></dd>';
        }
        var photos = (it.photos || []).length
            ? '<dt>상담 사진</dt><dd><div class="qna-photos">' + it.photos.map(function (id) {
                return '<a href="' + API + '/photo/' + id + '" target="_blank" rel="noopener"><img src="' + API + '/photo/' + id + '" alt="상담 사진" loading="lazy"></a>';
            }).join('') + '</div></dd>'
            : '';
        return '<div class="qna-rx"><div class="qna-rx__h"><strong>재배 처방 답변</strong><small>한일씨앤에스 기술팀 · ' + esc(a.date) + '</small></div>' +
            '<div class="qna-stamp" aria-hidden="true">한일<br>기술팀<br>답변</div>' +
            '<dl><dt>상황 판단</dt><dd>' + esc(a.judge) + '</dd><dt>관리 방법</dt><dd>' + esc(a.manage) + '</dd>' + prod +
            (a.check ? '<dt>함께 확인</dt><dd>' + esc(a.check) + '</dd>' : '') + photos + '</dl>' +
            '<div class="qna-rx__fine">재배 환경에 따라 결과가 다를 수 있습니다. 당사 제품은 비료·토양개량제이며 농약이 아닙니다.</div></div>';
    }

    function filtered() {
        var q = $('#qna-search').value.trim();
        return state.items.filter(function (it) {
            if (state.crop !== 'all' && it.crop !== state.crop) return false;
            if (state.filter === 'done' && it.status !== 'done') return false;
            if (state.filter === 'wait' && it.status === 'done') return false;
            if (q) {
                if (it.private) return false;
                var hay = (it.body || '') + ' ' + (it.answer ? [it.answer.judge, it.answer.manage, it.answer.check].join(' ') : '');
                if (hay.indexOf(q) < 0) return false;
            }
            return true;
        });
    }

    function render() {
        var box = $('[data-qna-list]');
        var countEl = $('[data-qna-count]');
        if (!state.loaded) return;
        var list = filtered();
        countEl.textContent = (state.crop === 'all' ? '전체' : state.crop) + ' 상담 ' + list.length + '건';
        box.innerHTML = '';
        if (!list.length) {
            box.innerHTML = '<div class="qna-empty">' + (state.items.length ? '조건에 맞는 상담이 없습니다.' : '아직 등록된 상담이 없습니다.') + '<br>오른쪽 접수란에서 먼저 물어봐 주세요.</div>';
            return;
        }
        list.slice(0, state.shown).forEach(function (it) {
            var el = document.createElement('article');
            el.className = 'qna-q';
            el.id = 'q-' + it.id;
            var done = it.status === 'done';
            var pill = it.private ? '<span class="qna-pill qna-pill--lock">비공개</span>'
                : done ? '<span class="qna-pill qna-pill--done">답변완료</span>' : '<span class="qna-pill qna-pill--wait">답변대기</span>';
            var title = it.private ? '비공개 상담입니다' : esc((it.body || '').split('\n')[0].slice(0, 80)) + ((it.body || '').length > 80 ? '…' : '');
            var who = it.private ? '' : esc(it.who) + ' · ';
            el.innerHTML = '<button type="button" class="qna-q__head" aria-expanded="false"><span class="qna-q__ic">' + ic(ICON[it.crop] || 'qi-sprout') + '</span>' +
                '<span><span class="qna-q__t">' + title + '</span><span class="qna-q__m">' + pill + '<span>' + esc(it.crop) + ' · ' + who + esc(it.region) + ' · ' + esc(it.date) + '</span></span></span>' +
                '<span class="qna-chev" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg></span></button>';
            var body = document.createElement('div');
            body.className = 'qna-q__body';
            body.hidden = true;
            if (it.private) {
                body.innerHTML = track(done) + '<p class="qna-pending">' + (done ? '담당자가 작성하신 분께 직접 답변드렸습니다.' : '비공개 상담은 작성자와 담당자만 볼 수 있습니다.') + '</p>';
            } else {
                var soil = it.soil ? '<span class="qna-soiltag">' + (it.soil.ph ? '<span>pH ' + esc(it.soil.ph) + '</span>' : '') + (it.soil.si ? '<span>유효규산 ' + esc(it.soil.si) + ' mg/kg</span>' : '') + '</span>' : '';
                var full = (it.body || '').length > 80 || (it.body || '').indexOf('\n') >= 0;
                body.innerHTML = (full ? '<p class="qna-q__ask">' + esc(it.body) + '</p>' : '') + soil + track(done) +
                    (done ? answerHtml(it) : '<p class="qna-pending">담당자가 확인하고 있습니다. 답변이 등록되면 이곳에 표시됩니다.</p>');
            }
            el.appendChild(body);
            var btn = el.querySelector('.qna-q__head');
            btn.addEventListener('click', function () { toggle(el, body.hidden); });
            box.appendChild(el);
        });
        if (list.length > state.shown) {
            var more = document.createElement('button');
            more.type = 'button';
            more.className = 'qna-more';
            more.textContent = '상담 더 보기 (' + (list.length - state.shown) + '건)';
            more.addEventListener('click', function () { state.shown += PAGE; render(); });
            box.appendChild(more);
        }
    }

    function toggle(el, open) {
        var body = el.querySelector('.qna-q__body');
        var btn = el.querySelector('.qna-q__head');
        body.hidden = !open;
        btn.setAttribute('aria-expanded', String(open));
        el.classList.toggle('is-open', open);
    }

    function openFromHash() {
        var m = /^#q-(\d+)$/.exec(location.hash || '');
        var el = m ? document.getElementById('q-' + m[1]) : null;
        if (!el && m) {
            // 걸러진 목록에 없으면 필터를 풀고 다시 찾기
            var exists = state.items.some(function (it) { return String(it.id) === m[1]; });
            if (exists) {
                state.crop = 'all'; state.filter = 'all'; state.shown = 100000; $('#qna-search').value = '';
                Array.prototype.forEach.call(rail.children, function (x, i) { x.setAttribute('aria-pressed', String(i === 0)); });
                root.querySelectorAll('[data-qna-seg] button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.f === 'all')); });
                render();
                el = document.getElementById('q-' + m[1]);
            }
        }
        if (el) {
            toggle(el, true);
            el.scrollIntoView({ block: 'start', behavior: 'smooth' });
            return true;
        }
        return false;
    }
    window.addEventListener('hashchange', openFromHash);

    function load() {
        return fetch(API, { headers: { Accept: 'application/json' }, cache: 'no-store' })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function (data) {
                state.items = data.items || [];
                state.loaded = true;
                render();
                if (!openFromHash()) {
                    var first = state.items.filter(function (it) { return it.status === 'done' && !it.private; })[0];
                    var el = first && document.getElementById('q-' + first.id);
                    if (el) toggle(el, true);
                }
            })
            .catch(function () {
                $('[data-qna-count]').textContent = '';
                $('[data-qna-list]').innerHTML = '<div class="qna-empty">상담 목록을 불러오지 못했습니다. 잠시 후 다시 열어 주세요.<br>급하시면 <a href="tel:+82547629691">TEL (054) 762-9691~2</a> 로 전화 주십시오.</div>';
            });
    }

    /* ── 사진 ── */
    var fileInput = $('#qna-photos');
    var thumbs = $('[data-qna-thumbs]');

    function compress(file) {
        return new Promise(function (resolve, reject) {
            if (!/^image\//.test(file.type)) { reject(new Error('type')); return; }
            var url = URL.createObjectURL(file);
            var img = new Image();
            img.onload = function () {
                var max = 1600;
                var w = img.naturalWidth, h = img.naturalHeight;
                var s = Math.min(1, max / Math.max(w, h));
                var c = document.createElement('canvas');
                c.width = Math.round(w * s);
                c.height = Math.round(h * s);
                c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
                URL.revokeObjectURL(url);
                var q = 0.82;
                (function attempt() {
                    c.toBlob(function (blob) {
                        if (!blob) { reject(new Error('blob')); return; }
                        if (blob.size > 1400000 && q > 0.45) { q -= 0.12; attempt(); return; }
                        resolve(blob);
                    }, 'image/jpeg', q);
                })();
            };
            img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('decode')); };
            img.src = url;
        });
    }

    function drawThumbs() {
        thumbs.innerHTML = '';
        state.photos.forEach(function (p, i) {
            var d = document.createElement('div');
            d.className = 'qna-thumb';
            d.innerHTML = '<img alt="첨부 사진 ' + (i + 1) + '"><button type="button" aria-label="사진 ' + (i + 1) + ' 빼기">×</button>';
            d.querySelector('img').src = p.url;
            d.querySelector('button').addEventListener('click', function () {
                URL.revokeObjectURL(p.url);
                state.photos.splice(i, 1);
                drawThumbs();
            });
            thumbs.appendChild(d);
        });
    }

    fileInput.addEventListener('change', function () {
        var files = Array.prototype.slice.call(fileInput.files || []);
        fileInput.value = '';
        var room = MAX_PHOTOS - state.photos.length;
        if (files.length > room) say('사진은 ' + MAX_PHOTOS + '장까지 올릴 수 있습니다.', true);
        files.slice(0, Math.max(0, room)).reduce(function (p, f) {
            return p.then(function () {
                return compress(f).then(function (blob) {
                    state.photos.push({ blob: blob, url: URL.createObjectURL(blob) });
                    drawThumbs();
                }).catch(function () { say('이 사진은 올릴 수 없습니다. 다른 사진을 골라 주세요.', true); });
            });
        }, Promise.resolve());
    });

    /* ── 접수 ── */
    var form = $('[data-qna-form]');
    var submitBtn = $('[data-qna-submit]');
    var phone = $('#qna-phone');

    function isPriv() { return $('#qna-vis-priv').checked; }
    function check() {
        var ok = state.picked && $('#qna-body').value.trim().length >= 5 && $('#qna-name').value.trim() &&
            $('#qna-region').value && $('#qna-agree').checked && (!isPriv() || phone.value.trim().length >= 9);
        submitBtn.disabled = !ok;
    }
    function say(text, err) {
        var m = $('[data-qna-msg]');
        m.textContent = text;
        m.classList.toggle('is-err', !!err);
    }
    ['#qna-body', '#qna-name', '#qna-region', '#qna-agree', '#qna-phone'].forEach(function (s) {
        $(s).addEventListener('input', check);
        $(s).addEventListener('change', check);
    });
    root.querySelectorAll('input[name=visibility]').forEach(function (r) {
        r.addEventListener('change', function () { phone.hidden = !isPriv(); check(); });
    });
    var pBtn = $('[data-qna-privacy-toggle]');
    pBtn.addEventListener('click', function () {
        var box = $('#qna-privacy');
        box.hidden = !box.hidden;
        pBtn.setAttribute('aria-expanded', String(!box.hidden));
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (submitBtn.disabled) return;
        var fd = new FormData(form);
        fd.set('crop', state.picked);
        fd.set('agree', 'yes');
        fd.set('opened_at', String(state.openedAt));
        if (!isPriv()) fd.delete('phone');
        state.photos.forEach(function (p, i) { fd.append('photos', p.blob, 'photo-' + (i + 1) + '.jpg'); });
        submitBtn.disabled = true;
        say('접수하고 있습니다…');
        fetch(API, { method: 'POST', body: fd })
            .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
            .then(function (res) {
                if (!res.ok) throw new Error(res.d.error || '접수하지 못했습니다. 잠시 후 다시 시도해 주세요.');
                var priv = isPriv();
                form.reset();
                state.picked = '';
                Array.prototype.forEach.call(mini.children, function (x) { x.setAttribute('aria-pressed', 'false'); });
                state.photos.forEach(function (p) { URL.revokeObjectURL(p.url); });
                state.photos = [];
                drawThumbs();
                phone.hidden = true;
                state.openedAt = Date.now();
                say(priv ? '비공개 상담이 접수되었습니다. 담당자가 전화로 연락드리겠습니다.' : '상담이 접수되었습니다. 목록 맨 위에서 진행 상황을 보실 수 있습니다.');
                return load();
            })
            .catch(function (err) { say(err.message, true); })
            .then(check);
    });

    syncLang();
    if (window.CatalogLang) syncLang();
    else window.addEventListener('load', syncLang);
    load();
})();
