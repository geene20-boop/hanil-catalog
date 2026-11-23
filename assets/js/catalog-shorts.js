/* 회사 YouTube 쇼츠 '알기 쉬운 흙 이야기'
 * - 사용 가이드: [data-shorts-rail] 에 쇼츠 모음 (채널에 올리면 자동 추가)
 * - 정부지원 자가진단: 산성 결과일 때 관련 1편 (catalog:govresult 이벤트)
 * - 누를 때만 YouTube(쿠키 최소화 주소)를 불러오고, 썸네일은 카다록 서버를 거칩니다.
 * - 쇼츠가 한국어라 한국어 화면에서만 보입니다(나머지는 CSS로 숨김).
 */
(function () {
    'use strict';
    if (window.CatalogShorts) return;

    var API = '/api/shorts';
    var CHANNEL = 'https://www.youtube.com/@hanilcns';
    var NEW_DAYS = 3;
    // 서버를 쓰지 못할 때(파일로 열거나 일시 오류) 보여줄 기본 목록
    var FALLBACK = [
        { id: 'w0IBg_rxswc', title: '흙에도 할아버지가 있다고?! 흙의 족보 대공개', ep: 1, tags: '' },
        { id: '23azP97Xx5o', title: '흙은 여자, 양분은 남자?! 밭속 자석 연애 이야기', ep: 2, tags: '' },
        { id: 'PclltFTvR0w', title: '비료에도 암수가 있다! 비 오면 도망가는 질소', ep: 3, tags: '' },
        { id: '7PGBfMsHCxk', title: '흙 속에 깡패가 산다?! 뿌리 괴롭히는 범인 검거', ep: 4, tags: '산성 석회' }
    ];
    var ACID_FALLBACK_ID = '7PGBfMsHCxk';
    var ID_RE = /^[A-Za-z0-9_-]{6,20}$/;

    var items = null;
    var usingFallback = false;
    var loading = null;

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    function thumb(id) {
        return usingFallback ? 'https://i.ytimg.com/vi/' + id + '/oar2.jpg' : API + '/thumb/' + id;
    }
    function load() {
        if (loading) return loading;
        loading = fetch(API, { headers: { Accept: 'application/json' } })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function (d) {
                items = (d.items || []).filter(function (it) { return ID_RE.test(it.id); });
                if (!items.length) throw new Error('empty');
            })
            .catch(function () { items = FALLBACK.slice(); usingFallback = true; })
            .then(function () { return items; });
        return loading;
    }
    function isNew(it) {
        if (!it.published) return false;
        var t = Date.parse(it.published);
        return t && (Date.now() - t) < NEW_DAYS * 86400000;
    }
    // 서버를 거친 썸네일이 실패하면 YouTube 썸네일로 바로 받아 옵니다.
    document.addEventListener('error', function (e) {
        var img = e.target;
        if (!img || img.tagName !== 'IMG' || !img.closest || !img.closest('.shorts-card__th, .shorts-related__th')) return;
        var m = /\/api\/shorts\/thumb\/([A-Za-z0-9_-]{6,20})$/.exec(img.getAttribute('src') || '');
        if (m) img.src = 'https://i.ytimg.com/vi/' + m[1] + '/oar2.jpg';
    }, true);

    function playIcon() {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M7 4v16l13-8z"/></svg>';
    }

    /* ── 재생 창 ── */
    var modal, frameBox, titleEl, linkEl, cur = 0, list = [], lastFocus = null;
    function ensureModal() {
        if (modal) return;
        modal = document.createElement('div');
        modal.className = 'shorts-modal';
        modal.hidden = true;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', '흙 이야기 쇼츠');
        modal.innerHTML =
            '<div class="shorts-modal__box">' +
            '<div class="shorts-modal__frame" data-frame></div>' +
            '<p class="shorts-modal__title" data-title></p>' +
            '<div class="shorts-modal__row">' +
            '<button type="button" data-prev>← 이전 편</button>' +
            '<button type="button" data-next>다음 편 →</button>' +
            '<button type="button" data-close class="shorts-modal__close">닫기</button>' +
            '</div>' +
            '<a class="shorts-modal__yt" data-link target="_blank" rel="noopener">YouTube에서 보기 →</a>' +
            '</div>';
        document.body.appendChild(modal);
        frameBox = modal.querySelector('[data-frame]');
        titleEl = modal.querySelector('[data-title]');
        linkEl = modal.querySelector('[data-link]');
        modal.querySelector('[data-close]').addEventListener('click', close);
        modal.querySelector('[data-prev]').addEventListener('click', function () { show(cur - 1); });
        modal.querySelector('[data-next]').addEventListener('click', function () { show(cur + 1); });
        modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
        document.addEventListener('keydown', function (e) {
            if (modal.hidden) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') show(cur + 1);
            if (e.key === 'ArrowLeft') show(cur - 1);
        });
    }
    function show(i) {
        if (!list.length) return;
        cur = (i + list.length) % list.length;
        var it = list[cur];
        frameBox.innerHTML = '';
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + it.id + '?autoplay=1&rel=0&playsinline=1&loop=0';
        f.title = it.title;
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        f.referrerPolicy = 'strict-origin-when-cross-origin';
        frameBox.appendChild(f);
        titleEl.textContent = (it.ep ? it.ep + '편 · ' : '') + it.title;
        linkEl.href = 'https://www.youtube.com/shorts/' + it.id;
        var multi = list.length > 1;
        modal.querySelector('[data-prev]').hidden = !multi;
        modal.querySelector('[data-next]').hidden = !multi;
    }
    function open(arr, i) {
        ensureModal();
        list = arr;
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.documentElement.classList.add('shorts-open');
        show(i);
        modal.querySelector('[data-close]').focus();
    }
    function close() {
        if (!modal) return;
        frameBox.innerHTML = '';
        modal.hidden = true;
        document.documentElement.classList.remove('shorts-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    /* ── 사용 가이드 쇼츠 모음 ── */
    function renderRail(box) {
        load().then(function (arr) {
            var rail = box.querySelector('[data-shorts-list]');
            rail.innerHTML = '';
            arr.forEach(function (it, i) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'shorts-card';
                b.setAttribute('aria-label', (it.ep ? it.ep + '편 ' : '') + it.title + ' 재생');
                b.innerHTML =
                    '<span class="shorts-card__th"><img src="' + esc(thumb(it.id)) + '" alt="" loading="lazy" width="270" height="480">' +
                    (it.ep ? '<span class="shorts-card__ep">' + esc(it.ep) + '편</span>' : '') +
                    (isNew(it) ? '<span class="shorts-card__new">NEW</span>' : '') +
                    '<span class="shorts-card__play">' + playIcon() + '</span></span>' +
                    '<span class="shorts-card__title">' + esc(it.title) + '</span>';
                b.addEventListener('click', function () { open(arr, i); });
                rail.appendChild(b);
            });
            box.hidden = !arr.length;
        });
    }

    /* ── 정부지원 자가진단: 산성 결과에 관련 1편 ── */
    function acidShort(arr) {
        var tagged = arr.filter(function (it) { return /(^|\s)(산성|석회)(\s|$)/.test(it.tags || ''); });
        if (tagged.length) return tagged[tagged.length - 1];
        return arr.filter(function (it) { return it.id === ACID_FALLBACK_ID; })[0] || null;
    }
    function onGovResult(e) {
        var box = e.target && e.target.closest ? e.target.closest('[data-gov-check]') : null;
        if (!box) return;
        var slot = box.querySelector('[data-gov-short]');
        if (!slot) {
            slot = document.createElement('div');
            slot.setAttribute('data-gov-short', '');
            slot.className = 'shorts-related-wrap';
            var out = box.querySelector('[data-gov-out]');
            out.parentNode.insertBefore(slot, out.nextSibling);
        }
        if (!e.detail || !e.detail.acid) { slot.innerHTML = ''; slot.removeAttribute('data-id'); return; }
        load().then(function (arr) {
            var it = acidShort(arr);
            if (!it) { slot.innerHTML = ''; slot.removeAttribute('data-id'); return; }
            // 같은 편이 이미 보이면 그대로 둡니다(입력칸을 벗어나며 누를 때 버튼이 바뀌어 눌리지 않는 문제 방지).
            if (slot.getAttribute('data-id') === it.id) return;
            slot.setAttribute('data-id', it.id);
            slot.innerHTML = relatedHtml(it, '산성 흙이 왜 문제일까?');
            slot.querySelector('button').addEventListener('click', function () { open([it], 0); });
        });
    }
    document.addEventListener('catalog:govresult', onGovResult);

    /* ── 관련 1편: [data-shorts-related data-tags="산성 석회" data-label="..."] 자리에 채움 ──
     * 처방 페이지, 제품 상세 창, Q&A 답변 등. 나중에 생기는 자리도 자동으로 채웁니다.
     * 태그가 맞는 편이 없으면 아무것도 보이지 않습니다. */
    function pickByTags(arr, tags) {
        for (var t = 0; t < tags.length; t++) {
            var re = new RegExp('(^|\\s)' + tags[t] + '(\\s|$)');
            var hit = arr.filter(function (it) { return re.test(it.tags || ''); });
            if (hit.length) return hit[hit.length - 1];
        }
        return null;
    }
    function relatedHtml(it, label) {
        return '<button type="button" class="shorts-related">' +
            '<span class="shorts-related__th"><img src="' + esc(thumb(it.id)) + '" alt="" loading="lazy" width="270" height="480"><span class="shorts-card__play">' + playIcon() + '</span></span>' +
            '<span class="shorts-related__txt"><b>' + esc(label || '1분 흙 이야기') + '</b><small>흙 이야기' + (it.ep ? ' ' + esc(it.ep) + '편' : '') + ' · ' + esc(it.title) + '</small></span>' +
            '<span class="shorts-related__go">1분 영상 ▶</span></button>';
    }
    function fillRelated(slot) {
        if (slot.getAttribute('data-filled')) return;
        slot.setAttribute('data-filled', '1');
        var tags = (slot.getAttribute('data-tags') || '').split(/\s+/).filter(function (t) { return /^[0-9A-Za-z가-힣_]+$/.test(t); });
        if (!tags.length) return;
        load().then(function (arr) {
            var it = pickByTags(arr, tags);
            if (!it) { slot.innerHTML = ''; return; }
            slot.innerHTML = relatedHtml(it, slot.getAttribute('data-label'));
            slot.querySelector('button').addEventListener('click', function () { open([it], 0); });
        });
    }
    function scan(root) {
        if (!root || !root.querySelectorAll) return;
        if (root.matches && root.matches('[data-shorts-related]')) fillRelated(root);
        Array.prototype.forEach.call(root.querySelectorAll('[data-shorts-related]'), fillRelated);
    }

    window.CatalogShorts = { scan: scan };

    function start() {
        Array.prototype.forEach.call(document.querySelectorAll('[data-shorts-section]'), renderRail);
        Array.prototype.forEach.call(document.querySelectorAll('[data-shorts-channel]'), function (a) { a.href = CHANNEL; });
        scan(document.body);
        if (window.MutationObserver) {
            new MutationObserver(function (list) {
                list.forEach(function (m) { Array.prototype.forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) scan(n); }); });
            }).observe(document.body, { childList: true, subtree: true });
        }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
