/* 홍보영상: 처음에는 대표 사진만 보여주고, 누를 때 YouTube(쿠키 최소화 주소)를 불러옵니다. */
(function () {
    'use strict';
    var HL = { ko: 'ko', en: 'en', zh: 'zh-CN', vi: 'vi' };

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

    /* 사이트에 직접 올린 영상(mp4): 누를 때 영상 파일을 불러와 재생합니다. */
    function playFile(btn) {
        var src = btn.getAttribute('data-film-src');
        if (!/^[\w./-]+\.mp4$/.test(src || '')) return;
        var img = btn.querySelector('img');
        var video = document.createElement('video');
        video.src = src;
        if (img) video.poster = img.getAttribute('src');
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('aria-label', btn.getAttribute('aria-label') || 'video');
        video.className = 'company-film__frame';
        video.style.objectFit = 'cover';
        btn.replaceWith(video);
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest) return;
        var btn = e.target.closest('[data-yt]');
        if (btn) { play(btn); return; }
        var fileBtn = e.target.closest('[data-film-src]');
        if (fileBtn) playFile(fileBtn);
    });
})();
