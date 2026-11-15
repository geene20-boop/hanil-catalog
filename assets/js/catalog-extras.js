/**
 * Catalog extras (KO / EN / ZH)
 * - "This month's soil care" band:  <div data-season-card></div>   (switches by the visitor's month)
 * - Link to it on the intro page:   <a data-season-link></a>
 * - Government program self-check:  <div data-gov-check></div>       (pH / available silica → likely eligible?)
 * Content is based on the catalog's own application-guide timeline and public RDA guidance.
 */
(function () {
    'use strict';

    var TEXT = {
        ko: {
            seasonEyebrow: '이달의 흙 관리',
            seasonLink: '{m} 흙 관리 →',
            seasonFoot: '토양개량제(비료)이며 농약이 아닙니다 · 기준: 한일씨앤에스 사용 가이드, 농촌진흥청 토양관리 안내',
            seasonCtaCalc: '내 밭 시비량 계산',
            seasonCtaGov: '정부 지원 대상 확인',
            govEmpty: '토양검정 결과서의 pH나 유효규산을 넣어 주세요. 검정은 시·군 농업기술센터에서 받을 수 있습니다.',
            govNo: '입력한 수치로는 지원 기준에 해당하지 않을 가능성이 높습니다. 시·군 공고를 확인해 주세요.',
            govSi: '유효규산 {v}mg/kg: 157mg/kg 미만 → 규산질비료 지원 대상일 수 있습니다.',
            govPhField: 'pH {v}: 6.5 미만 산성 밭 → 석회질비료 지원 대상일 수 있습니다.',
            govPhPaddy: 'pH {v}: 논도 토양검정 결과 석회가 필요하면 공급될 수 있습니다.'
        },
        en: {
            seasonEyebrow: "This month's soil care",
            seasonLink: '{m} soil care →',
            seasonFoot: 'Soil conditioners are fertilizers, not pesticides · Based on the HANIL C&S application guide and RDA soil management guidance',
            seasonCtaCalc: 'Calculate my farm rate',
            seasonCtaGov: 'Check program eligibility',
            govEmpty: 'Enter the pH or available silica from your soil test report. Soil tests are available at your local agricultural technology center.',
            govNo: 'These values are unlikely to meet the program criteria. Please check your local government notice.',
            govSi: 'Available silica {v} mg/kg: below 157 mg/kg → you may qualify for free silicate fertilizer.',
            govPhField: 'pH {v}: acidic upland soil below 6.5 → you may qualify for free lime fertilizer.',
            govPhPaddy: 'pH {v}: paddies can also receive lime if the soil test calls for it.'
        },
        zh: {
            seasonEyebrow: '本月土壤管理',
            seasonLink: '{m}土壤管理 →',
            seasonFoot: '土壤改良剂属于肥料，不是农药 · 依据：HANIL C&S 使用指南、韩国农村振兴厅土壤管理资料',
            seasonCtaCalc: '计算我的施肥量',
            seasonCtaGov: '查看是否符合补贴条件',
            govEmpty: '请输入土壤检测报告中的pH或有效硅数值。可在所在地的农业技术中心进行土壤检测。',
            govNo: '按输入的数值，可能不符合补贴条件。请查看当地政府公告。',
            govSi: '有效硅 {v}mg/kg：低于157mg/kg → 可能符合硅肥补贴条件。',
            govPhField: 'pH {v}：低于6.5的酸性旱地 → 可能符合石灰质肥料补贴条件。',
            govPhPaddy: 'pH {v}：水田如经土壤检测需要石灰，也可获得供应。'
        }
    };

    var MONTH_NAMES = {
        ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        zh: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    };

    /* Each month: title + three tasks [who, what, products]. */
    var SEASON = {
        ko: {
            1:  ['겨울은 흙을 검사하는 계절입니다', [['과수', '낙엽 후 휴면기에 석회고토·칼슘유황 시용', '입상석회고토 · 칼슘유황비료'], ['모든 농가', '퇴비·비료 주기 전에 토양검정 신청', '시·군 농업기술센터'], ['모든 농가', '정부 지원 토양개량제 신청 (보통 2월 말까지)', '읍·면·동 사무소']]],
            2:  ['지원 신청 마감 전, 봄 시용을 준비합니다', [['모든 농가', '정부 지원 토양개량제 신청 마감 확인', '읍·면·동 사무소'], ['과수', '휴면기 시용 마무리', '입상석회고토 · 칼슘유황비료'], ['봄 작기', '토양검정 처방서로 시용량 확인 (발급까지 약 2주)', '시·군 농업기술센터']]],
            3:  ['땅이 녹으면 토양개량제부터', [['논 · 벼', '모내기 1개월 전 규산질 시용', '입상규산질'], ['시설하우스', '정식 3~4주 전 토양개량제 먼저', '입상석회고토 · 입상규산질'], ['공통', '질소·복합비료는 토양개량제 1~2주 뒤에', '사용 가이드']]],
            4:  ['모내기와 정식 전, 흙부터 맞춥니다', [['논 · 벼', '모내기 1개월 전 규산질 시용 마무리', '입상규산질'], ['과채류', '정식 3~4주 전 석회고토 + 규산질', '입상석회고토 · 입상규산질'], ['공통', '표면에 두지 말고 작토층 전체에 골고루 섞기', '경운 혼화']]],
            5:  ['모낸 뒤와 늦은 정식을 챙깁니다', [['논 · 벼', '모낸 후 15일 이내 규산질 시용', '입상규산질'], ['과채류', '늦은 작형은 정식 3~4주 전 토양개량제', '입상석회고토 · 입상규산질'], ['시설하우스', '생육기에는 엽면시비로 보완', '생생비타']]],
            6:  ['장마 전에 물길과 흙을 점검합니다', [['논 · 벼', '모낸 후 15일 이내 시용 마무리', '입상규산질'], ['모든 농가', '장마 전 배수로를 정비해 흙 유실 막기', '현장 점검'], ['마늘·양파', '수확 후 다음 작기 정식 2~3개월 전 시용', '입상규산질 · 입상석회고토']]],
            7:  ['이삭이 나오기 전에 규산을 챙깁니다', [['논 · 벼', '출수기 30일 전 규산질 시용', '입상규산질'], ['모든 농가', '장마 뒤 배수와 흙 유실 상태 점검', '현장 점검'], ['근채·인경채', '정식 2~3개월 전 시용', '입상규산질 · 입상석회고토']]],
            8:  ['가을 작기 흙을 미리 준비합니다', [['논 · 벼', '출수기 30일 전 시용 마무리', '입상규산질'], ['엽채류 (배추·무)', '정식 3~4주 전 석회고토 + 규산질', '입상석회고토 · 입상규산질'], ['마늘·양파', '정식 2~3개월 전 시용', '입상규산질 · 입상석회고토']]],
            9:  ['가을 로터리 전에 뿌립니다', [['마늘·양파', '가을 로터리 전 규산질 중심 시용', '입상규산질 · 입상석회고토'], ['시설하우스', '가을 작기 정식 3~4주 전 토양개량제', '입상석회고토 · 입상규산질'], ['공통', '질소·복합비료는 1~2주 뒤에', '사용 가이드']]],
            10: ['수확 뒤 가을 갈이 때 땅심을 채웁니다', [['논 · 벼', '수확 후 가을 경운 때 규산질 시용', '입상규산질'], ['마늘·양파', '가을 로터리 전 시용 마무리', '입상규산질 · 입상석회고토'], ['모든 농가', '수확이 끝난 밭은 토양검정 준비', '시·군 농업기술센터']]],
            11: ['수확 끝난 밭, 내년 땅심은 지금 준비합니다', [['논 · 벼', '수확 직후, 퇴비 주기 전에 토양검정 맡기기', '시·군 농업기술센터'], ['과수', '낙엽 후 휴면기에 석회고토·칼슘유황 시용', '입상석회고토 · 칼슘유황비료'], ['시설하우스', '다음 작기 정식 3~4주 전 토양개량제 먼저', '입상석회고토 · 입상규산질']]],
            12: ['무료 토양개량제, 신청은 지금부터입니다', [['모든 농가', '정부 지원 토양개량제 신청 시작 (보통 12월~2월)', '읍·면·동 사무소'], ['과수', '낙엽 후 휴면기 시용', '입상석회고토 · 칼슘유황비료'], ['시설하우스', '다음 작기 정식 3~4주 전 토양개량제 먼저', '입상석회고토 · 입상규산질']]]
        },
        en: {
            1:  ['Winter is the season to test your soil', [['Orchards', 'Apply lime magnesia or calcium sulfur during dormancy after leaf fall', 'Granular lime magnesia · Calcium sulfur'], ['All farms', 'Request a soil test before applying compost or fertilizer', 'Local agricultural technology center'], ['All farms', 'Apply for the government soil conditioner program (usually by late February)', 'Local district office']]],
            2:  ['Before applications close, plan spring application', [['All farms', 'Check the deadline for the government soil conditioner program', 'Local district office'], ['Orchards', 'Finish dormant-season application', 'Granular lime magnesia · Calcium sulfur'], ['Spring crops', 'Confirm rates with your soil test prescription (about 2 weeks to issue)', 'Local agricultural technology center']]],
            3:  ['When the ground thaws, start with soil conditioner', [['Rice paddies', 'Apply silicate one month before transplanting', 'Granular silicate'], ['Greenhouses', 'Apply soil conditioner 3~4 weeks before planting', 'Granular lime magnesia · Granular silicate'], ['All crops', 'Apply nitrogen or compound fertilizer 1~2 weeks after soil conditioner', 'Application guide']]],
            4:  ['Get the soil right before transplanting and planting', [['Rice paddies', 'Finish silicate one month before transplanting', 'Granular silicate'], ['Fruit vegetables', 'Lime magnesia + silicate 3~4 weeks before planting', 'Granular lime magnesia · Granular silicate'], ['All crops', 'Do not leave it on the surface; mix it through the tilled layer', 'Tillage']]],
            5:  ['After transplanting, and for late plantings', [['Rice paddies', 'Apply silicate within 15 days after transplanting', 'Granular silicate'], ['Fruit vegetables', 'For late plantings, apply 3~4 weeks before planting', 'Granular lime magnesia · Granular silicate'], ['Greenhouses', 'Supplement with foliar feeding during growth', 'Saengsaeng Vita']]],
            6:  ['Check drainage and soil before the rainy season', [['Rice paddies', 'Finish application within 15 days after transplanting', 'Granular silicate'], ['All farms', 'Clear drainage channels before the rainy season to prevent soil loss', 'Field check'], ['Garlic · Onion', 'After harvest, apply 2~3 months before the next planting', 'Granular silicate · Granular lime magnesia']]],
            7:  ['Silicate before heading', [['Rice paddies', 'Apply silicate 30 days before heading', 'Granular silicate'], ['All farms', 'Check drainage and soil loss after the rainy season', 'Field check'], ['Root & bulb crops', 'Apply 2~3 months before planting', 'Granular silicate · Granular lime magnesia']]],
            8:  ['Prepare soil for autumn crops', [['Rice paddies', 'Finish application 30 days before heading', 'Granular silicate'], ['Leafy crops (cabbage, radish)', 'Lime magnesia + silicate 3~4 weeks before planting', 'Granular lime magnesia · Granular silicate'], ['Garlic · Onion', 'Apply 2~3 months before planting', 'Granular silicate · Granular lime magnesia']]],
            9:  ['Apply before autumn rotary tilling', [['Garlic · Onion', 'Apply mainly silicate before autumn rotary tilling', 'Granular silicate · Granular lime magnesia'], ['Greenhouses', 'Soil conditioner 3~4 weeks before autumn planting', 'Granular lime magnesia · Granular silicate'], ['All crops', 'Nitrogen or compound fertilizer 1~2 weeks later', 'Application guide']]],
            10: ['Rebuild soil fertility at autumn tillage', [['Rice paddies', 'Apply silicate at autumn tillage after harvest', 'Granular silicate'], ['Garlic · Onion', 'Finish application before autumn rotary tilling', 'Granular silicate · Granular lime magnesia'], ['All farms', 'Prepare soil tests for harvested fields', 'Local agricultural technology center']]],
            11: ['After harvest, prepare next year\'s soil now', [['Rice paddies', 'Right after harvest, test the soil before applying compost', 'Local agricultural technology center'], ['Orchards', 'Apply lime magnesia or calcium sulfur during dormancy after leaf fall', 'Granular lime magnesia · Calcium sulfur'], ['Greenhouses', 'Soil conditioner first, 3~4 weeks before the next planting', 'Granular lime magnesia · Granular silicate']]],
            12: ['Free soil conditioner: applications open now', [['All farms', 'Government soil conditioner applications open (usually December~February)', 'Local district office'], ['Orchards', 'Apply during dormancy after leaf fall', 'Granular lime magnesia · Calcium sulfur'], ['Greenhouses', 'Soil conditioner first, 3~4 weeks before the next planting', 'Granular lime magnesia · Granular silicate']]]
        },
        zh: {
            1:  ['冬季是检测土壤的季节', [['果树', '落叶后休眠期施用石灰镁肥、钙硫肥', '颗粒石灰镁肥 · 钙硫肥'], ['所有农户', '在施堆肥和肥料之前申请土壤检测', '当地农业技术中心'], ['所有农户', '申请韩国政府支持的土壤改良剂（通常截至2月底）', '邑·面·洞办事处']]],
            2:  ['申请截止前，做好春季施用准备', [['所有农户', '确认政府土壤改良剂申请截止日期', '邑·面·洞办事处'], ['果树', '完成休眠期施用', '颗粒石灰镁肥 · 钙硫肥'], ['春季作物', '根据土壤检测施肥处方确认用量（出具约需2周）', '当地农业技术中心']]],
            3:  ['土壤解冻后，先施土壤改良剂', [['水稻', '插秧前1个月施用硅肥', '颗粒硅肥'], ['设施栽培', '定植前3~4周先施土壤改良剂', '颗粒石灰镁肥 · 颗粒硅肥'], ['通用', '氮肥、复合肥在土壤改良剂施用1~2周后再施', '使用指南']]],
            4:  ['插秧和定植前，先调好土壤', [['水稻', '完成插秧前1个月的硅肥施用', '颗粒硅肥'], ['果菜类', '定植前3~4周施用石灰镁肥 + 硅肥', '颗粒石灰镁肥 · 颗粒硅肥'], ['通用', '不要留在地表，应均匀混入整个耕作层', '翻耕混合']]],
            5:  ['插秧后及晚茬定植的管理', [['水稻', '插秧后15天内施用硅肥', '颗粒硅肥'], ['果菜类', '晚茬于定植前3~4周施用土壤改良剂', '颗粒石灰镁肥 · 颗粒硅肥'], ['设施栽培', '生长期用叶面喷施补充', 'Saengsaeng Vita']]],
            6:  ['雨季前检查排水和土壤', [['水稻', '完成插秧后15天内的施用', '颗粒硅肥'], ['所有农户', '雨季前疏通排水沟，防止水土流失', '田间检查'], ['大蒜·洋葱', '收获后，在下一茬定植前2~3个月施用', '颗粒硅肥 · 颗粒石灰镁肥']]],
            7:  ['抽穗前补充硅', [['水稻', '抽穗前30天施用硅肥', '颗粒硅肥'], ['所有农户', '雨季后检查排水和水土流失情况', '田间检查'], ['根菜·鳞茎类', '定植前2~3个月施用', '颗粒硅肥 · 颗粒石灰镁肥']]],
            8:  ['提前准备秋茬土壤', [['水稻', '完成抽穗前30天的施用', '颗粒硅肥'], ['叶菜类（白菜·萝卜）', '定植前3~4周施用石灰镁肥 + 硅肥', '颗粒石灰镁肥 · 颗粒硅肥'], ['大蒜·洋葱', '定植前2~3个月施用', '颗粒硅肥 · 颗粒石灰镁肥']]],
            9:  ['秋季旋耕前施用', [['大蒜·洋葱', '秋季旋耕前以硅肥为主施用', '颗粒硅肥 · 颗粒石灰镁肥'], ['设施栽培', '秋茬定植前3~4周施用土壤改良剂', '颗粒石灰镁肥 · 颗粒硅肥'], ['通用', '氮肥、复合肥在1~2周后再施', '使用指南']]],
            10: ['收获后秋耕时恢复地力', [['水稻', '收获后秋季耕地时施用硅肥', '颗粒硅肥'], ['大蒜·洋葱', '完成秋季旋耕前的施用', '颗粒硅肥 · 颗粒石灰镁肥'], ['所有农户', '收获后的田块准备土壤检测', '当地农业技术中心']]],
            11: ['收获后的田地，现在就为明年准备地力', [['水稻', '收获后立即在施堆肥前进行土壤检测', '当地农业技术中心'], ['果树', '落叶后休眠期施用石灰镁肥、钙硫肥', '颗粒石灰镁肥 · 钙硫肥'], ['设施栽培', '下一茬定植前3~4周先施土壤改良剂', '颗粒石灰镁肥 · 颗粒硅肥']]],
            12: ['免费土壤改良剂，现在开始申请', [['所有农户', '韩国政府土壤改良剂开始申请（通常12月~2月）', '邑·面·洞办事处'], ['果树', '落叶后休眠期施用', '颗粒石灰镁肥 · 钙硫肥'], ['设施栽培', '下一茬定植前3~4周先施土壤改良剂', '颗粒石灰镁肥 · 颗粒硅肥']]]
        }
    };

    function lang() {
        var l = (window.CatalogLang && CatalogLang.get && CatalogLang.get()) || 'ko';
        return TEXT[l] ? l : 'ko';
    }
    function tx(key, vars) {
        var s = TEXT[lang()][key] || TEXT.ko[key] || '';
        if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(String(vars[k])); });
        return s;
    }
    function el(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }
    function month() { return new Date().getMonth() + 1; }

    /* ── This month's soil care ─────────────────────────────── */
    function renderSeason() {
        var m = month(), l = lang(), data = SEASON[l][m] || SEASON.ko[m];
        var name = MONTH_NAMES[l][m - 1];

        Array.prototype.forEach.call(document.querySelectorAll('[data-season-link]'), function (a) {
            a.textContent = tx('seasonLink', { m: name });
        });

        Array.prototype.forEach.call(document.querySelectorAll('[data-season-card]'), function (box) {
            box.innerHTML = '';
            var card = el('section', 'season-card');
            card.id = 'season';
            card.setAttribute('aria-labelledby', 'season-title');
            card.appendChild(el('p', 'season-card__eyebrow', name + ' · ' + tx('seasonEyebrow')));
            var h = el('h3', 'season-card__title', data[0]);
            h.id = 'season-title';
            card.appendChild(h);
            var grid = el('div', 'season-card__tasks');
            data[1].forEach(function (t) {
                var item = el('div', 'season-card__task');
                item.appendChild(el('span', 'season-card__who', t[0]));
                item.appendChild(el('span', 'season-card__what', t[1]));
                item.appendChild(el('span', 'season-card__prod', t[2]));
                grid.appendChild(item);
            });
            card.appendChild(grid);
            var ctas = el('div', 'season-card__ctas');
            var calc = el('a', 'season-card__btn', tx('seasonCtaCalc'));
            calc.href = '#';
            calc.setAttribute('data-catalog-modal', 'farm-fertilizer');
            var gov = el('a', 'season-card__btn season-card__btn--ghost', tx('seasonCtaGov'));
            gov.href = box.getAttribute('data-gov-href') || '../technical/government.html';
            ctas.appendChild(calc);
            ctas.appendChild(gov);
            card.appendChild(ctas);
            card.appendChild(el('p', 'season-card__foot', tx('seasonFoot')));
            box.appendChild(card);
        });
    }

    /* ── Government program self-check ──────────────────────── */
    function num(v) { var n = parseFloat(v); return isFinite(n) ? n : null; }
    function runGovCheck(box) {
        var type = box.querySelector('[data-gov-type]').value;
        var ph = num(box.querySelector('[data-gov-ph]').value);
        var si = num(box.querySelector('[data-gov-si]').value);
        var out = box.querySelector('[data-gov-out]');
        var r = [];
        if (type === 'paddy' && si !== null && si < 157) r.push(tx('govSi', { v: si }));
        if (ph !== null && ph < 6.5 && type === 'field') r.push(tx('govPhField', { v: ph }));
        if (ph !== null && ph < 6.5 && type === 'paddy') r.push(tx('govPhPaddy', { v: ph }));
        if (r.length) { out.className = 'gov-check__out is-yes'; out.textContent = r.join(' '); }
        else if (ph === null && si === null) { out.className = 'gov-check__out'; out.textContent = tx('govEmpty'); }
        else { out.className = 'gov-check__out is-no'; out.textContent = tx('govNo'); }
    }
    function bindGovCheck() {
        Array.prototype.forEach.call(document.querySelectorAll('[data-gov-check]'), function (box) {
            if (!box.getAttribute('data-bound')) {
                box.setAttribute('data-bound', '1');
                Array.prototype.forEach.call(box.querySelectorAll('input, select'), function (f) {
                    f.addEventListener('input', function () { runGovCheck(box); });
                    f.addEventListener('change', function () { runGovCheck(box); });
                });
            }
            runGovCheck(box);
        });
    }

    var scrolledToSeason = false;
    function renderAll() {
        renderSeason();
        bindGovCheck();
        if (!scrolledToSeason && window.location.hash === '#season') {
            var target = document.getElementById('season');
            if (target) { scrolledToSeason = true; target.scrollIntoView({ block: 'start' }); }
        }
    }

    function start() {
        var tries = 0;
        (function wait() {
            if (window.CatalogLang || tries > 40) { renderAll(); return; }
            tries++;
            setTimeout(wait, 50);
        })();
        document.addEventListener('catalog:langchange', function () { setTimeout(renderAll, 0); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
