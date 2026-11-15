/* 홍보영상: 처음에는 대표 사진만 보여주고, 누를 때 YouTube(쿠키 최소화 주소)를 불러옵니다. */
(function () {
    'use strict';
    var HL = { ko: 'ko', en: 'en', zh: 'zh-CN' };

    function lang() {
        return (window.CatalogLang && window.CatalogLang.get) ? window.CatalogLang.get() : 'ko';
    }

    function play(btn) {
        var id = btn.getAttribute('data-yt');
        if (!/^[A-Za-z0-9_-]{6,20}$/.test(id || '')) return;
        var frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1&hl=' + (HL[lang()] || 'ko');
        frame.title = btn.getAttribute('aria-label') || 'YouTube';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.className = 'company-film__frame';
        btn.replaceWith(frame);
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('[data-yt]');
        if (btn) play(btn);
    });
})();
