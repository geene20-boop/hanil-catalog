/**
 * HANIL C&S catalog page-enter animations (cleaned up)
 * - transform / opacity only
 * - one timeline per page
 * - no text splitting (layout-safe)
 * - no green curtain panels on product images
 * - file:// local GSAP only
 */
(function () {
    'use strict';

    if (window.CATALOG_GSAP_DISABLED) {
        document.documentElement.classList.add('catalog-anim-ready');
        return;
    }

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pageTimeline = null;

    function findMain() {
        return document.querySelector('main') || document.querySelector('.catalog-app') || document.body;
    }

    /** Hero: first .boundary block (eyebrow + title + support copy) */
    function markHero(main) {
        var existing = main.querySelectorAll('[data-anim-hero], .anim-hero');
        if (existing.length) return Array.prototype.slice.call(existing);

        var firstBoundary = main.querySelector('.boundary');
        if (!firstBoundary) return [];

        var items = [];
        Array.prototype.forEach.call(firstBoundary.children, function (child) {
            if (child.tagName === 'H2' || child.tagName === 'H3' || child.tagName === 'P') {
                child.classList.add('anim-hero');
                items.push(child);
            } else if (child.tagName === 'DIV') {
                child.classList.add('anim-hero');
                items.push(child);
            }
        });
        return items;
    }

    /** Cards: content tiles in subsequent boundaries */
    function markCards(main) {
        var marked = main.querySelectorAll('[data-anim-card], .anim-card');
        if (marked.length) return Array.prototype.slice.call(marked);

        var out = [];
        var boundaries = main.querySelectorAll('.boundary');
        Array.prototype.forEach.call(boundaries, function (b, index) {
            if (index === 0 && boundaries.length > 1) return;
            Array.prototype.forEach.call(b.children, function (el) {
                if (el.tagName !== 'DIV') return;
                var c = el.className || '';
                var looksLikeCard =
                    c.indexOf('rounded') !== -1 ||
                    c.indexOf('col-span') !== -1 ||
                    c.indexOf('w-[400px]') !== -1 ||
                    c.indexOf('faq-item') !== -1;
                if (!looksLikeCard) return;
                el.classList.add('anim-card');
                out.push(el);
            });
        });
        return out;
    }

    function preloadImages(main) {
        Array.prototype.forEach.call(main.querySelectorAll('img'), function (img) {
            if (img.decode) img.decode().catch(function () {});
        });
    }

    function markReady() {
        document.documentElement.classList.add('catalog-anim-ready');
        document.documentElement.classList.remove('catalog-anim-boot');
    }

    /** Pages with declarative GSAP hooks — catalog-gsap.js owns entrance motion */
    function pageUsesCatalogGsap() {
        return !!document.querySelector(
            '[data-gsap-fade], [data-gsap-card], [data-gsap-gauge], [data-gsap-intro], ' +
            '[data-gsap-reveal], [data-history-timeline], [data-gsap-count], [data-bs-anim], [data-cs-anim]'
        );
    }

    function buildTimeline(heroes, cards) {
        var tl = gsap.timeline({
            paused: true,
            defaults: { ease: 'power3.out', force3D: true }
        });

        var targets = heroes.concat(cards);

        tl.eventCallback('onStart', function () {
            if (targets.length) gsap.set(targets, { willChange: 'transform, opacity' });
        });
        tl.eventCallback('onComplete', function () {
            if (targets.length) {
                gsap.set(targets, { willChange: 'auto', clearProps: 'will-change' });
            }
        });

        if (heroes.length) {
            tl.fromTo(heroes, { opacity: 0, y: 28 }, {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.08
            }, 0);
        }

        if (cards.length) {
            tl.fromTo(cards, { opacity: 0, y: 32 }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: cards.length > 6 ? 0.07 : 0.1,
                ease: 'power2.out'
            }, heroes.length ? 0.2 : 0);
        }

        return tl;
    }

    function showStatic(heroes, cards) {
        if (heroes.length) gsap.set(heroes, { opacity: 1, y: 0, clearProps: 'transform' });
        if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'transform' });
        markReady();
    }

    function ensurePageCurtain() {
        var el = document.querySelector('.catalog-page-curtain');
        if (el) return el;
        el = document.createElement('div');
        el.className = 'catalog-page-curtain';
        el.setAttribute('aria-hidden', 'true');
        document.body.appendChild(el);
        return el;
    }

    function navigateWithTransition(url, direction) {
        if (reduceMotion) {
            window.location.href = url;
            return;
        }
        var bar = ensurePageCurtain();
        bar.classList.toggle('is-from-right', direction < 0);
        gsap.set(bar, { scaleX: 0, pointerEvents: 'auto' });
        gsap.timeline()
            .to(bar, { scaleX: 1, duration: 0.4, ease: 'power3.inOut' })
            .add(function () {
                window.location.href = url;
            });
    }

    function init() {
        var main = findMain();
        if (!main || main.dataset.animInit === '1') return;
        main.dataset.animInit = '1';

        if (pageUsesCatalogGsap()) {
            return;
        }

        preloadImages(main);

        var heroes = markHero(main);
        var cards = markCards(main);

        if (reduceMotion) {
            showStatic(heroes, cards);
            return;
        }

        if (pageTimeline) {
            pageTimeline.kill();
            pageTimeline = null;
        }

        if (!heroes.length && !cards.length) {
            markReady();
            return;
        }

        /* Set hidden state first, then reveal main (prevents FOUC flash) */
        if (heroes.length) gsap.set(heroes, { opacity: 0, y: 28 });
        if (cards.length) gsap.set(cards, { opacity: 0, y: 32 });
        markReady();

        pageTimeline = buildTimeline(heroes, cards);
        pageTimeline.play(0);
    }

    function boot() {
        if (typeof gsap === 'undefined') {
            var attempts = 0;
            (function waitForGsap() {
                attempts += 1;
                if (typeof gsap !== 'undefined') {
                    init();
                    return;
                }
                if (attempts >= 160) {
                    markReady();
                    return;
                }
                setTimeout(waitForGsap, 50);
            })();
            return;
        }
        init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        setTimeout(boot, 0);
    }

    window.CatalogAnim = {
        navigate: navigateWithTransition,
        restart: function () {
            if (pageTimeline) pageTimeline.restart();
        },
        kill: function () {
            if (pageTimeline) {
                pageTimeline.kill();
                pageTimeline = null;
            }
        }
    };
})();
