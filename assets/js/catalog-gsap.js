/**
 * Shared catalog GSAP animations
 * Markup (declarative):
 *   data-gsap-intro          — intro fade items (with #intro-overlay)
 *   data-gsap-fade           — fade in up (hero copy)
 *   data-gsap-card           — scale-in cards
 *   data-gsap-gauge          — left→right gauge fill reveal
 *   data-gsap-count="N"      — integer count-up to N
 *   data-gsap-reveal         — curtain reveal root
 *   data-gsap-reveal-media   — reveal image wrap
 *   data-gsap-reveal-curtain — curtain panel
 *   [data-history-timeline]  — scroll-reveal company history blocks
 *
 * Requires: vendor/gsap.min.js first, catalog-gsap.css for FOUC
 */
(function () {
    'use strict';

    if (window.CATALOG_GSAP_DISABLED) return;
    if (typeof gsap === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        Array.prototype.forEach.call(document.querySelectorAll('.gsap-hide, .intro-anim, .gsap-gauge'), function (el) {
            el.classList.remove('gsap-hide', 'intro-anim', 'gsap-gauge');
        });
        Array.prototype.forEach.call(document.querySelectorAll('[data-gsap-count]'), function (el) {
            var end = parseFloat(el.getAttribute('data-gsap-count'), 10);
            if (!isNaN(end)) el.textContent = String(Math.round(end));
        });
        Array.prototype.forEach.call(document.querySelectorAll('[data-gsap-reveal-curtain]'), function (el) {
            el.style.display = 'none';
        });
        var frame = document.querySelector('[data-gsap-intro-frame], #catalog-frame');
        if (frame && document.body.classList.contains('is-intro')) {
            frame.classList.remove('opacity-0', 'inset-0', 'rounded-none');
            frame.classList.add('opacity-100', 'inset-[10px]', 'rounded-[40px]');
        }
        Array.prototype.forEach.call(document.querySelectorAll('.history-year-num, .history-event-row, .history-marker-dot, .history-rail-progress'), function (el) {
            el.style.opacity = '';
            el.style.transform = '';
        });
        return;
    }

    var FADE_CLASS = 'gsap-hide';

    function markCatalogMainReady() {
        document.documentElement.classList.add('catalog-anim-ready');
    }

    function toArray(list) {
        return Array.prototype.slice.call(list || []);
    }

    function cleanupFade(els) {
        els.forEach(function (el) {
            el.classList.remove(FADE_CLASS, 'intro-anim', 'bs-fade-up', 'cs-fade-up');
        });
        gsap.set(els, { clearProps: 'transform,opacity,will-change' });
    }

    function cleanupCards(els) {
        els.forEach(function (el) {
            el.classList.remove(FADE_CLASS, 'bs-fade-up', 'cs-fade-up');
            el.style.willChange = 'auto';
        });
    }

    function cleanupGauges(els) {
        els.forEach(function (el) {
            el.classList.remove('gsap-gauge');
        });
        gsap.set(els, { clearProps: 'clipPath' });
    }

    function runIntro() {
        var overlay = document.getElementById('intro-overlay') || document.querySelector('[data-gsap-intro-overlay]');
        var items = toArray(document.querySelectorAll('[data-gsap-intro]'));
        if (!items.length) {
            items = [
                document.querySelector('[data-intro="logo"]'),
                document.querySelector('[data-intro="title"]'),
                document.querySelector('[data-intro="headline"]'),
                document.querySelector('[data-intro="desc"]'),
                document.querySelector('[data-intro="cta"]')
            ].filter(Boolean);
        }
        if (!overlay && !items.length) return false;

        var frame = document.querySelector('[data-gsap-intro-frame]');

        if (overlay) gsap.set(overlay, { opacity: 0 });
        if (items.length) gsap.set(items, { opacity: 0, y: 28 });
        if (frame) {
            gsap.set(frame, { opacity: 0, inset: '0px', borderRadius: '0px' });
        }

        var tl = gsap.timeline({ delay: 1, defaults: { ease: 'power3.out' } });
        if (overlay) {
            tl.to(overlay, { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0);
        }
        if (frame) {
            tl.to(frame, {
                opacity: 1,
                inset: '10px',
                borderRadius: '40px',
                duration: 1.1,
                ease: 'power2.out',
                onComplete: function () {
                    frame.classList.remove('opacity-0', 'inset-0', 'rounded-none');
                    frame.classList.add('inset-[10px]', 'rounded-[40px]');
                    gsap.set(frame, { clearProps: 'opacity,inset,borderRadius' });
                }
            }, 0);
        }
        if (items.length) {
            tl.to(items, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.14,
                onComplete: function () { cleanupFade(items); }
            }, 0.08);
        }
        return true;
    }

    function runHeroAndCards() {
        var heroes = toArray(document.querySelectorAll('[data-gsap-fade]'));
        if (!heroes.length) {
            heroes = [
                document.querySelector('[data-bs-anim="eyebrow"], [data-cs-anim="eyebrow"]'),
                document.querySelector('[data-bs-anim="headline"], [data-cs-anim="headline"]'),
                document.querySelector('[data-bs-anim="copy"], [data-cs-anim="copy"]')
            ].filter(Boolean);
        }

        var cards = toArray(document.querySelectorAll('[data-gsap-card]'));
        if (!cards.length) {
            cards = toArray(document.querySelectorAll('[data-bs-anim="card"], [data-cs-anim="card"]'));
        }

        var gauges = toArray(document.querySelectorAll('[data-gsap-gauge]'));

        if (!heroes.length && !cards.length && !gauges.length) return false;

        heroes.forEach(function (el) { el.classList.add(FADE_CLASS); });
        cards.forEach(function (el) { el.classList.add(FADE_CLASS); });
        if (heroes.length) gsap.set(heroes, { opacity: 0, y: 24 });
        if (cards.length) gsap.set(cards, { opacity: 0, y: 28, scale: 0.88 });
        if (gauges.length) gsap.set(gauges, { clipPath: 'inset(0 100% 0 0)' });

        var tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } });

        if (heroes.length) {
            tl.to(heroes, {
                opacity: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.14,
                onComplete: function () { cleanupFade(heroes); }
            });
        }

        if (cards.length) {
            tl.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                onComplete: function () { cleanupCards(cards); }
            }, heroes.length ? '-=0.85' : 0);
        }

        if (gauges.length) {
            tl.to(gauges, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.95,
                stagger: 0.2,
                ease: 'power2.inOut',
                onComplete: function () { cleanupGauges(gauges); }
            }, (heroes.length || cards.length) ? '>' : 0);
        }

        if (appendReveals(tl, 0)) {
            return 'with-reveal';
        }
        return true;
    }

    /** @returns {boolean} whether any reveal was scheduled */
    function appendReveals(timeline, at) {
        var roots = toArray(document.querySelectorAll('[data-gsap-reveal], [data-pre-reveal]'));
        if (!roots.length) return false;

        var pos = typeof at === 'number' ? at : 0;
        var useOwnTimeline = !timeline;
        var tl = timeline || gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.inOut' } });

        roots.forEach(function (root) {
            var curtain = root.querySelector('[data-gsap-reveal-curtain], [data-pre-reveal-curtain]');
            var media = root.querySelector('[data-gsap-reveal-media], [data-pre-reveal-media]');
            var img = media ? media.querySelector('img') : null;
            if (!curtain) return;

            gsap.set(curtain, { xPercent: 0 });
            if (img) gsap.set(img, { scale: 1.12 });

            tl.to(curtain, { xPercent: -101, duration: 1.25, ease: 'power3.inOut' }, pos);
            if (img) {
                tl.to(img, { scale: 1, duration: 1.45, ease: 'power2.out' }, pos + 0.05);
            }
            tl.add(function () {
                curtain.style.display = 'none';
                if (img) img.style.willChange = 'auto';
                root.classList.add('is-revealed');
            }, pos + 1.25);
        });
        return useOwnTimeline || roots.length > 0;
    }

    function runReveals() {
        return appendReveals(null, 0);
    }

    function runCounts() {
        var els = toArray(document.querySelectorAll('[data-gsap-count]'));
        if (!els.length) return false;

        function formatCount(n, digits) {
            var s = String(Math.round(n));
            while (s.length < digits) s = '0' + s;
            return s;
        }

        els.forEach(function (el, i) {
            var end = parseFloat(el.getAttribute('data-gsap-count'), 10);
            if (isNaN(end)) return;

            var digits = String(Math.round(Math.abs(end))).length;
            var obj = { val: 0 };
            el.textContent = formatCount(0, digits);

            gsap.to(obj, {
                val: end,
                duration: end === 0 ? 0.4 : 1.5,
                delay: 0.55 + i * 0.1,
                ease: 'power2.out',
                onUpdate: function () {
                    el.textContent = formatCount(obj.val, digits);
                },
                onComplete: function () {
                    el.textContent = formatCount(end, digits);
                }
            });
        });
        return true;
    }

    function runHistoryTimeline() {
        var wrap = document.querySelector('[data-history-timeline]');
        if (!wrap) return false;

        var stack = wrap.querySelector('.history-rail-stack');
        var progress = wrap.querySelector('[data-history-rail-progress]');
        var years = toArray(wrap.querySelectorAll('[data-gsap-history-year]'));
        if (!stack || !progress || !years.length) return false;

        var markers = years.map(function (yearEl) {
            return {
                yearEl: yearEl,
                marker: yearEl.querySelector('[data-gsap-history-marker]')
            };
        }).filter(function (item) { return item.marker; });

        var smoothPct = 0;
        var targetPct = 0;
        var targetLineBottom = null;
        var scrollBound = false;
        var tickerFn = null;

        function setAllMarkersActive(active) {
            markers.forEach(function (item) {
                item.yearEl.classList.toggle('is-rail-active', active);
            });
        }

        function getRailMetrics() {
            var stackRect = stack.getBoundingClientRect();
            var stackHeight = stack.offsetHeight;
            var railTop = stackRect.top + window.scrollY;
            return {
                stackHeight: stackHeight,
                railTop: railTop,
                railBottom: railTop + stackHeight
            };
        }

        function computeRailState() {
            var metrics = getRailMetrics();
            var stackHeight = metrics.stackHeight;
            if (stackHeight <= 0) {
                return { pct: 0, lineBottom: metrics.railTop };
            }

            var vh = window.innerHeight || document.documentElement.clientHeight;
            var docEl = document.documentElement;
            var maxScroll = Math.max(0, (docEl.scrollHeight || 0) - vh);
            var scrollY = window.scrollY;

            // 스크롤 구간: 타임라인 진입 전 0%, 페이지 하단 100%
            var startScroll = Math.max(0, metrics.railTop - vh * 0.2);
            var endScroll = Math.max(startScroll + 1, maxScroll);

            var pct = 0;
            if (scrollY <= startScroll) {
                pct = 0;
            } else if (scrollY >= endScroll - 1) {
                pct = 1;
            } else {
                pct = (scrollY - startScroll) / (endScroll - startScroll);
            }

            var lineBottom = metrics.railTop + (pct * stackHeight);
            return { pct: pct, lineBottom: lineBottom };
        }

        function applyRailProgress(pct, lineBottomDoc) {
            var metrics = getRailMetrics();
            var stackHeight = metrics.stackHeight;
            if (stackHeight <= 0) return;

            if (lineBottomDoc == null) {
                lineBottomDoc = metrics.railTop + (stackHeight * pct);
            }
            progress.style.height = Math.max(0, lineBottomDoc - metrics.railTop) + 'px';

            markers.forEach(function (item) {
                var mr = item.marker.getBoundingClientRect();
                var centerY = mr.top + window.scrollY + (mr.height / 2);
                var hit = lineBottomDoc >= centerY - 1;
                item.yearEl.classList.toggle('is-rail-active', hit);
            });
        }

        function updateHistoryRailScroll() {
            var state = computeRailState();
            targetPct = state.pct;
            targetLineBottom = state.lineBottom;
        }

        function bindScrollRail() {
            if (scrollBound) return;
            scrollBound = true;

            var onScrollOrResize = function () {
                updateHistoryRailScroll();
            };
            window.addEventListener('scroll', onScrollOrResize, { passive: true });
            window.addEventListener('resize', onScrollOrResize);

            var smoothLineBottom = null;

            tickerFn = function () {
                if (targetPct >= 0.999) {
                    smoothPct = 1;
                } else if (targetPct <= 0.001) {
                    smoothPct = 0;
                } else {
                    smoothPct += (targetPct - smoothPct) * 0.18;
                    if (Math.abs(targetPct - smoothPct) < 0.001) smoothPct = targetPct;
                }

                var metrics = getRailMetrics();
                var goalBottom = targetLineBottom != null
                    ? targetLineBottom
                    : metrics.railTop + (targetPct * metrics.stackHeight);
                if (smoothLineBottom == null) smoothLineBottom = metrics.railTop;
                if (targetPct <= 0.001) {
                    smoothLineBottom = metrics.railTop;
                } else if (targetPct >= 0.999) {
                    smoothLineBottom = goalBottom;
                } else {
                    smoothLineBottom += (goalBottom - smoothLineBottom) * 0.18;
                }
                applyRailProgress(smoothPct, smoothLineBottom);
            };
            gsap.ticker.add(tickerFn);

            markers.forEach(function (item) {
                item.yearEl.classList.remove('is-rail-active');
            });
            progress.style.height = '0px';
            targetPct = 0;
            smoothPct = 0;
            smoothLineBottom = getRailMetrics().railTop;
            updateHistoryRailScroll();
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setAllMarkersActive(true);
            progress.style.height = stack.offsetHeight + 'px';
            return true;
        }

        bindScrollRail();
        return true;
    }

    function init() {
        markCatalogMainReady();
        runIntro();
        var pageMotion = runHeroAndCards();
        if (pageMotion !== 'with-reveal') {
            runReveals();
        }
        runCounts();
        runHistoryTimeline();
        if (!document.documentElement.classList.contains('catalog-anim-ready')) {
            markCatalogMainReady();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.CatalogGsap = { init: init };
})();
