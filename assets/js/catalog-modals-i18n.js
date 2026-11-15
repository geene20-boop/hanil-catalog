/**
 * Catalog modal KO/EN copy packs for calculators + product detail modals.
 * Loaded before catalog-modals.js.
 */
(function () {
    'use strict';

    var uiKo = {
        closeAria: '닫기',

        farmTitle: '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold">내 농가 맞춤 시비량 자동 계산기</span>',
        farmCropPrompt: '작물을 선택해주세요.',
        cropFoodName: '식량작물',
        cropFoodDesc: '벼/보리/옥수수',
        cropVegName: '엽채·과채류',
        cropVegDesc: '고추/상추/배추/마늘',
        cropFruitName: '과수류',
        cropFruitDesc: '사과/배/복숭아/토마토',
        cropGreenName: '기타',
        cropGreenDesc: '잔디/골프장/목초지',
        farmAreaPrompt: '재배면적을 입력해주세요.',
        farmAreaPlaceholder: '면적을 입력해주세요',
        farmAreaAria: '재배면적',
        farmAreaResetAria: '면적 초기화',
        farmUnitAria: '면적 단위',
        unitPyeong: '평',
        unitM2: '㎡',
        unitHa: 'ha',
        farmAreaLimit: '최대 100,000까지 계산됩니다.',
        resultTitle: '계산 결과',
        farmBagsProductLine: '입상 규산질비료 · 20kg/포',
        farmBagsUnit: '포',
        farmBagsImgAlt: '입상 규산질비료',
        farmVitaLine: '생생비타 40 · 희석 관수/엽면시비',
        farmVitaDilutionTip: '500~1000배 희석 권장',
        farmVitaImgAlt: '생생비타 40',

        orchardTitle: '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold"><span class="text-[#2D8A3E]">인회농장</span> 기반 과수원 예상 수익 산출기</span>',
        orchardAreaPrompt: '과수원 면적을 입력해주세요. <span class="text-base max-md:text-sm font-semibold text-[#9CA3AF]">(평수)</span>',
        orchardAreaPlaceholder: '면적을 입력해주세요',
        orchardAreaAria: '과수원 면적',
        orchardAreaResetAria: '면적 초기화',
        orchardAreaLimit: '최대 {n}까지 계산됩니다.',
        orchardPricePrompt: '평년 상자당 가격을 입력해주세요. <span class="text-base max-md:text-sm font-semibold text-[#9CA3AF]">(4kg/원)</span>',
        orchardPricePlaceholder: '가격을 입력해주세요',
        orchardPriceAria: '상자당 가격',
        orchardPriceResetAria: '가격 초기화',
        orchardPriceLimit: '최대 1,000,000까지 계산됩니다.',
        orchardQuick1man: '+1만',
        orchardQuick10man: '+10만',
        orchardBoxesLabel: '낙과 감소 시 보존 예상 상자 수',
        orchardNote: '인회농장 인터뷰를 바탕으로 추정한 값(평당 약 0.27상자)으로 계산한 참고용 예상치이며, 실제 결과를 보장하지 않습니다.',
        orchardBoxesUnit: '상자',
        orchardProfitLabel: '당도 프리미엄 + 수확량 예상 이익',
        orchardWonUnit: '원',

        vitaCalcTitle: '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold"><span class="text-[#2D8A3E]">생생비타40</span> 현장 희석량 자동 계산기</span>',
        vitaWaterPrompt: '물 용량을 입력해주세요. <span class="text-base max-md:text-sm font-semibold text-[#9CA3AF]">(리터)</span>',
        vitaWaterPlaceholder: '물 용량을 입력해주세요',
        vitaWaterAria: '물 용량',
        vitaWaterResetAria: '물 용량 초기화',
        vitaWaterLimit: '최대 100,000까지 계산됩니다.',
        vitaQuickLiter: '리터',
        vitaDilutionPrompt: '목표 희석 배수를 선택해주세요.',
        vitaDilutionAria: '목표 희석 배수',
        vitaOpt500: '500배 (과수 고농도)',
        vitaOpt700: '700배',
        vitaOpt1000: '1,000배 (일반 권장)',
        vitaResultLabel: '생생비타 40, 이만큼 투입해야 해요',
        hintEmpty: '물 용량과 희석 배수를 입력하면 투입량이 계산됩니다.',
        hintWithLiters: '약 {l}L · {n}배 희석 기준',
        hintDilutionOnly: '{n}배 희석 기준',
        vitaResultImgAlt: '생생비타 40',

        msdsDownload: 'MSDS 다운로드',
        sectionSpec: '규격',
        sectionUsage: '주요사용처',
        sectionBenefits: '효능',
        sectionTiming: '사용시기',
        sectionTimingDef: '사용시기 · 결핍진단',
        sectionMethod: '사용방법',
        sectionFeatures: '특징',
        sectionPrecautionStorage: '사용상·보관상 주의사항',
        sectionOrganicListing: '유기농업자재 표시사항',
        sectionStdDose: '권장시비량 300평(1,000㎡)',
        sectionRecommend: '이런 분께 추천합니다',
        sectionFaq: '자주 묻는 질문',
        warning: '주의사항',
        imageSoon: '제품 이미지 준비중',
        ctaFarmCalc: '내 농가 시비량 계산하기',
        ctaHeukdoram: '흙토람',
        ctaVitaDilution: '현장 희석량 계산하기',
        sampleAltSuffix: ' 샘플',

        vita40Name: '생생비타 40',
        vitaGoldName: '생생비타 골드',
        vita40SpecLine: 'N-P-K 3-1-1 · 아미노산 20% · 유기물 25%',
        vita40Desc: '식물성 아미노산 17종과 유기물·필수 미량원소를 고농축으로 담아, 생육기 영양 보충과 과실 비대·착색기 영양 관리에 도움을 줍니다.',
        vitaGoldSpecLine: 'N-P-K 2-1-2 · 식물성 아미노산 15% · 유기물 25%',
        vitaGoldDesc: '작물의 생장과 뿌리 활력을 돕는 발효 공법 제품으로, 토양관주·엽면시비를 통해 균형 영양 흡수와 토양 미생물 활성화를 지원합니다.',
        vitaGoldWhyTitle: '왜 선도적인 농가에서 생생비타를 선택할까요?',
        vitaGoldWhyItems: [
            '작물의 생장과 뿌리의 활력을 증진시키는 발효 공법으로 개발한 제품으로 토양관주와 엽면시비를 하면 균형된 영양을 흡수하여 작물 스스로 건강해지는 힘을 키워줍니다.',
            '뿌리 발육과 작물생육을 증진시키고, 토양 미생물을 활성화하여 영양소의 흡수를 증대시킵니다.'
        ],
        vitaGoldKeysTitle: '생생비타의 핵심 열쇠',
        vitaGoldKey1Title: '프리미엄 아미노산',
        vitaGoldKey1Items: [
            '빠른 흡수력과 효과 극대화',
            '환경 스트레스 완화',
            '품질개선 (당도, 색상, 풍미)',
            '토양지력증진 강화',
            '미량 요소 공급 효과 극대화'
        ],
        vitaGoldKey2Title: '풍부한 단백질과 유기물',
        vitaGoldKey2Parts: [
            { label: '단백질:', text: '질소의 공급원으로 작물의 세포 성장과 조직 형성을 돕습니다.' },
            { label: '유기물:', text: '토양 미생물을 활성화시켜 토양의 이화학성을 개선하고, 작물의 영양 흡수를 돕습니다.' }
        ],
        vitaGoldKey3Title: '17종 식물성 아미노산',
        vitaGoldKey3Lines: [
            '작물이 흡수하기 쉬운 유리 아미노산으로 작물 생육 활성화에 효과를 줍니다.',
            '특히, 뿌리 발달, 광합성 촉진, 착색 및 당도 증진 등 식물 전반의 생육 활성화 기능을 강화합니다.'
        ],
        vitaGoldKey4Title: '미생물 활성화',
        vitaGoldKey4Items: [
            '유기물 분해촉진, 작물의 영양소 흡수 증대',
            '건강한 토양을 만들어 작물이 더 잘 자랄 수 있는 환경을 제공합니다.'
        ],
        vitaGoldCompositionTitle: '생생비타 – 주성분량(%)',
        vitaGoldCompColNpk: 'N-P-K',
        vitaGoldCompColAmino: '식물성 아미노산',
        vitaGoldCompColOrganic: '유기물',
        vitaGoldCompColMicro: '미량요소',
        vitaGoldCompNpk: '2-1-2',
        vitaGoldCompAmino: '15',
        vitaGoldCompOrganic: '25',
        vitaGoldCompMicro: '붕소, 몰리브덴, 아연, 수용성 황, 수용성 마그네슘',
        vitaGoldCompColFunc: '기능성 물질',
        vitaGoldCompFunc: '휴믹산, 풀빅산, 피트산',
        vitaGoldCompGuarantee: '공정규격 보증성분: 수용성 붕소(B) 0.05% 이상, 수용성 몰리브덴(Mo) 0.0005% 이상',
        vitaGoldDoseTitle: '생생비타골드 – 권장 시비량(예시)',
        vitaGoldDoseH1: '대상작물',
        vitaGoldDoseH2: '사용시기',
        vitaGoldDoseH3: '사용방법',
        vitaGoldDoseH4: '희석배수',
        vitaGoldDoseH5: '물량 대비 제품 사용량',
        vitaGoldDoseH6: '150평 기준',
        vitaGoldDoseCrop: '모든작물',
        vitaGoldDoseSeason: '생육기',
        vitaGoldDoseMethodDrench: '관주',
        vitaGoldDoseMethodFoliar: '엽면시비',
        vitaGoldDoseRatio500Mid: '500배 (생육중기-후기)',
        vitaGoldDoseRatio1000Early: '1000배 (생육초기)',
        vitaGoldDoseMix500DrenchMid: '2리터/물 50말(1톤), 4리터/물 100말(2톤)',
        vitaGoldDoseMix1000DrenchEarly: '1리터/물 50말(1톤), 2리터/물 100말(2톤)',
        vitaGoldDoseArea500DrenchMid: '150평당 2~4리터',
        vitaGoldDoseArea1000DrenchEarly: '150평당 1~2리터',
        vitaGoldDoseMix500FoliarMid: '2리터/물 50말(1톤), 1리터/물 25말(500리터)',
        vitaGoldDoseMix1000FoliarEarly: '1리터/물 50말(1톤), 0.5리터/물 25말(500리터)',
        vitaGoldDoseNote: '작물 종류와 생육 단계에 따라 사용량을 조절하여 사용하십시오.',
        vitaGoldDoseHaNote: '1ha(약 3,000평) 기준 관주 참고 사용량: 500배 40~80L, 1,000배 20~40L',
        vitaGoldTipsTitle: '생생비타골드 – 흡수율을 높이는 현장 사용법',
        vitaGoldTipsItems: [
            '살포 시간: 기공 흡수가 잘 되는 이른 아침이나 해 질 무렵에 살포하십시오.',
            '살포 부위: 기공이 많은 잎 뒷면까지 골고루 묻도록 충분히 살포하십시오.',
            '살포 간격: 생육 최성기에는 7~10일 간격으로 2~3회 연속 관주 또는 살포하십시오.'
        ],
        vitaGoldCropTableTitle: '생생비타골드 – 적용작물 및 사용방법',
        vitaGoldCropColCrop: '작물명',
        vitaGoldCropColTiming: '사용시기',
        vitaGoldCropColFreq: '사용횟수',
        vitaGoldCropColEffect: '효과',
        vitaGoldCropGroups: [
            {
                crop: '과수류 (사과, 배, 포도, 감귤, 복숭아)',
                entries: [
                    { timing: '개화 전, 낙화 2주후', freq: '1~2회', effect: '냉해경감, 기형과 예방' },
                    { timing: '유과비대기', freq: '2~3회 (7일간격)', effect: '유과비대' },
                    { timing: '착색시작기', freq: '7일간격 3~4회', effect: '품질향상, 수량증대' }
                ]
            },
            {
                crop: '채소류 (참외, 고추, 수박, 토마토, 호박, 딸기, 배추, 무)',
                entries: [
                    { timing: '육묘기', freq: '육묘기 7~10일 간격 관주, 살포', effect: '건강한 모종 육성, 착과와 비대, 수확량 증대' },
                    { timing: '생육초기-생육최성기', freq: '월 2~3회 10일 간격 관주, 살포', effect: '품질향상, 저온극복, 수량증대' }
                ]
            },
            {
                crop: '수도작(벼)',
                entries: [
                    { timing: '전생육기간', freq: '3~4회 사용 살포', effect: '품질향상, 수량증대' }
                ]
            },
            {
                crop: '특용작물 (인삼, 더덕)',
                entries: [
                    { timing: '생육초기-중기', freq: '월 2~3회 7일 간격 살포', effect: '품질향상, 수량증대' }
                ]
            },
            {
                crop: '감자, 고구마',
                entries: [
                    { timing: '생육초기-중기', freq: '3~4회 살포', effect: '품질향상, 수량증대' }
                ]
            }
        ],
        magSulfurTabOverview: '제품 개요',
        magSulfurTabFeatures: '핵심 특징',
        magSulfurTabUsage: '사용 방법',
        magSulfurTabRecommend: '추천 · FAQ',
        magSulfurTabPrecaution: '주의사항',
        magSulfurLabelListing: '공시번호',
        magSulfurLabelNetWeight: '규격',
        magSulfurOverviewIntroTitle: '한 줄 소개',
        magSulfurRawTitle: '주원료',
        magSulfurUsageTitle: '주요 사용처',
        magSulfurCompPctTitle: '주성분량(%)',
        magSulfurFeatureColTitle: '제목',
        magSulfurFeatureColDesc: '내용',
        magSulfurCropTableTitle: '작물별 권장 시비량 (예시, 10a/300평 기준)',
        magSulfurCropColCrop: '작물',
        magSulfurCropColBags: '시비량',
        magSulfurCropColAmount: '사용량',
        magSulfurCropColMethod: '시비 방법',
        magSulfurRecommendTitle: '이런 분께 추천합니다',
        magSulfurFaqTitle: '자주 묻는 질문',
        magSulfurListingTitle: '유기농업자재 표시사항',
        magSulfurListingColItem: '항목',
        magSulfurListingColDetail: '내용',

        vitaGoldPrecautionTitle: '생생비타골드 사용 및 보관시 주의사항',
        vitaGoldPrecautionItems: [
            '과다 시비는 오히려 작물에 해로울 수 있으니 권장량 준수해 주십시오.',
            '유기물을 함유하여 제품 내부에 미생물이 자연적으로 증식할 경우 미량의 가스가 발생할 수 있습니다. 이로 인해 용기가 부풀어 오르는 현상이 나타날 수 있습니다. 이러한 현상은 제품의 특성상 자연스러운 현상으로 제품의 품질과 효능에는 큰 영향을 미치지 않습니다.',
            '원액으로 사용하지 마시고, 반드시 정해진 비율로 물에 희석하여 사용하십시오.',
            '석회유황합제, 보르도액, 액상규산 등 강알칼리성 자재와 혼용하지 마십시오.',
            '고온기에는 한낮 살포를 피하고, 기준 농도보다 20%가량 묽게 희석하여 사용하십시오.',
            '고온이나 가뭄 등 토양이 건조할 경우 사용을 피하십시오.',
            '유통 중 저온으로 인하여 침전이 생길 수가 있으나 침전물을 잘 흔들어 사용하면 제품의 효과에는 문제가 없습니다.',
            '본 제품은 농약과 혼용시 혼용가부를 확인한 후 살포하십시오.',
            '개봉한 제품은 가급적 빨리 사용하시고 남은 제품은 서늘한 곳에 잘 밀봉하여 보관하십시오.'
        ],
        compareTitleTpl: '{name} 농가 사용 사례: 사용 전후 비교',
        compareBefore: '사용전',
        compareAfter: '사용후',
        sugarRate: '당도 증가율 (농가 실측)',
        sugarNote: '사용 전 14.0 → 사용 후 18.0Brix · 1개 농가 실측',
        dropRate: '낙과 감소율 (인터뷰 기반 추정)',
        dropNote: '평년 대비 약 1/3 수준 · 농가 인터뷰로 추정',
        aiImageBadge: 'AI 생성 이미지',
        compareAiNote: '사진은 이해를 돕기 위해 AI로 만든 이미지입니다. 당도 수치(사용 전 14.0 → 사용 후 18.0 Brix)는 농가에서 실제 측정한 값입니다.',
        caseNote: '1개 농가의 사용 사례이며 효과를 보장하지 않습니다. 기상, 토양, 재배 관리에 따라 결과는 달라질 수 있습니다.',
        featuresTitle: '제품특징',
        feature1Title: '핵심 성분',
        feature1Desc: '식물성 아미노산 17종 + 필수 미량원소',
        feature2Title: '시비 방식',
        feature2Desc: '엽면시비 · 토양관주 모두 가능',
        feature3Title: '혼용 시 확인',
        feature3Desc: '농약과 혼용할 때는 소량으로 혼용 가부를 먼저 확인',
        feature4Title: '현장 사례',
        feature4Desc: '복숭아 과원 사용 사례 (인회농장)',
        feature5Title: '생육기 영양 보충',
        feature5Desc: '아미노산과 미량원소로 생육기 영양 공급',
        feature6Title: '저온·고온기 활용',
        feature6Desc: '생육 환경이 불리한 시기의 영양 관리에 활용',
        feature7Title: '처음 사용할 때',
        feature7Desc: '일부 면적에 먼저 살포해 작물 반응을 확인한 뒤 확대 사용',
        methodTitleTpl: '{name} 권장 시비 방법',
        method1Title: '목면시비',
        method1Dose: '물 500L당 500ml',
        method1Note: '개화 전 1~2회',
        method2Title: '엽면시비',
        method2Dose: '물 500L당 500~600ml',
        method2Note: '10~14일 간격 · 농약 혼용 시 사전 확인',
        method3Title: '토양 관주',
        method3Dose: '300평(1,000㎡)당 700ml~1L',
        method3Note: '월 1~2회',
        interviewTitle: '인회농장주 실제 대화 인터뷰 요약',
        interviewFarmName: '인회농장',
        interviewFarmMeta: '복숭아 과수 · 현장 후기',
        interviewStarAria: '별점 5점',
        interviewQ1: '낙과가 거의 없어요!',
        interviewA1: '낙과가 평년 대비 <span class="font-bold text-[#2D8A3E]">1/3 수준</span>으로 확 줄었어요. 수확량 걱정이 한결 줄었어요.',
        interviewQ2: '당도가 <span class="text-[#2D8A3E]">18브릭스</span>까지 나왔어요',
        interviewA2: '당도가 18 브릭스까지 나오고, 상품성이 확실히 달라졌어요.',
        interviewNote: '농가 인터뷰를 요약한 개인의 사용 경험이며, 효과를 보장하지 않습니다.',
        interviewQ3: '약해도 안 나타나요',
        interviewA3: '다른 약과 같이 쳐도 연두색 약해가 전혀 안 나타나고, 잎이 건강하게 유지됩니다.'
    };

    var uiEn = {
        closeAria: 'Close',

        farmTitle: '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold">Farm Fertilizer Rate Calculator</span>',
        farmCropPrompt: 'Select your crop type.',
        cropFoodName: 'Grain crops',
        cropFoodDesc: 'Rice / barley / corn',
        cropVegName: 'Leafy & fruiting veg',
        cropVegDesc: 'Pepper / lettuce / cabbage / garlic',
        cropFruitName: 'Orchard crops',
        cropFruitDesc: 'Apple / pear / peach / tomato',
        cropGreenName: 'Other',
        cropGreenDesc: 'Turf / golf course / pasture',
        farmAreaPrompt: 'Enter your cultivation area.',
        farmAreaPlaceholder: 'Enter area',
        farmAreaAria: 'Cultivation area',
        farmAreaResetAria: 'Reset area',
        farmUnitAria: 'Area unit',
        unitPyeong: 'pyeong',
        unitM2: '㎡',
        unitHa: 'ha',
        farmAreaLimit: 'Calculations are capped at 100,000.',
        resultTitle: 'Result',
        farmBagsProductLine: 'Granular Silicate Fertilizer · 20 kg/bag',
        farmBagsUnit: 'bags',
        farmBagsImgAlt: 'Granular Silicate Fertilizer',
        farmVitaLine: 'Saengsaeng Vita 40 · diluted drench / foliar',
        farmVitaDilutionTip: 'Recommended dilution: 500–1,000×',
        farmVitaImgAlt: 'Saengsaeng Vita 40',

        orchardTitle: '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold"><span class="text-[#2D8A3E]">Inhoe Farm</span>–based Orchard Profit Estimator</span>',
        orchardAreaPrompt: 'Enter your orchard area. <span class="text-base max-md:text-sm font-semibold text-[#9CA3AF]">(㎡)</span>',
        orchardAreaPlaceholder: 'Enter area',
        orchardAreaAria: 'Orchard area (㎡)',
        orchardAreaResetAria: 'Reset area',
        orchardAreaLimit: 'Calculations are capped at {n}.',
        orchardPricePrompt: 'Enter a typical price per box. <span class="text-base max-md:text-sm font-semibold text-[#9CA3AF]">(4 kg / USD)</span>',
        orchardPricePlaceholder: 'Enter price',
        orchardPriceAria: 'Price per box (USD)',
        orchardPriceResetAria: 'Reset price',
        orchardPriceLimit: 'Calculations are capped at 1,000.',
        orchardQuick1man: '+$10',
        orchardQuick10man: '+$100',
        orchardBoxesLabel: 'Estimated boxes saved from fruit drop',
        orchardNote: 'A reference estimate based on figures inferred from the Inhoe Farm interview (about 0.27 boxes per pyeong); actual results are not guaranteed.',
        orchardBoxesUnit: 'boxes',
        orchardProfitLabel: 'Estimated gain from sugar premium + yield',
        orchardWonUnit: 'USD',

        vitaCalcTitle: '<span class="text-2xl max-lg:text-xl max-md:text-lg font-extrabold"><span class="text-[#2D8A3E]">Saengsaeng Vita 40</span> Field Dilution Calculator</span>',
        vitaWaterPrompt: 'Enter water volume. <span class="text-base max-md:text-sm font-semibold text-[#9CA3AF]">(liters)</span>',
        vitaWaterPlaceholder: 'Enter water volume',
        vitaWaterAria: 'Water volume',
        vitaWaterResetAria: 'Reset water volume',
        vitaWaterLimit: 'Calculations are capped at 100,000.',
        vitaQuickLiter: 'L',
        vitaDilutionPrompt: 'Select your target dilution rate.',
        vitaDilutionAria: 'Target dilution rate',
        vitaOpt500: '500× (high-concentration orchard)',
        vitaOpt700: '700×',
        vitaOpt1000: '1,000× (general recommendation)',
        vitaResultLabel: 'Saengsaeng Vita 40 to add',
        hintEmpty: 'Enter water volume and dilution rate to calculate the dose.',
        hintWithLiters: 'About {l} L · based on {n}× dilution',
        hintDilutionOnly: 'Based on {n}× dilution',
        vitaResultImgAlt: 'Saengsaeng Vita 40',

        msdsDownload: 'Download MSDS',
        sectionSpec: 'Specifications',
        sectionUsage: 'Primary uses',
        sectionBenefits: 'Benefits',
        sectionTiming: 'Application timing',
        sectionTimingDef: 'Timing · deficiency signs',
        sectionMethod: 'How to apply',
        sectionFeatures: 'Features',
        sectionPrecautionStorage: 'Use & storage precautions',
        sectionOrganicListing: 'Organic input labeling',
        sectionStdDose: 'Recommended rate 300 pyeong (1,000㎡)',
        sectionRecommend: 'Recommended for',
        sectionFaq: 'FAQ',
        warning: 'Caution',
        imageSoon: 'Product image coming soon',
        ctaFarmCalc: 'Calculate my farm rate',
        ctaHeukdoram: 'Heuktoram',
        ctaVitaDilution: 'Calculate field dilution',
        sampleAltSuffix: ' sample',

        vita40Name: 'Saengsaeng Vita 40',
        vitaGoldName: 'Saengsaeng Vita Gold',
        vita40SpecLine: 'N-P-K 3-1-1 · Amino acids 20% · Organic matter 25%',
        vita40Desc: 'A high-concentrate blend of 17 plant amino acids plus organic matter and essential micronutrients to supply nutrients during growth and support fruit sizing and coloring.',
        vitaGoldSpecLine: 'N-P-K 2-1-2 · Plant amino acids 15% · Organic matter 25%',
        vitaGoldDesc: 'A fermentation-process product that supports balanced nutrition through soil drench and foliar feeding, helping root vitality and soil microbial activity.',
        vitaGoldWhyTitle: 'Why leading farms choose Saengsaeng Vita',
        vitaGoldWhyItems: [
            'Developed with a fermentation process that promotes crop growth and root vitality. Soil drench and foliar feeding help crops absorb balanced nutrition and build their own resilience.',
            'Promotes root development and crop growth, and increases nutrient uptake by activating soil microorganisms.'
        ],
        vitaGoldKeysTitle: 'Core strengths',
        vitaGoldKey1Title: 'Premium amino acids',
        vitaGoldKey1Items: [
            'Fast uptake and maximized effect',
            'Relief from environmental stress',
            'Quality improvement (sugar, color, flavor)',
            'Stronger soil fertility',
            'Maximized micronutrient supply'
        ],
        vitaGoldKey2Title: 'Protein & organic matter',
        vitaGoldKey2Parts: [
            { label: 'Protein:', text: 'Supplies nitrogen to support cell growth and tissue formation.' },
            { label: 'Organic matter:', text: 'Activates soil microbes, improves soil properties, and supports nutrient uptake.' }
        ],
        vitaGoldKey3Title: '17 plant amino acids',
        vitaGoldKey3Lines: [
            'Free amino acids that crops absorb easily, supporting active growth.',
            'Especially strengthens root development, photosynthesis, coloring, and sugar accumulation.'
        ],
        vitaGoldKey4Title: 'Microbial activation',
        vitaGoldKey4Items: [
            'Promotes organic matter breakdown and greater nutrient uptake.',
            'Builds healthier soil so crops can grow in a better environment.'
        ],
        vitaGoldCompositionTitle: 'Saengsaeng Vita – main components (%)',
        vitaGoldCompColNpk: 'N-P-K',
        vitaGoldCompColAmino: 'Amino acids',
        vitaGoldCompColOrganic: 'Organic matter',
        vitaGoldCompColMicro: 'Micro-elements',
        vitaGoldCompNpk: '2-1-2',
        vitaGoldCompAmino: '15',
        vitaGoldCompOrganic: '25',
        vitaGoldCompMicro: 'Boron, molybdenum, zinc, sulfur, magnesium',
        vitaGoldCompColFunc: 'Functional substances',
        vitaGoldCompFunc: 'Humic acid, fulvic acid, phytic acid',
        vitaGoldCompGuarantee: 'Guaranteed analysis: water-soluble boron (B) ≥ 0.05%, water-soluble molybdenum (Mo) ≥ 0.0005%',
        vitaGoldDoseTitle: 'Recommended rates (example)',
        vitaGoldDoseH1: 'Crop',
        vitaGoldDoseH2: 'Timing',
        vitaGoldDoseH3: 'Method',
        vitaGoldDoseH4: 'Dilution',
        vitaGoldDoseH5: 'Mix rate',
        vitaGoldDoseH6: '150 pyeong',
        vitaGoldDoseCrop: 'All crops',
        vitaGoldDoseSeason: 'Growing season',
        vitaGoldDoseMethodDrench: 'Soil drench',
        vitaGoldDoseMethodFoliar: 'Foliar spray',
        vitaGoldDoseRatio500Mid: '500× (mid–late)',
        vitaGoldDoseRatio1000Early: '1,000× (early)',
        vitaGoldDoseMix500DrenchMid: '2 L per 1 t of water, 4 L per 2 t',
        vitaGoldDoseMix1000DrenchEarly: '1 L per 1 t of water, 2 L per 2 t',
        vitaGoldDoseArea500DrenchMid: '2–4 L / 150 pyeong',
        vitaGoldDoseArea1000DrenchEarly: '1–2 L / 150 pyeong',
        vitaGoldDoseMix500FoliarMid: '2 L per 1 t of water, 1 L per 500 L',
        vitaGoldDoseMix1000FoliarEarly: '1 L per 1 t of water, 0.5 L per 500 L',
        vitaGoldDoseNote: 'Adjust the rate for crop type and growth stage.',
        vitaGoldDoseHaNote: 'Approximate soil-drench rate per hectare: 40–80 L at 500×, 20–40 L at 1,000×',
        vitaGoldTipsTitle: 'Field tips for optimal absorption',
        vitaGoldTipsItems: [
            'Application time: spray in the early morning or at dusk to maximize stomatal absorption.',
            'Spray area: spray thoroughly, evenly coating the leaves including the underside where stomata are.',
            'Application interval: during peak growth, drench or spray 2–3 times in a row at 7–10-day intervals.'
        ],
        vitaGoldCropTableTitle: 'Crops & application',
        vitaGoldCropColCrop: 'Crop',
        vitaGoldCropColTiming: 'Timing',
        vitaGoldCropColFreq: 'Frequency',
        vitaGoldCropColEffect: 'Effect',
        vitaGoldCropGroups: [
            {
                crop: 'Fruit trees (apple, pear, grape, citrus, peach)',
                entries: [
                    { timing: 'Pre-bloom, 2 weeks after petal fall', freq: '1–2×', effect: 'Cold tolerance, misshapen fruit prevention' },
                    { timing: 'Young fruit sizing', freq: '2–3× (7-day interval)', effect: 'Fruit sizing' },
                    { timing: 'Color break', freq: '3–4× at 7-day intervals', effect: 'Quality and yield' }
                ]
            },
            {
                crop: 'Vegetables (melon, pepper, tomato, strawberry, etc.)',
                entries: [
                    { timing: 'Seedling stage', freq: 'Every 7–10 days (drench/spray)', effect: 'Seedlings, set & sizing, yield' },
                    { timing: 'Early to peak growth', freq: '2–3×/mo., 10-day interval', effect: 'Quality, cold tolerance, yield' }
                ]
            },
            {
                crop: 'Rice',
                entries: [
                    { timing: 'Full season', freq: '3–4 foliar applications', effect: 'Quality and yield' }
                ]
            },
            {
                crop: 'Specialty crops (ginseng, deodeok)',
                entries: [
                    { timing: 'Early–mid growth', freq: '2–3×/month, 7-day interval spray', effect: 'Quality and yield' }
                ]
            },
            {
                crop: 'Potato, sweet potato',
                entries: [
                    { timing: 'Early–mid growth', freq: '3–4 spray applications', effect: 'Quality and yield' }
                ]
            }
        ],
        magSulfurTabOverview: 'Overview',
        magSulfurTabFeatures: 'Key benefits',
        magSulfurTabUsage: 'How to apply',
        magSulfurTabRecommend: 'For you · FAQ',
        magSulfurTabPrecaution: 'Precautions',
        magSulfurLabelListing: 'Listing No.',
        magSulfurLabelNetWeight: 'Net weight',
        magSulfurOverviewIntroTitle: 'In brief',
        magSulfurRawTitle: 'Main raw materials',
        magSulfurUsageTitle: 'Primary uses',
        magSulfurCompPctTitle: 'Main components (%)',
        magSulfurFeatureColTitle: 'Theme',
        magSulfurFeatureColDesc: 'Details',
        magSulfurCropTableTitle: 'Example rates per 10a (300 pyeong)',
        magSulfurCropColCrop: 'Crop',
        magSulfurCropColBags: 'Bags',
        magSulfurCropColAmount: 'Product',
        magSulfurCropColMethod: 'Method',
        magSulfurRecommendTitle: 'Recommended for',
        magSulfurFaqTitle: 'FAQ',
        magSulfurListingTitle: 'Organic input labeling',
        magSulfurListingColItem: 'Item',
        magSulfurListingColDetail: 'Details',

        vitaGoldPrecautionTitle: 'Use & storage precautions',
        vitaGoldPrecautionItems: [
            'Over-application can harm crops—follow the recommended rate.',
            'Organic matter may allow natural microbial growth and a small amount of gas; containers may swell. This is normal and does not significantly affect quality or efficacy.',
            'Do not use undiluted—always dilute with water to the specified ratio.',
            'Do not mix with strongly alkaline materials (e.g., lime sulfur, Bordeaux mixture, liquid silicate).',
            'In hot weather, avoid midday application and dilute about 20% more than the standard rate.',
            'Avoid use when soil is dry due to heat or drought.',
            'Sediment may form at low temperatures during distribution; shake well before use—efficacy is unchanged.',
            'Check tank-mix compatibility before spraying with pesticides.',
            'Use opened product promptly; seal and store remainder in a cool place.'
        ],
        compareTitleTpl: 'Grower case: before and after {name}',
        compareBefore: 'Before',
        compareAfter: 'After',
        sugarRate: 'Sugar increase (grower-measured)',
        sugarNote: '14.0 → 18.0 Brix · measured on one farm',
        dropRate: 'Fruit-drop reduction (estimated from interview)',
        dropNote: 'About one-third of a typical year · estimated from grower interview',
        aiImageBadge: 'AI-generated image',
        compareAiNote: 'The photos are AI-generated illustrations. The sugar readings (14.0 → 18.0 Brix before and after use) were measured on the farm.',
        caseNote: 'This is one grower\'s experience and is not a guarantee of results. Outcomes vary with weather, soil and crop management.',
        featuresTitle: 'Key features',
        feature1Title: 'Core ingredients',
        feature1Desc: '17 plant amino acids + essential micronutrients',
        feature2Title: 'Application',
        feature2Desc: 'Foliar spray or soil drench',
        feature3Title: 'Check before tank-mixing',
        feature3Desc: 'Test compatibility in a small batch before mixing with crop protectants',
        feature4Title: 'Field case',
        feature4Desc: 'Use case from a peach orchard (Inhoe Farm)',
        feature5Title: 'Nutrition during growth',
        feature5Desc: 'Supplies amino acids and micronutrients during the growing season',
        feature6Title: 'Cold and hot periods',
        feature6Desc: 'Used for nutrient management when growing conditions are unfavorable',
        feature7Title: 'First-time use',
        feature7Desc: 'Spray a small area first and check crop response before wider use',
        methodTitleTpl: 'Recommended application for {name}',
        method1Title: 'Bark application (trunk & branches)',
        method1Dose: '500 ml per 500 L water',
        method1Note: '1–2 times before bloom',
        method2Title: 'Foliar spray',
        method2Dose: '500–600 ml per 500 L water',
        method2Note: 'Every 10–14 days · check before tank-mixing',
        method3Title: 'Soil drench',
        method3Dose: '700 ml–1 L per 300 pyeong (1,000㎡)',
        method3Note: '1–2 times per month',
        interviewTitle: 'Inhoe Farm grower interview highlights',
        interviewFarmName: 'Inhoe Farm',
        interviewFarmMeta: 'Peach orchard · field feedback',
        interviewStarAria: '5-star rating',
        interviewQ1: 'Almost no fruit drop!',
        interviewA1: 'Fruit drop fell to about <span class="font-bold text-[#2D8A3E]">one-third of a typical year</span>. Yield worries eased a lot.',
        interviewQ2: 'Sugar reached <span class="text-[#2D8A3E]">18 Brix</span>',
        interviewA2: 'Sugar reached 18 Brix and market quality clearly improved.',
        interviewNote: 'A summary of one grower\'s own experience; results are not guaranteed.',
        interviewQ3: 'No phytotoxicity either',
        interviewA3: 'Even when mixed with other sprays, we saw no yellow-green burn and leaves stayed healthy.'
    };

    var products = {
        silicate: {
            ko: {
                제품명: '입상규산질비료',
                카테고리: 'SOIL CONDITIONER 01',
                서브타이틀: '줄기·잎 세포벽을 강화하여 도복을 줄이고 작물이 튼튼하게 자라도록 돕습니다.',
                규격: [
                    { label: '가용성규산(SiO₂)', value: '25%' },
                    { label: '알카리분', value: '40%' },
                    { label: '구용성고토(C-MgO)', value: '2%' }
                ],
                규격_보충설명: '토양에서 미생물 분해 능력을 높입니다.',
                주요사용처: [
                    { label: '벼', detail: '규산 요구가 높은 대표 작물', icon: 'grass' },
                    { label: '보리', detail: '규산 흡수로 도복·생육 강화', icon: 'agriculture' },
                    { label: '옥수수', detail: '줄기·잎 조직 강화에 효과적', icon: 'nutrition' },
                    { label: '잔디', detail: '잎을 곧고 단단하게 유지', icon: 'yard' },
                    { label: '목초', detail: '가뭄·환경 스트레스 내성 향상', icon: 'eco' },
                    { label: '대나무', detail: '규산 다량 흡수 작물', icon: 'forest' },
                    { label: '죽순', detail: '규산 다량 흡수 작물', icon: 'spa' }
                ],
                효능: [
                    { headline: '양분 흡수 균형', desc: '가용성 규산 25%, 알카리분 40%와 구용성 고토 2%를 함유해 질소 과잉흡수와 인산 흡수를 억제합니다.' },
                    { headline: '토양 수분 보존', desc: '토양에서의 수분 증발을 감소시킵니다.' },
                    { headline: '환경 스트레스 내성', desc: '작물의 잎을 곧고 빳빳하고 단단하게 하며, 가뭄 같은 환경적 스트레스를 견디는 능력을 높입니다.' },
                    { headline: '광합성·도복·서리', desc: '광합성을 높이고 도복을 방지하며 서리 피해를 줄입니다.' },
                    { headline: '조직 강화', desc: '규산이 잎과 줄기의 표피 조직을 단단하게 하여 작물이 건강하게 자라도록 돕습니다.' },
                    { headline: '도복 방지·동화작용', desc: '잎과 줄기가 빳빳해져 도복을 방지하고, 아랫잎까지 햇빛을 받아 탄소 동화 작용이 잘됩니다.' }
                ],
                사용시기: [
                    '규산질 비료는 주는 시기에 따른 효과 차이가 거의 없어, 봄갈이·가을에 주어도 좋고, 모낸 후 15일 안에 웃거름으로 주거나 출수기 30일 전까지 추비로 주어도 됩니다.',
                    '규산은 물에 녹지 않고 산(작물 뿌리나 미생물에서 분비되는 산, 유기물 분해 때 발생하는 유기 산 등)에 녹습니다.'
                ],
                사용방법: [
                    '10a(300평(1,000㎡))당 보통 200~300kg(10~15포)를 사용합니다.',
                    '규산 함량 1ppm이 부족한 경우 3.8kg/10a(실량)의 규산질 비료가 필요합니다.',
                    '규산을 많이 흡수하는 벼, 보리, 옥수수, 잔디, 목초, 대나무, 죽순 등에 특히 알맞습니다.'
                ]
            },
            en: {
                제품명: 'Granular Silicate Fertilizer',
                카테고리: 'SOIL CONDITIONER 01',
                서브타이틀: 'Strengthens stem and leaf cell walls to reduce lodging and help crops grow sturdy.',
                규격: [
                    { label: 'Soluble silica (SiO₂)', value: '25%' },
                    { label: 'Alkali content', value: '40%' },
                    { label: 'Citrate-soluble magnesia (C-MgO)', value: '2%' }
                ],
                규격_보충설명: 'Supports microbial breakdown activity in the soil.',
                주요사용처: [
                    { label: 'Rice', detail: 'The classic high-silica crop', icon: 'grass' },
                    { label: 'Barley', detail: 'Silica uptake for lodging resistance and growth', icon: 'agriculture' },
                    { label: 'Corn', detail: 'Strengthens stem and leaf tissue', icon: 'nutrition' },
                    { label: 'Turf', detail: 'Keeps blades upright and firm', icon: 'yard' },
                    { label: 'Forage', detail: 'Better drought and stress tolerance', icon: 'eco' },
                    { label: 'Bamboo', detail: 'High silica-absorbing crop', icon: 'forest' },
                    { label: 'Bamboo shoot', detail: 'High silica-absorbing crop', icon: 'spa' }
                ],
                효능: [
                    { headline: 'Balanced nutrient uptake', desc: 'With 25% soluble silica, 40% alkali content and 2% citrate-soluble magnesia, it helps curb excess nitrogen uptake and phosphate absorption.' },
                    { headline: 'Soil moisture retention', desc: 'Reduces moisture loss from the soil.' },
                    { headline: 'Environmental stress tolerance', desc: 'Keeps leaves upright, stiff and firm, helping crops withstand drought and other field stress.' },
                    { headline: 'Photosynthesis, lodging & frost', desc: 'Boosts photosynthesis, helps prevent lodging, and reduces frost damage.' },
                    { headline: 'Stronger tissue', desc: 'Silica firms up the outer tissue of leaves and stems, helping crops grow healthily.' },
                    { headline: 'Lodging prevention & assimilation', desc: 'Firms leaves and stems to resist lodging so lower leaves still catch light for carbon assimilation.' }
                ],
                사용시기: [
                    'Timing has little effect on results—apply at spring or fall tillage, as a topdress within 15 days after transplanting, or as a side dressing up to 30 days before heading.',
                    'Silica does not dissolve in water; it dissolves in acids released by roots, microbes, and organic-matter breakdown.'
                ],
                사용방법: [
                    'Typically 200–300 kg (10–15 bags) per 10a (300 pyeong (1,000㎡)).',
                    'If available silica is short by 1 ppm, about 3.8 kg/10a (actual product) of silicate fertilizer is needed.',
                    'Especially suited to high-silica crops such as rice, barley, corn, turf, forage, bamboo and bamboo shoot.'
                ]
            },
            이미지: {
                package_shot: 'assets/img/product-line-01-01.png',
                sample_shot: 'assets/img/product-line-01-01-sample.png'
            },
            MSDS: 'assets/msds/20260130 MSDS-입상규산질(★) Rev.2 (최종).pdf'
        },

        limestone: {
            ko: {
                제품명: '입상석회고토비료',
                카테고리: 'SOIL CONDITIONER 02',
                서브타이틀: '산성토양을 중성으로 개량하고, 칼슘과 마그네슘을 공급하여 엽록소 향상과 뿌리 활력에 도움을 줍니다.',
                규격: [
                    { label: '알카리분', value: '51%' },
                    { label: '가용성고토(MgO)', value: '14%' }
                ],
                주요사용처: [
                    { label: '과수', detail: '산성토양 개량과 과실 품질 향상에 효과적', icon: 'park' },
                    { label: '밭작물', detail: '채소·두류 등 밭작물의 pH 교정', icon: 'spa' }
                ],
                효능: [
                    { headline: '토양 산도 중화', desc: '산성토양을 중성토양으로 개량해 유효 미생물 활동을 활발하게 합니다.' },
                    { headline: '엽록소·단백질 형성 촉진', desc: '고토(마그네슘)가 신진대사와 단백질·인산 흡수를 촉진합니다.' },
                    { headline: '당도·저장성 향상', desc: '과실의 당도를 높이고 저장 기간을 늘려 품질을 향상시킵니다.' },
                    { headline: '토양 구조 개선', desc: '빠른 용해도로 기존 분상(粉狀) 이상의 비효를 발휘하며, 물과 공기의 흐름을 개선합니다.' },
                    { headline: '중금속 흡수 억제', desc: '중성토양으로 개량하여 작물의 중금속 흡수를 억제합니다.' }
                ],
                사용시기_결핍진단: [
                    '고토결핍: 잎이 황백화되고, 작물 전체가 황색화되어 생육이 현저히 감소하면 시용합니다.',
                    '석회결핍: 배추·양배추·셀러리 속썩음, 고추·토마토 배꼽썩음, 오이·감귤 껍질썩음병 등 발생 시 시용합니다.',
                    '시비량은 토양의 종류, 농작물, 기후 상태에 따라 달라집니다.'
                ],
                사용방법: [
                    'pH 6.5 미만의 농경지에 사용합니다. 특히 보리·콩·시금치·배추·고추·양파·마늘·참외 등 채소와 과수에 효과가 큽니다.',
                    '한 번 시비시 효과가 3년 지속됩니다. (5~10bags(100~200kg) per 10,000㎡)',
                    '알칼리성 비료이므로 유안·초안과석·용과린·인분·닭똥 등 산성 비료와 접촉 시 효과가 떨어지므로, 이런 비료를 주기 2주 전에 시용합니다.',
                    '파종 또는 이식 1~2주 전에 하는 것이 바람직합니다.',
                    '유기질비료와 함께 사용하면 유기질비료의 분해가 빨라집니다.'
                ],
                주의사항_경고배지: '미숙 퇴비 및 질소·인산 비료와 함께 살포하지 않습니다. 양분 손실과 가스 장해를 줄이기 위해 본 제품을 먼저 살포하고 로터리 작업을 한 뒤, 최소 2주 후에 퇴비나 비료를 사용합니다.'
            },
            en: {
                제품명: 'Granular Lime Magnesia Fertilizer',
                카테고리: 'SOIL CONDITIONER 02',
                서브타이틀: 'Improves acidic soil toward neutral, supplies calcium and magnesium, and helps chlorophyll development and root vigor.',
                규격: [
                    { label: 'Alkali content', value: '51%' },
                    { label: 'Soluble magnesia (MgO)', value: '14%' }
                ],
                주요사용처: [
                    { label: 'Orchards', detail: 'Acid-soil correction and better fruit quality', icon: 'park' },
                    { label: 'Upland crops', detail: 'pH correction for vegetables, beans and more', icon: 'spa' }
                ],
                효능: [
                    { headline: 'Neutralizes soil acidity', desc: 'Moves acid soils toward neutral and supports beneficial microbial activity.' },
                    { headline: 'Supports chlorophyll & protein', desc: 'Magnesia (Mg) aids metabolism and protein/phosphate uptake.' },
                    { headline: 'Sugar & shelf life', desc: 'Raises fruit sugar and helps extend storage life.' },
                    { headline: 'Improves soil structure', desc: 'High dissolution rate delivers effects beyond conventional powder forms and improves water and air flow.' },
                    { headline: 'Limits heavy-metal uptake', desc: 'Moving soil toward neutral helps curb heavy-metal uptake by crops.' }
                ],
                사용시기_결핍진단: [
                    'Magnesia deficiency: apply when leaves bleach yellow-white and the whole plant yellows with clearly weaker growth.',
                    'Lime deficiency: apply when you see tipburn/heart rot in cabbage-family crops and celery, blossom-end rot on pepper/tomato, or peel disorders on cucumber/citrus.',
                    'Rate depends on soil type, crop and climate.'
                ],
                사용방법: [
                    'Use on farmland below pH 6.5. Especially effective on vegetables and fruit—barley, soybean, spinach, cabbage, pepper, onion, garlic, oriental melon and more.',
                    'When applied once, the effect lasts about 3 years. (5–10 bags / 100–200 kg per 10,000㎡)',
                    'As an alkaline fertilizer, keep it away from acidic materials such as ammonium sulfate, ammonium nitrate–superphosphate mixes, fused phosphate, human manure and chicken manure—apply about 2 weeks before those products.',
                    'Best applied 1–2 weeks before sowing or transplanting.',
                    'Used with organic fertilizer, it speeds organic-matter breakdown.'
                ],
                주의사항_경고배지: 'Do not apply together with unfinished compost or nitrogen and phosphate fertilizers. To reduce nutrient loss and gas damage, broadcast this product first, rotary-till, then apply compost or fertilizer at least 2 weeks later.'
            },
            이미지: {
                package_shot: 'assets/img/product-line-01-02.png',
                sample_shot: 'assets/img/product-line-01-02-sample.jpg'
            },
            MSDS: 'assets/msds/20260130 MSDS-입상석회고토(★) Rev.5 (최종).pdf'
        },

        calciumSulfur: {
            ko: {
                제품명: '칼슘유황비료',
                카테고리: 'SOIL CONDITIONER 03',
                서브타이틀: '토양 pH 변화 부담을 줄이며 칼슘과 유황을 공급하는 밑거름·웃거름 처방입니다.',
                규격: [
                    { label: '칼슘(석회, CaO)', value: '26%' },
                    { label: '유황(SO₃)', value: '32%' }
                ],
                주요사용처: [
                    { label: '칼슘결핍예방', detail: '수박·토마토·고추 등', icon: 'health_and_safety' },
                    { label: '당도증가', detail: '수박·참외·사과·토마토·딸기·감귤 등', icon: 'nutrition' },
                    { label: '무·배추', detail: '속이 꽉 찬 고품질 무·배추 수량 증가', icon: 'spa' },
                    { label: '향신작물', detail: '마늘·양파·고추 등', icon: 'local_florist' },
                    { label: '뿌리작물', detail: '땅콩·마·우엉·당근 등', icon: 'park' },
                    { label: '수량증가', detail: '감자·옥수수·대파·돌산갓 등', icon: 'trending_up' },
                    { label: '경사지', detail: '토양 침식이 강한 밭·과수원·산림지', icon: 'landscape' },
                    { label: '간척지', detail: '염분 농도가 높은 간척지, 산도가 높은 시설 재배지', icon: 'water_drop' }
                ],
                효능: [
                    { headline: '칼슘·황 동시 공급', desc: '밭작물, 과수, 원예작물 전반에 사용할 수 있습니다.' },
                    { headline: '건전한 생육', desc: '칼슘과 황을 함께 공급하여 감자, 옥수수 등 작물의 건전한 생육을 돕습니다.' },
                    { headline: '당도·향·색깔 향상', desc: '작물의 당도, 향, 색깔을 향상시키고 원예작물의 수확량을 증가시킵니다.' },
                    { headline: '간척지 토양 개량', desc: '칼슘 성분이 나트륨이 많은 간척지 토양의 개량에 활용됩니다.' },
                    { headline: '토양구조 개선', desc: '통기성 및 삼투압을 증가시켜 영양소 유실과 토양침식을 감소시킵니다.' }
                ],
                표준시비량: '10a(300평(1,000㎡))당 100~200kg(5~10포)를 사용하며, 토양 및 작물의 상태에 따라 가감합니다.',
                주의사항_경고배지: '토양과 잘 혼합될 수 있도록 시비 후 깊게 섞어주십시오.'
            },
            en: {
                제품명: 'Calcium-Sulfur Fertilizer',
                카테고리: 'SOIL CONDITIONER 03',
                서브타이틀: 'Supplies calcium and sulfur as base or topdress with less pH-shift burden on the soil.',
                규격: [
                    { label: 'Calcium (lime, CaO)', value: '26%' },
                    { label: 'Sulfur (SO₃)', value: '32%' }
                ],
                주요사용처: [
                    { label: 'Calcium deficiency prevention', detail: 'Watermelon, tomato, pepper and more', icon: 'health_and_safety' },
                    { label: 'Higher sugar', detail: 'Watermelon, melon, apple, tomato, strawberry, citrus and more', icon: 'nutrition' },
                    { label: 'Radish & cabbage', detail: 'Fuller heads and higher marketable yield', icon: 'spa' },
                    { label: 'Spice crops', detail: 'Garlic, onion, pepper and more', icon: 'local_florist' },
                    { label: 'Root crops', detail: 'Peanut, yam, burdock, carrot and more', icon: 'park' },
                    { label: 'Yield support', detail: 'Potato, corn, green onion, mustard greens and more', icon: 'trending_up' },
                    { label: 'Slopes', detail: 'Erosion-prone fields, orchards and forest land', icon: 'landscape' },
                    { label: 'Reclaimed land', detail: 'High-salt reclaimed soils and high-acidity greenhouse soils', icon: 'water_drop' }
                ],
                효능: [
                    { headline: 'Calcium + sulfur together', desc: 'Suitable across upland crops, orchards and horticultural crops.' },
                    { headline: 'Healthy crop growth', desc: 'Supplies calcium and sulfur together to support healthy growth of crops such as potato and corn.' },
                    { headline: 'Sugar, aroma & color', desc: 'Improves sugar, aroma and color while supporting horticultural yields.' },
                    { headline: 'Reclaimed-land soil improvement', desc: 'Its calcium is used to improve sodium-rich reclaimed soils.' },
                    { headline: 'Better soil structure', desc: 'Improves aeration and osmotic conditions, helping cut nutrient loss and erosion.' }
                ],
                표준시비량: 'Use 100–200 kg (5–10 bags) per 10a (300 pyeong (1,000㎡)); adjust for soil and crop condition.',
                주의사항_경고배지: 'Mix thoroughly into the soil after application so the product is well incorporated.'
            },
            이미지: {
                package_shot: 'assets/img/or-03.png',
                sample_shot: 'assets/img/product-line-01-03-sample.jpg'
            }
        },

        organicSilicate: {
            ko: {
                제품명: '입상생생나라규산(유기농)',
                공시번호: '공시번호 제 공시-2-3-453 호',
                서브타이틀: '친환경 인증 농가용 유기농업자재로, 줄기·잎 세포벽을 강화하여 도복을 줄이고 작물이 튼튼하게 자라도록 돕습니다.',
                규격: [
                    { label: '가용성규산(SiO₂)', value: '25%' },
                    { label: '알카리분', value: '40%' },
                    { label: '구용성고토(C-MgO)', value: '2%' }
                ],
                주요사용처: [
                    { label: '친환경인증농가', detail: '벼·밀·고추 외', icon: 'eco' },
                    { label: '벼', detail: '도복 방지·미질 향상에 효과적', icon: 'grass' },
                    { label: '밀', detail: '친환경 인증 재배 작물', icon: 'agriculture' },
                    { label: '고추', detail: '친환경 인증 재배 작물', icon: 'local_florist' }
                ],
                효능: [
                    { headline: '환경 스트레스 내성', desc: '작물의 잎을 곧고 빳빳하고 단단하게 하며, 가뭄과 같은 환경적 스트레스를 견디는 능력을 증가시킵니다.' },
                    { headline: '광합성·도복·서리', desc: '광합성을 높이고 도복을 방지하며 서리 피해를 줄입니다.' },
                    { headline: '산성토양 중화', desc: '산성토양을 중화시키며 질소비료의 시비량을 감소시킵니다.' },
                    { headline: '수량·미질 향상', desc: '벼의 수량을 증가시키고 미질과 맛을 좋게 합니다.' },
                    { headline: '조직 강화', desc: '규산이 잎과 줄기의 표피 조직을 단단하게 하여 작물이 건강하게 자라도록 돕습니다.' },
                    { headline: '친환경 유기질비료', desc: '과비의 피해가 없는 친환경 유기질비료이며, 알카리분(규산, 석회, 고토)를 함유하여 인산비료의 효과를 높입니다.' }
                ],
                사용시기: [
                    '규산질 비료는 주는 시기에 따른 효과의 차이가 별로 없기 때문에, 봄갈이·가을에 주어도 좋고, 모낸 후 15일 안에 웃거름으로 주거나, 출수기 30일 전까지 추비로 주어도 됩니다.',
                    '규산은 물에 녹지 않고 산(작물 뿌리나 미생물에서 분비되는 산, 유기물의 분해 때 발생하는 유기 산 등)에 녹습니다.'
                ],
                사용방법: [
                    '10a(300평(1,000㎡))당 보통 200~300kg(10~15포)를 사용합니다.',
                    '규산 함량 1ppm이 부족한 경우 3.8kg/10a(실량)의 규산질 비료가 필요합니다.',
                    '규산을 많이 흡수하는 벼, 보리, 옥수수, 잔디, 목초, 대나무, 죽순 등에 특히 알맞습니다.'
                ]
            },
            en: {
                제품명: 'Saengsaeng Nara Granular Silicate (Organic)',
                공시번호: 'Listing No. 2-3-453',
                서브타이틀: 'Certified organic input for eco-friendly farms—strengthens stem and leaf cell walls to reduce lodging and help crops grow sturdy.',
                규격: [
                    { label: 'Soluble silica (SiO₂)', value: '25%' },
                    { label: 'Alkali content', value: '40%' },
                    { label: 'Citrate-soluble magnesia (C-MgO)', value: '2%' }
                ],
                주요사용처: [
                    { label: 'Eco-certified farms', detail: 'Rice, wheat, pepper and more', icon: 'eco' },
                    { label: 'Rice', detail: 'Lodging prevention and better grain quality', icon: 'grass' },
                    { label: 'Wheat', detail: 'For eco-certified production', icon: 'agriculture' },
                    { label: 'Pepper', detail: 'For eco-certified production', icon: 'local_florist' }
                ],
                효능: [
                    { headline: 'Environmental stress tolerance', desc: 'Keeps leaves upright, stiff and firm and raises tolerance to drought and other field stress.' },
                    { headline: 'Photosynthesis, lodging & frost', desc: 'Boosts photosynthesis, helps prevent lodging, and reduces frost damage.' },
                    { headline: 'Acid-soil neutralization', desc: 'Helps neutralize acid soils and can reduce nitrogen fertilizer needs.' },
                    { headline: 'Yield & grain quality', desc: 'Supports higher rice yield with better grain quality and taste.' },
                    { headline: 'Stronger tissue', desc: 'Silica firms up the outer tissue of leaves and stems, helping crops grow healthily.' },
                    { headline: 'Eco-friendly organic input', desc: 'An organic-style input with low over-fertilization risk; alkali content (silica, lime, magnesia) also supports phosphate fertilizer performance.' }
                ],
                사용시기: [
                    'Timing has little effect—apply at spring or fall tillage, as a topdress within 15 days after transplanting, or as a side dressing up to 30 days before heading.',
                    'Silica does not dissolve in water; it dissolves in acids from roots, microbes, and organic-matter breakdown.'
                ],
                사용방법: [
                    'Typically 200–300 kg (10–15 bags) per 10a (300 pyeong (1,000㎡)).',
                    'If available silica is short by 1 ppm, about 3.8 kg/10a (actual product) of silicate fertilizer is needed.',
                    'Especially suited to high-silica crops such as rice, barley, corn, turf, forage, bamboo and bamboo shoot.'
                ]
            },
            이미지: {
                package_shot: 'assets/img/or-01.png',
                sample_shot: 'assets/img/product-line-01-01-sample.png'
            }
        },

        organicLimestone: {
            ko: {
                제품명: '생생나라 석회고토',
                공시번호: '공시번호 제 공시-2-3-454 호',
                카테고리: 'ORGANIC INPUT 02',
                서브타이틀: '친환경 인증 농가용 유기농업자재로, 산성토양을 중성으로 개량하고 칼슘·마그네슘을 공급하여 엽록소 향상과 뿌리 활력에 도움을 줍니다.',
                규격: [
                    { label: '알카리분', value: '51%' },
                    { label: '가용성고토(MgO)', value: '14%' }
                ],
                주요사용처: [
                    { label: '친환경인증농가', detail: '과수·밭작물', icon: 'eco' },
                    { label: '과수', detail: '산성토양 개량과 과실 품질 향상에 효과적', icon: 'park' },
                    { label: '밭작물', detail: '보리·콩·시금치·배추·고추·양파·마늘·참외 등', icon: 'spa' }
                ],
                효능: [
                    { headline: '산성토양 중화', desc: '산성토양을 중성화하여 양분 흡수를 돕고 중금속 흡수를 억제합니다.' },
                    { headline: '뿌리·줄기 강화', desc: '탄수화물 이동을 촉진하여 뿌리와 줄기를 튼튼하게 합니다.' },
                    { headline: '토양 미생물', desc: '토양미생물의 활동을 도와 건강한 토양 환경을 만드는 데 도움을 줍니다.' },
                    { headline: '토양구조 개선', desc: '토양구조를 개선하여 공기와 물의 이동을 원활하게 하며, 인산 흡수를 조절합니다.' },
                    { headline: '종합 양분 공급', desc: '칼슘·석회·마그네슘·유황 등 필요한 양분을 두루 갖춘 종합 토양비료입니다.' },
                    { headline: '수량·품질 향상', desc: '대두·유채·과실의 유지분을 높여 수량을 늘리고, 과실의 당도와 색택·품질을 향상시킵니다.' },
                    { headline: '엽록소·질소 흡수', desc: '마그네슘은 엽록소의 구성성분이며, 식물의 질산태 질소 흡수를 돕고 입단구조를 형성합니다.' },
                    { headline: '유기물·질소 효과', desc: '친환경 유기질비료로서 유기물을 늘려 미생물 분해를 촉진하고 질소의 효과를 높입니다.' }
                ],
                사용시기: [
                    '고토결핍으로 잎이 황백화·꼬이거나 작물 전체가 황색화되어 생육이 현저히 감소할 때 시용합니다.',
                    '석회결핍 증상(배추·양배추·셀러리 속썩음, 양파 수침상 인병, 고추·토마토 배꼽썩음, 오이 껍질속썩음병 등)이 나타날 때 효과적입니다.',
                    '시비량은 토양의 종류, 농작물, 기후 상태에 따라 달라집니다.',
                    '질소 과잉 시 석회를 주면 질소 흡수가 억제됩니다.'
                ],
                사용방법: [
                    'pH 6.5 미만의 농경지에 사용합니다. 특히 보리·콩·시금치·배추·고추·양파·마늘·참외 등 채소와 과수에 효과가 큽니다.',
                    '한 번 시비하면 효과가 3년 지속됩니다. (5~10포(100~200kg)/10,000㎡)',
                    '알칼리성 비료이므로 유안·초안과석·용과인·인분·닭똥 등 산성 비료와 접촉하면 효과가 떨어집니다. 이런 비료를 주기 2주 전에 시용합니다.',
                    '파종 또는 이식 1~2주 전에 심토와 잘 섞이도록 갈아엎는 것이 바람직합니다.',
                    '유기질비료와 함께 사용하면 유기질비료의 분해가 빨라집니다.'
                ]
            },
            en: {
                제품명: 'Saengsaeng Nara Lime Magnesia',
                공시번호: 'Listing No. 2-3-454',
                카테고리: 'ORGANIC INPUT 02',
                서브타이틀: 'Certified organic input for eco-friendly farms—improves acidic soil toward neutral, supplies calcium and magnesium, and supports chlorophyll development and root vigor.',
                규격: [
                    { label: 'Alkali content', value: '51%' },
                    { label: 'Soluble magnesia (MgO)', value: '14%' }
                ],
                주요사용처: [
                    { label: 'Eco-certified farms', detail: 'Orchards and upland crops', icon: 'eco' },
                    { label: 'Orchards', detail: 'Acid-soil correction and better fruit quality', icon: 'park' },
                    { label: 'Upland crops', detail: 'Barley, soybean, spinach, cabbage, pepper, onion, garlic, oriental melon and more', icon: 'spa' }
                ],
                효능: [
                    { headline: 'Neutralizes acid soils', desc: 'Moves acid soils toward neutral to aid nutrient uptake and curb heavy-metal uptake.' },
                    { headline: 'Stronger roots & stems', desc: 'Supports carbohydrate movement so roots and stems grow sturdier.' },
                    { headline: 'Soil microbes', desc: 'Supports soil microbial activity for a healthier soil environment.' },
                    { headline: 'Better soil structure', desc: 'Improves air and water movement and helps regulate phosphate uptake.' },
                    { headline: 'Broad nutrient support', desc: 'A comprehensive soil fertilizer supplying calcium, lime, magnesium, sulfur and more.' },
                    { headline: 'Yield & quality', desc: 'Supports oil content and yield in soybean/rapeseed/fruit, and improves fruit sugar, color and finish.' },
                    { headline: 'Chlorophyll & nitrogen uptake', desc: 'Magnesium is a chlorophyll building block; it also aids nitrate-nitrogen uptake and aggregate formation.' },
                    { headline: 'Organic matter & nitrogen effect', desc: 'As an eco-friendly organic-style input, it builds organic matter, supports microbial breakdown and improves nitrogen performance.' }
                ],
                사용시기: [
                    'Apply when magnesia deficiency shows as leaf bleaching/twisting or whole-plant yellowing with sharply weaker growth.',
                    'Effective when lime-deficiency symptoms appear (heart rot in cabbage-family crops and celery, water-soaked onion scales, blossom-end rot on pepper/tomato, cucumber peel disorders, and similar).',
                    'Rate depends on soil type, crop and climate.',
                    'When nitrogen is excessive, applying lime helps restrain nitrogen uptake.'
                ],
                사용방법: [
                    'Use on farmland below pH 6.5. Especially effective on vegetables and fruit—barley, soybean, spinach, cabbage, pepper, onion, garlic, oriental melon and more.',
                    'One application can last about 3 years. (5–10 bags / 100–200 kg per 10,000㎡)',
                    'As an alkaline fertilizer, contact with acidic materials (ammonium sulfate, ammonium nitrate–superphosphate mixes, fused phosphate, human manure, chicken manure, etc.) reduces performance—apply about 2 weeks before those products.',
                    'Best incorporated into the plow layer 1–2 weeks before sowing or transplanting.',
                    'Used with organic fertilizer, it speeds organic-matter breakdown.'
                ]
            },
            이미지: {
                package_shot: 'assets/img/or-02.png',
                sample_shot: 'assets/img/product-line-01-02-sample.jpg'
            }
        },

        organicMagSulfur: {
            ko: {
                제품명: '생생황 마그유황칼슘',
                공시번호: '공시번호 제 공시-3-379호',
                카테고리: 'ORGANIC INPUT 03',
                서브타이틀: '자연의 힘을 담은 프리미엄 유기농업자재로, 칼슘·마그네슘·유황과 벤토나이트를 더해 산성화 걱정 없이 토양을 개량하고 작물 생육을 돕습니다. 국립농산물품질관리원 심사 유기농업자재 공시(제 공시-3-379호) 제품입니다.',
                규격: [
                    { label: '알칼리분', value: '45.3%' },
                    { label: '황전량(S)', value: '16%' },
                    { label: 'CaO', value: '22%' },
                    { label: '가용성고토(MgO)', value: '9.8%' }
                ],
                규격_보충설명: '주원료: 초고순도 유황(99.5% 이상), 석회질 마그네슘 암석, 벤토나이트 · 원료: 백운석 76%, 당밀 4%, 벤토나이트 2%, 황 18% · 실중량 20kg · 유통기간 3년',
                주요사용처: [
                    { label: '유기농업자재', detail: '공시 제품 · 근채·곡류·잎채·열매채·과수·화훼', icon: 'eco' },
                    { label: '잎채소류', detail: '10a(300평)당 2포(40kg) 예시', icon: 'spa' },
                    { label: '뿌리채소·곡류', detail: '10a당 3포(60kg) 예시', icon: 'grass' },
                    { label: '열매채소·콩류', detail: '10a당 2포(40kg) 예시', icon: 'local_florist' },
                    { label: '과수류', detail: '수관 주변 골고루 시비', icon: 'park' },
                    { label: '화훼·하우스', detail: '복합비료·퇴비보다 2주 전 단독 시비', icon: 'nutrition' }
                ],
                효능: [
                    { headline: '유기농업자재 공시', desc: '유기농업자재 공시 제품으로, 친환경 재배에 안심하고 사용할 수 있습니다.' },
                    { headline: '토양 구조·흡수율', desc: '벤토나이트와 백운석이 토양을 살리고, 복합비료·콜로이드 유황의 양분 흡수를 돕습니다.' },
                    { headline: '균형 잡힌 Ca·Mg·S', desc: '튼튼한 뿌리와 줄기, 풍성한 착과와 저장성 향상에 도움을 줍니다.' },
                    { headline: '맛·향·식감', desc: '과일 당도, 채소 아삭함, 곡물 식감 등 미질 향상을 노릴 때 유용합니다.' },
                    { headline: '산성화 완화', desc: '토양 pH를 적정 수준으로 유지해 양분 이용률을 높이는 데 기여합니다.' },
                    { headline: '생육 기반', desc: '뿌리 활력과 토양 미생물 활성을 도와 건강한 생육에 도움을 줍니다.' }
                ],
                사용시기: [
                    '시비 적기는 가을부터 이른 봄까지이며, 시기를 놓쳤다면 연중 언제든 사용할 수 있습니다.',
                    '정확한 시비량은 농업기술센터 토양검정 결과에 따라 결정하는 것이 좋습니다.',
                    '하우스 재배지에서는 복합비료·퇴비 시비보다 최소 2주 전에 먼저 시용합니다.'
                ],
                사용방법: [
                    '잎채소류(상추·배추·시금치 등): 10a당 2포(40kg), 정식 7~10일 전 밑거름으로 깊이갈이합니다.',
                    '뿌리채소류(무·당근·감자·고구마 등): 10a당 3포(60kg), 뿌리가 발달하는 층에 골고루 시비합니다.',
                    '곡류(벼·보리·콩 등): 10a당 3포(60kg), 파종·이식 전 밑거름으로 깊이갈이합니다.',
                    '열매채소류(토마토·고추·오이 등): 10a당 2포(40kg), 정식 7~10일 전 밑거름으로 깊이갈이합니다.',
                    '과수·콩류: 10a당 2포(40kg), 토양 상태에 맞게 조절하며 수관 주변에 고르게 시비합니다.',
                    '포장 표시 기준: 10a당 60kg, 정식 전 토양 혼화 처리. 타 비료와 무분별한 혼용은 피합니다.'
                ],
                표준시비량: [
                    '10a(300평·1,000㎡) 기준 예시 — 잎채소·열매채소 2포(40kg), 뿌리채소·곡류 3포(60kg), 과수·콩류 2포(40kg).',
                    '작물별 예: 잎채소 2포·40kg / 뿌리채소·곡류 3포·60kg / 열매채소·과수 2포·40kg — 정식·파종 7~10일 전 깊이갈이·토양 혼화.',
                    '토양·작물·기후에 따라 조절하며, 검정 결과를 우선 반영하십시오.'
                ],
                추천_목록: [
                    '유기농·친환경 인증 농가에서 Ca·Mg·S 균형 시비가 필요한 경우',
                    '산성화 우려가 있는 밭·과원·하우스 재배지 토양 개량',
                    '과채·과수의 미질(당도·식감·저장성) 향상을 목표로 하는 재배',
                    '복합비료와 시비 간격을 두고 밑거름으로 단독 시용하려는 경우'
                ],
                FAQ_목록: [
                    {
                        q: '시비일정 및 복합비료 혼용하여 시비 가능한가요?',
                        a: '작물 정식·파종 전에 시비하시고, 퇴비는 혼용 가능하나 복합비료는 1~2주 후에 시비하세요.'
                    },
                    {
                        q: '엽면시비나 관주로 시비해도 되나요?',
                        a: '토양 혼화·밑거름 시비를 권장합니다. 입자형 제품 특성상 엽면·관주는 효과가 낮고 기공 막힘 우려가 있어 비추천합니다.'
                    }
                ],
                주의사항_목록: [
                    '환기가 잘 되는 장소에서 사용하고, 먼지 흡입·피부 접촉을 피하십시오.',
                    '개봉 후 가급적 신속히 사용하고, 잔량은 밀봉하여 보관하십시오.',
                    '장갑·마스크 등 보호구를 착용하고 사용 후 깨끗이 씻으십시오.',
                    '하우스에서 복합비료·미숙 퇴비와 혼용하면 가스가 발생할 수 있으니, 정식·파종 전 밑거름으로 단독 시용하십시오.',
                    '직사광선과 습기를 피하고, 서늘하고 건조한 곳에 보관하십시오. 사용하지 않을 때는 용기를 밀폐하십시오.'
                ],
                유기농업자재표시사항: [
                    '공시번호 제 공시-3-379호 · 명칭·상표: 석회고토+점토광물+황(생생황 마그유황칼슘)',
                    '자재 구분: 토양개량 및 작물생물 · 실중량 20kg',
                    '주성분: 황전량 16%, 알칼리분 45.3%, CaO 22%, 가용성고토 9.8%',
                    '원료: 백운석 76%, 당밀 4%, 벤토나이트 2%, 황 18%',
                    '제조연월일: 포장 전면 별도 표시 · 유통기간 3년',
                    '사용: 60kg/10a, 정식 전 토양혼화 · 제조·업체: 경북 경주시 안강읍 두류길 76 (주)한일씨앤에스 · 054-762-9691~2',
                    '효과·성분함량을 보증하지 않으며, 유기농산물 생산 사용 가능 여부만 검토된 자재입니다.',
                    '시험작물: 고추, 배추, 상추, 오이, 토마토'
                ]
            },
            en: {
                제품명: 'Saengsaenghwang Mag-Sulfur-Calcium',
                공시번호: 'Listing No. 3-379',
                카테고리: 'ORGANIC INPUT 03',
                서브타이틀: 'A premium listed organic input that combines calcium, magnesium, sulfur and bentonite to improve soil and support crop growth with less acidification concern. Listed after review by the National Agricultural Products Quality Management Service (Listing No. 3-379).',
                규격: [
                    { label: 'Alkali fraction', value: '45.3%' },
                    { label: 'Total sulfur (S)', value: '16%' },
                    { label: 'CaO', value: '22%' },
                    { label: 'Soluble magnesia (MgO)', value: '9.8%' }
                ],
                규격_보충설명: 'Main inputs: ultra-high-purity sulfur (99.5%+), calcareous magnesium rock, bentonite · Raw materials: dolomite 76%, molasses 4%, bentonite 2%, sulfur 18% · Net weight 20 kg · Shelf life 3 years',
                주요사용처: [
                    { label: 'Listed organic input', detail: 'Root veg., grains, leafy, fruit veg., orchards, floriculture', icon: 'eco' },
                    { label: 'Leafy vegetables', detail: 'Example: 2 bags (40 kg) / 10a', icon: 'spa' },
                    { label: 'Root crops & grains', detail: 'Example: 3 bags (60 kg) / 10a', icon: 'grass' },
                    { label: 'Fruit veg. & legumes', detail: 'Example: 2 bags (40 kg) / 10a', icon: 'local_florist' },
                    { label: 'Orchards', detail: 'Spread evenly around trees', icon: 'park' },
                    { label: 'Floriculture & greenhouses', detail: 'Apply alone ≥2 weeks before compost or compound fertilizer', icon: 'nutrition' }
                ],
                효능: [
                    { headline: 'Listed organic input', desc: 'A listed organic input you can apply with confidence on certified and eco-friendly farms.' },
                    { headline: 'Soil structure & uptake', desc: 'Bentonite and dolomite support soil structure and help compound nutrients absorb more effectively.' },
                    { headline: 'Balanced Ca, Mg & S', desc: 'Supports stronger roots and stems, better fruit set and keeping quality.' },
                    { headline: 'Flavor & texture', desc: 'Useful when aiming for higher sugar, crunch and eating quality.' },
                    { headline: 'Less acidification stress', desc: 'Helps keep soil pH in a favorable range for nutrient use efficiency.' },
                    { headline: 'Growth foundation', desc: 'Supports root vigor and soil microbial activity for healthy growth.' }
                ],
                사용시기: [
                    'Ideal timing is fall through early spring; it can be used any time of year if that window is missed.',
                    'Follow local soil-test recommendations for exact rates.',
                    'In greenhouses, apply at least two weeks before compound fertilizer or compost.'
                ],
                사용방법: [
                    'Leafy vegetables: 2 bags (40 kg) per 10a; basal dressing 7–10 days before transplanting, incorporated deeply.',
                    'Root crops: 3 bags (60 kg) per 10a; apply evenly in the root zone.',
                    'Grains (rice, barley, soybeans, etc.): 3 bags (60 kg) per 10a; basal dressing before sowing or transplanting, incorporated deeply.',
                    'Fruit vegetables: 2 bags (40 kg) per 10a; basal dressing 7–10 days before transplanting, incorporated deeply.',
                    'Orchards & legumes: 2 bags (40 kg) per 10a; adjust to soil and spread evenly around trees.',
                    'Labeled rate: 60 kg per 10a, mixed before transplanting. Avoid careless mixing with other products.'
                ],
                표준시비량: [
                    'Example per 10a (300 pyeong / 1,000㎡): leafy & fruit vegetables 2 bags (40 kg), root crops & grains 3 bags (60 kg), orchards & legumes 2 bags (40 kg).',
                    'By crop: leafy 2 bags / 40 kg · root crops & grains 3 bags / 60 kg · fruit vegetables & orchards 2 bags / 40 kg — incorporate 7–10 days before transplanting or sowing.',
                    'Adjust for soil, crop and climate; prioritize soil-test results.'
                ],
                추천_목록: [
                    'Certified organic or eco-friendly farms needing balanced Ca, Mg and S',
                    'Fields, orchards or greenhouse beds with acidification concerns',
                    'Production focused on eating quality, sugar and storage in fruit and vegetables',
                    'When you want a basal dressing alone, spaced apart from compound fertilizer'
                ],
                FAQ_목록: [
                    {
                        q: 'When should I apply it, and can I mix it with compound fertilizer?',
                        a: 'Apply before transplanting or sowing. Compost may be mixed in, but wait 1–2 weeks before applying compound fertilizer.'
                    },
                    {
                        q: 'Can I apply by foliar spray or fertigation?',
                        a: 'Soil incorporation and basal dressing are recommended. As a granular product, foliar and drip application are less effective and may clog emitters—not recommended.'
                    }
                ],
                주의사항_목록: [
                    'Use in a well-ventilated area; avoid inhaling dust and skin contact.',
                    'Use opened product promptly and seal any remainder.',
                    'Wear gloves, a mask and other protection; wash thoroughly after use.',
                    'In greenhouses, mixing with compound fertilizer or unfinished compost may release gas—use as a basal dressing before transplanting or sowing.',
                    'Store in a cool, dry place away from direct sunlight and moisture. Keep the container tightly closed when not in use.'
                ],
                유기농업자재표시사항: [
                    'Listing No. 3-379 · Registered name: lime magnesia + clay mineral + sulfur (Saengsaenghwang Mag-Sulfur-Calcium)',
                    'Class: soil improvement and crop growth · Net weight 20 kg',
                    'Main components: total sulfur 16%, alkali fraction 45.3%, CaO 22%, soluble magnesia 9.8%',
                    'Raw materials: dolomite 76%, molasses 4%, bentonite 2%, sulfur 18%',
                    'Date of manufacture on bag front · Shelf life 3 years',
                    'Use: 60 kg / 10a before transplanting · Hanil C&S, 76 Duryu-gil, Angang-eup, Gyeongju · +82-54-762-9691~2',
                    'Listing confirms allowable use for organic produce only; efficacy and nutrient content are not guaranteed.',
                    'Trial crops: pepper, Chinese cabbage, lettuce, cucumber, tomato'
                ]
            },
            이미지: {
                package_shot: 'assets/img/mag-01.png',
                sample_shot: 'assets/img/mag-01-sample.png'
            },
            MSDS: 'assets/msds/생생황 마그유황칼슘 MSDS 국문.pdf'
        }
    };

    window.CatalogModalI18n = {
        ui: { ko: uiKo, en: uiEn },
        products: products
    };
})();
