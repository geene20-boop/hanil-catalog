/* 재배상담 담당자 화면 (admin/index.html) */
(function () {
    'use strict';

    var root = document.querySelector('[data-admin]');
    var $ = function (s) { return root.querySelector(s); };
    var H = { 'X-Requested-With': 'hanil-qna' };
    var state = { items: [], products: {}, banned: [], filter: 'wait', sel: null };

    var TEMPLATES = {
        '농업기술센터 안내': '병해충이 의심되면 가까운 농업기술센터에서 진단을 받아 주십시오.',
        '토양검정 권유': '정확한 시용량은 시·군 농업기술센터 토양검정 결과에 맞추시는 것이 좋습니다.',
        '규산 시용 시기': '규산질비료는 써레질 전 밑거름으로 논 전체에 고르게 주시는 것이 기본입니다.',
        '석회 시용 시기': '석회고토는 작물을 심기 전에 미리 주고 흙과 잘 섞어 주십시오.'
    };

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function api(path, opts) {
        opts = opts || {};
        var init = { method: opts.method || 'GET', headers: Object.assign({}, H), credentials: 'same-origin', cache: 'no-store' };
        if (opts.body !== undefined) {
            init.headers['Content-Type'] = 'application/json';
            init.body = JSON.stringify(opts.body);
        }
        return fetch(path, init).then(function (r) {
            return r.json().catch(function () { return {}; }).then(function (d) {
                if (r.status === 401 && path !== '/api/admin/login') { showLogin(); }
                if (!r.ok) throw new Error(d.error || '처리하지 못했습니다.');
                return d;
            });
        });
    }

    /* ── 로그인 ── */
    var loginForm = $('[data-login]');
    function showLogin(msg) {
        $('[data-app]').hidden = true;
        loginForm.hidden = false;
        $('[data-login-msg]').textContent = msg || '';
        $('#ad-pw').focus();
    }
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        api('/api/admin/login', { method: 'POST', body: { password: $('#ad-pw').value } })
            .then(function () { $('#ad-pw').value = ''; loginForm.hidden = true; start(); })
            .catch(function (err) { $('[data-login-msg]').textContent = err.message; });
    });
    $('[data-logout]').addEventListener('click', function () {
        api('/api/admin/logout', { method: 'POST' }).then(function () { showLogin('나갔습니다.'); });
    });

    /* ── 목록 ── */
    root.querySelectorAll('[data-ad-seg] button').forEach(function (b) {
        b.addEventListener('click', function () {
            state.filter = b.dataset.f;
            root.querySelectorAll('[data-ad-seg] button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
            drawList();
        });
    });

    function statusPill(it) {
        if (it.hidden) return '<span class="qna-pill qna-pill--hide">숨김</span>';
        if (it.status === 'done') return '<span class="qna-pill qna-pill--done">답변완료</span>';
        return '<span class="qna-pill qna-pill--wait">답변대기</span>';
    }

    function drawList() {
        var box = $('[data-ad-list]');
        var list = state.items.filter(function (it) {
            return state.filter === 'all' || (state.filter === 'wait' ? it.status !== 'done' : it.status === 'done');
        });
        box.innerHTML = list.length ? '' : '<p class="qna-hint">해당하는 상담이 없습니다.</p>';
        list.forEach(function (it) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'qna-ad__item' + (state.sel === it.id ? ' is-on' : '');
            b.innerHTML = '<b>[' + esc(it.crop) + '] ' + esc(it.body.slice(0, 60)) + (it.body.length > 60 ? '…' : '') + '</b>' +
                '<small>' + statusPill(it) + '<span>' + esc(it.region) + ' · ' + (it.visibility === 'priv' ? '비공개' : '공개') + ' · ' + esc(new Date(it.created_at).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })) + (it.photos.length ? ' · 사진 ' + it.photos.length : '') + '</span></small>';
            b.addEventListener('click', function () { state.sel = it.id; drawList(); drawMain(); });
            box.appendChild(b);
        });
    }

    /* ── 답변 작성 ── */
    function drawMain() {
        var it = state.items.filter(function (x) { return x.id === state.sel; })[0];
        var main = $('[data-ad-main]');
        if (!it) { main.innerHTML = '<p class="qna-hint">왼쪽에서 상담을 골라 주세요.</p>'; return; }
        var prodOpts = '<option value="">제품 연결 안 함</option>' + Object.keys(state.products).map(function (k) {
            return '<option value="' + k + '"' + (it.ans_product === k ? ' selected' : '') + '>' + esc(state.products[k]) + '</option>';
        }).join('');
        var photos = it.photos.length ? '<div class="qna-photos">' + it.photos.map(function (id) {
            return '<a href="/api/admin/photo/' + id + '" target="_blank" rel="noopener"><img src="/api/admin/photo/' + id + '" alt="상담 사진"></a>';
        }).join('') + '</div>' : '';
        main.innerHTML =
            '<div class="qna-ad__q"><b>[' + esc(it.crop) + ']</b> ' + esc(it.body) + '</div>' + photos +
            '<dl class="qna-ad__meta">' +
            '<dt>보낸 분</dt><dd>' + esc(it.name) + ' · ' + esc(it.region) + '</dd>' +
            '<dt>공개</dt><dd>' + (it.visibility === 'priv' ? '비공개 상담 (전화로 답변)' : '공개 상담') + '</dd>' +
            (it.visibility === 'priv' ? '<dt>전화</dt><dd>' + (it.phone ? esc(it.phone) + ' <button type="button" class="qna-btn qna-btn--sm qna-btn--warn" data-act="clear-phone">통화 마침 · 번호 지우기</button>' : '지움') + '</dd>' : '') +
            ((it.soil_ph || it.soil_si) ? '<dt>토양검정</dt><dd>' + (it.soil_ph ? 'pH ' + esc(it.soil_ph) + ' ' : '') + (it.soil_si ? '유효규산 ' + esc(it.soil_si) + ' mg/kg' : '') + '</dd>' : '') +
            (it.product ? '<dt>물어본 제품</dt><dd>' + esc(state.products[it.product] || it.product) + '</dd>' : '') +
            '<dt>접수</dt><dd>' + esc(new Date(it.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })) + '</dd></dl>' +
            '<div class="qna-ad__edit">' +
            '<label for="ad-judge">상황 판단</label><textarea id="ad-judge">' + esc(it.ans_judge || '') + '</textarea>' +
            '<label for="ad-manage">관리 방법</label><textarea id="ad-manage">' + esc(it.ans_manage || '') + '</textarea>' +
            '<label for="ad-check">함께 확인 (선택)</label><textarea id="ad-check">' + esc(it.ans_check || '') + '</textarea>' +
            '<label for="ad-prod">관련 제품</label><select id="ad-prod">' + prodOpts + '</select></div>' +
            '<div class="qna-tmpl" aria-label="자주 쓰는 문장">' + Object.keys(TEMPLATES).map(function (k) {
                return '<button type="button" data-tmpl="' + esc(k) + '">+ ' + esc(k) + '</button>';
            }).join('') + '</div>' +
            (it.photos.length && it.visibility === 'pub' ? '<label class="qna-check-row"><input type="checkbox" id="ad-photo-pub"' + (it.photo_public ? ' checked' : '') + '> 사진을 답변과 함께 공개 (얼굴·번호판이 없는지 확인 후)</label>' : '') +
            '<div class="qna-checker" data-checker role="status" aria-live="polite"></div>' +
            '<div class="qna-actions">' +
            '<button type="button" class="qna-btn qna-btn--sm qna-btn--warn" data-act="delete">삭제 (요청 시)</button>' +
            '<button type="button" class="qna-btn qna-btn--sm qna-btn--ghost" data-act="' + (it.hidden ? 'show' : 'hide') + '">' + (it.hidden ? '다시 보이기' : '목록에서 숨기기') + '</button>' +
            '<button type="button" class="qna-btn qna-btn--sm" data-act="answer">' + (it.status === 'done' ? '답변 고치기' : '답변 게시') + '</button></div>' +
            '<p class="qna-msg" data-ad-msg role="status"></p>';

        ['#ad-judge', '#ad-manage', '#ad-check'].forEach(function (s) { main.querySelector(s).addEventListener('input', checkWords); });
        main.querySelectorAll('[data-tmpl]').forEach(function (b) {
            b.addEventListener('click', function () {
                var t = main.querySelector('#ad-check');
                t.value = (t.value.trim() ? t.value.trim() + ' ' : '') + TEMPLATES[b.dataset.tmpl];
                checkWords();
            });
        });
        main.querySelectorAll('[data-act]').forEach(function (b) {
            b.addEventListener('click', function () { act(it, b.dataset.act, b); });
        });
        checkWords();
    }

    function checkWords() {
        var main = $('[data-ad-main]');
        var v = ['#ad-judge', '#ad-manage', '#ad-check'].map(function (s) { return main.querySelector(s).value; }).join(' ');
        var hit = state.banned.filter(function (w) { return v.indexOf(w) >= 0; });
        var c = main.querySelector('[data-checker]');
        var post = main.querySelector('[data-act="answer"]');
        if (hit.length) {
            c.className = 'qna-checker is-bad';
            c.innerHTML = '<b>게시 전 확인:</b> ' + hit.map(esc).join(', ') + ' 표현은 비료 광고에 쓸 수 없습니다. "생육 관리", "쓰러짐 경감에 도움", "토양 개량" 같은 말로 바꿔 주세요.';
            post.disabled = true;
        } else {
            c.className = 'qna-checker is-ok';
            c.innerHTML = '<b>점검 통과:</b> 문제가 되는 표현이 없습니다.';
            post.disabled = false;
        }
    }

    var pendingDelete = null;
    function act(it, action, btn) {
        var main = $('[data-ad-main]');
        var msg = main.querySelector('[data-ad-msg]');
        if (action === 'delete' && pendingDelete !== it.id) {
            pendingDelete = it.id;
            btn.textContent = '한 번 더 누르면 완전히 지웁니다';
            return;
        }
        var body;
        if (action === 'answer') {
            body = {
                judge: main.querySelector('#ad-judge').value,
                manage: main.querySelector('#ad-manage').value,
                check: main.querySelector('#ad-check').value,
                product: main.querySelector('#ad-prod').value,
                photoPublic: !!(main.querySelector('#ad-photo-pub') && main.querySelector('#ad-photo-pub').checked)
            };
        }
        msg.textContent = '처리하고 있습니다…';
        msg.classList.remove('is-err');
        api('/api/admin/qna/' + it.id + '/' + action, { method: 'POST', body: body || {} })
            .then(function () {
                pendingDelete = null;
                if (action === 'delete') state.sel = null;
                return refresh().then(function () {
                    var m = $('[data-ad-main] [data-ad-msg]');
                    if (m) m.textContent = action === 'answer' ? '답변을 게시했습니다.' : '처리했습니다.';
                });
            })
            .catch(function (err) { msg.textContent = err.message; msg.classList.add('is-err'); });
    }

    function refresh() {
        return api('/api/admin/qna').then(function (d) {
            state.items = d.items || [];
            state.products = d.products || {};
            state.banned = d.banned || [];
            drawList();
            drawMain();
        });
    }

    function start() {
        $('[data-app]').hidden = false;
        refresh().catch(function (err) { showLogin(err.message); });
    }

    api('/api/admin/me').then(function (d) {
        if (!d.configured) {
            showLogin('담당자 비밀번호가 아직 등록되지 않았습니다. Cloudflare 설정에서 ADMIN_PASSWORD를 먼저 등록해 주세요.');
            return;
        }
        if (d.loggedIn) start(); else showLogin();
    }).catch(function () { showLogin('서버에 연결하지 못했습니다.'); });
})();
