(function () {
    'use strict';

    /* Global kill switch — set true to skip GSAP (faster navigation, no motion) */
    window.CATALOG_GSAP_DISABLED = false;

    /* ≥1600px: force root 14px so Tailwind rem utilities (text-2xl…) actually shrink.
       Inline style beats late-injected Tailwind <style> tags. */
    (function bindLargeDesktopRootType() {
        var mq = window.matchMedia('(min-width: 1600px)');
        function applyRootType() {
            document.documentElement.style.fontSize = mq.matches ? '14px' : '';
        }
        applyRootType();
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', applyRootType);
        } else if (typeof mq.addListener === 'function') {
            mq.addListener(applyRootType);
        }
    })();

    /* FOUC: hide main until animation (or fallback) marks ready */
    if (!window.CATALOG_GSAP_DISABLED) {
        document.documentElement.classList.add('js-anim');
        /* Pages link catalog-gsap.css + .gsap-hide — do not also hide all of main (double blank flash) */
        if (document.querySelector('link[href*="catalog-gsap.css"]')) {
            document.documentElement.classList.add('catalog-anim-ready');
        }
        /* Last-resort: show main if GSAP scripts fail (avoid stuck blank screen) */
        setTimeout(function () {
            if (document.documentElement.classList.contains('catalog-anim-ready')) return;
            document.documentElement.classList.add('catalog-anim-ready', 'catalog-gsap-off');
        }, 2200);
    } else {
        document.documentElement.classList.add('catalog-anim-ready', 'catalog-gsap-off');
    }

    function getCurrentScript() {
        return document.currentScript || document.querySelector('script[src*="include-header.js"]');
    }

    function getRootPrefixFromPathname() {
        var pathname = decodeURIComponent((window.location.pathname || '').replace(/\\/g, '/')).toLowerCase();
        if (/\/products\/applications\/[^/]+$/.test(pathname)) return '../../';
        if (/\/(products|network|regulations|applications|company|technical|export|contactus)\/[^/]+$/.test(pathname)) return '../';
        return './';
    }

    var _script = getCurrentScript();
    var _src = (_script && _script.getAttribute('src')) || '';
    var _ups = (_src.match(/\.\.\//) ? _src.split('../').length - 1 : 0);
    var R    = _ups > 0 ? Array(_ups).fill('..').join('/') + '/' : getRootPrefixFromPathname();

    /* file://: Chrome blocks external woff2 CORS — load data-URI @font-face instead.
       http(s): keep light pretendardvariable.css + woff2 preload. */
    (function ensurePretendardForFileProtocol() {
        if (location.protocol !== 'file:') return;
        if (document.querySelector('link[data-pretendard-file]')) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = R + 'assets/css/pretendardvariable.file.css';
        link.setAttribute('data-pretendard-file', '1');
        document.head.appendChild(link);
    })();

    var ARROW_HTML = '\
<div class="catalog-nav-arrow max-md:hidden fixed left-[20px] max-lg:left-[10px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] max-lg:w-[48px] max-lg:h-[48px] rounded-full border-2 border-white bg-black/30 backdrop-blur-md hover:bg-[#22703C] hover:border-[#22703C] transition-colors duration-300 flex items-center justify-center z-[9999] cursor-pointer" data-nav="prev" role="button" aria-label="이전 페이지" data-i18n-aria="nav.prevPage" tabindex="0">\
    <img src="' + R + 'assets/img/arrow-left.svg" alt="left" class="w-[24px] h-[24px] max-lg:w-[18px] max-lg:h-[18px]">\
</div>\
<div class="catalog-nav-arrow max-md:hidden fixed right-[20px] max-lg:right-[10px] top-1/2 -translate-y-1/2 w-[64px] h-[64px] max-lg:w-[48px] max-lg:h-[48px] rounded-full border-2 border-white bg-black/30 backdrop-blur-md hover:bg-[#22703C] hover:border-[#22703C] transition-colors duration-300 flex items-center justify-center z-[9999] cursor-pointer" data-nav="next" role="button" aria-label="다음 페이지" data-i18n-aria="nav.nextPage" tabindex="0">\
    <img src="' + R + 'assets/img/arrow-right.svg" alt="right" class="w-[24px] h-[24px] max-lg:w-[18px] max-lg:h-[18px]">\
</div>';

    var HEADER_HTML = '\
<header class="w-[calc(100%-20px)] max-lg:w-full max-w-[1200px] mx-auto max-lg:mx-0 mt-[20px] max-lg:mt-0 fixed left-1/2 -translate-x-1/2 max-lg:left-0 max-lg:translate-x-0 bg-white px-[20px] max-md:px-[14px] flex justify-between items-stretch h-full max-h-[50px] z-[9999]">\
    <div class="logo-wrap flex items-center shrink-0">\
        <a href="' + R + 'index.html" class="flex py-[8px]">\
            <img src="' + R + 'assets/img/heaer-logo.svg" alt="logo" class="h-[34px] w-auto">\
        </a>\
    </div>\
    <div class="menu-wrap flex gap-[20px] max-xl:gap-[10px] max-lg:hidden">\
                <div class="group flex items-center" data-menu="company">\
            <a href="' + R + 'company/greeting.html" class="text-base max-xl:text-sm font-semibold text-gray-400 h-full flex items-center px-[10px] max-xl:px-[6px] text-center mx-auto w-full group-hover:text-[#0C5625] "><span data-i18n="nav.company">회사소개</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-[4px] group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></a>\
            <div class="catalog-top-subnav absolute top-full left-0 w-full flex flex-row flex-nowrap gap-[20px] max-xl:gap-[12px] justify-center bg-[#F0F5ED] py-[10px] px-[15px] rounded-b-[25px] rounded-t-none z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible">\
                                    <a href="' + R + 'company/greeting.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="greeting.html" data-i18n="nav.greeting">인사말</a>\
                    <a href="' + R + 'company/history.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="history.html" data-i18n="nav.history">연혁</a>\
            </div>\
        </div>\
        <div class="group flex items-center" data-menu="plant">\
            <a href="' + R + 'company/certification.html" class="text-base max-xl:text-sm font-semibold text-gray-400 h-full flex items-center px-[10px] max-xl:px-[6px] text-center mx-auto w-full group-hover:text-[#0C5625] "><span data-i18n="nav.plant">특허 및 설비</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-[4px] group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></a>\
            <div class="catalog-top-subnav absolute top-full left-0 w-full flex flex-row flex-nowrap gap-[20px] max-xl:gap-[12px] justify-center bg-[#F0F5ED] py-[10px] px-[15px] rounded-b-[25px] rounded-t-none z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible">\
                                    <a href="' + R + 'company/certification.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="certification.html" data-i18n="nav.certification">인증서 및 특허</a>\
                    <a href="' + R + 'company/facility.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="facility.html" data-i18n="nav.facility">설비현황</a>\
            </div>\
        </div>\
        <div class="group flex items-center" data-menu="products">\
            <a href="' + R + 'products/products-line.html" class="text-base max-xl:text-sm font-semibold text-gray-400 h-full flex items-center px-[10px] max-xl:px-[6px] text-center mx-auto w-full group-hover:text-[#0C5625] "><span data-i18n="nav.products">제품소개</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-[4px] group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></a>\
            <div class="catalog-top-subnav absolute top-full left-0 w-full flex flex-row flex-nowrap gap-[20px] max-xl:gap-[12px] justify-center bg-[#F0F5ED] py-[10px] px-[15px] rounded-b-[25px] rounded-t-none z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible">\
                                    <a href="' + R + 'products/products-line.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="products-line.html" data-i18n="nav.productsLine">토양개량제</a>\
                    <a href="' + R + 'products/organic.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="organic.html" data-i18n="nav.organic">유기농업자재</a>\
                    <a href="' + R + 'products/vita.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="vita.html" data-i18n="nav.vita">미량요소복합비료</a>\
            </div>\
        </div>\
        <div class="group flex items-center" data-menu="tech">\
            <a href="' + R + 'technical/crop-solutions.html" class="text-base max-xl:text-sm font-semibold text-gray-400 h-full flex items-center px-[10px] max-xl:px-[6px] text-center mx-auto w-full group-hover:text-[#0C5625] "><span data-i18n="nav.tech">사용가이드</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-[4px] group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></a>\
            <div class="catalog-top-subnav absolute top-full left-0 w-full flex flex-row flex-nowrap gap-[20px] max-xl:gap-[12px] justify-center bg-[#F0F5ED] py-[10px] px-[15px] rounded-b-[25px] rounded-t-none z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible">\
                                    <a href="' + R + 'technical/crop-solutions.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="crop-solutions.html" data-i18n="nav.cropSolutions">작물 솔루션</a>\
                    <a href="' + R + 'technical/guide.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="guide.html" data-i18n="nav.guide">사용 가이드</a>\
                    <a href="' + R + 'technical/prescription-01.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="prescription-01.html" data-i18n="nav.prescription01">수도작 핵심처방</a>\
                    <a href="' + R + 'technical/prescription-02.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="prescription-02.html" data-i18n="nav.prescription02">밭작물 맞춤 처방</a>\
                    <a href="' + R + 'technical/prescription-03.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="prescription-03.html" data-i18n="nav.prescription03">과수·시설재배 전용</a>\
                    <a href="' + R + 'technical/government.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="government.html" data-i18n="nav.government">정부지원</a>\
            </div>\
        </div>\
        <div class="group flex items-center" data-menu="export">\
            <a href="' + R + 'export/global-exprot.html" class="text-base max-xl:text-sm font-semibold text-gray-400 h-full flex items-center px-[10px] max-xl:px-[6px] text-center mx-auto w-full group-hover:text-[#0C5625] "><span data-i18n="nav.export">수출현황</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-[4px] group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></a>\
            <div class="catalog-top-subnav absolute top-full left-0 w-full flex flex-row flex-nowrap gap-[20px] max-xl:gap-[12px] justify-center bg-[#F0F5ED] py-[10px] px-[15px] rounded-b-[25px] rounded-t-none z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible">\
                                    <a href="' + R + 'export/global-exprot.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="global-exprot.html" data-i18n="nav.globalExport">글로벌 수출</a>\
            </div>\
        </div>\
        <div class="group flex items-center" data-menu="contact">\
            <a href="' + R + 'contactus/contact-us.html" class="text-base max-xl:text-sm font-semibold text-gray-400 h-full flex items-center px-[10px] max-xl:px-[6px] text-center mx-auto w-full group-hover:text-[#0C5625] "><span data-i18n="nav.contact">상담문의</span><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-[4px] group-hover:rotate-180"><polyline points="6 9 12 15 18 9"></polyline></svg></a>\
            <div class="catalog-top-subnav absolute top-full left-0 w-full flex flex-row flex-nowrap gap-[20px] max-xl:gap-[12px] justify-center bg-[#F0F5ED] py-[10px] px-[15px] rounded-b-[25px] rounded-t-none z-[9999] opacity-0 invisible group-hover:opacity-100 group-hover:visible">\
                                    <a href="' + R + 'contactus/contact-us.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="contact-us.html" data-i18n="nav.contact">상담문의</a>\
                    <a href="' + R + 'contactus/qna.html" class="text-base max-xl:text-sm font-semibold text-gray-400 whitespace-nowrap hover:text-[#0C5625]" data-page="qna.html" data-i18n="nav.qna">Q&amp;A 재배상담</a>\
            </div>\
        </div>\
    </div>\
    <div class="header-tools flex items-center gap-[8px] max-md:gap-[6px] shrink-0">\
        <div class="contact_us flex items-center gap-[6px] max-lg:hidden text-[#154624]">\
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" class="w-[14px] h-[14px] shrink-0"><path d="M11.3 12C9.91111 12 8.53889 11.6972 7.18333 11.0917C5.82778 10.4861 4.59444 9.62778 3.48333 8.51667C2.37222 7.40556 1.51389 6.17222 0.908333 4.81667C0.302778 3.46111 0 2.08889 0 0.7C0 0.5 0.0666667 0.333333 0.2 0.2C0.333333 0.0666667 0.5 0 0.7 0H3.4C3.55556 0 3.69444 0.0527778 3.81667 0.158333C3.93889 0.263889 4.01111 0.388889 4.03333 0.533333L4.46667 2.86667C4.48889 3.04444 4.48333 3.19444 4.45 3.31667C4.41667 3.43889 4.35556 3.54444 4.26667 3.63333L2.65 5.26667C2.87222 5.67778 3.13611 6.075 3.44167 6.45833C3.74722 6.84167 4.08333 7.21111 4.45 7.56667C4.79444 7.91111 5.15556 8.23056 5.53333 8.525C5.91111 8.81944 6.31111 9.08889 6.73333 9.33333L8.3 7.76667C8.4 7.66667 8.53056 7.59167 8.69167 7.54167C8.85278 7.49167 9.01111 7.47778 9.16667 7.5L11.4667 7.96667C11.6222 8.01111 11.75 8.09167 11.85 8.20833C11.95 8.325 12 8.45556 12 8.6V11.3C12 11.5 11.9333 11.6667 11.8 11.8C11.6667 11.9333 11.5 12 11.3 12Z"/></svg>\
            <a href="tel:0547629691" class="text-sm text-[#154624] font-semibold leading-none whitespace-nowrap" data-i18n="nav.phone" data-i18n-href="nav.phoneHref">054 -762 -9691</a>\
            <a href="https://www.youtube.com/@hanilcns" target="_blank" rel="noopener" class="yt-channel-btn" aria-label="한일씨앤에스 YouTube 채널 (새 창)" data-i18n-aria="nav.youtubeAria"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg>흙 이야기</a>\
        </div>\
        <div data-lang-switch data-lang-theme="header" role="group" aria-label="언어 선택" class="inline-flex items-center gap-[2px] p-[3px] rounded-full bg-[#F0F5ED] border border-[#154624]/10">\
            <button type="button" data-lang="ko" aria-pressed="true" class="min-w-[36px] h-[28px] px-[10px] rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 bg-[#0C5625] text-white">KO</button>\
            <button type="button" data-lang="en" aria-pressed="false" class="min-w-[36px] h-[28px] px-[10px] rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 text-gray-400 hover:text-[#0C5625]">EN</button>\
            <button type="button" data-lang="zh" lang="zh-CN" aria-pressed="false" class="min-w-[36px] h-[28px] px-[10px] rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 text-gray-400 hover:text-[#0C5625]">中文</button>\
            <button type="button" data-lang="vi" lang="vi" aria-pressed="false" class="min-w-[36px] h-[28px] px-[10px] rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 text-gray-400 hover:text-[#0C5625]">VI</button>\
        </div>\
        <a href="tel:0547629691" class="header-tool-btn lg:hidden" aria-label="전화 걸기 054-762-9691" title="054-762-9691" data-i18n-href="nav.phoneHref" data-i18n-aria="nav.phoneAria" data-i18n-title="nav.phone">\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" class="w-[16px] h-[16px]"><path d="M11.3 12C9.91111 12 8.53889 11.6972 7.18333 11.0917C5.82778 10.4861 4.59444 9.62778 3.48333 8.51667C2.37222 7.40556 1.51389 6.17222 0.908333 4.81667C0.302778 3.46111 0 2.08889 0 0.7C0 0.5 0.0666667 0.333333 0.2 0.2C0.333333 0.0666667 0.5 0 0.7 0H3.4C3.55556 0 3.69444 0.0527778 3.81667 0.158333C3.93889 0.263889 4.01111 0.388889 4.03333 0.533333L4.46667 2.86667C4.48889 3.04444 4.48333 3.19444 4.45 3.31667C4.41667 3.43889 4.35556 3.54444 4.26667 3.63333L2.65 5.26667C2.87222 5.67778 3.13611 6.075 3.44167 6.45833C3.74722 6.84167 4.08333 7.21111 4.45 7.56667C4.79444 7.91111 5.15556 8.23056 5.53333 8.525C5.91111 8.81944 6.31111 9.08889 6.73333 9.33333L8.3 7.76667C8.4 7.66667 8.53056 7.59167 8.69167 7.54167C8.85278 7.49167 9.01111 7.47778 9.16667 7.5L11.4667 7.96667C11.6222 8.01111 11.75 8.09167 11.85 8.20833C11.95 8.325 12 8.45556 12 8.6V11.3C12 11.5 11.9333 11.6667 11.8 11.8C11.6667 11.9333 11.5 12 11.3 12Z"/></svg>\
        </a>\
        <a href="#" class="header-tool-btn header-calc-btn" data-catalog-modal="farm-fertilizer" title="내 농가 맞춤 시비량 자동 계산기" aria-label="내 농가 맞춤 시비량 자동 계산기" data-i18n-title="nav.calcFarm" data-i18n-aria="nav.calcFarm">\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>\
        </a>\
        <a href="#" class="header-tool-btn header-calc-btn" data-catalog-modal="orchard-profit" title="인회농장 기반 과수원 예상 수익 산출기" aria-label="인회농장 기반 과수원 예상 수익 산출기" data-i18n-title="nav.calcOrchard" data-i18n-aria="nav.calcOrchard">\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>\
        </a>\
        <a href="#" class="header-tool-btn header-calc-btn" data-catalog-modal="vita-dilution" title="생생비타40 희석량 계산기" aria-label="생생비타40 희석량 계산기" data-i18n-title="nav.calcVita" data-i18n-aria="nav.calcVita">\
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>\
        </a>\
    </div>\
</header>\
<nav class="catalog-calc-nav" id="catalog-calc-nav" aria-label="계산기 메뉴" data-i18n-aria="nav.calcMenuAria">\
    <a href="#" class="catalog-calc-btn" data-catalog-modal="farm-fertilizer" title="내 농가 맞춤 시비량 자동 계산기" aria-label="내 농가 맞춤 시비량 자동 계산기" data-i18n-title="nav.calcFarm" data-i18n-aria="nav.calcFarm">\
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>\
        <span class="catalog-calc-label" data-i18n="nav.calcFarm">내 농가 맞춤 시비량 자동 계산기</span>\
    </a>\
    <a href="#" class="catalog-calc-btn" data-catalog-modal="orchard-profit" title="인회농장 기반 과수원 예상 수익 산출기" aria-label="인회농장 기반 과수원 예상 수익 산출기" data-i18n-title="nav.calcOrchard" data-i18n-aria="nav.calcOrchard">\
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>\
        <span class="catalog-calc-label" data-i18n="nav.calcOrchard">인회농장 기반 과수원 예상 수익 산출기</span>\
    </a>\
    <a href="#" class="catalog-calc-btn" data-catalog-modal="vita-dilution" title="생생비타40 희석량 계산기" aria-label="생생비타40 희석량 계산기" data-i18n-title="nav.calcVita" data-i18n-aria="nav.calcVita">\
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>\
        <span class="catalog-calc-label" data-i18n="nav.calcVita">생생비타40 희석량 계산기</span>\
    </a>\
</nav>\
<div class="catalog-mobile-nav" id="catalog-mobile-nav">\
    <div class="catalog-subnav swiper" id="catalog-subnav" hidden>\
        <div class="swiper-wrapper" id="catalog-subnav-track"></div>\
    </div>\
    <nav class="catalog-tabbar" id="catalog-tabbar" aria-label="하단 메뉴" data-i18n-aria="nav.tabbarAria">\
        <button type="button" class="catalog-tab" data-tab="company">\
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 4 9v12h5v-6h6v6h5V9l-8-6z"/></svg>\
            <span data-i18n="nav.tabCompany">회사</span>\
        </button>\
        <button type="button" class="catalog-tab" data-tab="plant">\
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 21V8l7-4v4h11v13H3zm2-2h4v-3H5v3zm0-5h4v-3H5v3zm6 5h4v-3h-4v3zm0-5h4v-3h-4v3zm6 5h4v-3h-4v3zm0-5h4V9h-4v5z"/></svg>\
            <span data-i18n="nav.tabPlant">설비</span>\
        </button>\
        <button type="button" class="catalog-tab" data-tab="products">\
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.89 1.45a2 2 0 0 0-1.78 0l-8 4A2 2 0 0 0 2 7.24v9.52a2 2 0 0 0 1.11 1.79l8 4a2 2 0 0 0 1.78 0l8-4A2 2 0 0 0 22 16.76V7.24a2 2 0 0 0-1.11-1.79l-8-4zM12 4.18l6.39 3.2L12 10.56 5.61 7.38 12 4.18zm-7 5.4 6 3v7.24l-6-3V9.58zm8 10.24V12.58l6-3v7.24l-6 3z"/></svg>\
            <span data-i18n="nav.tabProducts">제품</span>\
        </button>\
        <button type="button" class="catalog-tab" data-tab="tech">\
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.07 7.07 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.61.22L2.65 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.77 14.52a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.4.31.61.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.22.09.49 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>\
            <span data-i18n="nav.tabTech">가이드</span>\
        </button>\
        <button type="button" class="catalog-tab" data-tab="business">\
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>\
            <span data-i18n="nav.tabExport">수출</span>\
        </button>\
        <button type="button" class="catalog-tab" data-tab="contact">\
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.4 21 3 13.6 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>\
            <span data-i18n="nav.tabContact">상담문의</span>\
        </button>\
    </nav>\
</div>';

    var TAB_SHEETS = {
        company: {
            titleKey: 'nav.company',
            links: [
                { href: R + 'company/greeting.html', page: 'greeting.html', i18n: 'nav.greeting', label: '인사말' },
                { href: R + 'company/history.html', page: 'history.html', i18n: 'nav.history', label: '연혁' }
            ]
        },
        plant: {
            titleKey: 'nav.plant',
            links: [
                { href: R + 'company/certification.html', page: 'certification.html', i18n: 'nav.certification', label: '인증서 및 특허' },
                { href: R + 'company/facility.html', page: 'facility.html', i18n: 'nav.facility', label: '설비현황' }
            ]
        },
        products: {
            titleKey: 'nav.products',
            links: [
                { href: R + 'products/products-line.html', page: 'products-line.html', i18n: 'nav.productsLine', label: '토양개량제' },
                { href: R + 'products/organic.html', page: 'organic.html', i18n: 'nav.organic', label: '유기농업자재' },
                { href: R + 'products/vita.html', page: 'vita.html', i18n: 'nav.vita', label: '미량요소복합비료' }
            ]
        },
        tech: {
            titleKey: 'nav.tech',
            links: [
                { href: R + 'technical/crop-solutions.html', page: 'crop-solutions.html', i18n: 'nav.cropSolutions', label: '작물 솔루션' },
                { href: R + 'technical/guide.html', page: 'guide.html', i18n: 'nav.guide', label: '사용 가이드' },
                { href: R + 'technical/prescription-01.html', page: 'prescription-01.html', i18n: 'nav.prescription01', label: '수도작 핵심처방' },
                { href: R + 'technical/prescription-02.html', page: 'prescription-02.html', i18n: 'nav.prescription02', label: '밭작물 맞춤 처방' },
                { href: R + 'technical/prescription-03.html', page: 'prescription-03.html', i18n: 'nav.prescription03', label: '과수·시설재배 전용' },
                { href: R + 'technical/government.html', page: 'government.html', i18n: 'nav.government', label: '정부지원' },
                { href: 'https://www.youtube.com/@hanilcns', external: true, i18n: 'nav.youtube', label: '흙 이야기 영상' }
            ]
        },
        business: {
            titleKey: 'nav.export',
            links: [
                { href: R + 'export/global-exprot.html', page: 'global-exprot.html', i18n: 'nav.globalExport', label: '글로벌 수출' }
            ]
        },
        contact: {
            titleKey: 'nav.contact',
            links: [
                { href: R + 'contactus/contact-us.html', page: 'contact-us.html', i18n: 'nav.contact', label: '상담문의' },
                { href: R + 'contactus/qna.html', page: 'qna.html', i18n: 'nav.qna', label: 'Q&A 재배상담' }
            ]
        }
    };

    function t(key, fallback) {
        if (window.CatalogLang && CatalogLang.dict) {
            var lang = CatalogLang.get();
            var pack = CatalogLang.dict[lang] || CatalogLang.dict.ko;
            if (key && pack[key] != null) return pack[key];
        }
        return fallback || '';
    }

    var BOTTOM_HTML = '';

    function ensureSwiperAssets(done) {
        done = typeof done === 'function' ? done : function () {};
        if (typeof window.Swiper === 'function') {
            done();
            return;
        }
        if (!document.querySelector('link[href*="swiper.min.css"], link[href*="swiper-bundle.min.css"]')) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = R + 'assets/css/swiper.min.css';
            document.head.appendChild(link);
        }
        var existing = document.querySelector('script[src*="swiper-bundle"], script[src*="swiper.min.js"]');
        if (existing) {
            if (typeof window.Swiper === 'function') {
                done();
            } else {
                existing.addEventListener('load', done);
                existing.addEventListener('error', done);
            }
            return;
        }
        var script = document.createElement('script');
        script.src = R + 'assets/js/swiper-bundle.min.js';
        script.async = true;
        script.onload = done;
        script.onerror = done;
        document.head.appendChild(script);
    }

    var catalogModalsPromise = null;

    function ensureCatalogModalsAssets(done) {
        done = typeof done === 'function' ? done : function () {};
        if (window.CatalogModal && typeof window.CatalogModal.open === 'function') {
            done();
            return;
        }
        if (!document.querySelector('link[href*="catalog-modals.css"]')) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = R + 'assets/css/catalog-modals.css';
            document.head.appendChild(link);
        }
        if (!catalogModalsPromise) {
            catalogModalsPromise = new Promise(function (resolve) {
                function loadScript(src, onDone) {
                    var file = src.split('/').pop();
                    var existing = document.querySelector('script[src*="' + file + '"]');
                    if (existing) {
                        var alreadyReady =
                            (file.indexOf('catalog-modals-i18n.js') !== -1 && window.CatalogModalI18n) ||
                            (file.indexOf('catalog-modals.js') !== -1 && window.CatalogModal && typeof window.CatalogModal.open === 'function') ||
                            existing.getAttribute('data-loaded') === '1';
                        if (alreadyReady) {
                            onDone();
                            return;
                        }
                        existing.addEventListener('load', onDone);
                        existing.addEventListener('error', onDone);
                        return;
                    }
                    var script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = function () {
                        script.setAttribute('data-loaded', '1');
                        onDone();
                    };
                    script.onerror = onDone;
                    document.body.appendChild(script);
                }
                loadScript(R + 'assets/js/catalog-modals-i18n.js', function () {
                    loadScript(R + 'assets/js/catalog-modals.js', resolve);
                });
            });
        }
        catalogModalsPromise.then(function () {
            done();
        });
    }

    function scheduleCatalogModalsPreload() {
        if (!document.querySelector('[data-catalog-modal]')) return;
        var run = function () { ensureCatalogModalsAssets(); };
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(run, { timeout: 2500 });
        } else {
            setTimeout(run, 1500);
        }
    }

    /* Shared GSAP entrance animations for all catalog pages */
    function ensureCatalogGsapAssets() {
        if (!document.querySelector('link[href*="catalog-gsap.css"]')) {
            var css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = R + 'assets/css/catalog-gsap.css';
            document.head.appendChild(css);
        }
        function loadPageGsap() {
            if (document.querySelector('script[src*="catalog-gsap.js"]')) return;
            var page = document.createElement('script');
            page.src = R + 'assets/js/catalog-gsap.js';
            document.body.appendChild(page);
        }
        if (typeof window.gsap !== 'undefined') {
            loadPageGsap();
            return;
        }
        if (document.querySelector('script[src*="vendor/gsap.min.js"]')) {
            var existing = document.querySelector('script[src*="vendor/gsap.min.js"]');
            existing.addEventListener('load', loadPageGsap);
            if (typeof window.gsap !== 'undefined') loadPageGsap();
            return;
        }
        var gsapScript = document.createElement('script');
        gsapScript.src = R + 'assets/js/vendor/gsap.min.js';
        gsapScript.onload = loadPageGsap;
        gsapScript.onerror = function () {
            document.documentElement.classList.add('catalog-anim-ready', 'catalog-gsap-off');
        };
        document.body.appendChild(gsapScript);
    }

    /* Catch modal opens before catalog-modals.js finishes loading */
    document.addEventListener('click', function (e) {
        var trigger = e.target.closest && e.target.closest('[data-catalog-modal]');
        if (!trigger) return;
        if (window.CatalogModal && typeof window.CatalogModal.open === 'function') return;
        e.preventDefault();
        e.stopPropagation();
        var id = trigger.getAttribute('data-catalog-modal');
        ensureCatalogModalsAssets(function () {
            if (window.CatalogModal && typeof window.CatalogModal.open === 'function') {
                window.CatalogModal.open(id);
            }
        });
    }, true);

    function ensureCatalogAnimAssets() {
        if (!document.querySelector('link[href*="catalog-animations.css"]')) {
            var animCss = document.createElement('link');
            animCss.rel = 'stylesheet';
            animCss.href = R + 'assets/css/catalog-animations.css';
            document.head.appendChild(animCss);
        }
        function loadAnim() {
            if (document.querySelector('script[src*="catalog-animations.js"]')) return;
            var anim = document.createElement('script');
            anim.src = R + 'assets/js/catalog-animations.js';
            document.body.appendChild(anim);
        }
        function markAnimReadyFallback() {
            document.documentElement.classList.add('catalog-anim-ready');
        }
        if (typeof window.gsap !== 'undefined') {
            loadAnim();
            return;
        }
        var existingGsap = document.querySelector('script[src*="vendor/gsap.min.js"]');
        if (existingGsap) {
            existingGsap.addEventListener('load', loadAnim);
            existingGsap.addEventListener('error', markAnimReadyFallback);
            if (typeof window.gsap !== 'undefined') loadAnim();
            return;
        }
        var gsapScript = document.createElement('script');
        gsapScript.src = R + 'assets/js/vendor/gsap.min.js';
        gsapScript.onload = loadAnim;
        gsapScript.onerror = markAnimReadyFallback;
        document.body.appendChild(gsapScript);
    }

    function ensureCatalogLangAssets(done) {
        done = typeof done === 'function' ? done : function () {};
        if (window.CatalogLang && typeof window.CatalogLang.apply === 'function') {
            done();
            return;
        }
        var existing = document.querySelector('script[src*="catalog-lang.js"]');
        if (existing) {
            existing.addEventListener('load', done);
            if (window.CatalogLang && typeof window.CatalogLang.apply === 'function') done();
            return;
        }
        var script = document.createElement('script');
        script.src = R + 'assets/js/catalog-lang.js';
        script.onload = done;
        document.body.appendChild(script);
    }

    /* Catalog page order = GNB submenu order */
    var PAGE_ORDER = [
        'company/greeting.html',
        'company/history.html',
        'company/certification.html',
        'company/facility.html',
        'products/products-line.html',
        'products/organic.html',
        'products/vita.html',
        'technical/crop-solutions.html',
        'technical/guide.html',
        'technical/prescription-01.html',
        'technical/prescription-02.html',
        'technical/prescription-03.html',
        'technical/government.html',
        'export/global-exprot.html',
        'contactus/contact-us.html',
        'contactus/qna.html'
    ];

    function withHtml(p) {
        var last = p.split('/').pop();
        return (last && last.indexOf('.') === -1) ? p + '.html' : p;
    }

    function currentPageKey() {
        var p = withHtml(decodeURIComponent((window.location.pathname || '').replace(/\\/g, '/')).toLowerCase());
        var i;
        for (i = 0; i < PAGE_ORDER.length; i++) {
            if (p.indexOf('/' + PAGE_ORDER[i].toLowerCase()) !== -1 || p.endsWith(PAGE_ORDER[i].toLowerCase())) {
                return PAGE_ORDER[i];
            }
        }
        var file = (p.split('/').pop() || '').toLowerCase();
        for (i = 0; i < PAGE_ORDER.length; i++) {
            if (PAGE_ORDER[i].split('/').pop().toLowerCase() === file) return PAGE_ORDER[i];
        }
        return '';
    }

    function goToPage(rel) {
        window.location.href = R + rel;
    }

    function bindPageArrows() {
        var arrows = document.querySelectorAll('.catalog-nav-arrow');
        if (!arrows.length) return;

        var key = currentPageKey();
        var idx = PAGE_ORDER.indexOf(key);

        Array.prototype.forEach.call(arrows, function (btn) {
            if (btn.dataset.navBound === '1') return;
            btn.dataset.navBound = '1';

            var dir = btn.getAttribute('data-nav') === 'prev' ? -1 : 1;
            var atEdge = idx < 0 ? dir < 0 : (idx + dir < 0 || idx + dir >= PAGE_ORDER.length);

            if (atEdge && idx >= 0) {
                btn.classList.add('is-disabled');
                btn.setAttribute('aria-disabled', 'true');
            }

            function handleNav(e) {
                if (e) e.preventDefault();
                if (btn.classList.contains('is-disabled')) return;
                if (idx < 0) {
                    if (dir > 0) goToPage(PAGE_ORDER[0], 1);
                    return;
                }
                var next = idx + dir;
                if (next < 0 || next >= PAGE_ORDER.length) return;
                goToPage(PAGE_ORDER[next], dir);
            }

            btn.addEventListener('click', handleNav);
            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') handleNav(e);
            });
        });
    }

    var s = getCurrentScript();
    if (!s) return;
    s.insertAdjacentHTML('beforebegin', ARROW_HTML + HEADER_HTML + BOTTOM_HTML);
    if (!document.getElementById('catalog-frame')) {
        document.body.insertAdjacentHTML(
            'afterbegin',
            '<div id="catalog-frame" class="fixed inset-[10px] rounded-[40px] pointer-events-none z-[100000] max-lg:hidden shadow-[0_0_0_10px_#fff,0_0_0_100vmax_#fff]" aria-hidden="true"></div>'
        );
    }
    scheduleCatalogModalsPreload();
    if (!window.CATALOG_GSAP_DISABLED) {
        ensureCatalogGsapAssets();
        ensureCatalogAnimAssets();
    }
    bindPageArrows();

    (function prefetchAdjacentCatalogPages() {
        /* file:// and embedded preview iframes: Chrome blocks prefetch ("Unsafe attempt to load URL") */
        if (location.protocol === 'file:' || window.self !== window.top) return;
        var key = currentPageKey();
        var idx = PAGE_ORDER.indexOf(key);
        if (idx < 0) return;
        function addPrefetch(i) {
            if (i < 0 || i >= PAGE_ORDER.length) return;
            var href = R + PAGE_ORDER[i];
            if (document.querySelector('link[rel="prefetch"][href="' + href + '"]')) return;
            var link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        }
        var run = function () {
            addPrefetch(idx - 1);
            addPrefetch(idx + 1);
        };
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(run, { timeout: 4000 });
        } else {
            setTimeout(run, 1500);
        }
    })();
    ensureCatalogLangAssets();
    /* Prefetch Pretendard (skip on file:// — Chrome CORS blocks crossOrigin font loads) */
    if (location.protocol !== 'file:' && !document.querySelector('link[data-catalog-font-preload]')) {
        var fontPreload = document.createElement('link');
        fontPreload.rel = 'preload';
        fontPreload.as = 'font';
        fontPreload.type = 'font/woff2';
        fontPreload.href = R + 'assets/font/PretendardVariable.woff2';
        fontPreload.crossOrigin = 'anonymous';
        fontPreload.setAttribute('data-catalog-font-preload', '1');
        document.head.appendChild(fontPreload);
    }

    /* Lazy-load below-fold images without changing above-the-fold LCP candidates */
    (function applyLazyImages() {
        function run() {
            var vh = window.innerHeight || 800;
            var imgs = document.querySelectorAll('.catalog-app img:not([loading]), main img:not([loading])');
            Array.prototype.forEach.call(imgs, function (img) {
                if (img.closest('header, .catalog-mobile-nav, .catalog-calc-nav')) return;
                if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                var top = img.getBoundingClientRect().top;
                if (top > vh * 0.95) img.setAttribute('loading', 'lazy');
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                requestAnimationFrame(run);
            });
        } else {
            requestAnimationFrame(run);
        }
    })();

    /* Keep floating chrome fixed to the viewport */
    (function relocateMobileChrome() {
        var mobileNav = document.getElementById('catalog-mobile-nav');
        if (mobileNav && mobileNav.parentNode !== document.body) {
            document.body.appendChild(mobileNav);
        }
        var calcNav = document.getElementById('catalog-calc-nav');
        if (calcNav && calcNav.parentNode !== document.body) {
            document.body.appendChild(calcNav);
        }
    })();

    /* ── Hide header until Tailwind runtime has styled it (prevents FOUC) ── */
    var headerEl = document.querySelector('header');
    if (headerEl) {
        headerEl.style.visibility = 'hidden';
        var startTime = Date.now();
        (function waitForStyles() {
            var bg = getComputedStyle(headerEl).backgroundColor;
            if (bg === 'rgb(255, 255, 255)' || Date.now() - startTime > 1000) {
                headerEl.style.visibility = '';
            } else {
                requestAnimationFrame(waitForStyles);
            }
        })();
    }

    /* ── Active desktop menu detection ─────────────────────────────────── */
    var path = decodeURIComponent(window.location.pathname || '').replace(/\\/g, '/').toLowerCase();
    var currentPage = (path.split('/').pop() || '');
    if (currentPage && currentPage.indexOf('.') === -1) currentPage += '.html';
    var inPlant = currentPage === 'certification.html' || currentPage === 'facility.html';
    var inCompany = /\/company\//.test(path) && !inPlant;
    var inProducts = /\/products\//.test(path);
    var inTechnical = /\/technical\//.test(path);
    var inExport = /\/export\//.test(path);
    var inContactUs = /\/contactus\//.test(path);
    var groups = document.querySelectorAll('.menu-wrap .group');
    groups.forEach(function (group) {
        var submenuLinks = group.querySelectorAll('.catalog-top-subnav a[data-page]');
        var matched = false;
        submenuLinks.forEach(function (link) {
            if (link.getAttribute('data-page').toLowerCase() === currentPage) {
                matched = true;
                link.classList.add('is-current');
            }
        });
        if (inCompany && group.getAttribute('data-menu') === 'company') matched = true;
        if (inPlant && group.getAttribute('data-menu') === 'plant') matched = true;
        if (inProducts && group.getAttribute('data-menu') === 'products') matched = true;
        if (inTechnical && group.getAttribute('data-menu') === 'tech') matched = true;
        if (inExport && group.getAttribute('data-menu') === 'export') matched = true;
        if (inContactUs && group.getAttribute('data-menu') === 'contact') matched = true;
        if (matched) {
            group.classList.add('is-active');
            var sub = group.querySelector('.catalog-top-subnav');
            if (sub) {
                sub.classList.remove('opacity-0', 'invisible');
                sub.classList.add('opacity-100', 'visible');
            }
        }
    });

    /* Top submenu uses plain flex (no Swiper) — avoids touch-capture freezes */
    document.addEventListener('dragstart', function (e) {
        var t = e.target;
        if (!t) return;
        if (t.closest && t.closest('a, img')) {
            e.preventDefault();
        }
    }, false);

    /* ── Mobile Instagram-style bottom nav + Swiper subnav ─────────────── */
    var activeTab = inPlant ? 'plant'
        : inCompany ? 'company'
        : inProducts ? 'products'
        : inTechnical ? 'tech'
        : inExport ? 'business'
        : inContactUs ? 'contact'
        : 'company';

    var tabbar = document.getElementById('catalog-tabbar');
    var subnav = document.getElementById('catalog-subnav');
    var subnavTrack = document.getElementById('catalog-subnav-track');
    var subnavSwiper = null;
    var pendingSubnavTab = null;

    function destroySubnavSwiper() {
        if (subnavSwiper && typeof subnavSwiper.destroy === 'function') {
            try { subnavSwiper.destroy(true, true); } catch (e) {}
        }
        subnavSwiper = null;
    }

    function ensureSubnavSlideFullyVisible(index) {
        if (!subnav || !subnavSwiper || !subnavSwiper.slides || !subnavSwiper.slides[index]) return;
        var slide = subnavSwiper.slides[index];
        var pad = 16;
        var left = slide.offsetLeft;
        var right = left + slide.offsetWidth;
        var viewLeft = subnav.scrollLeft;
        var viewRight = viewLeft + subnav.clientWidth;
        if (right > viewRight - pad) {
            subnav.scrollLeft = Math.max(0, right - subnav.clientWidth + pad);
        } else if (left < viewLeft + pad) {
            subnav.scrollLeft = Math.max(0, left - pad);
        }
    }

    function initSubnavSwiper(activeIndex) {
        if (!subnav || typeof window.Swiper !== 'function') return;
        destroySubnavSwiper();
        var startIndex = activeIndex > 0 ? activeIndex : 0;
        subnavSwiper = new window.Swiper(subnav, {
            slidesPerView: 'auto',
            spaceBetween: 6,
            cssMode: true,
            freeMode: true,
            watchOverflow: true,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            grabCursor: false,
            resistanceRatio: 0,
            touchStartPreventDefault: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 20,
            initialSlide: startIndex
        });
        if (subnavSwiper) {
            try { subnavSwiper.slideTo(startIndex, 0); } catch (e) {}
            requestAnimationFrame(function () {
                ensureSubnavSlideFullyVisible(startIndex);
                requestAnimationFrame(function () {
                    ensureSubnavSlideFullyVisible(startIndex);
                });
            });
        }
    }

    function renderSubnav(tabId) {
        var data = TAB_SHEETS[tabId];
        if (!data || !subnav || !subnavTrack) return;

        pendingSubnavTab = tabId;
        destroySubnavSwiper();

        var activeIndex = -1;
        subnavTrack.innerHTML = data.links.map(function (item, index) {
            var isCurrent = item.page && item.page.toLowerCase() === currentPage;
            if (isCurrent) activeIndex = index;
            var current = isCurrent ? ' is-current' : '';
            return '<div class="swiper-slide catalog-subnav__slide">' +
                '<a href="' + item.href + '" class="catalog-subnav__link' + current + '"' +
                (item.external ? ' target="_blank" rel="noopener"' : '') +
                (item.page ? ' data-page="' + item.page + '"' : '') + '>' +
                t(item.i18n, item.label) + '</a>' +
                '</div>';
        }).join('');

        /* Other section tabs (no page match): keep first pill active for browse */
        if (activeIndex < 0 && data.links.length) {
            activeIndex = 0;
            var firstLink = subnavTrack.querySelector('.catalog-subnav__link');
            if (firstLink) firstLink.classList.add('is-current');
        }

        subnav.hidden = false;

        if (tabbar) {
            tabbar.querySelectorAll('.catalog-tab[data-tab]').forEach(function (btn) {
                var on = btn.getAttribute('data-tab') === tabId;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
        }

        /* Swiper is only needed for the mobile bottom subnav (≤1023px) */
        if (!window.matchMedia('(max-width: 1023px)').matches) {
            return;
        }

        ensureSwiperAssets(function () {
            if (pendingSubnavTab !== tabId) return;
            initSubnavSwiper(activeIndex);
        });
    }

    if (tabbar) {
        tabbar.querySelectorAll('.catalog-tab[data-tab]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var tabId = btn.getAttribute('data-tab');
                var data = TAB_SHEETS[tabId];
                if (!data || !data.links || !data.links.length) return;

                var first = data.links[0];
                var firstPage = (first.page || '').toLowerCase();
                if (firstPage && firstPage === currentPage) {
                    renderSubnav(tabId);
                    return;
                }
                if (first.href) {
                    window.location.href = first.href;
                }
            });
        });
    }

    renderSubnav(activeTab);

    ensureCatalogLangAssets(function () {
        if (window.CatalogLang && typeof window.CatalogLang.apply === 'function') {
            window.CatalogLang.apply();
        }
        if (window.CatalogLang && window.CatalogLang.get() !== 'ko' && pendingSubnavTab) {
            renderSubnav(pendingSubnavTab);
        }
    });

    document.addEventListener('catalog:langchange', function () {
        if (pendingSubnavTab) renderSubnav(pendingSubnavTab);
        if (window.CatalogLang && typeof window.CatalogLang.apply === 'function') {
            window.CatalogLang.apply();
        }
    });

    /* If viewport crosses into mobile, ensure Swiper is initialized for current subnav */
    if (window.matchMedia) {
        var mobileMq = window.matchMedia('(max-width: 1023px)');
        var onMobileChange = function (e) {
            if (e.matches && pendingSubnavTab) {
                renderSubnav(pendingSubnavTab);
            }
        };
        if (typeof mobileMq.addEventListener === 'function') {
            mobileMq.addEventListener('change', onMobileChange);
        } else if (typeof mobileMq.addListener === 'function') {
            mobileMq.addListener(onMobileChange);
        }
    }
})();
