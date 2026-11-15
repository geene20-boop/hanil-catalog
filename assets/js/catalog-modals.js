(function () {
    'use strict';

    function getRootPrefix() {
        var pathname = decodeURIComponent((window.location.pathname || '').replace(/\\/g, '/')).toLowerCase();
        if (/\/products\/applications\/[^/]+$/.test(pathname)) return '../../';
        if (/\/(products|network|regulations|applications|company|technical|export|contactus)\/[^/]+$/.test(pathname)) return '../';
        return './';
    }

    var R = getRootPrefix();

    function tUi(key, vars) {
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        var pack = (window.CatalogModalI18n && CatalogModalI18n.ui && (CatalogModalI18n.ui[lang] || CatalogModalI18n.ui.ko)) || {};
        var text = pack[key];
        if (text == null && CatalogModalI18n && CatalogModalI18n.ui && CatalogModalI18n.ui.ko) text = CatalogModalI18n.ui.ko[key];
        if (text == null) return key;
        if (vars) Object.keys(vars).forEach(function (k) { text = String(text).split('{' + k + '}').join(String(vars[k])); });
        return text;
    }

    function tUiRaw(key) {
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        var pack = (window.CatalogModalI18n && CatalogModalI18n.ui && (CatalogModalI18n.ui[lang] || CatalogModalI18n.ui.ko)) || {};
        var val = pack[key];
        if (val == null && CatalogModalI18n && CatalogModalI18n.ui && CatalogModalI18n.ui.ko) val = CatalogModalI18n.ui.ko[key];
        return val;
    }

    /* English and Vietnamese: longer Latin-script text, so use the wider Vita Gold layout */
    function isCatalogLatin() {
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        return lang === 'en' || lang === 'vi';
    }

    /* Any non-Korean view (English, Chinese, Vietnamese): m², USD, English MSDS */
    function isCatalogIntl() {
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        return lang !== 'ko';
    }

    function getLocalizedProduct(id) {
        var pack = window.CatalogModalI18n && CatalogModalI18n.products && CatalogModalI18n.products[id];
        if (!pack) return {};
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        var copy = pack[lang] || pack.ko || {};
        var out = {};
        Object.keys(copy).forEach(function (k) { out[k] = copy[k]; });
        if (pack.이미지) out.이미지 = pack.이미지;
        if (pack.MSDS) out.MSDS = pack.MSDS;
        if (pack.카테고리) out.카테고리 = pack.카테고리;
        return out;
    }

    function localeTag() {
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        return lang === 'en' ? 'en-US' : (lang === 'zh' ? 'zh-CN' : (lang === 'vi' ? 'vi-VN' : 'ko-KR'));
    }

    var CROP_CARD_BASE = 'relative flex flex-col items-center gap-1 min-h-[118px] px-2 pt-[14px] pb-3 rounded-[16px] bg-white cursor-pointer text-center transition-all duration-200 hover:border-[#B7D4BE]';
    var CROP_CARD_IDLE = 'border-[1.5px] border-[#E5E7EB]';
    var CROP_CARD_ACTIVE = 'border-[1.5px] border-[#2D8A3E] shadow-[0_0_0_1px_#2D8A3E]';
    var SELECT_ARROW = 'background-image:url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%236B7280%27 stroke-width=%271.8%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E\')';

    function cropCard(crop, icon, name, desc, selected) {
        return '\
        <button type="button" class="calc-crop-card ' + CROP_CARD_BASE + ' ' + (selected ? CROP_CARD_ACTIVE : CROP_CARD_IDLE) + '" data-crop="' + crop + '" aria-pressed="' + (selected ? 'true' : 'false') + '">\
            <span class="calc-crop-check absolute top-2 right-2 ' + (selected ? 'inline-flex' : 'hidden') + ' items-center justify-center w-[18px] h-[18px] rounded-full bg-[#2D8A3E] text-white" aria-hidden="true">\
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>\
            </span>\
            <img class="w-[74px] h-auto object-contain mb-1" src="' + R + 'assets/img/' + icon + '" alt="">\
            <span class="text-lg max-md:text-base font-extrabold text-[#000000] leading-[1.1]">' + name + '</span>\
            <span class="text-sm font-medium text-[#9CA3AF] leading-snug">' + desc + '</span>\
        </button>';
    }

    function buildFarmFertilizerHtml() {
        var unitPyeong = tUi('unitPyeong');
        var lang = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        var defaultUnit = lang === 'ko' ? 'pyeong' : 'm2';
        function unitOpt(value, label) {
            return '<option value="' + value + '"' + (value === defaultUnit ? ' selected' : '') + '>' + label + '</option>';
        }
        return '\
<div class="mt-8">\
    <p class="mb-3 text-2xl max-lg:text-xl max-md:text-lg font-bold text-[#111111]">' + tUi('farmCropPrompt') + '</p>\
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-[10px]" data-calc-crops>\
        ' + cropCard('food', 'cu-01.png', tUi('cropFoodName'), tUi('cropFoodDesc'), true) + '\
        ' + cropCard('veg', 'cu-02.png', tUi('cropVegName'), tUi('cropVegDesc'), false) + '\
        ' + cropCard('fruit', 'cu-03.png', tUi('cropFruitName'), tUi('cropFruitDesc'), false) + '\
        ' + cropCard('green', 'cu-04.png', tUi('cropGreenName'), tUi('cropGreenDesc'), false) + '\
    </div>\
</div>\
<div class="mt-8">\
    <p class="mb-3 text-2xl max-lg:text-xl max-md:text-lg font-bold text-[#111111]">' + tUi('farmAreaPrompt') + '</p>\
    <div class="grid grid-cols-[1fr_118px] sm:grid-cols-[1fr_132px] gap-[10px]">\
        <div class="relative min-w-0">\
            <input type="text" class="w-full h-[52px] pl-4 pr-12 rounded-[16px] border-[1.5px] border-[#E5E7EB] bg-white text-lg max-md:text-base font-bold text-[#111111] outline-none focus:border-[#191F28] placeholder:text-[#B0B8C1] placeholder:font-semibold" id="calc-area-input" value="" placeholder="' + tUi('farmAreaPlaceholder') + '" inputmode="numeric" maxlength="7" aria-label="' + tUi('farmAreaAria') + '">\
            <button type="button" id="calc-area-reset" class="absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E5E8EB] text-[#6B7684] hover:bg-[#D1D6DB] transition-colors" aria-label="' + tUi('farmAreaResetAria') + '">\
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
            </button>\
        </div>\
        <select class="w-full min-w-0 h-[52px] pl-3 pr-8 rounded-[16px] border-[1.5px] border-[#E5E7EB] bg-white text-base max-md:text-sm font-bold text-[#111111] outline-none appearance-none cursor-pointer focus:border-[#191F28] bg-[length:12px_8px] bg-[right_12px_center] bg-no-repeat" style="background-image:url(\'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27%3E%3Cpath d=%27M1 1.5L6 6.5L11 1.5%27 stroke=%27%236B7280%27 stroke-width=%271.8%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E\')" id="calc-area-unit" aria-label="' + tUi('farmUnitAria') + '">\
            ' + unitOpt('pyeong', unitPyeong) + '\
            ' + unitOpt('m2', tUi('unitM2')) + '\
            ' + unitOpt('ha', tUi('unitHa')) + '\
        </select>\
    </div>\
    <p id="calc-area-limit-msg" class="hidden mt-2 text-[13px] font-semibold text-[#F04452]" role="status" aria-live="polite">' + tUi('farmAreaLimit') + '</p>\
    <div class="flex flex-wrap gap-2 mt-[10px]" data-calc-quick>\
        <button type="button" class="calc-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="1">+1' + unitPyeong + '</button>\
        <button type="button" class="calc-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="10">+10' + unitPyeong + '</button>\
        <button type="button" class="calc-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="100">+100' + unitPyeong + '</button>\
        <button type="button" class="calc-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="1000">+1,000' + unitPyeong + '</button>\
    </div>\
</div>\
<div class="mt-8">\
    <p class="mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('resultTitle') + '</p>\
    <div class="rounded-[16px] bg-[#F2F4F6] overflow-hidden">\
        <div class="flex items-center gap-4 px-5 py-[18px]">\
            <div class="flex-1 min-w-0">\
                <p class="mb-1.5 text-[13px] font-semibold text-[#4E5968]">' + tUi('farmBagsProductLine') + '</p>\
                <div class="flex items-baseline gap-1.5">\
                    <span class="text-[34px] font-bold tracking-tight text-[#2D8A3E] leading-none tabular-nums" id="calc-result-bags">0~0</span>\
                    <span class="text-[17px] font-semibold text-[#4E5968]">' + tUi('farmBagsUnit') + '</span>\
                </div>\
            </div>\
            <div class="w-[72px] shrink-0 aspect-[3/4] rounded-[8px] overflow-hidden bg-white p-2 box-border">\
                <img src="' + R + 'assets/img/or-01.png" alt="' + tUi('farmBagsImgAlt') + '" class="w-full h-full object-contain">\
            </div>\
        </div>\
        <div class="mx-5 h-px bg-[#E5E8EB]"></div>\
        <div class="flex items-center gap-4 px-5 py-[18px]">\
            <div class="flex-1 min-w-0">\
                <p class="mb-1.5 text-[13px] font-semibold text-[#4E5968]">' + tUi('farmVitaLine') + '</p>\
                <div class="flex items-baseline gap-1.5">\
                    <span class="text-[34px] font-bold tracking-tight text-[#2D8A3E] leading-none tabular-nums" id="calc-result-vita">0.0 ~ 0.0</span>\
                    <span class="text-[17px] font-semibold text-[#4E5968]">L</span>\
                </div>\
                <p class="mt-2 text-[13px] font-semibold text-[#4E5968]">' + tUi('farmVitaDilutionTip') + '</p>\
            </div>\
            <div class="w-[72px] shrink-0 aspect-[3/4] rounded-[8px] overflow-hidden bg-white p-2 box-border">\
                <img src="' + R + 'assets/img/vita-40.png" alt="' + tUi('farmVitaImgAlt') + '" class="w-full h-full object-contain">\
            </div>\
        </div>\
    </div>\
</div>';
    }

    function buildOrchardProfitHtml() {
        var areaUnit = isUsdMode() ? tUi('unitM2') : tUi('unitPyeong');
        var areaMax = getOrchardAreaMax();
        var usd = isUsdMode();
        var priceQuick1 = usd ? 10 : 10000;
        var priceQuick2 = usd ? 100 : 100000;
        return '\
<div class="mt-8">\
    <p class="mb-3 text-2xl max-lg:text-xl max-md:text-lg font-bold text-[#111111]">' + tUi('orchardAreaPrompt') + '</p>\
    <div class="relative">\
        <input type="text" class="w-full h-[52px] pl-4 pr-12 rounded-[16px] border-[1.5px] border-[#E5E7EB] bg-white text-lg max-md:text-base font-bold text-[#111111] outline-none focus:border-[#191F28] placeholder:text-[#B0B8C1] placeholder:font-semibold" id="orchard-area-input" value="" placeholder="' + tUi('orchardAreaPlaceholder') + '" inputmode="numeric" maxlength="7" aria-label="' + tUi('orchardAreaAria') + '">\
        <button type="button" id="orchard-area-reset" class="absolute top-1/2 right-3 -translate-y-1/2 hidden items-center justify-center w-7 h-7 rounded-full bg-[#E5E8EB] text-[#6B7684] hover:bg-[#D1D6DB] transition-colors" aria-label="' + tUi('orchardAreaResetAria') + '">\
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
        </button>\
    </div>\
    <p id="orchard-area-limit-msg" class="hidden mt-2 text-[13px] font-semibold text-[#F04452]" role="status" aria-live="polite">' + tUi('orchardAreaLimit', { n: areaMax.toLocaleString(localeTag()) }) + '</p>\
    <div class="flex flex-wrap gap-2 mt-[10px]" data-orchard-area-quick>\
        <button type="button" class="orchard-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="1">+1' + areaUnit + '</button>\
        <button type="button" class="orchard-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="10">+10' + areaUnit + '</button>\
        <button type="button" class="orchard-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="100">+100' + areaUnit + '</button>\
        <button type="button" class="orchard-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="1000">+1,000' + areaUnit + '</button>\
    </div>\
</div>\
<div class="mt-8">\
    <p class="mb-3 text-2xl max-lg:text-xl max-md:text-lg font-bold text-[#111111]">' + tUi('orchardPricePrompt') + '</p>\
    <div class="relative">\
        <input type="text" class="w-full h-[52px] pl-4 pr-12 rounded-[16px] border-[1.5px] border-[#E5E7EB] bg-white text-lg max-md:text-base font-bold text-[#111111] outline-none focus:border-[#191F28] placeholder:text-[#B0B8C1] placeholder:font-semibold" id="orchard-price-input" value="" placeholder="' + tUi('orchardPricePlaceholder') + '" inputmode="numeric" maxlength="10" aria-label="' + tUi('orchardPriceAria') + '">\
        <button type="button" id="orchard-price-reset" class="absolute top-1/2 right-3 -translate-y-1/2 hidden items-center justify-center w-7 h-7 rounded-full bg-[#E5E8EB] text-[#6B7684] hover:bg-[#D1D6DB] transition-colors" aria-label="' + tUi('orchardPriceResetAria') + '">\
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
        </button>\
    </div>\
    <p id="orchard-price-limit-msg" class="hidden mt-2 text-[13px] font-semibold text-[#F04452]" role="status" aria-live="polite">' + tUi('orchardPriceLimit') + '</p>\
    <div class="flex flex-wrap gap-2 mt-[10px]" data-orchard-price-quick>\
        <button type="button" class="orchard-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="' + priceQuick1 + '">' + tUi('orchardQuick1man') + '</button>\
        <button type="button" class="orchard-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="' + priceQuick2 + '">' + tUi('orchardQuick10man') + '</button>\
    </div>\
</div>\
<div class="mt-8">\
    <p class="mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('resultTitle') + '</p>\
    <div class="rounded-[16px] bg-[#F2F4F6] overflow-hidden">\
        <div class="px-5 py-5 sm:py-6">\
            <p class="mb-2 text-[13px] font-semibold text-[#4E5968]">' + tUi('orchardBoxesLabel') + '</p>\
            <div class="flex items-baseline gap-1.5">\
                <span class="text-[34px] font-bold tracking-tight text-[#2D8A3E] leading-none tabular-nums" id="orchard-result-boxes">0</span>\
                <span class="text-[17px] font-semibold text-[#4E5968]">' + tUi('orchardBoxesUnit') + '</span>\
            </div>\
        </div>\
        <div class="mx-5 h-px bg-[#E5E8EB]"></div>\
        <div class="px-5 py-5 sm:py-6">\
            <p class="mb-2 text-[13px] font-semibold text-[#4E5968]">' + tUi('orchardProfitLabel') + '</p>\
            <div class="flex items-baseline gap-1">\
                <span class="text-[34px] font-bold tracking-tight text-[#2D8A3E] leading-none tabular-nums" id="orchard-result-profit">+0</span>\
                <span class="text-[17px] font-semibold text-[#4E5968]">' + tUi('orchardWonUnit') + '</span>\
            </div>\
        </div>\
    </div>\
    <p class="mt-3 text-[12px] font-medium leading-relaxed text-[#8B95A1]">' + tUi('orchardNote') + '</p>\
</div>';
    }

    function buildVitaDilutionHtml() {
        var liter = tUi('vitaQuickLiter');
        return '\
<div class="mt-8">\
    <p class="mb-3 text-2xl max-lg:text-xl max-md:text-lg font-bold text-[#111111]">' + tUi('vitaWaterPrompt') + '</p>\
    <div class="relative">\
        <input type="text" class="w-full h-[52px] pl-4 pr-12 rounded-[16px] border-[1.5px] border-[#E5E7EB] bg-white text-lg max-md:text-base font-bold text-[#111111] outline-none focus:border-[#191F28] placeholder:text-[#B0B8C1] placeholder:font-semibold" id="vita-water-input" value="" placeholder="' + tUi('vitaWaterPlaceholder') + '" inputmode="numeric" maxlength="7" aria-label="' + tUi('vitaWaterAria') + '">\
        <button type="button" id="vita-water-reset" class="absolute top-1/2 right-3 -translate-y-1/2 hidden items-center justify-center w-7 h-7 rounded-full bg-[#E5E8EB] text-[#6B7684] hover:bg-[#D1D6DB] transition-colors" aria-label="' + tUi('vitaWaterResetAria') + '">\
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
        </button>\
    </div>\
    <p id="vita-water-limit-msg" class="hidden mt-2 text-[13px] font-semibold text-[#F04452]" role="status" aria-live="polite">' + tUi('vitaWaterLimit') + '</p>\
    <div class="flex flex-wrap gap-2 mt-[10px]" data-vita-water-quick>\
        <button type="button" class="vita-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="1">+1' + liter + '</button>\
        <button type="button" class="vita-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="10">+10' + liter + '</button>\
        <button type="button" class="vita-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="100">+100' + liter + '</button>\
        <button type="button" class="vita-quick-btn h-9 px-[14px] rounded-[8px] border-[1.5px] border-[#E5E7EB] bg-white text-[13px] font-bold text-[#111111] cursor-pointer transition-colors duration-200 hover:border-[#191F28] hover:bg-[#F2F4F6]" data-add="1000">+1,000' + liter + '</button>\
    </div>\
</div>\
<div class="mt-8">\
    <p class="mb-3 text-2xl max-lg:text-xl max-md:text-lg font-bold text-[#111111]">' + tUi('vitaDilutionPrompt') + '</p>\
    <select class="w-full h-[52px] pl-4 pr-9 rounded-[16px] border-[1.5px] border-[#E5E7EB] bg-white text-lg max-md:text-base font-bold text-[#111111] outline-none appearance-none cursor-pointer focus:border-[#191F28] bg-[length:12px_8px] bg-[right_14px_center] bg-no-repeat" style="' + SELECT_ARROW + '" id="vita-dilution-select" aria-label="' + tUi('vitaDilutionAria') + '">\
        <option value="500" selected>' + tUi('vitaOpt500') + '</option>\
        <option value="700">' + tUi('vitaOpt700') + '</option>\
        <option value="1000">' + tUi('vitaOpt1000') + '</option>\
    </select>\
</div>\
<div class="mt-8">\
    <p class="mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('resultTitle') + '</p>\
    <div class="rounded-[16px] bg-[#F2F4F6] overflow-hidden">\
        <div class="flex items-center gap-4 px-5 py-[18px]">\
            <div class="flex-1 min-w-0">\
                <p class="mb-1.5 text-[13px] font-semibold text-[#4E5968]">' + tUi('vitaResultLabel') + '</p>\
                <div class="flex items-baseline gap-1.5 flex-wrap">\
                    <span class="text-[34px] font-bold tracking-tight text-[#2D8A3E] leading-none tabular-nums" id="vita-result-ml">0</span>\
                    <span class="text-[17px] font-semibold text-[#4E5968]">ml</span>\
                    <span class="text-[13px] font-semibold text-[#8B95A1] tabular-nums" id="vita-result-floz">(0 fl oz)</span>\
                </div>\
                <p class="mt-2 text-[13px] font-semibold text-[#4E5968]" id="vita-result-hint">' + tUi('hintEmpty') + '</p>\
            </div>\
            <div class="w-[72px] shrink-0 aspect-[3/4] rounded-[8px] overflow-hidden bg-white p-2 box-border">\
                <img src="' + R + 'assets/img/vita-40.png" alt="' + tUi('vitaResultImgAlt') + '" class="w-full h-full object-contain">\
            </div>\
        </div>\
    </div>\
</div>';
    }

    var VITA_PRODUCT_META = {
        vita40: {
            nameKey: 'vita40Name',
            specKey: 'vita40SpecLine',
            descKey: 'vita40Desc',
            packageImage: 'assets/img/vita-40.png',
            msds: 'assets/msds/MSDS 생생비타 국문(KOR)-2026.05.pdf',
            msdsEn: 'assets/msds/MSDS SaengSaeng Vita (ENG)-2025.03.pdf',
            showDilutionCta: true
        },
        vitaGold: {
            nameKey: 'vitaGoldName',
            specKey: 'vitaGoldSpecLine',
            descKey: 'vitaGoldDesc',
            packageImage: 'assets/img/vita-01.png',
            msds: 'assets/msds/MSDS 생생비타 국문(KOR)-2026.05.pdf',
            msdsEn: 'assets/msds/MSDS SaengSaeng Vita (ENG)-2025.03.pdf',
            showDilutionCta: false
        }
    };

    function buildVitaProductDetailHtml(productKey) {
        var meta = VITA_PRODUCT_META[productKey] || VITA_PRODUCT_META.vita40;
        var productName = tUi(meta.nameKey);
        var nameTight = String(productName || '').replace(/\s+/g, '');
        var msdsHref = encodeAssetUrl(isCatalogIntl() && meta.msdsEn ? meta.msdsEn : meta.msds);
        var dilutionCtaHtml = meta.showDilutionCta
            ? '\
    <div class="vita-cta-wrap">\
        <a href="#" data-catalog-modal="vita-dilution" class="vita-cta-btn">' + tUi('ctaVitaDilution') + '</a>\
    </div>'
            : '\
    <div class="vita-product-modal-end" aria-hidden="true"></div>';
        return '\
<div class="space-y-9">\
    <section class="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">\
        <div class="flex-1 min-w-0 pt-1">\
            <p class="m-0 text-[14px] font-semibold text-[#8B95A1]">' + tUi(meta.specKey) + '</p>\
            <p class="mt-4 text-[17px] font-medium leading-relaxed text-[#4E5968]">' + tUi(meta.descKey) + '</p>\
            <a href="' + msdsHref + '" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-2 h-11 px-4 rounded-[12px] bg-[#191F28] text-white text-[14px] font-bold no-underline transition-colors hover:bg-[#111111]">\
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>\
                ' + tUi('msdsDownload') + '\
            </a>\
        </div>\
        <div class="w-full sm:w-[188px] shrink-0 rounded-[16px] bg-[#F2F4F6] p-5 box-border">\
            <img src="' + R + meta.packageImage + '" alt="' + productName + '" class="w-full h-auto object-contain mx-auto max-h-[200px]">\
        </div>\
    </section>\
\
    <section>\
        <h4 class="m-0 mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('compareTitleTpl', { name: nameTight }) + '</h4>\
        <div class="grid grid-cols-2 gap-2.5">\
            <div class="relative rounded-[16px] overflow-hidden bg-[#F2F4F6] aspect-[16/9]">\
                <img src="' + R + 'assets/img/before.jpg" alt="' + tUi('compareBefore') + '" class="absolute inset-0 w-full h-full object-cover">\
                <span class="absolute top-2 left-2 z-10 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white">' + tUi('aiImageBadge') + '</span>\
                <span class="vita-compare-label vita-compare-label--before">' + tUi('compareBefore') + '</span>\
            </div>\
            <div class="relative rounded-[16px] overflow-hidden bg-[#F2F4F6] aspect-[16/9]">\
                <img src="' + R + 'assets/img/after.jpg" alt="' + tUi('compareAfter') + '" class="absolute inset-0 w-full h-full object-cover">\
                <span class="absolute top-2 left-2 z-10 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white">' + tUi('aiImageBadge') + '</span>\
                <span class="vita-compare-label vita-compare-label--after">' + tUi('compareAfter') + '</span>\
            </div>\
        </div>\
        <div class="grid grid-cols-2 gap-2.5 mt-2.5">\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[13px] font-semibold text-[#8B95A1]">' + tUi('sugarRate') + '</p>\
                <p class="m-0 mt-1.5 text-[28px] font-extrabold tracking-tight text-[#2D8A3E] leading-none tabular-nums">28%</p>\
                <p class="m-0 mt-2 text-[13px] font-medium text-[#6B7684]">' + tUi('sugarNote') + '</p>\
            </div>\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[13px] font-semibold text-[#8B95A1]">' + tUi('dropRate') + '</p>\
                <p class="m-0 mt-1.5 text-[28px] font-extrabold tracking-tight text-[#2D8A3E] leading-none tabular-nums">66%</p>\
                <p class="m-0 mt-2 text-[13px] font-medium text-[#6B7684]">' + tUi('dropNote') + '</p>\
            </div>\
        </div>\
        <p class="m-0 mt-2.5 text-[12px] font-medium leading-relaxed text-[#8B95A1]">' + tUi('caseNote') + '</p>\
        <p class="m-0 mt-1 text-[12px] font-medium leading-relaxed text-[#8B95A1]">' + tUi('compareAiNote') + '</p>\
    </section>\
\
    <section>\
        <h4 class="m-0 mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('featuresTitle') + '</h4>\
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature1Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature1Desc') + '</p>\
            </div>\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature2Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature2Desc') + '</p>\
            </div>\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature3Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature3Desc') + '</p>\
            </div>\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature4Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature4Desc') + '</p>\
            </div>\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature5Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature5Desc') + '</p>\
            </div>\
            <div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature6Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature6Desc') + '</p>\
            </div>\
            <div class="sm:col-span-2 rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">\
                <p class="m-0 text-[15px] font-bold text-[#191F28]">' + tUi('feature7Title') + '</p>\
                <p class="m-0 mt-1.5 text-[13px] font-medium leading-snug text-[#6B7684]">' + tUi('feature7Desc') + '</p>\
            </div>\
        </div>\
    </section>\
\
    <section>\
        <h4 class="m-0 mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('methodTitleTpl', { name: nameTight }) + '</h4>\
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">\
            <button type="button" class="vita-method-card group relative block w-full aspect-[3/4] rounded-[16px] overflow-hidden border-0 p-0 cursor-pointer text-left">\
                <img src="' + R + 'assets/img/g-01.jpg" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">\
                <div class="vita-method-overlay absolute inset-0"></div>\
                <div class="vita-method-copy">\
                    <p class="m-0 text-[17px] font-extrabold leading-tight">' + tUi('method1Title') + '</p>\
                    <div class="vita-method-detail">\
                        <div>\
                            <p class="m-0 text-[13px] font-semibold leading-snug">' + tUi('method1Dose') + '</p>\
                            <p class="m-0 mt-1 text-[12px] font-medium text-white/85 leading-snug">' + tUi('method1Note') + '</p>\
                        </div>\
                    </div>\
                </div>\
            </button>\
            <button type="button" class="vita-method-card group relative block w-full aspect-[3/4] rounded-[16px] overflow-hidden border-0 p-0 cursor-pointer text-left">\
                <img src="' + R + 'assets/img/g-02.jpg" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">\
                <div class="vita-method-overlay absolute inset-0"></div>\
                <div class="vita-method-copy">\
                    <p class="m-0 text-[17px] font-extrabold leading-tight">' + tUi('method2Title') + '</p>\
                    <div class="vita-method-detail">\
                        <div>\
                            <p class="m-0 text-[13px] font-semibold leading-snug">' + tUi('method2Dose') + '</p>\
                            <p class="m-0 mt-1 text-[12px] font-medium text-white/85 leading-snug">' + tUi('method2Note') + '</p>\
                        </div>\
                    </div>\
                </div>\
            </button>\
            <button type="button" class="vita-method-card group relative block w-full aspect-[3/4] rounded-[16px] overflow-hidden border-0 p-0 cursor-pointer text-left">\
                <img src="' + R + 'assets/img/g-03.jpg" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">\
                <div class="vita-method-overlay absolute inset-0"></div>\
                <div class="vita-method-copy">\
                    <p class="m-0 text-[17px] font-extrabold leading-tight">' + tUi('method3Title') + '</p>\
                    <div class="vita-method-detail">\
                        <div>\
                            <p class="m-0 text-[13px] font-semibold leading-snug">' + tUi('method3Dose') + '</p>\
                            <p class="m-0 mt-1 text-[12px] font-medium text-white/85 leading-snug">' + tUi('method3Note') + '</p>\
                        </div>\
                    </div>\
                </div>\
            </button>\
        </div>\
    </section>\
\
    <section>\
        <h4 class="m-0 mb-3 text-[17px] font-bold text-[#191F28]">' + tUi('interviewTitle') + '</h4>\
        <article class="rounded-[16px] bg-[#F2F4F6] px-4 py-5 sm:px-5">\
            <div class="flex items-center gap-3">\
                <div class="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-[#E5E8EB]">\
                    <img src="' + R + 'assets/img/profile.jpg" alt="' + tUi('interviewFarmName') + '" class="w-full h-full object-cover">\
                </div>\
                <div class="min-w-0">\
                    <p class="m-0 text-[14px] font-bold text-[#191F28]">' + tUi('interviewFarmName') + '</p>\
                    <p class="m-0 text-[12px] font-medium text-[#8B95A1]">' + tUi('interviewFarmMeta') + '</p>\
                </div>\
                <div class="ml-auto text-[#F5A524] text-[13px] tracking-tight" aria-label="' + tUi('interviewStarAria') + '">★★★★★</div>\
            </div>\
            <div class="mt-4">\
                <div class="py-3.5 border-b border-[#E5E8EB]">\
                    <p class="m-0 text-[16px] font-extrabold text-[#191F28] leading-snug">' + tUi('interviewQ1') + '</p>\
                    <p class="m-0 mt-1.5 text-[14px] font-medium leading-relaxed text-[#4E5968]">' + tUi('interviewA1') + '</p>\
                </div>\
                <div class="py-3.5 border-b border-[#E5E8EB]">\
                    <p class="m-0 text-[16px] font-extrabold text-[#191F28] leading-snug">' + tUi('interviewQ2') + '</p>\
                    <p class="m-0 mt-1.5 text-[14px] font-medium leading-relaxed text-[#4E5968]">' + tUi('interviewA2') + '</p>\
                </div>\
                <p class="m-0 pt-3.5 text-[12px] font-medium leading-relaxed text-[#8B95A1]">' + tUi('interviewNote') + '</p>\
            </div>\
        </article>\
    </section>\
' + dilutionCtaHtml + '\
</div>';
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    var SOIL_ICON_PATHS = {
        flask: '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
        sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-.9 1.6-2.1 1.9-3.6-2.7.1-4 1-5.1 1z"/>',
        sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
        calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
        clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
        droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
        leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
        shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
        plant: '<path d="M7 20h10"/><path d="M12 20V10"/><path d="M12 14c2.5-1.5 4-4 4-7 0 0-3 1-4 3"/><path d="M12 14c-2.5-1.5-4-4-4-7 0 0 3 1 4 3"/>',
        scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
        beaker: '<path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/>',
        check: '<polyline points="20 6 9 17 4 12"/>'
    };

    function soilIconSvg(name, size) {
        size = size || 18;
        var path = SOIL_ICON_PATHS[name] || SOIL_ICON_PATHS.leaf;
        return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
    }

    function renderSoilSectionTitle(title) {
        return '<h4 class="m-0 mb-3 text-[17px] font-bold text-[#191F28]">' + escapeHtml(title) + '</h4>';
    }

    function renderIconBulletList(items, icons) {
        var list = Array.isArray(items) ? items : [];
        var iconList = Array.isArray(icons) ? icons : [];
        var html = '<ul class="m-0 p-0 list-none space-y-2.5">';
        list.forEach(function (item, index) {
            var icon = iconList[index] || 'leaf';
            var text = typeof item === 'string' ? item : String(item || '');
            html += '' +
                '<li class="flex gap-3 items-start rounded-[16px] bg-[#F2F4F6] px-3.5 py-3.5">' +
                    '<span class="inline-flex items-center justify-center w-9 h-9 rounded-[12px] bg-white text-[#2D8A3E] shrink-0 mt-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">' + soilIconSvg(icon, 17) + '</span>' +
                    '<p class="m-0 text-[14px] font-medium leading-relaxed text-[#4E5968] pt-1">' + escapeHtml(text) + '</p>' +
                '</li>';
        });
        html += '</ul>';
        return html;
    }

    function renderNumberedList(items) {
        var list = Array.isArray(items) ? items : [];
        var html = '<ol class="m-0 p-0 list-none space-y-2.5">';
        list.forEach(function (item, index) {
            var num = String(index + 1).padStart(2, '0');
            html += '' +
                '<li class="flex gap-3 items-start rounded-[16px] bg-[#F2F4F6] px-3.5 py-3.5">' +
                    '<span class="inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-[12px] bg-white text-[#2D8A3E] text-[13px] font-extrabold shrink-0 mt-0.5">' + num + '</span>' +
                    '<p class="m-0 text-[14px] font-medium leading-relaxed text-[#4E5968] pt-1">' + escapeHtml(item) + '</p>' +
                '</li>';
        });
        html += '</ol>';
        return html;
    }

    function renderFaqList(items) {
        var list = Array.isArray(items) ? items : [];
        var html = '<div class="space-y-2.5">';
        list.forEach(function (item) {
            var q = '';
            var a = '';
            if (typeof item === 'string') {
                var parts = item.split(/\s*[—–-]\s*/);
                q = parts[0] || item;
                a = parts.slice(1).join(' — ') || '';
            } else if (item && typeof item === 'object') {
                q = item.q || item.question || item.질문 || '';
                a = item.a || item.answer || item.답변 || '';
            }
            html += '' +
                '<div class="rounded-[16px] bg-[#F2F4F6] px-3.5 py-3.5">' +
                    '<p class="m-0 text-[14px] font-bold leading-snug text-[#191F28]">' + escapeHtml(q) + '</p>' +
                    (a ? '<p class="m-0 mt-1.5 text-[14px] font-medium leading-relaxed text-[#4E5968]">' + escapeHtml(a) + '</p>' : '') +
                '</div>';
        });
        html += '</div>';
        return html;
    }

    function renderBulletList(items) {
        var list = Array.isArray(items) ? items : [];
        var html = '<ul class="m-0 p-0 list-none space-y-2.5">';
        list.forEach(function (item) {
            html += '' +
                '<li class="flex gap-3 items-start rounded-[16px] bg-[#F2F4F6] px-3.5 py-3.5">' +
                    '<span class="inline-flex items-center justify-center min-w-[28px] h-9 text-[#2D8A3E] text-[18px] font-extrabold shrink-0 mt-0.5" aria-hidden="true">·</span>' +
                    '<p class="m-0 text-[14px] font-medium leading-relaxed text-[#4E5968] pt-1">' + escapeHtml(item) + '</p>' +
                '</li>';
        });
        html += '</ul>';
        return html;
    }

    function renderBenefitBento(items) {
        var list = Array.isArray(items) ? items : [];
        var html = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">';
        list.forEach(function (item) {
            var title = item.headline || item.제목 || '';
            var desc = item.desc || item.설명 || '';
            html += '' +
                '<div class="rounded-[16px] bg-[#F2F4F6] px-4 py-4">' +
                    '<p class="m-0 text-[15px] font-bold text-[#191F28] leading-snug">' + escapeHtml(title) + '</p>' +
                    (desc ? '<p class="m-0 mt-1.5 text-[13px] font-medium leading-relaxed text-[#6B7684]">' + escapeHtml(desc) + '</p>' : '') +
                '</div>';
        });
        html += '</div>';
        return html;
    }

    function renderSoilBenefits(items, icons) {
        var list = Array.isArray(items) ? items : [];
        if (!list.length) return '';
        if (typeof list[0] === 'object' && list[0] !== null) {
            return renderBenefitBento(list);
        }
        return renderIconBulletList(list, icons);
    }

    function renderSoilStatBlock(item) {
        item = item || {};
        var value = item.수치 || '3년';
        var caption = item.캡션 || '1회 시비 지속효과';
        var sub = item.보조 || item.stat_highlight || '';
        return '' +
            '<div class="rounded-[16px] bg-[#EAF6EE] px-5 py-5 flex items-center gap-4">' +
                '<p class="m-0 text-[40px] font-extrabold tracking-tight leading-none text-[#2D8A3E] tabular-nums shrink-0">' + escapeHtml(value) + '</p>' +
                '<div class="min-w-0">' +
                    '<p class="m-0 text-[15px] font-bold text-[#191F28]">' + escapeHtml(caption) + '</p>' +
                    (sub ? '<p class="m-0 mt-1 text-[13px] font-medium leading-relaxed text-[#6B7684]">' + escapeHtml(sub) + '</p>' : '') +
                '</div>' +
            '</div>';
    }

    function renderSoilMethodList(items) {
        var list = Array.isArray(items) ? items : [];
        var html = '<div class="space-y-2.5">';
        list.forEach(function (item, index) {
            if (item && typeof item === 'object' && (item.stat_highlight || item.수치)) {
                html += renderSoilStatBlock(item);
                return;
            }
            var icons = ['scale', 'clipboard', 'sprout', 'leaf', 'beaker', 'plant'];
            html += '' +
                '<div class="flex gap-3 items-start rounded-[16px] bg-[#F2F4F6] px-3.5 py-3.5">' +
                    '<span class="inline-flex items-center justify-center w-9 h-9 rounded-[12px] bg-white text-[#2D8A3E] shrink-0 mt-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">' + soilIconSvg(icons[index % icons.length], 17) + '</span>' +
                    '<p class="m-0 text-[14px] font-medium leading-relaxed text-[#4E5968] pt-1">' + escapeHtml(item) + '</p>' +
                '</div>';
        });
        html += '</div>';
        return html;
    }

    function renderUsageTags(text) {
        var parts = String(text || '').split(/,|·/).map(function (part) {
            return part.trim();
        }).filter(Boolean);
        return parts.map(function (tag) {
            return '<span class="inline-flex items-center px-2.5 py-1.5 rounded-[10px] border border-[#D1D5DB] bg-transparent text-[13px] font-semibold text-[#191F28]">' + escapeHtml(tag) + '</span>';
        }).join('');
    }

    function renderUsageChecklist(items) {
        var list = Array.isArray(items) ? items : [];
        var html = '<ul class="m-0 p-0 list-none space-y-2.5">';
        list.forEach(function (item) {
            html += '' +
                '<li class="flex gap-3 items-start rounded-[16px] bg-[#F2F4F6] px-3.5 py-3.5">' +
                    '<span class="inline-flex items-center justify-center w-9 h-9 rounded-[12px] bg-white text-[#2D8A3E] shrink-0 mt-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">' + soilIconSvg('check', 17) + '</span>' +
                    '<p class="m-0 text-[14px] font-medium leading-relaxed text-[#4E5968] pt-1">' + escapeHtml(item) + '</p>' +
                '</li>';
        });
        html += '</ul>';
        return html;
    }

    function renderUsageIconPills(items) {
        var list = Array.isArray(items) ? items : [];
        return list.map(function (item) {
            var label = item.label || '';
            var detail = item.detail || '';
            return '' +
                '<button type="button" class="soil-usage-pill inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] border border-[#D1D5DB] bg-transparent text-[13px] font-semibold text-[#191F28] cursor-pointer relative" data-tip="' + escapeHtml(detail) + '" aria-label="' + escapeHtml(label + (detail ? '. ' + detail : '')) + '">' +
                    '<span class="material-symbols-outlined soil-usage-pill__icon" aria-hidden="true">' + escapeHtml(item.icon || 'spa') + '</span>' +
                    '<span>' + escapeHtml(label) + '</span>' +
                '</button>';
        }).join('');
    }

    function renderSoilUsage(usage) {
        if (Array.isArray(usage) && usage.length && usage[0] && typeof usage[0] === 'object' && usage[0].label) {
            return '<div class="flex flex-wrap gap-2">' + renderUsageIconPills(usage) + '</div>';
        }
        if (Array.isArray(usage)) {
            return renderUsageChecklist(usage);
        }
        return '<div class="flex flex-wrap gap-2">' + renderUsageTags(usage) + '</div>';
    }

    function ensureMaterialSymbols() {
        if (document.querySelector('link[data-catalog-material-symbols]')) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap';
        link.setAttribute('data-catalog-material-symbols', '1');
        document.head.appendChild(link);
    }

    var soilFloatingTip = null;
    var soilFloatingTipPill = null;

    function ensureSoilFloatingTip() {
        if (soilFloatingTip) return soilFloatingTip;
        soilFloatingTip = document.createElement('div');
        soilFloatingTip.className = 'soil-usage-floating-tip';
        soilFloatingTip.setAttribute('role', 'tooltip');
        document.body.appendChild(soilFloatingTip);
        return soilFloatingTip;
    }

    function hideSoilFloatingTip() {
        if (!soilFloatingTip) return;
        soilFloatingTip.classList.remove('is-visible', 'is-below');
        soilFloatingTip.textContent = '';
        soilFloatingTipPill = null;
        if (bodyEl) {
            Array.prototype.forEach.call(bodyEl.querySelectorAll('.soil-usage-pill.is-open'), function (el) {
                el.classList.remove('is-open');
            });
        }
    }

    function positionSoilFloatingTip(pill) {
        var tip = ensureSoilFloatingTip();
        var text = pill.getAttribute('data-tip') || '';
        if (!text) {
            hideSoilFloatingTip();
            return;
        }

        tip.textContent = text;
        tip.classList.add('is-visible');
        tip.classList.remove('is-below');
        tip.style.left = '0px';
        tip.style.top = '0px';
        tip.style.visibility = 'hidden';

        var rect = pill.getBoundingClientRect();
        var tipRect = tip.getBoundingClientRect();
        var gap = 10;
        var left = rect.left + (rect.width / 2) - (tipRect.width / 2);
        var top = rect.top - tipRect.height - gap;

        if (top < 8) {
            top = rect.bottom + gap;
            tip.classList.add('is-below');
        }

        left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
        tip.style.left = Math.round(left) + 'px';
        tip.style.top = Math.round(top) + 'px';
        tip.style.visibility = 'visible';
        soilFloatingTipPill = pill;
    }

    function bindSoilUsageTooltips() {
        if (!bodyEl) return;
        var pills = bodyEl.querySelectorAll('.soil-usage-pill');
        if (!pills.length) return;

        hideSoilFloatingTip();

        Array.prototype.forEach.call(pills, function (pill) {
            pill.addEventListener('mouseenter', function () {
                positionSoilFloatingTip(pill);
            });
            pill.addEventListener('mouseleave', function () {
                if (!pill.classList.contains('is-open')) hideSoilFloatingTip();
            });
            pill.addEventListener('focus', function () {
                positionSoilFloatingTip(pill);
            });
            pill.addEventListener('blur', function () {
                if (!pill.classList.contains('is-open')) hideSoilFloatingTip();
            });
            pill.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var wasOpen = pill.classList.contains('is-open');
                Array.prototype.forEach.call(bodyEl.querySelectorAll('.soil-usage-pill.is-open'), function (el) {
                    el.classList.remove('is-open');
                });
                if (wasOpen) {
                    hideSoilFloatingTip();
                } else {
                    pill.classList.add('is-open');
                    positionSoilFloatingTip(pill);
                }
            });
        });
    }

    function renderSoilWarning(text) {
        if (!text) return '';
        var body = '';
        if (Array.isArray(text)) {
            body = renderBulletList(text);
        } else {
            body = '<p class="m-0 mt-1.5 text-[14px] font-medium leading-relaxed text-[#6B5320]">' + escapeHtml(text) + '</p>';
        }
        return '' +
            '<div class="rounded-[16px] border border-[#E8C56A] bg-[#FFF8E8] px-4 py-3.5">' +
                '<p class="m-0 text-[12px] font-extrabold tracking-[0.04em] uppercase text-[#9A6B00]">' + escapeHtml(tUi('warning')) + '</p>' +
                body +
            '</div>';
    }

    function modalTableTh(text) {
        return '<th class="catalog-modal-table__th">' + escapeHtml(text) + '</th>';
    }

    function modalTableTd(text, opts) {
        opts = opts || {};
        var cls = 'catalog-modal-table__td' + (opts.left ? ' catalog-modal-table__td--left' : '');
        var attr = ' class="' + cls + '"';
        if (opts.rowspan) attr += ' rowspan="' + opts.rowspan + '"';
        if (opts.colspan) attr += ' colspan="' + opts.colspan + '"';
        return '<td' + attr + '>' + escapeHtml(text) + '</td>';
    }

    function renderModalTableWrap(tableHtml) {
        return '<div class="catalog-modal-table-wrap">' + tableHtml + '</div>';
    }

    function renderVitaGoldOrderedList(items) {
        var list = Array.isArray(items) ? items : [];
        if (!list.length) return '';
        var html = '<ol class="m-0 pl-4 space-y-1.5 list-decimal marker:font-bold">';
        list.forEach(function (item) {
            html += '<li>' + escapeHtml(item) + '</li>';
        });
        return html + '</ol>';
    }

    function renderVitaGoldKeyColumn(title, bodyHtml) {
        return '' +
            '<div class="vita-gold-key-col">' +
                '<div class="vita-gold-key-col__head">' +
                    '<p class="m-0 text-[14px] font-bold leading-snug">' + escapeHtml(title) + '</p>' +
                '</div>' +
                '<div class="vita-gold-key-col__body">' +
                    bodyHtml +
                '</div>' +
            '</div>';
    }

    function renderVitaGoldKeyGrid() {
        var key2Parts = tUiRaw('vitaGoldKey2Parts') || [];
        var key2Html = '';
        key2Parts.forEach(function (part) {
            if (!part) return;
            key2Html += '<p class="m-0 mt-2 first:mt-0"><span class="font-bold text-[#191F28]">' + escapeHtml(part.label || '') + '</span> ' + escapeHtml(part.text || '') + '</p>';
        });
        var key3Lines = tUiRaw('vitaGoldKey3Lines') || [];
        var key3Html = '';
        key3Lines.forEach(function (line, idx) {
            key3Html += '<p class="m-0' + (idx ? ' mt-2' : '') + '">' + escapeHtml(line) + '</p>';
        });
        var keyGridClass = isCatalogLatin()
            ? 'vita-gold-key-grid vita-gold-key-grid--en grid grid-cols-1 md:grid-cols-2'
            : 'vita-gold-key-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';
        return '' +
            '<div class="' + keyGridClass + '">' +
                renderVitaGoldKeyColumn(tUi('vitaGoldKey1Title'), renderVitaGoldOrderedList(tUiRaw('vitaGoldKey1Items'))) +
                renderVitaGoldKeyColumn(tUi('vitaGoldKey2Title'), key2Html) +
                renderVitaGoldKeyColumn(tUi('vitaGoldKey3Title'), key3Html) +
                renderVitaGoldKeyColumn(tUi('vitaGoldKey4Title'), renderVitaGoldOrderedList(tUiRaw('vitaGoldKey4Items'))) +
            '</div>';
    }

    function renderVitaGoldCompositionTable() {
        var table = '' +
            '<table class="catalog-modal-table">' +
                '<thead><tr>' +
                    modalTableTh(tUi('vitaGoldCompColNpk')) +
                    modalTableTh(tUi('vitaGoldCompColAmino')) +
                    modalTableTh(tUi('vitaGoldCompColOrganic')) +
                    modalTableTh(tUi('vitaGoldCompColMicro')) +
                    modalTableTh(tUi('vitaGoldCompColFunc')) +
                '</tr></thead>' +
                '<tbody><tr>' +
                    modalTableTd(tUi('vitaGoldCompNpk')) +
                    modalTableTd(tUi('vitaGoldCompAmino')) +
                    modalTableTd(tUi('vitaGoldCompOrganic')) +
                    modalTableTd(tUi('vitaGoldCompMicro'), { left: true }) +
                    modalTableTd(tUi('vitaGoldCompFunc'), { left: true }) +
                '</tr></tbody>' +
            '</table>' +
            '<p class="catalog-modal-table__note">✔ ' + escapeHtml(tUi('vitaGoldCompGuarantee')) + '</p>';
        return renderModalTableWrap(table);
    }

    function renderVitaGoldDoseTable() {
        var table = '' +
            '<table class="catalog-modal-table">' +
                '<thead><tr>' +
                    modalTableTh(tUi('vitaGoldDoseH1')) +
                    modalTableTh(tUi('vitaGoldDoseH2')) +
                    modalTableTh(tUi('vitaGoldDoseH3')) +
                    modalTableTh(tUi('vitaGoldDoseH4')) +
                    modalTableTh(tUi('vitaGoldDoseH5')) +
                    modalTableTh(tUi('vitaGoldDoseH6')) +
                '</tr></thead>' +
                '<tbody>' +
                    '<tr>' +
                        modalTableTd(tUi('vitaGoldDoseCrop'), { rowspan: 4 }) +
                        modalTableTd(tUi('vitaGoldDoseSeason'), { rowspan: 4 }) +
                        modalTableTd(tUi('vitaGoldDoseMethodDrench'), { rowspan: 2 }) +
                        modalTableTd(tUi('vitaGoldDoseRatio500Mid')) +
                        modalTableTd(tUi('vitaGoldDoseMix500DrenchMid')) +
                        modalTableTd(tUi('vitaGoldDoseArea500DrenchMid')) +
                    '</tr>' +
                    '<tr>' +
                        modalTableTd(tUi('vitaGoldDoseRatio1000Early')) +
                        modalTableTd(tUi('vitaGoldDoseMix1000DrenchEarly')) +
                        modalTableTd(tUi('vitaGoldDoseArea1000DrenchEarly')) +
                    '</tr>' +
                    '<tr>' +
                        modalTableTd(tUi('vitaGoldDoseMethodFoliar'), { rowspan: 2 }) +
                        modalTableTd(tUi('vitaGoldDoseRatio500Mid')) +
                        modalTableTd(tUi('vitaGoldDoseMix500FoliarMid')) +
                        modalTableTd('—') +
                    '</tr>' +
                    '<tr>' +
                        modalTableTd(tUi('vitaGoldDoseRatio1000Early')) +
                        modalTableTd(tUi('vitaGoldDoseMix1000FoliarEarly')) +
                        modalTableTd('—') +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
            '<p class="catalog-modal-table__note">✔ ' + escapeHtml(tUi('vitaGoldDoseNote')) + '</p>' +
            '<p class="catalog-modal-table__note">✔ ' + escapeHtml(tUi('vitaGoldDoseHaNote')) + '</p>';
        return renderModalTableWrap(table);
    }

    function renderVitaGoldCropTable() {
        var groups = tUiRaw('vitaGoldCropGroups') || [];
        var body = '';
        groups.forEach(function (group) {
            var entries = Array.isArray(group.entries) ? group.entries : [];
            entries.forEach(function (entry, index) {
                body += '<tr>';
                if (index === 0) {
                    body += modalTableTd(group.crop || '', { rowspan: entries.length, left: true });
                }
                body += modalTableTd(entry.timing || '', { left: true });
                body += modalTableTd(entry.freq || '');
                body += modalTableTd(entry.effect || '', { left: true });
                body += '</tr>';
            });
        });
        var table = '' +
            '<table class="catalog-modal-table">' +
                '<thead><tr>' +
                    modalTableTh(tUi('vitaGoldCropColCrop')) +
                    modalTableTh(tUi('vitaGoldCropColTiming')) +
                    modalTableTh(tUi('vitaGoldCropColFreq')) +
                    modalTableTh(tUi('vitaGoldCropColEffect')) +
                '</tr></thead>' +
                '<tbody>' + body + '</tbody>' +
            '</table>';
        return renderModalTableWrap(table);
    }

    function buildVitaGoldProductDetailHtml() {
        var meta = VITA_PRODUCT_META.vitaGold;
        var productName = tUi(meta.nameKey);
        var msdsHref = encodeAssetUrl(isCatalogIntl() && meta.msdsEn ? meta.msdsEn : meta.msds);
        var rootClass = 'space-y-9 vita-gold-detail' + (isCatalogLatin() ? ' vita-gold-detail--en' : '');
        return '' +
            '<div class="' + rootClass + '">' +
                '<section class="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">' +
                    '<div class="flex-1 min-w-0 pt-1">' +
                        '<p class="m-0 text-[14px] font-semibold text-[#8B95A1]">' + tUi(meta.specKey) + '</p>' +
                        '<p class="mt-4 text-[17px] font-medium leading-relaxed text-[#4E5968]">' + tUi(meta.descKey) + '</p>' +
                        '<a href="' + msdsHref + '" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-2 h-11 px-4 rounded-[12px] bg-[#191F28] text-white text-[14px] font-bold no-underline transition-colors hover:bg-[#111111]">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
                            tUi('msdsDownload') +
                        '</a>' +
                    '</div>' +
                    '<div class="w-full sm:w-[188px] shrink-0 rounded-[16px] bg-[#F2F4F6] p-5 box-border">' +
                        '<img src="' + R + meta.packageImage + '" alt="' + escapeHtml(productName) + '" class="w-full h-auto object-contain mx-auto max-h-[200px]">' +
                    '</div>' +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldWhyTitle')) +
                    renderUsageChecklist(tUiRaw('vitaGoldWhyItems')) +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldKeysTitle')) +
                    renderVitaGoldKeyGrid() +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldCompositionTitle')) +
                    renderVitaGoldCompositionTable() +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldDoseTitle')) +
                    renderVitaGoldDoseTable() +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldCropTableTitle')) +
                    renderVitaGoldCropTable() +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldTipsTitle')) +
                    renderUsageChecklist(tUiRaw('vitaGoldTipsItems')) +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('vitaGoldPrecautionTitle')) +
                    renderNumberedList(tUiRaw('vitaGoldPrecautionItems')) +
                '</section>' +
                '<div class="vita-product-modal-end" aria-hidden="true"></div>' +
            '</div>';
    }

    function encodeAssetUrl(relativePath) {
        var parts = String(relativePath || '').split('/');
        var file = parts.pop();
        return R + parts.join('/') + '/' + encodeURIComponent(file);
    }

    var HEUKDORAM_PRESCRIPTION_URL = 'https://soil.rda.go.kr/sibi/cropSibiPrescript.do';

    function buildSoilProductDetailHtml(data, options) {
        data = data || {};
        options = options || {};
        var specs = Array.isArray(data.규격) ? data.규격 : [];
        var packageShot = data.이미지 && data.이미지.package_shot ? R + data.이미지.package_shot : '';
        var sampleShot = data.이미지 && data.이미지.sample_shot ? R + data.이미지.sample_shot : '';
        var msdsHref = data.MSDS ? encodeAssetUrl(data.MSDS) : '';
        var specCols = specs.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : (specs.length >= 4
                ? 'grid-cols-2 sm:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-3');
        var timingItems = Array.isArray(data.사용시기_결핍진단) && data.사용시기_결핍진단.length
            ? data.사용시기_결핍진단
            : data.사용시기;
        var timingTitle = Array.isArray(data.사용시기_결핍진단) && data.사용시기_결핍진단.length
            ? tUi('sectionTimingDef')
            : tUi('sectionTiming');
        var methodTitle = data.섹션제목_사용방법 || tUi('sectionMethod');
        var stdDoseItems = Array.isArray(data.표준시비량)
            ? data.표준시비량
            : (data.표준시비량 ? [data.표준시비량] : []);
        var featureItems = Array.isArray(data.특징) ? data.특징 : [];
        var benefitItems = Array.isArray(data.효능) ? data.효능 : [];
        var listingItems = Array.isArray(data.유기농업자재표시사항) ? data.유기농업자재표시사항 : [];
        var storagePrecautions = Array.isArray(data.주의사항_목록) ? data.주의사항_목록 : [];
        var recommendItems = Array.isArray(data.추천_목록) ? data.추천_목록 : [];
        var faqItems = Array.isArray(data.FAQ_목록) ? data.FAQ_목록 : [];

        var specCards = specs.map(function (item) {
            return '' +
                '<div class="rounded-[16px] bg-[#F2F4F6] px-4 py-[18px]">' +
                    '<p class="m-0 text-[13px] font-semibold text-[#8B95A1]">' + escapeHtml(item.label) + '</p>' +
                    '<p class="m-0 mt-2 text-[28px] font-extrabold tracking-tight text-black leading-none tabular-nums">' + escapeHtml(item.value) + '</p>' +
                '</div>';
        }).join('');

        var packageBlock = packageShot
            ? '<img src="' + packageShot + '" alt="' + escapeHtml(data.제품명) + '" class="w-full h-auto object-contain mx-auto max-h-[200px]">'
            : '<div class="w-full aspect-[3/4] rounded-[12px] bg-[#E5E8EB] flex items-center justify-center text-[13px] font-semibold text-[#8B95A1]">' + escapeHtml(tUi('imageSoon')) + '</div>';

        var sampleBlock = sampleShot
            ? '<img src="' + sampleShot + '" alt="' + escapeHtml(data.제품명) + escapeHtml(tUi('sampleAltSuffix')) + '" class="soil-sample-shot">'
            : '';

        var msdsButton = msdsHref
            ? '<a href="' + msdsHref + '" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-2 h-11 px-4 rounded-[12px] bg-[#191F28] text-white text-[14px] font-bold no-underline transition-colors hover:bg-[#111111]">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
                tUi('msdsDownload') +
              '</a>'
            : '';

        return '' +
            '<div class="space-y-9">' +
                '<section class="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">' +
                    '<div class="flex-1 min-w-0 pt-1">' +
                        '<p class="m-0 text-[17px] font-medium leading-relaxed text-[#4E5968]">' + escapeHtml(data.서브타이틀) + '</p>' +
                        (data.공시번호
                            ? '<p class="m-0 mt-3 text-[15px] font-bold text-[#154624]">' + escapeHtml(data.공시번호) + '</p>'
                            : '') +
                        msdsButton +
                    '</div>' +
                    '<div class="soil-package-wrap relative w-full sm:w-[188px] shrink-0 rounded-[16px] bg-[#F2F4F6] p-5 box-border">' +
                        packageBlock +
                        sampleBlock +
                    '</div>' +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('sectionSpec')) +
                    '<div class="grid ' + specCols + ' gap-2.5">' + specCards + '</div>' +
                    (data.규격_보충설명
                        ? '<p class="m-0 mt-2.5 text-[13px] font-medium text-[#6B7684]">' + escapeHtml(data.규격_보충설명) + '</p>'
                        : '') +
                '</section>' +
                '<section>' +
                    renderSoilSectionTitle(tUi('sectionUsage')) +
                    renderSoilUsage(data.주요사용처) +
                '</section>' +
                (featureItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(tUi('sectionFeatures')) +
                        renderNumberedList(featureItems) +
                      '</section>'
                    : '') +
                (benefitItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(tUi('sectionBenefits')) +
                        renderSoilBenefits(benefitItems, ['flask', 'droplet', 'leaf', 'sun', 'shield', 'plant']) +
                      '</section>'
                    : '') +
                (timingItems && timingItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(timingTitle) +
                        renderNumberedList(timingItems) +
                      '</section>'
                    : '') +
                (Array.isArray(data.사용방법) && data.사용방법.length
                    ? '<section>' +
                        renderSoilSectionTitle(methodTitle) +
                        renderNumberedList(data.사용방법) +
                      '</section>'
                    : '') +
                (stdDoseItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(tUi('sectionStdDose')) +
                        renderNumberedList(stdDoseItems) +
                      '</section>'
                    : '') +
                (recommendItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(data.섹션제목_추천 || tUi('sectionRecommend')) +
                        renderNumberedList(recommendItems) +
                      '</section>'
                    : '') +
                (faqItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(data.섹션제목_FAQ || tUi('sectionFaq')) +
                        renderFaqList(faqItems) +
                      '</section>'
                    : '') +
                (storagePrecautions.length
                    ? '<section>' +
                        renderSoilSectionTitle(tUi('sectionPrecautionStorage')) +
                        renderNumberedList(storagePrecautions) +
                      '</section>'
                    : '') +
                (listingItems.length
                    ? '<section>' +
                        renderSoilSectionTitle(tUi('sectionOrganicListing')) +
                        renderNumberedList(listingItems) +
                      '</section>'
                    : '') +
                (data.주의사항_경고배지 ? '<section>' + renderSoilWarning(data.주의사항_경고배지) + '</section>' : '') +
                (options.hideCta
                    ? ''
                    : '<div class="vita-cta-wrap">' +
                        (options.heukdoramCta
                            ? '<a href="' + HEUKDORAM_PRESCRIPTION_URL + '" target="_blank" rel="noopener noreferrer" class="vita-cta-btn">' + escapeHtml(tUi('ctaHeukdoram')) + '</a>'
                            : '<a href="#" data-catalog-modal="farm-fertilizer" class="vita-cta-btn">' + tUi('ctaFarmCalc') + '</a>') +
                      '</div>') +
            '</div>';
    }
    function resolveModalBody(data) {
        if (!data) return '';
        if (typeof data.getBody === 'function') {
            if (data.body == null) data.body = data.getBody();
            return data.body || '';
        }
        return data.body || '';
    }

    function clearModalBodyCaches() {
        Object.keys(MODALS).forEach(function (id) {
            if (MODALS[id]) MODALS[id].body = null;
        });
    }

    function productModalTitle(name) {
        return '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold">' + escapeHtml(name || '') + '</span>';
    }

    var MODALS = {
        'farm-fertilizer': {
            getTitle: function () { return tUi('farmTitle'); },
            getBody: function () { return buildFarmFertilizerHtml(); }
        },
        'orchard-profit': {
            getTitle: function () { return tUi('orchardTitle'); },
            getBody: function () { return buildOrchardProfitHtml(); }
        },
        'vita-dilution': {
            getTitle: function () { return tUi('vitaCalcTitle'); },
            getBody: function () { return buildVitaDilutionHtml(); }
        },
        'vita-40': {
            wide: true,
            getTitle: function () { return productModalTitle(tUi('vita40Name')); },
            getBody: function () { return buildVitaProductDetailHtml('vita40'); }
        },
        'vita-gold': {
            wide: true,
            getTitle: function () { return productModalTitle(tUi('vitaGoldName')); },
            getBody: function () { return buildVitaGoldProductDetailHtml(); }
        },
        'silicate-fertilizer': {
            wide: true,
            getTitle: function () { return productModalTitle(getLocalizedProduct('silicate').제품명); },
            getBody: function () { return buildSoilProductDetailHtml(getLocalizedProduct('silicate'), { heukdoramCta: true }); }
        },
        'limestone-fertilizer': {
            wide: true,
            getTitle: function () { return productModalTitle(getLocalizedProduct('limestone').제품명); },
            getBody: function () { return buildSoilProductDetailHtml(getLocalizedProduct('limestone')); }
        },
        'calcium-sulfur-fertilizer': {
            wide: true,
            getTitle: function () { return productModalTitle(getLocalizedProduct('calciumSulfur').제품명); },
            getBody: function () { return buildSoilProductDetailHtml(getLocalizedProduct('calciumSulfur'), { hideCta: true }); }
        },
        'organic-silicate': {
            wide: true,
            getTitle: function () { return productModalTitle(getLocalizedProduct('organicSilicate').제품명); },
            getBody: function () { return buildSoilProductDetailHtml(getLocalizedProduct('organicSilicate')); }
        },
        'organic-limestone': {
            wide: true,
            getTitle: function () { return productModalTitle(getLocalizedProduct('organicLimestone').제품명); },
            getBody: function () { return buildSoilProductDetailHtml(getLocalizedProduct('organicLimestone'), { hideCta: true }); }
        },
        'organic-mag-sulfur': {
            wide: true,
            getTitle: function () { return productModalTitle(getLocalizedProduct('organicMagSulfur').제품명); },
            getBody: function () { return buildSoilProductDetailHtml(getLocalizedProduct('organicMagSulfur'), { hideCta: true }); }
        }
    };

    var CROP_RATES = {
        food:  { bagMin: 10, bagMax: 15, vitaMin: 1.5, vitaMax: 3 },
        veg:   { bagMin: 12, bagMax: 18, vitaMin: 2,   vitaMax: 4 },
        fruit: { bagMin: 14, bagMax: 20, vitaMin: 2.5, vitaMax: 5 },
        green: { bagMin: 8,  bagMax: 12, vitaMin: 1,   vitaMax: 2.5 }
    };

    var SHELL_HTML = '\
<div id="catalog-modal" class="catalog-modal fixed inset-0 z-[10050]" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="catalog-modal-title">\
    <div class="catalog-modal__frame">\
        <div class="catalog-modal__panel relative flex flex-col w-full max-w-[690px] bg-white rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden" role="document">\
            <div class="catalog-modal__header shrink-0 relative flex items-center gap-3 px-4 sm:px-5 py-4 pr-14 bg-white rounded-t-[24px]">\
                <div class="catalog-modal__title-wrap flex-1 min-w-0">\
                    <h2 class="m-0 leading-snug text-[#111111]" id="catalog-modal-title"></h2>\
                </div>\
                <button type="button" class="catalog-modal__close absolute right-4 top-1/2 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E8E8E8] text-[#333333] border-0 cursor-pointer transition-colors duration-200 hover:bg-[#d6d6d6]" id="catalog-modal-close" aria-label="닫기">\
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>\
                </button>\
            </div>\
            <div class="catalog-modal__scroll flex-1 min-h-0 overflow-y-auto overscroll-contain">\
                <div class="px-4 sm:px-5 pt-3 pb-6 text-[#111111]" id="catalog-modal-body"></div>\
            </div>\
        </div>\
    </div>\
</div>';

    function ensureShell() {
        var existing = document.getElementById('catalog-modal');
        if (existing) {
            var needsRebuild = !existing.querySelector('.catalog-modal__frame')
                || !existing.querySelector('.catalog-modal__scroll')
                || !existing.querySelector('.catalog-modal__header');
            if (needsRebuild) {
                existing.remove();
            } else {
                var closeExisting = existing.querySelector('#catalog-modal-close');
                if (closeExisting) closeExisting.setAttribute('aria-label', tUi('closeAria'));
                return existing;
            }
        }
        document.body.insertAdjacentHTML('beforeend', SHELL_HTML);
        var shell = document.getElementById('catalog-modal');
        var closeNew = shell && shell.querySelector('#catalog-modal-close');
        if (closeNew) closeNew.setAttribute('aria-label', tUi('closeAria'));
        return shell;
    }

    function lockScroll() {
        if (window.__scrollLock && typeof window.__scrollLock.lock === 'function') {
            window.__scrollLock.lock();
        } else {
            document.body.style.overflow = 'hidden';
        }
        /* html keeps overflow-y:scroll in main.css — force lock to avoid dual scrollports */
        document.documentElement.style.overflow = 'hidden';
    }

    function unlockScroll() {
        if (window.__scrollLock && typeof window.__scrollLock.unlock === 'function') {
            window.__scrollLock.unlock();
        } else {
            document.body.style.overflow = '';
        }
        document.documentElement.style.overflow = '';
    }

    var modalEl = null;
    var titleEl = null;
    var bodyEl = null;
    var closeBtn = null;
    var currentId = null;
    var closing = false;
    var selectedCrop = 'food';

    function cacheEls() {
        modalEl = ensureShell();
        titleEl = document.getElementById('catalog-modal-title');
        bodyEl = document.getElementById('catalog-modal-body');
        closeBtn = document.getElementById('catalog-modal-close');
    }

    var AREA_MAX = 100000;
    var PRICE_MAX_KRW = 1000000;
    var PRICE_MAX_USD = 1000;
    var KRW_PER_USD = 1350;
    var M2_PER_PYEONG = 3.3058;
    // 인회농장 기준: 1,000평 → 낙과 방지 270상자 (평당 0.27상자), 이익 = 상자수 × 상자당 가격
    var ORCHARD_BOXES_PER_PYEONG = 0.27;
    var orchardPriceLang = 'ko';
    var orchardAreaLang = 'ko';

    function isUsdMode() {
        return isCatalogIntl();
    }

    function getPriceMax() {
        return isUsdMode() ? PRICE_MAX_USD : PRICE_MAX_KRW;
    }

    function getOrchardAreaMax() {
        return isUsdMode() ? Math.round(AREA_MAX * M2_PER_PYEONG) : AREA_MAX;
    }

    function parseOrchardAreaValue(raw) {
        var digits = String(raw || '').replace(/[^\d]/g, '');
        if (!digits) return 0;
        return Math.min(getOrchardAreaMax(), Number(digits));
    }

    function formatOrchardAreaValue(num) {
        var n = Math.min(getOrchardAreaMax(), Math.max(0, Math.floor(Number(num) || 0)));
        return n.toLocaleString(localeTag());
    }

    function orchardAreaToPyeong(area) {
        if (isUsdMode()) return area / M2_PER_PYEONG;
        return area;
    }

    function parseAreaValue(raw) {
        var digits = String(raw || '').replace(/[^\d]/g, '');
        if (!digits) return 0;
        return Math.min(AREA_MAX, Number(digits));
    }

    function parsePriceValue(raw) {
        var digits = String(raw || '').replace(/[^\d]/g, '');
        if (!digits) return 0;
        return Math.min(getPriceMax(), Number(digits));
    }

    function formatAreaValue(num) {
        var n = Math.min(AREA_MAX, Math.max(0, Math.floor(Number(num) || 0)));
        return n.toLocaleString(localeTag());
    }

    function formatPriceValue(num) {
        var n = Math.min(getPriceMax(), Math.max(0, Math.floor(Number(num) || 0)));
        return n.toLocaleString(localeTag());
    }

    function toPyeong(value, unit) {
        var n = parseAreaValue(value);
        if (unit === 'm2') return n / 3.3058;
        if (unit === 'ha') return n * 3025;
        return n;
    }

    var countAnimIds = {};

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateCountRange(el, toMin, toMax, opts) {
        if (!el) return;
        opts = opts || {};
        var duration = opts.duration || 900;
        var decimals = opts.decimals || 0;
        var joiner = opts.joiner || '~';
        var suffix = opts.suffix || '';
        var key = el.id || String(Math.random());

        if (countAnimIds[key]) {
            cancelAnimationFrame(countAnimIds[key]);
        }

        var fromMin = Number(el.dataset.countMin);
        var fromMax = Number(el.dataset.countMax);
        if (isNaN(fromMin)) fromMin = 0;
        if (isNaN(fromMax)) fromMax = 0;

        var start = null;

        function format(v) {
            if (decimals > 0) {
                return (Math.round(v * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
            }
            return Math.round(v).toLocaleString(localeTag());
        }

        function frame(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = easeOutCubic(progress);
            var curMin = fromMin + (toMin - fromMin) * eased;
            var curMax = fromMax + (toMax - fromMax) * eased;
            el.textContent = format(curMin) + joiner + format(curMax) + suffix;

            if (progress < 1) {
                countAnimIds[key] = requestAnimationFrame(frame);
            } else {
                el.dataset.countMin = String(toMin);
                el.dataset.countMax = String(toMax);
                el.textContent = format(toMin) + joiner + format(toMax) + suffix;
                countAnimIds[key] = null;
            }
        }

        countAnimIds[key] = requestAnimationFrame(frame);
    }

    function animateCount(el, toValue, opts) {
        if (!el) return;
        opts = opts || {};
        var duration = opts.duration || 900;
        var decimals = opts.decimals || 0;
        var prefix = opts.prefix || '';
        var suffix = opts.suffix || '';
        var key = el.id || String(Math.random());

        if (countAnimIds[key]) {
            cancelAnimationFrame(countAnimIds[key]);
        }

        var fromValue = Number(el.dataset.countValue);
        if (isNaN(fromValue)) fromValue = 0;

        var start = null;

        function format(v) {
            if (decimals > 0) {
                return (Math.round(v * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
            }
            return Math.round(v).toLocaleString(localeTag());
        }

        function frame(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = easeOutCubic(progress);
            var cur = fromValue + (toValue - fromValue) * eased;
            el.textContent = prefix + format(cur) + suffix;

            if (progress < 1) {
                countAnimIds[key] = requestAnimationFrame(frame);
            } else {
                el.dataset.countValue = String(toValue);
                el.textContent = prefix + format(toValue) + suffix;
                countAnimIds[key] = null;
            }
        }

        countAnimIds[key] = requestAnimationFrame(frame);
    }

    function updateCalcResult() {
        var input = document.getElementById('calc-area-input');
        var unitEl = document.getElementById('calc-area-unit');
        var bagsEl = document.getElementById('calc-result-bags');
        var vitaEl = document.getElementById('calc-result-vita');
        if (!input || !unitEl || !bagsEl || !vitaEl) return;

        var pyeong = toPyeong(input.value, unitEl.value);
        var rate = CROP_RATES[selectedCrop] || CROP_RATES.food;
        var scale = pyeong / 300;

        animateCountRange(bagsEl, rate.bagMin * scale, rate.bagMax * scale, {
            decimals: 0,
            joiner: '~',
            suffix: '',
            duration: 900
        });
        animateCountRange(vitaEl, rate.vitaMin * scale, rate.vitaMax * scale, {
            decimals: 1,
            joiner: ' ~ ',
            suffix: '',
            duration: 900
        });
    }

    function syncQuickLabels() {
        var unitEl = document.getElementById('calc-area-unit');
        var quick = bodyEl.querySelector('[data-calc-quick]');
        if (!unitEl || !quick) return;
        var unitLabel = unitEl.options[unitEl.selectedIndex].text;
        quick.querySelectorAll('.calc-quick-btn').forEach(function (btn) {
            var add = Number(btn.getAttribute('data-add')) || 0;
            btn.textContent = '+' + add.toLocaleString(localeTag()) + unitLabel;
        });
    }

    function setCropSelected(card, selected) {
        var check = card.querySelector('.calc-crop-check');
        var idle = CROP_CARD_IDLE.split(/\s+/).filter(Boolean);
        var active = CROP_CARD_ACTIVE.split(/\s+/).filter(Boolean);
        idle.concat(active).forEach(function (c) {
            card.classList.remove(c);
        });
        (selected ? active : idle).forEach(function (c) {
            card.classList.add(c);
        });
        if (check) {
            check.classList.toggle('hidden', !selected);
            check.classList.toggle('inline-flex', selected);
        }
        card.setAttribute('aria-pressed', selected ? 'true' : 'false');
    }

    function bindFarmCalculator() {
        selectedCrop = 'food';
        var cropWrap = bodyEl.querySelector('[data-calc-crops]');
        var input = document.getElementById('calc-area-input');
        var unitEl = document.getElementById('calc-area-unit');
        var quick = bodyEl.querySelector('[data-calc-quick]');

        if (cropWrap) {
            cropWrap.addEventListener('click', function (e) {
                var card = e.target.closest('.calc-crop-card');
                if (!card) return;
                cropWrap.querySelectorAll('.calc-crop-card').forEach(function (el) {
                    setCropSelected(el, el === card);
                });
                selectedCrop = card.getAttribute('data-crop') || 'food';
                updateCalcResult();
            });
        }

        function syncAreaLimitMsg(capped) {
            var msg = document.getElementById('calc-area-limit-msg');
            if (!msg || !input) return;
            msg.classList.toggle('hidden', !capped);
            input.classList.toggle('border-[#F04452]', capped);
            input.classList.toggle('border-[#E5E7EB]', !capped);
        }

        if (input) {
            input.addEventListener('input', function () {
                var caretEnd = input.selectionEnd;
                var prevLen = input.value.length;
                var rawDigits = String(input.value).replace(/[^\d]/g, '');
                var capped = !!rawDigits && Number(rawDigits) > AREA_MAX;
                if (!rawDigits) {
                    input.value = '';
                } else {
                    input.value = formatAreaValue(parseAreaValue(rawDigits));
                }
                var nextLen = input.value.length;
                var pos = Math.max(0, (caretEnd || 0) + (nextLen - prevLen));
                try { input.setSelectionRange(pos, pos); } catch (_) {}
                syncAreaResetBtn();
                syncAreaLimitMsg(capped);
                updateCalcResult();
            });
        }

        var resetBtn = document.getElementById('calc-area-reset');
        if (resetBtn && input) {
            resetBtn.addEventListener('click', function () {
                input.value = '';
                syncAreaResetBtn();
                syncAreaLimitMsg(false);
                updateCalcResult();
                input.focus();
            });
        }

        function syncAreaResetBtn() {
            if (!resetBtn || !input) return;
            var hasValue = String(input.value).replace(/[^\d]/g, '').length > 0;
            resetBtn.classList.toggle('hidden', !hasValue);
            resetBtn.classList.toggle('inline-flex', hasValue);
        }

        syncAreaResetBtn();
        syncAreaLimitMsg(false);

        if (unitEl) {
            unitEl.addEventListener('change', function () {
                syncQuickLabels();
                updateCalcResult();
            });
        }

        if (quick) {
            quick.addEventListener('click', function (e) {
                var btn = e.target.closest('.calc-quick-btn');
                if (!btn || !input) return;
                var add = Number(btn.getAttribute('data-add')) || 0;
                var attempted = parseAreaValue(input.value) + add;
                var next = Math.min(AREA_MAX, attempted);
                input.value = formatAreaValue(next);
                syncAreaResetBtn();
                syncAreaLimitMsg(attempted > AREA_MAX);
                updateCalcResult();
            });
        }

        syncQuickLabels();
        if (input && input.value) input.value = formatAreaValue(parseAreaValue(input.value));
        updateCalcResult();
    }

    function updateOrchardResult() {
        var areaInput = document.getElementById('orchard-area-input');
        var priceInput = document.getElementById('orchard-price-input');
        var boxesEl = document.getElementById('orchard-result-boxes');
        var profitEl = document.getElementById('orchard-result-profit');
        if (!areaInput || !priceInput || !boxesEl || !profitEl) return;

        var area = parseOrchardAreaValue(areaInput.value);
        var price = parsePriceValue(priceInput.value);
        var boxes = Math.round(orchardAreaToPyeong(area) * ORCHARD_BOXES_PER_PYEONG);
        var profit = boxes * price;

        animateCount(boxesEl, boxes, { duration: 900 });
        animateCount(profitEl, profit, { duration: 900, prefix: '+' });
    }

    function bindOrchardCalculator() {
        orchardPriceLang = isUsdMode() ? 'en' : 'ko';
        orchardAreaLang = isUsdMode() ? 'en' : 'ko';
        var priceMax = getPriceMax();
        var areaMax = getOrchardAreaMax();
        var areaInput = document.getElementById('orchard-area-input');
        var priceInput = document.getElementById('orchard-price-input');
        var areaQuick = bodyEl.querySelector('[data-orchard-area-quick]');
        var priceQuick = bodyEl.querySelector('[data-orchard-price-quick]');
        var areaReset = document.getElementById('orchard-area-reset');
        var priceReset = document.getElementById('orchard-price-reset');

        function syncLimitMsg(input, msgId, capped) {
            var msg = document.getElementById(msgId);
            if (!msg || !input) return;
            msg.classList.toggle('hidden', !capped);
            input.classList.toggle('border-[#F04452]', capped);
            input.classList.toggle('border-[#E5E7EB]', !capped);
        }

        function syncResetBtn(input, btn) {
            if (!btn || !input) return;
            var hasValue = String(input.value).replace(/[^\d]/g, '').length > 0;
            btn.classList.toggle('hidden', !hasValue);
            btn.classList.toggle('inline-flex', hasValue);
        }

        function bindNumericInput(input, opts) {
            if (!input) return;
            input.addEventListener('input', function () {
                var caretEnd = input.selectionEnd;
                var prevLen = input.value.length;
                var rawDigits = String(input.value).replace(/[^\d]/g, '');
                var capped = !!rawDigits && Number(rawDigits) > opts.max;
                if (!rawDigits) {
                    input.value = '';
                } else {
                    input.value = opts.format(opts.parse(rawDigits));
                }
                var nextLen = input.value.length;
                var pos = Math.max(0, (caretEnd || 0) + (nextLen - prevLen));
                try { input.setSelectionRange(pos, pos); } catch (_) {}
                syncResetBtn(input, opts.resetBtn);
                syncLimitMsg(input, opts.msgId, capped);
                updateOrchardResult();
            });
        }

        bindNumericInput(areaInput, {
            max: areaMax,
            parse: parseOrchardAreaValue,
            format: formatOrchardAreaValue,
            resetBtn: areaReset,
            msgId: 'orchard-area-limit-msg'
        });

        bindNumericInput(priceInput, {
            max: priceMax,
            parse: parsePriceValue,
            format: formatPriceValue,
            resetBtn: priceReset,
            msgId: 'orchard-price-limit-msg'
        });

        if (areaReset && areaInput) {
            areaReset.addEventListener('click', function () {
                areaInput.value = '';
                syncResetBtn(areaInput, areaReset);
                syncLimitMsg(areaInput, 'orchard-area-limit-msg', false);
                updateOrchardResult();
                areaInput.focus();
            });
        }

        if (priceReset && priceInput) {
            priceReset.addEventListener('click', function () {
                priceInput.value = '';
                syncResetBtn(priceInput, priceReset);
                syncLimitMsg(priceInput, 'orchard-price-limit-msg', false);
                updateOrchardResult();
                priceInput.focus();
            });
        }

        if (areaQuick && areaInput) {
            areaQuick.addEventListener('click', function (e) {
                var btn = e.target.closest('.orchard-quick-btn');
                if (!btn) return;
                var add = Number(btn.getAttribute('data-add')) || 0;
                var attempted = parseOrchardAreaValue(areaInput.value) + add;
                var next = Math.min(areaMax, attempted);
                areaInput.value = formatOrchardAreaValue(next);
                syncResetBtn(areaInput, areaReset);
                syncLimitMsg(areaInput, 'orchard-area-limit-msg', attempted > areaMax);
                updateOrchardResult();
            });
        }

        if (priceQuick && priceInput) {
            priceQuick.addEventListener('click', function (e) {
                var btn = e.target.closest('.orchard-quick-btn');
                if (!btn) return;
                var add = Number(btn.getAttribute('data-add')) || 0;
                var attempted = parsePriceValue(priceInput.value) + add;
                var next = Math.min(priceMax, attempted);
                priceInput.value = formatPriceValue(next);
                syncResetBtn(priceInput, priceReset);
                syncLimitMsg(priceInput, 'orchard-price-limit-msg', attempted > priceMax);
                updateOrchardResult();
            });
        }

        syncResetBtn(areaInput, areaReset);
        syncResetBtn(priceInput, priceReset);
        syncLimitMsg(areaInput, 'orchard-area-limit-msg', false);
        syncLimitMsg(priceInput, 'orchard-price-limit-msg', false);
        updateOrchardResult();
    }

    function updateVitaDilutionResult() {
        var waterInput = document.getElementById('vita-water-input');
        var dilSelect = document.getElementById('vita-dilution-select');
        var mlEl = document.getElementById('vita-result-ml');
        var flozEl = document.getElementById('vita-result-floz');
        var hintEl = document.getElementById('vita-result-hint');
        if (!waterInput || !dilSelect || !mlEl) return;

        var waterL = parseAreaValue(waterInput.value);
        var dilution = Number(dilSelect.value) || 500;
        var ml = dilution > 0 ? Math.round((waterL * 1000) / dilution) : 0;
        var floz = ml / 29.5735;
        var flozStr = floz === 0
            ? '0'
            : (floz < 10 ? floz.toFixed(1) : Math.round(floz).toLocaleString(localeTag()));

        animateCount(mlEl, ml, { duration: 900 });
        if (flozEl) flozEl.textContent = '(' + flozStr + ' fl oz)';

        if (hintEl) {
            if (!waterL) {
                hintEl.textContent = tUi('hintEmpty');
            } else if (ml >= 1000) {
                var liters = ml / 1000;
                var litStr = liters % 1 === 0 ? String(liters) : liters.toFixed(1);
                hintEl.textContent = tUi('hintWithLiters', { l: litStr, n: dilution.toLocaleString(localeTag()) });
            } else {
                hintEl.textContent = tUi('hintDilutionOnly', { n: dilution.toLocaleString(localeTag()) });
            }
        }
    }

    function bindVitaDilutionCalculator() {
        var waterInput = document.getElementById('vita-water-input');
        var dilSelect = document.getElementById('vita-dilution-select');
        var waterQuick = bodyEl.querySelector('[data-vita-water-quick]');
        var waterReset = document.getElementById('vita-water-reset');

        function syncLimitMsg(capped) {
            var msg = document.getElementById('vita-water-limit-msg');
            if (!msg || !waterInput) return;
            msg.classList.toggle('hidden', !capped);
            waterInput.classList.toggle('border-[#F04452]', capped);
            waterInput.classList.toggle('border-[#E5E7EB]', !capped);
        }

        function syncResetBtn() {
            if (!waterReset || !waterInput) return;
            var hasValue = String(waterInput.value).replace(/[^\d]/g, '').length > 0;
            waterReset.classList.toggle('hidden', !hasValue);
            waterReset.classList.toggle('inline-flex', hasValue);
        }

        if (waterInput) {
            waterInput.addEventListener('input', function () {
                var caretEnd = waterInput.selectionEnd;
                var prevLen = waterInput.value.length;
                var rawDigits = String(waterInput.value).replace(/[^\d]/g, '');
                var capped = !!rawDigits && Number(rawDigits) > AREA_MAX;
                if (!rawDigits) {
                    waterInput.value = '';
                } else {
                    waterInput.value = formatAreaValue(parseAreaValue(rawDigits));
                }
                var nextLen = waterInput.value.length;
                var pos = Math.max(0, (caretEnd || 0) + (nextLen - prevLen));
                try { waterInput.setSelectionRange(pos, pos); } catch (_) {}
                syncResetBtn();
                syncLimitMsg(capped);
                updateVitaDilutionResult();
            });
        }

        if (waterReset && waterInput) {
            waterReset.addEventListener('click', function () {
                waterInput.value = '';
                syncResetBtn();
                syncLimitMsg(false);
                updateVitaDilutionResult();
                waterInput.focus();
            });
        }

        if (waterQuick && waterInput) {
            waterQuick.addEventListener('click', function (e) {
                var btn = e.target.closest('.vita-quick-btn');
                if (!btn) return;
                var add = Number(btn.getAttribute('data-add')) || 0;
                var attempted = parseAreaValue(waterInput.value) + add;
                var next = Math.min(AREA_MAX, attempted);
                waterInput.value = formatAreaValue(next);
                syncResetBtn();
                syncLimitMsg(attempted > AREA_MAX);
                updateVitaDilutionResult();
            });
        }

        if (dilSelect) {
            dilSelect.addEventListener('change', updateVitaDilutionResult);
        }

        syncResetBtn();
        syncLimitMsg(false);
        updateVitaDilutionResult();
    }

    function openModal(id) {
        var data = MODALS[id];
        if (!data) {
            console.warn('[catalog-modals] Unknown modal id:', id);
            return;
        }
        cacheEls();
        bindShellEvents();
        currentId = id;
        closing = false;

        var panel = modalEl.querySelector('.catalog-modal__panel');
        var titleWrap = modalEl.querySelector('.catalog-modal__title-wrap')
            || (titleEl ? titleEl.parentElement : null);
        var titleHtml = (typeof data.getTitle === 'function') ? data.getTitle() : (data.title || '');
        if (panel) {
            panel.classList.toggle('catalog-modal__panel--wide', !!data.wide);
            panel.classList.toggle('catalog-modal__panel--product', !!data.wide);
            panel.classList.toggle('catalog-modal__panel--no-title', !titleHtml);
        }
        if (titleWrap) {
            titleWrap.classList.toggle('hidden', !titleHtml);
        }

        if (closeBtn) closeBtn.setAttribute('aria-label', tUi('closeAria'));
        titleEl.innerHTML = titleHtml;
        var bodyHtml = resolveModalBody(data);
        if (bodyHtml.indexOf('material-symbols-outlined') !== -1) {
            ensureMaterialSymbols();
        }
        bodyEl.innerHTML = bodyHtml;
        if (data.wide) decorateProductModal(id);
        bodyEl.classList.toggle('catalog-modal__body--product', !!data.wide);
        bodyEl.classList.toggle('pb-6', !data.wide);
        bodyEl.classList.toggle('pb-0', !!data.wide);

        if (id === 'farm-fertilizer') {
            bindFarmCalculator();
        } else if (id === 'orchard-profit') {
            bindOrchardCalculator();
        } else if (id === 'vita-dilution') {
            bindVitaDilutionCalculator();
        }

        bindSoilUsageTooltips();

        modalEl.setAttribute('aria-hidden', 'false');
        modalEl.classList.add('is-open');
        modalEl.scrollTop = 0;
        if (panel) panel.scrollTop = 0;
        var scrollEl = panel && panel.querySelector('.catalog-modal__scroll');
        if (scrollEl) scrollEl.scrollTop = 0;
        lockScroll();

        if (closeBtn) closeBtn.focus();
    }

    /* Product popups: share bar on top, "not a pesticide" note at the bottom */
    function shareUrlFor(id) {
        return window.location.origin + window.location.pathname + '#' + encodeURIComponent(id);
    }

    function copyText(text, onDone, onFail) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(onDone, onFail);
                return;
            }
        } catch (e) { /* fall through */ }
        onFail();
    }

    function decorateProductModal(id) {
        if (!bodyEl) return;
        var bar = document.createElement('div');
        bar.className = 'catalog-share-bar';
        var url = shareUrlFor(id);
        var msg = document.createElement('span');
        msg.className = 'catalog-share-bar__msg';
        msg.setAttribute('aria-live', 'polite');

        var copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.textContent = tUi('shareCopy');
        copyBtn.addEventListener('click', function () {
            copyText(url, function () { msg.textContent = tUi('shareCopied'); }, function () { msg.textContent = tUi('shareFailed'); });
        });
        bar.appendChild(copyBtn);

        if (navigator.share) {
            var shareBtn = document.createElement('button');
            shareBtn.type = 'button';
            shareBtn.textContent = tUi('shareShare');
            shareBtn.addEventListener('click', function () {
                var title = (titleEl && titleEl.textContent) || document.title;
                navigator.share({ title: title, url: url }).catch(function () { /* user cancelled */ });
            });
            bar.appendChild(shareBtn);
        }
        bar.appendChild(msg);
        bodyEl.insertBefore(bar, bodyEl.firstChild);

        var note = document.createElement('p');
        note.className = 'catalog-legal-note';
        note.textContent = tUi('legalNotice');
        var end = bodyEl.querySelector('.vita-product-modal-end');
        if (end && end.parentNode) end.parentNode.insertBefore(note, end);
        else bodyEl.appendChild(note);
    }

    /* Open a popup from the address, e.g. products-line.html#silicate-fertilizer */
    function openFromHash() {
        var id = '';
        try { id = decodeURIComponent((window.location.hash || '').slice(1)); } catch (e) { id = ''; }
        if (!id || !MODALS[id]) return;
        var tries = 0;
        (function wait() {
            if ((window.CatalogLang && window.CatalogModalI18n) || tries > 40) { openModal(id); return; }
            tries++;
            setTimeout(wait, 50);
        })();
    }

    function closeModal() {
        if (!modalEl || closing || !modalEl.classList.contains('is-open')) return;
        closing = true;
        hideSoilFloatingTip();
        modalEl.classList.remove('is-open');
        modalEl.setAttribute('aria-hidden', 'true');
        unlockScroll();
        currentId = null;

        window.setTimeout(function () {
            closing = false;
        }, 400);
    }

    function register(id, config) {
        if (!id || !config) return;
        MODALS[id] = config;
    }

    function get(id) {
        return MODALS[id] || null;
    }

    function list() {
        return Object.keys(MODALS);
    }

    var backdropPointerDown = false;

    function isBackdropTarget(target) {
        if (!modalEl || !target) return false;
        var panel = modalEl.querySelector('.catalog-modal__panel');
        if (panel && panel.contains(target)) return false;
        return target === modalEl || !!(target.closest && target.closest('.catalog-modal__frame'));
    }

    function onModalPointerDown(e) {
        backdropPointerDown = isBackdropTarget(e.target);
    }

    function onDocClick(e) {
        var trigger = e.target.closest('[data-catalog-modal]');
        if (trigger) {
            e.preventDefault();
            openModal(trigger.getAttribute('data-catalog-modal'));
            backdropPointerDown = false;
            return;
        }
        if (modalEl && modalEl.classList.contains('is-open') && soilFloatingTipPill && !(e.target.closest && e.target.closest('.soil-usage-pill'))) {
            hideSoilFloatingTip();
        }
        // 패널 밖(오버레이) 클릭 시에만 닫기 — 드래그로 배경에 떨어진 클릭 제외
        if (modalEl && modalEl.classList.contains('is-open') && backdropPointerDown && isBackdropTarget(e.target)) {
            closeModal();
        }
        backdropPointerDown = false;
    }

    function onKeydown(e) {
        if (e.key === 'Escape' && modalEl && modalEl.classList.contains('is-open')) {
            closeModal();
        }
    }

    var shellBound = false;

    function bindShellEvents() {
        if (shellBound || !modalEl) return;
        shellBound = true;
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modalEl.addEventListener('pointerdown', onModalPointerDown);
        function onModalScrollArea() {
            if (soilFloatingTipPill) positionSoilFloatingTip(soilFloatingTipPill);
        }
        modalEl.addEventListener('scroll', onModalScrollArea, { passive: true });
        var panelEl = modalEl.querySelector('.catalog-modal__panel');
        if (panelEl) {
            panelEl.addEventListener('scroll', onModalScrollArea, { passive: true });
        }
    }

    function captureCalculatorState(id) {
        var state = { id: id };
        if (id === 'farm-fertilizer') {
            var area = document.getElementById('calc-area-input');
            var unit = document.getElementById('calc-area-unit');
            state.area = area ? area.value : '';
            state.unit = unit ? unit.value : 'pyeong';
            state.crop = selectedCrop || 'food';
        } else if (id === 'orchard-profit') {
            var oArea = document.getElementById('orchard-area-input');
            var oPrice = document.getElementById('orchard-price-input');
            state.area = oArea ? oArea.value : '';
            state.price = oPrice ? oPrice.value : '';
            state.priceLang = orchardPriceLang || 'ko';
            state.areaLang = orchardAreaLang || 'ko';
        } else if (id === 'vita-dilution') {
            var water = document.getElementById('vita-water-input');
            var dil = document.getElementById('vita-dilution-select');
            state.water = water ? water.value : '';
            state.dilution = dil ? dil.value : '500';
        }
        return state;
    }

    function restoreCalculatorState(state) {
        if (!state || !state.id) return;
        if (state.id === 'farm-fertilizer') {
            var area = document.getElementById('calc-area-input');
            var unit = document.getElementById('calc-area-unit');
            if (unit && state.unit) unit.value = state.unit;
            if (area && state.area) {
                area.value = state.area;
                var resetBtn = document.getElementById('calc-area-reset');
                if (resetBtn) {
                    resetBtn.classList.remove('hidden');
                    resetBtn.classList.add('inline-flex');
                }
            }
            if (state.crop) {
                selectedCrop = state.crop;
                var cropWrap = bodyEl && bodyEl.querySelector('[data-calc-crops]');
                if (cropWrap) {
                    cropWrap.querySelectorAll('.calc-crop-card').forEach(function (el) {
                        setCropSelected(el, el.getAttribute('data-crop') === state.crop);
                    });
                }
            }
            syncQuickLabels();
            updateCalcResult();
        } else if (state.id === 'orchard-profit') {
            var oArea = document.getElementById('orchard-area-input');
            var oPrice = document.getElementById('orchard-price-input');
            if (oArea && state.area) {
                var areaRaw = Number(String(state.area).replace(/[^\d]/g, '')) || 0;
                var fromAreaLang = state.areaLang || 'ko';
                var toM2 = isUsdMode();
                if (fromAreaLang === 'ko' && toM2) areaRaw = Math.round(areaRaw * M2_PER_PYEONG);
                if (fromAreaLang === 'en' && !toM2) areaRaw = Math.round(areaRaw / M2_PER_PYEONG);
                oArea.value = formatOrchardAreaValue(areaRaw);
                var areaReset = document.getElementById('orchard-area-reset');
                if (areaReset) {
                    areaReset.classList.remove('hidden');
                    areaReset.classList.add('inline-flex');
                }
            }
            if (oPrice && state.price) {
                var raw = Number(String(state.price).replace(/[^\d]/g, '')) || 0;
                var fromLang = state.priceLang || 'ko';
                var toUsd = isUsdMode();
                if (fromLang === 'ko' && toUsd) raw = Math.round(raw / KRW_PER_USD);
                if (fromLang === 'en' && !toUsd) raw = Math.round(raw * KRW_PER_USD);
                oPrice.value = formatPriceValue(raw);
                var priceReset = document.getElementById('orchard-price-reset');
                if (priceReset) {
                    priceReset.classList.remove('hidden');
                    priceReset.classList.add('inline-flex');
                }
            }
            updateOrchardResult();
        } else if (state.id === 'vita-dilution') {
            var water = document.getElementById('vita-water-input');
            var dil = document.getElementById('vita-dilution-select');
            if (water && state.water) {
                water.value = state.water;
                var waterReset = document.getElementById('vita-water-reset');
                if (waterReset) {
                    waterReset.classList.remove('hidden');
                    waterReset.classList.add('inline-flex');
                }
            }
            if (dil && state.dilution) dil.value = state.dilution;
            updateVitaDilutionResult();
        }
    }

    function onCatalogLangChange() {
        clearModalBodyCaches();
        if (closeBtn) closeBtn.setAttribute('aria-label', tUi('closeAria'));
        if (!currentId || !modalEl || !modalEl.classList.contains('is-open')) return;
        var saved = captureCalculatorState(currentId);
        openModal(currentId);
        restoreCalculatorState(saved);
    }

    function init() {
        document.addEventListener('click', onDocClick);
        document.addEventListener('keydown', onKeydown);
        document.addEventListener('catalog:langchange', onCatalogLangChange);
        window.addEventListener('hashchange', openFromHash);
        openFromHash();
        window.addEventListener('resize', function () {
            if (soilFloatingTipPill) positionSoilFloatingTip(soilFloatingTipPill);
        });
    }

    window.CatalogModal = {
        open: openModal,
        close: closeModal,
        register: register,
        get: get,
        list: list,
        registry: MODALS
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
