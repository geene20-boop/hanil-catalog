/* 흙 상담 도우미 (모든 페이지 왼쪽 아래)
 * AI를 쓰지 않고, 카다록에 이미 실린 처방·사용 시기·제품 설명만 골라 보여줍니다.
 * - 제품명·설명·권장량·시기는 catalog-lang.js 사전(4개 언어)을 그대로 씁니다.
 * - 이달의 흙 관리·정부지원 판정은 catalog-extras.js 와 같은 내용입니다.
 * - 관련 '흙 이야기' 쇼츠는 catalog-shorts.js 가 [data-shorts-related] 자리를 채웁니다(한국어 화면).
 */
(function () {
    'use strict';
    if (window.CatalogHelper) return;

    var me = document.currentScript;
    var ROOT = (me && me.src) ? me.src.replace(/assets\/js\/catalog-helper\.js.*$/, '') : '/';
    var TEL = 'tel:+82547629691';

    var UI = {
        ko: {
            fab: '흙 상담 도우미', title: '흙 상담 도우미', subtitle: '한일씨앤에스 카다록 내용으로 안내합니다',
            hello: '안녕하세요, <b>한일씨앤에스 흙 상담 도우미</b>입니다.<br>무엇을 도와드릴까요?',
            optCrop: '작물별 제품 찾기', optMonth: '이달에 할 일', optGov: '정부지원 대상 확인', optSearch: '증상·궁금한 점으로 찾기', optStories: '흙 이야기 영상',
            askCrop: '어떤 작물을 재배하시나요?', askOrganic: '친환경 인증(유기농) 농가이신가요?',
            orgNo: '아니요, 일반 재배', orgYes: '네, 친환경 인증 농가',
            orgSwitched: '친환경 인증 농가용 <b>유기농업자재</b>로 바꿔 보여드립니다.',
            doseNote: '권장량은 카다록 처방 기준입니다. <b>토양검정 처방서가 있으면 처방서를 우선</b>해 주십시오.',
            openPage: '처방 페이지 전체 보기 →',
            roleMain: '주 제품', roleSub: '보조', roleWith: '함께', roleSoil: '토양개량', roleGrow: '생육기 보완',
            lHelp: '도움', lWhen: '시기', lDose: '권장량', detail: '제품 상세 보기 →', seeDose: '처방 페이지 참고', calcDose: '희석 계산기 참고',
            otherCrop: '다른 작물 보기', askStaff: '담당자에게 묻기', home: '처음으로', call: '전화 상담',
            monthNote: '달이 바뀌면 이 안내도 자동으로 바뀝니다.',
            govIntro: '토양검정 결과서의 숫자를 넣어 보세요. 참고용 판정입니다.',
            govField: '밭 · 과수원', govPaddy: '논', govPh: 'pH (예: 5.8)', govSi: '유효규산 mg/kg (논만)', govType: '농지 종류',
            govNote: '지원 대상과 물량은 시·군마다 다르니 읍·면·동 공고를 꼭 확인하십시오.', govPage: '정부지원 페이지 보기 →',
            searchIntro: '궁금한 점을 짧게 적어 보세요. 카다록 내용과 <b>답변이 끝난 Q&amp;A</b>에서 찾아 드립니다.',
            searchPh: '예: 벼가 자꾸 쓰러져요', searchBtn: '찾기', ex: ['벼가 자꾸 쓰러져요', '밭이 산성이래요', '잎이 노랗게 변해요'],
            symptom: '잎 색이나 시듦 같은 <b>증상은 원인이 여러 가지</b>라 이 도우미가 판단하지 않습니다.<br>병해충이 의심되면 가까운 <b>농업기술센터</b> 진단을 받으시고, 사진과 함께 담당자에게 물어보시면 확인 후 답변드립니다.',
            qaFound: '비슷한 Q&amp;A 답변이 있습니다.', qaOpen: '답변 보기 →',
            noMatch: '카다록에서 맞는 내용을 찾지 못했습니다. 담당자에게 물어보시면 확인 후 답변드립니다.',
            hitSi: '줄기를 튼튼하게 하는 데는 <b>규산질</b>이 중심입니다.',
            hitAcid: '산성 토양을 중성으로 개량하는 데는 <b>석회고토</b>가 중심입니다.',
            hitCa: '칼슘 공급과 맛·향·저장성에는 <b>칼슘유황비료</b>가 있습니다.',
            hitStress: '저온·고온 스트레스 회복과 당도·착색에는 <b>생생비타</b>로 생육기에 보완합니다.',
            hitN: '질소·복합비료는 <b>토양개량제를 준 뒤 1~2주 지나서</b> 주는 것이 기본입니다. 질소는 비에 잘 씻겨 내려가니 나눠서 주십시오.',
            staffGo: '<b>Q&amp;A 재배상담</b>으로 연결합니다. 작물과 내용이 미리 채워진 채로 열립니다.', staffOpen: 'Q&amp;A 재배상담 열기 →',
            callText: '전화로 상담하실 수 있습니다. 휴대폰에서는 아래 번호를 누르면 바로 전화가 걸립니다.',
            storiesText: '흙·비료 이야기를 1분 쇼츠로 보실 수 있습니다.', storiesOpen: '흙 이야기 모아 보기 →', relLabel: '관련 1분 영상',
            foot: '이 안내는 카다록 내용을 바탕으로 합니다. 시용량은 토양검정 처방서를 우선하시고, 병해충이 의심되면 농업기술센터 진단을 받으십시오. 당사 제품은 비료·토양개량제이며 농약이 아닙니다.',
            close: '닫기', restart: '처음부터',
            cRice: '벼', cRiceSub: '수도작', cOrchard: '과수', cHouse: '시설하우스',
            leadRice: '수도작 핵심처방은 <b>규산질</b>입니다.',
            leadFruit: '과채류는 <b>석회고토 중심 + 규산질 보조</b>로, 정식 3~4주 전에 먼저 줍니다.',
            leadRoot: '가을 로터리 전 또는 봄 재배 1개월 전에 <b>토양개량제를 먼저</b> 줍니다.',
            leadLeaf: '엽채류는 정식 3~4주 전 <b>석회고토 + 규산질</b>입니다.',
            leadOrchard: '과수는 휴면기에 <b>토양개량제를 먼저</b> 주고, 생육기에는 <b>엽면시비로 보완</b>합니다.',
            leadHouse: '다음 작기 정식 3~4주 전 <b>토양개량제를 먼저</b>, 생육기에는 <b>양액·관주 또는 엽면시비</b>로 보완합니다.',
            whenDormant: '낙엽 후 휴면기', whenVitaOrchard: '개화 전후~비대기·착색기, 7~10일 간격', whenHouse: '정식 3~4주 전', whenVitaHouse: '생육기, 7~10일 간격'
        },
        en: {
            fab: 'Soil advisor', title: 'Soil advisor', subtitle: 'Guidance from the HANIL C&S catalog',
            hello: 'Hello, this is the <b>HANIL C&amp;S soil advisor</b>.<br>How can we help?',
            optCrop: 'Find products by crop', optMonth: 'This month’s tasks', optGov: 'Check government support', optSearch: 'Search by question', optStories: 'Soil story videos',
            askCrop: 'Which crop do you grow?', askOrganic: 'Are you a certified organic farm?',
            orgNo: 'No, conventional', orgYes: 'Yes, certified organic',
            orgSwitched: 'Showing <b>organic inputs</b> for certified organic farms.',
            doseNote: 'Rates follow the catalog prescription. <b>If you have a soil test prescription, follow it first.</b>',
            openPage: 'See the full prescription page →',
            roleMain: 'Main', roleSub: 'Support', roleWith: 'With', roleSoil: 'Soil', roleGrow: 'Growth stage',
            lHelp: 'Benefit', lWhen: 'When', lDose: 'Rate', detail: 'Product details →', seeDose: 'See prescription page', calcDose: 'See dilution calculator',
            otherCrop: 'Other crops', askStaff: 'Contact us', home: 'Start over', call: 'Call us',
            monthNote: 'This guidance changes automatically each month.',
            govIntro: 'Enter numbers from your soil test report. This is a reference check only.',
            govField: 'Upland · Orchard', govPaddy: 'Paddy', govPh: 'pH (e.g. 5.8)', govSi: 'Available silica mg/kg (paddy)', govType: 'Field type',
            govNote: 'Eligibility and amounts differ by city and county. Please check your local notice.', govPage: 'Government support page →',
            searchIntro: 'Type a short question. We will look for it in the catalog.',
            searchPh: 'e.g. My rice keeps lodging', searchBtn: 'Search', ex: ['My rice keeps lodging', 'My field is acidic', 'Leaves are turning yellow'],
            symptom: 'Symptoms such as leaf colour or wilting <b>have many possible causes</b>, so this advisor does not diagnose them.<br>If you suspect pests or disease, please get a diagnosis at your local <b>agricultural technology center</b>, or contact us with photos.',
            qaFound: 'Similar answered questions:', qaOpen: 'See answer →',
            noMatch: 'We could not find a matching answer in the catalog. Please contact us and we will reply.',
            hitSi: 'For stronger stems, <b>silicate</b> is the core product.',
            hitAcid: 'To correct acidic soil toward neutral, <b>lime magnesia</b> is the core product.',
            hitCa: 'For calcium supply and flavour, aroma and storability there is <b>calcium sulfur fertilizer</b>.',
            hitStress: 'For recovery from cold or heat stress and for sugar content and colour, supplement with <b>Saengsaeng Vita</b> during growth.',
            hitN: 'Apply nitrogen or compound fertilizer <b>1~2 weeks after the soil conditioner</b>. Nitrogen washes out easily in rain, so split the application.',
            staffGo: 'Please reach us through the <b>Contact</b> page.', staffOpen: 'Open Contact page →',
            callText: 'You can talk to us by phone. On a mobile phone, tap the number below to call.',
            storiesText: '', storiesOpen: '', relLabel: 'Related 1-minute video',
            foot: 'This guidance is based on the catalog. Follow your soil test prescription for rates, and get a diagnosis from an agricultural technology center if you suspect pests or disease. Our products are fertilizers and soil conditioners, not pesticides.',
            close: 'Close', restart: 'Start over',
            cRice: 'Rice', cRiceSub: 'Paddy', cOrchard: 'Orchard', cHouse: 'Greenhouse',
            leadRice: 'The core prescription for rice is <b>silicate</b>.',
            leadFruit: 'For fruit vegetables, use <b>lime magnesia as the main product with silicate in support</b>, 3~4 weeks before planting.',
            leadRoot: 'Apply <b>soil conditioner first</b>, before autumn rotary tilling or one month before spring cultivation.',
            leadLeaf: 'For leafy vegetables, apply <b>lime magnesia + silicate</b> 3~4 weeks before planting.',
            leadOrchard: 'For orchards, apply <b>soil conditioner first</b> during dormancy, and <b>supplement with foliar feeding</b> during growth.',
            leadHouse: 'Apply <b>soil conditioner first</b>, 3~4 weeks before the next planting, then supplement with <b>fertigation, drenching or foliar feeding</b> during growth.',
            whenDormant: 'Dormancy after leaf fall', whenVitaOrchard: 'Around flowering to fruit enlargement/colouring, every 7~10 days', whenHouse: '3~4 weeks before planting', whenVitaHouse: 'During growth, every 7~10 days'
        },
        zh: {
            fab: '土壤咨询助手', title: '土壤咨询助手', subtitle: '根据 HANIL C&S 电子目录内容为您介绍',
            hello: '您好，我是 <b>HANIL C&amp;S 土壤咨询助手</b>。<br>请问需要什么帮助？',
            optCrop: '按作物查找产品', optMonth: '本月要做的事', optGov: '查看政府支持', optSearch: '按问题查找', optStories: '土壤故事视频',
            askCrop: '您种植什么作物？', askOrganic: '您是有机认证农户吗？',
            orgNo: '不是，常规种植', orgYes: '是，有机认证农户',
            orgSwitched: '为有机认证农户改为显示<b>有机农业资材</b>。',
            doseNote: '推荐用量为目录处方标准。<b>如有土壤检测处方，请以处方为准。</b>',
            openPage: '查看完整处方页面 →',
            roleMain: '主要产品', roleSub: '辅助', roleWith: '配合', roleSoil: '土壤改良', roleGrow: '生长期补充',
            lHelp: '作用', lWhen: '时期', lDose: '推荐用量', detail: '查看产品详情 →', seeDose: '参见处方页面', calcDose: '参见稀释计算器',
            otherCrop: '查看其他作物', askStaff: '联系我们', home: '返回开始', call: '电话咨询',
            monthNote: '每月会自动更新此内容。',
            govIntro: '请输入土壤检测报告中的数值。仅供参考。',
            govField: '旱地 · 果园', govPaddy: '水田', govPh: 'pH（例：5.8）', govSi: '有效硅 mg/kg（水田）', govType: '农田类型',
            govNote: '支持对象和数量因市·郡而异，请务必查看当地公告。', govPage: '查看政府支持页面 →',
            searchIntro: '请简短输入您的问题，我们将在目录内容中查找。',
            searchPh: '例：水稻总是倒伏', searchBtn: '查找', ex: ['水稻总是倒伏', '田地是酸性的', '叶子变黄了'],
            symptom: '叶色变化、萎蔫等<b>症状的原因有很多</b>，本助手不作判断。<br>如怀疑病虫害，请到当地<b>农业技术中心</b>诊断，或附照片与我们联系。',
            qaFound: '有类似的已回答问题：', qaOpen: '查看回答 →',
            noMatch: '未能在目录中找到相应内容。请与我们联系，我们会确认后回复。',
            hitSi: '强健茎秆主要靠<b>硅肥</b>。',
            hitAcid: '将酸性土壤改良为中性，主要靠<b>石灰镁肥</b>。',
            hitCa: '补充钙及改善风味、香气、耐储性，可使用<b>钙硫肥</b>。',
            hitStress: '恢复低温·高温胁迫及提高糖度·着色，可在生长期用<b>生生维他</b>补充。',
            hitN: '氮肥、复合肥一般在<b>施用土壤改良剂1~2周后</b>再施。氮容易被雨水冲走，请分次施用。',
            staffGo: '请通过<b>联系我们</b>页面与我们联系。', staffOpen: '打开联系我们页面 →',
            callText: '可以电话咨询。在手机上点击下方号码即可直接拨打。',
            storiesText: '', storiesOpen: '', relLabel: '相关1分钟视频',
            foot: '本内容基于电子目录。施用量请以土壤检测处方为准，如怀疑病虫害请到农业技术中心诊断。本公司产品为肥料·土壤改良剂，不是农药。',
            close: '关闭', restart: '重新开始',
            cRice: '水稻', cRiceSub: '水田', cOrchard: '果树', cHouse: '设施栽培',
            leadRice: '水稻核心处方是<b>硅肥</b>。',
            leadFruit: '果菜类以<b>石灰镁肥为主、硅肥为辅</b>，在定植前3~4周先施用。',
            leadRoot: '在秋季旋耕前或春季栽培前1个月<b>先施土壤改良剂</b>。',
            leadLeaf: '叶菜类在定植前3~4周施用<b>石灰镁肥 + 硅肥</b>。',
            leadOrchard: '果树在休眠期<b>先施土壤改良剂</b>，生长期<b>用叶面喷施补充</b>。',
            leadHouse: '下一茬定植前3~4周<b>先施土壤改良剂</b>，生长期用<b>营养液·灌根或叶面喷施</b>补充。',
            whenDormant: '落叶后休眠期', whenVitaOrchard: '开花前后~膨大期·着色期，每7~10天', whenHouse: '定植前3~4周', whenVitaHouse: '生长期，每7~10天'
        },
        vi: {
            fab: 'Trợ lý tư vấn đất', title: 'Trợ lý tư vấn đất', subtitle: 'Hướng dẫn theo nội dung catalog HANIL C&S',
            hello: 'Xin chào, đây là <b>trợ lý tư vấn đất HANIL C&amp;S</b>.<br>Chúng tôi có thể giúp gì cho bạn?',
            optCrop: 'Tìm sản phẩm theo cây trồng', optMonth: 'Việc cần làm tháng này', optGov: 'Kiểm tra hỗ trợ của Chính phủ', optSearch: 'Tìm theo câu hỏi', optStories: 'Video chuyện đất',
            askCrop: 'Bạn trồng loại cây nào?', askOrganic: 'Nông trại của bạn có chứng nhận hữu cơ không?',
            orgNo: 'Không, canh tác thông thường', orgYes: 'Có, đã chứng nhận hữu cơ',
            orgSwitched: 'Hiển thị <b>vật tư nông nghiệp hữu cơ</b> cho nông trại có chứng nhận.',
            doseNote: 'Liều lượng theo khuyến nghị trong catalog. <b>Nếu có phiếu khuyến nghị phân tích đất, hãy ưu tiên phiếu đó.</b>',
            openPage: 'Xem toàn bộ trang khuyến nghị →',
            roleMain: 'Sản phẩm chính', roleSub: 'Bổ trợ', roleWith: 'Kết hợp', roleSoil: 'Cải tạo đất', roleGrow: 'Bổ sung khi sinh trưởng',
            lHelp: 'Tác dụng', lWhen: 'Thời điểm', lDose: 'Liều lượng', detail: 'Xem chi tiết sản phẩm →', seeDose: 'Xem trang khuyến nghị', calcDose: 'Xem máy tính pha loãng',
            otherCrop: 'Cây trồng khác', askStaff: 'Liên hệ chúng tôi', home: 'Bắt đầu lại', call: 'Gọi điện tư vấn',
            monthNote: 'Nội dung này tự động thay đổi theo từng tháng.',
            govIntro: 'Hãy nhập số liệu trong phiếu kết quả phân tích đất. Chỉ để tham khảo.',
            govField: 'Ruộng cạn · Vườn cây', govPaddy: 'Ruộng lúa', govPh: 'pH (ví dụ: 5,8)', govSi: 'Silic hữu hiệu mg/kg (ruộng lúa)', govType: 'Loại đất',
            govNote: 'Đối tượng và lượng hỗ trợ khác nhau theo từng địa phương. Hãy kiểm tra thông báo tại địa phương.', govPage: 'Xem trang hỗ trợ của Chính phủ →',
            searchIntro: 'Hãy nhập ngắn gọn câu hỏi của bạn. Chúng tôi sẽ tìm trong nội dung catalog.',
            searchPh: 'Ví dụ: Lúa hay bị đổ ngã', searchBtn: 'Tìm', ex: ['Lúa hay bị đổ ngã', 'Ruộng bị chua', 'Lá bị vàng'],
            symptom: 'Các <b>triệu chứng như đổi màu lá hay héo có nhiều nguyên nhân</b>, nên trợ lý này không chẩn đoán.<br>Nếu nghi ngờ sâu bệnh, hãy chẩn đoán tại <b>trung tâm kỹ thuật nông nghiệp</b> địa phương, hoặc gửi ảnh cho chúng tôi.',
            qaFound: 'Có câu hỏi tương tự đã được trả lời:', qaOpen: 'Xem câu trả lời →',
            noMatch: 'Chưa tìm thấy nội dung phù hợp trong catalog. Hãy liên hệ, chúng tôi sẽ kiểm tra và trả lời.',
            hitSi: 'Để thân cây chắc khỏe, <b>phân silic</b> là sản phẩm chính.',
            hitAcid: 'Để cải tạo đất chua về trung tính, <b>vôi magie</b> là sản phẩm chính.',
            hitCa: 'Để bổ sung canxi và tăng hương vị, mùi thơm, khả năng bảo quản, có <b>phân canxi lưu huỳnh</b>.',
            hitStress: 'Để phục hồi sau stress lạnh·nóng và tăng độ ngọt·màu sắc, bổ sung <b>Saengsaeng Vita</b> trong thời kỳ sinh trưởng.',
            hitN: 'Phân đạm, phân NPK nên bón <b>sau khi bón chất cải tạo đất 1–2 tuần</b>. Đạm dễ bị mưa rửa trôi, nên chia làm nhiều lần.',
            staffGo: 'Hãy liên hệ với chúng tôi qua trang <b>Liên hệ</b>.', staffOpen: 'Mở trang Liên hệ →',
            callText: 'Bạn có thể tư vấn qua điện thoại. Trên điện thoại di động, chạm vào số bên dưới để gọi.',
            storiesText: '', storiesOpen: '', relLabel: 'Video 1 phút liên quan',
            foot: 'Hướng dẫn này dựa trên nội dung catalog. Hãy ưu tiên phiếu khuyến nghị phân tích đất về liều lượng, và chẩn đoán tại trung tâm kỹ thuật nông nghiệp nếu nghi ngờ sâu bệnh. Sản phẩm của chúng tôi là phân bón·chất cải tạo đất, không phải thuốc bảo vệ thực vật.',
            close: 'Đóng', restart: 'Bắt đầu lại',
            cRice: 'Lúa', cRiceSub: 'Lúa nước', cOrchard: 'Cây ăn quả', cHouse: 'Nhà kính',
            leadRice: 'Khuyến nghị cốt lõi cho lúa là <b>phân silic</b>.',
            leadFruit: 'Rau ăn quả dùng <b>vôi magie làm chính, phân silic bổ trợ</b>, bón trước 3–4 tuần trước khi trồng.',
            leadRoot: 'Bón <b>chất cải tạo đất trước</b>, trước khi xới đất mùa thu hoặc 1 tháng trước vụ xuân.',
            leadLeaf: 'Rau ăn lá bón <b>vôi magie + phân silic</b> 3–4 tuần trước khi trồng.',
            leadOrchard: 'Cây ăn quả bón <b>chất cải tạo đất trước</b> vào thời kỳ ngủ nghỉ, và <b>bổ sung bằng phun lá</b> khi sinh trưởng.',
            leadHouse: 'Bón <b>chất cải tạo đất trước</b> 3–4 tuần trước vụ trồng tiếp theo, và bổ sung bằng <b>dinh dưỡng thủy canh, tưới gốc hoặc phun lá</b> khi sinh trưởng.',
            whenDormant: 'Thời kỳ ngủ nghỉ sau rụng lá', whenVitaOrchard: 'Trước sau ra hoa ~ thời kỳ lớn quả·lên màu, cách 7–10 ngày', whenHouse: '3–4 tuần trước khi trồng', whenVitaHouse: 'Thời kỳ sinh trưởng, cách 7–10 ngày'
        }
    };

    /* 제품: 이름·설명·권장량은 카다록 사전 키 */
    var P = {
        si: { name: 'productsLine.item1Name', sub: 'productsLine.item1Sub', desc: 'prescription01.product1Desc', url: 'products/products-line.html#silicate-fertilizer', tags: '규산' },
        li: { name: 'productsLine.item2Name', sub: 'productsLine.item2Sub', desc: 'prescription02.limestoneProductDesc', url: 'products/products-line.html#limestone-fertilizer', tags: '산성 석회' },
        ca: { name: 'productsLine.item3Name', sub: 'productsLine.item3Sub', desc: null, url: 'products/products-line.html#calcium-sulfur-fertilizer', tags: '칼슘' },
        osi: { name: 'organic.item1Name', sub: 'organic.item1Notice', desc: 'prescription01.product3Desc', url: 'products/organic.html#organic-silicate', tags: '규산' },
        oli: { name: 'organic.item2Name', sub: 'organic.item2Notice', desc: 'prescription02.organicLimestoneProductDesc', url: 'products/organic.html#organic-limestone', tags: '산성 석회' },
        vita: { name: ['vita.item1Name', 'vita.item2Name'], sub: 'vita.item1Desc', desc: 'prescription03.item3Desc', url: 'products/vita.html#vita-40', tags: '' }
    };
    /* 작물별 처방 (처방 페이지와 같은 분류). when/dose: 사전 키 또는 UI 키(@) */
    var RX = {
        rice: { icon: 'rice', label: '@cRice', sub: '@cRiceSub', lead: 'leadRice', page: 'technical/prescription-01.html', qna: '벼',
            items: [['si', 'roleMain', 'prescription01.timingValue', 'prescription01.product1Dose']], org: { si: 'osi' } },
        fruit: { icon: 'pepper', label: 'prescription02.group1Title', sub: 'prescription02.group1Crops', lead: 'leadFruit', page: 'technical/prescription-02.html', qna: '고추',
            items: [['li', 'roleMain', 'prescription02.group1Note', 'prescription02.limestoneProductDose'], ['si', 'roleSub', 'prescription02.group1Note', '@seeDose']], org: { li: 'oli', si: 'osi' } },
        root: { icon: 'onion', label: 'prescription02.group2Title', sub: 'prescription02.group2Crops', lead: 'leadRoot', page: 'technical/prescription-02.html', qna: '기타',
            items: [['si', 'roleMain', 'prescription02.group2Note', '@seeDose'], ['li', 'roleWith', 'prescription02.group2Note', 'prescription02.limestoneProductDose']], org: { li: 'oli', si: 'osi' } },
        leaf: { icon: 'leaf', label: 'prescription02.group3Title', sub: 'prescription02.group3Crops', lead: 'leadLeaf', page: 'technical/prescription-02.html', qna: '기타',
            items: [['li', 'roleMain', 'prescription02.group3Note', 'prescription02.limestoneProductDose'], ['si', 'roleWith', 'prescription02.group3Note', '@seeDose']], org: { li: 'oli', si: 'osi' } },
        orchard: { icon: 'apple', label: '@cOrchard', sub: null, lead: 'leadOrchard', page: 'technical/prescription-03.html', qna: '사과',
            items: [['li', 'roleSoil', '@whenDormant', '@seeDose'], ['ca', 'roleSoil', '@whenDormant', '@seeDose'], ['vita', 'roleGrow', '@whenVitaOrchard', '@calcDose']], org: { li: 'oli' } },
        house: { icon: 'house', label: '@cHouse', sub: null, lead: 'leadHouse', page: 'technical/prescription-03.html', qna: '시설채소',
            items: [['li', 'roleSoil', '@whenHouse', '@seeDose'], ['si', 'roleSoil', '@whenHouse', '@seeDose'], ['vita', 'roleGrow', '@whenVitaHouse', '@calcDose']], org: { li: 'oli', si: 'osi' } }
    };
    var ICONS = {
        rice: '<path d="M16 29V9"/><path d="M16 9c0-3 2-5 4-6"/><ellipse cx="12.5" cy="12" rx="2" ry="3.2" transform="rotate(-30 12.5 12)"/><ellipse cx="19.5" cy="15" rx="2" ry="3.2" transform="rotate(30 19.5 15)"/><ellipse cx="12.5" cy="18.5" rx="2" ry="3.2" transform="rotate(-30 12.5 18.5)"/><ellipse cx="19.5" cy="21.5" rx="2" ry="3.2" transform="rotate(30 19.5 21.5)"/>',
        pepper: '<path d="M19 9c3 1 4 4 3 8-1.5 6-6 10-13 11 4-3 6-7 6.5-12 .3-4 1.3-6.5 3.5-7z"/><path d="M19 9c0-2 1-4 3-5"/><path d="M17 9.5c1-1 3-1.5 4.5-.5"/>',
        onion: '<path d="M16 9c-6 4-9 8-9 12a9 6 0 0 0 18 0c0-4-3-8-9-12z"/><path d="M16 9V3M13 4l3 5 3-5"/><path d="M12 27c1-3 1-7 4-12M20 27c-1-3-1-7-4-12"/>',
        leaf: '<path d="M6 26C6 13 14 6 27 5c0 13-7 21-21 21z"/><path d="M6 26 18 14"/>',
        apple: '<path d="M16 11c-2-1.5-7-2-8.5 3S9 27 13 27c1.4 0 2-.7 3-.7s1.6.7 3 .7c4 0 7-8 5.5-13S18 9.5 16 11z"/><path d="M16 11c0-2.5.5-4.5 2-6"/><path d="M17.5 7c2.5-1.5 5-1 6 0-1.5 1.8-4 2-6 0z"/>',
        house: '<path d="M4 27V15C4 9 9.5 5 16 5s12 4 12 10v12z"/><path d="M10 27V12M16 27V5M22 27V12"/><path d="M4 18h24"/>',
        sprout: '<path d="M16 28V15"/><path d="M16 17c-6 0-9-3.5-9-8 5 0 9 3 9 8z"/><path d="M16 15c0-5 3-8.5 9-8.5 0 5-3.5 8.5-9 8.5z"/><path d="M9 28h14"/>'
    };
    /* 검색어 → 안내 (4개 언어) */
    var SYMPTOM = /잎|노랗|노래|시들|반점|병해|벌레|썩|leaf|leaves|yellow|wilt|spot|disease|pest|rot|叶|黄|萎|病|虫|lá|vàng|héo|bệnh|sâu|thối/i;
    var KW = [
        { re: /질소|복합비료|웃거름|요소비료|nitrogen|compound|urea|氮|复合肥|尿素|đạm|npk|urê/i, msg: 'hitN', tags: '질소' },
        { re: /쓰러|도복|줄기|규산|lodg|stem|silica|倒伏|茎|硅|đổ ngã|thân|silic/i, msg: 'hitSi', crop: 'rice', prod: 'si', tags: '규산' },
        { re: /산성|ph|산도|석회|acid|lime|酸|石灰|chua|vôi/i, msg: 'hitAcid', crop: 'fruit', prod: 'li', tags: '산성 석회' },
        { re: /칼슘|저장|맛|향|calcium|storage|flavo|aroma|钙|储|风味|canxi|bảo quản|hương/i, msg: 'hitCa', crop: 'orchard', prod: 'ca', tags: '칼슘' },
        { re: /저온|고온|스트레스|착색|당도|냉해|cold|heat|stress|colou?r|sugar|低温|高温|胁迫|着色|糖|lạnh|nóng|stress|màu|ngọt/i, msg: 'hitStress', crop: 'orchard', prod: 'vita', tags: '' }
    ];

    /* ── 도움 함수 ── */
    function lang() { var l = (window.CatalogLang && CatalogLang.get) ? CatalogLang.get() : 'ko'; return UI[l] ? l : 'ko'; }
    function u(k) { return UI[lang()][k] != null ? UI[lang()][k] : UI.ko[k]; }
    function strip(h) { return String(h == null ? '' : h).replace(/<br\s*\/?>/gi, lang() === 'zh' ? '' : ' ').replace(/<[^>]+>/g, '').replace(/\s{2,}/g, ' ').trim(); }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function d(key) {
        if (key == null) return '';
        if (Array.isArray(key)) return key.map(d).join(' · ');
        if (key.charAt(0) === '@') return u(key.slice(1));
        var L = window.CatalogLang && CatalogLang.dict;
        var v = L && ((L[lang()] && L[lang()][key]) || (L.ko && L.ko[key]));
        return strip(v || '');
    }
    function icon(name) { return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.sprout) + '</svg>'; }
    function link(path) { return ROOT + path; }

    /* ── 화면 ── */
    var fab, panel, log, lastQuery = '', lastCrop = '';

    function ensureCss() {
        if (document.querySelector('link[href*="catalog-helper.css"]')) return;
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = ROOT + 'assets/css/catalog-helper.css';
        document.head.appendChild(l);
    }

    function build() {
        ensureCss();
        fab = document.createElement('button');
        fab.type = 'button';
        fab.className = 'soil-helper-fab';
        fab.setAttribute('aria-haspopup', 'dialog');
        fab.setAttribute('aria-expanded', 'false');
        fab.innerHTML = '<span class="soil-helper-fab__ic">' + icon('sprout') + '</span><span class="soil-helper-fab__t" data-h="fab"></span>';
        fab.addEventListener('click', function () { toggle(); });
        document.body.appendChild(fab);

        panel = document.createElement('section');
        panel.className = 'soil-helper';
        panel.hidden = true;
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'false');
        panel.setAttribute('aria-labelledby', 'soil-helper-title');
        panel.innerHTML =
            '<div class="soil-helper__head"><span class="soil-helper__ava">' + icon('sprout') + '</span>' +
            '<div><b id="soil-helper-title" data-h="title"></b><small data-h="subtitle"></small></div>' +
            '<button type="button" class="soil-helper__btn" data-act="restart" data-h-aria="restart">↺</button>' +
            '<button type="button" class="soil-helper__btn" data-act="close" data-h-aria="close">✕</button></div>' +
            '<div class="soil-helper__log" aria-live="polite"></div>' +
            '<div class="soil-helper__quick"><button type="button" data-go="home" data-h="home"></button><button type="button" data-go="staff" data-h="askStaff"></button><button type="button" data-go="call" data-h="call"></button></div>' +
            '<p class="soil-helper__foot" data-h="foot"></p>';
        document.body.appendChild(panel);
        log = panel.querySelector('.soil-helper__log');
        panel.querySelector('[data-act="close"]').addEventListener('click', function () { toggle(false); });
        panel.querySelector('[data-act="restart"]').addEventListener('click', restart);
        panel.querySelectorAll('[data-go]').forEach(function (b) {
            b.addEventListener('click', function () {
                say(b.textContent);
                var g = b.getAttribute('data-go');
                setTimeout(g === 'home' ? home : g === 'staff' ? staff : call, 150);
            });
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { toggle(false); fab.focus(); } });
        paintStatic();
        document.addEventListener('catalog:langchange', function () { paintStatic(); if (!panel.hidden || log.children.length) restart(); });
    }
    function paintStatic() {
        [fab, panel].forEach(function (root) {
            root.querySelectorAll('[data-h]').forEach(function (n) { n.innerHTML = u(n.getAttribute('data-h')); });
            root.querySelectorAll('[data-h-aria]').forEach(function (n) { var t = u(n.getAttribute('data-h-aria')); n.setAttribute('aria-label', t); n.title = t; });
        });
        fab.setAttribute('aria-label', u('fab'));
    }
    function toggle(open) {
        if (open == null) open = panel.hidden;
        panel.hidden = !open;
        fab.setAttribute('aria-expanded', String(open));
        document.documentElement.classList.toggle('soil-helper-open', open);
        if (open) {
            if (!log.children.length) home();
            var first = panel.querySelector('.soil-helper__log button:not([disabled])') || panel.querySelector('[data-act="close"]');
            if (first) first.focus();
        }
    }
    function restart() { log.innerHTML = ''; lastQuery = ''; lastCrop = ''; home(); }

    function add(cls, html) {
        var n = document.createElement('div');
        n.className = cls;
        n.innerHTML = html;
        log.appendChild(n);
        scrollSoon();
        return n;
    }
    /* 새 내용이 생기면, 방금 고른 내 답이 맨 위에 오도록 맞춰 이어지는 안내를 처음부터 읽게 합니다 */
    var scrollPending = false;
    function scrollSoon() {
        if (scrollPending) return;
        scrollPending = true;
        requestAnimationFrame(function () {
            scrollPending = false;
            var mine = log.querySelectorAll('.soil-helper__msg--me');
            var last = mine[mine.length - 1];
            if (!last) { log.scrollTop = 0; return; }
            log.scrollTop += last.getBoundingClientRect().top - log.getBoundingClientRect().top - 8;
        });
    }
    function bot(html) { return add('soil-helper__msg', html); }
    function say(text) { add('soil-helper__msg soil-helper__msg--me', esc(text)); }
    function opts(list) {
        var w = add('soil-helper__opts', '');
        list.forEach(function (o) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'soil-helper__opt' + (o.ghost ? ' is-ghost' : '');
            b.innerHTML = (o.icon ? icon(o.icon) : '') + '<span>' + o.t + '</span>';
            b.addEventListener('click', function () {
                w.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
                say(strip(o.t));
                setTimeout(o.f, 150);
            });
            w.appendChild(b);
        });
        return w;
    }
    function aLink(href, text, ext) { return '<a class="soil-helper__link" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + text + '</a>'; }
    function shortSlot(tags) {
        if (!tags || lang() !== 'ko') return;
        add('soil-helper__short', '<div class="shorts-related-wrap" data-shorts-related data-tags="' + esc(tags) + '" data-label="' + esc(u('relLabel')) + '"></div>');
    }
    function tail() { opts([{ t: u('otherCrop'), f: crops }, { t: u('askStaff'), f: staff, ghost: true }, { t: u('home'), f: home, ghost: true }]); }

    /* ── 흐름 ── */
    function home() {
        bot(u('hello'));
        var list = [{ t: u('optCrop'), icon: 'sprout', f: crops }, { t: u('optMonth'), f: month }, { t: u('optGov'), f: gov }, { t: u('optSearch'), f: search }];
        if (lang() === 'ko') list.push({ t: u('optStories'), f: stories });
        opts(list);
    }
    function crops() {
        bot(u('askCrop'));
        var w = add('soil-helper__crops', '');
        Object.keys(RX).forEach(function (k) {
            var r = RX[k];
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'soil-helper__crop';
            b.innerHTML = icon(r.icon) + '<b>' + esc(d(r.label)) + '</b>' + (r.sub ? '<small>' + esc(d(r.sub)) + '</small>' : '');
            b.addEventListener('click', function () {
                w.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
                lastCrop = k;
                say(d(r.label));
                setTimeout(function () { organicAsk(k); }, 150);
            });
            w.appendChild(b);
        });
    }
    function organicAsk(k) {
        bot(u('askOrganic'));
        opts([{ t: u('orgNo'), f: function () { rx(k, false); } }, { t: u('orgYes'), f: function () { rx(k, true); } }]);
    }
    function card(key, role, when, dose) {
        var p = P[key];
        var desc = p.desc ? d(p.desc) : '';
        add('soil-helper__card',
            '<div class="soil-helper__card-h"><i>HANIL</i><div><b>' + esc(d(p.name)) + '</b><small>' + esc(d(p.sub)) + '</small></div><span class="soil-helper__role' + (role === 'roleSub' || role === 'roleWith' ? ' is-sub' : '') + '">' + esc(u(role)) + '</span></div>' +
            '<dl>' + (desc ? '<dt>' + esc(u('lHelp')) + '</dt><dd>' + esc(desc) + '</dd>' : '') +
            '<dt>' + esc(u('lWhen')) + '</dt><dd>' + esc(d(when)) + '</dd>' +
            '<dt>' + esc(u('lDose')) + '</dt><dd>' + esc(d(dose)) + '</dd></dl>' +
            aLink(link(p.url), esc(u('detail'))));
    }
    function rx(k, org) {
        var r = RX[k];
        bot(u(r.lead) + (org ? '<br>' + u('orgSwitched') : ''));
        r.items.forEach(function (it) {
            var key = (org && r.org[it[0]]) ? r.org[it[0]] : it[0];
            card(key, it[1], it[2], it[3]);
        });
        bot(u('doseNote') + '<br>' + aLink(link(r.page), esc(u('openPage'))));
        shortSlot(P[r.items[0][0]].tags);
        tail();
    }
    function month() {
        var S = window.CatalogExtras && CatalogExtras.season ? CatalogExtras.season() : null;
        if (!S) { bot(u('noMatch')); opts([{ t: u('home'), f: home, ghost: true }]); return; }
        bot('<b>' + esc(S.eyebrow) + '</b> · ' + esc(S.title));
        var w = add('soil-helper__tasks', '');
        S.tasks.forEach(function (t) {
            var n = document.createElement('div');
            n.innerHTML = '<b>' + esc(t[0]) + '</b>' + esc(t[1]) + '<small>' + esc(t[2]) + '</small>';
            w.appendChild(n);
        });
        bot(u('monthNote'));
        opts([{ t: u('optCrop'), f: crops }, { t: u('home'), f: home, ghost: true }]);
    }
    function gov() {
        bot(u('govIntro'));
        var g = add('soil-helper__gov',
            '<div class="soil-helper__row"><select aria-label="' + esc(u('govType')) + '" data-g="type"><option value="field">' + esc(u('govField')) + '</option><option value="paddy">' + esc(u('govPaddy')) + '</option></select>' +
            '<input type="text" inputmode="decimal" data-g="ph" placeholder="' + esc(u('govPh')) + '" aria-label="pH"></div>' +
            '<input type="text" inputmode="decimal" data-g="si" placeholder="' + esc(u('govSi')) + '" aria-label="' + esc(u('govSi')) + '">' +
            '<div class="soil-helper__gov-out" data-g="out"></div><div data-g="short"></div><small>' + esc(u('govNote')) + '</small>');
        var shown = '';
        function run() {
            var X = window.CatalogExtras;
            if (!X) return;
            var res = X.govJudge(g.querySelector('[data-g="type"]').value, X.num(g.querySelector('[data-g="ph"]').value), X.num(g.querySelector('[data-g="si"]').value));
            var o = g.querySelector('[data-g="out"]');
            o.className = 'soil-helper__gov-out' + (res.state === 'yes' ? ' is-yes' : '');
            o.textContent = res.text;
            var slot = g.querySelector('[data-g="short"]');
            var want = (res.acid && lang() === 'ko') ? 'acid' : '';
            if (want !== shown) {
                shown = want;
                slot.innerHTML = want ? '<div class="shorts-related-wrap" data-shorts-related data-tags="산성 석회" data-label="산성 흙이 왜 문제일까?"></div>' : '';
            }
        }
        g.addEventListener('input', run);
        g.addEventListener('change', run);
        run();
        opts([{ t: u('govPage'), f: function () { location.href = link('technical/government.html'); } }, { t: u('home'), f: home, ghost: true }]);
    }
    function search() {
        bot(u('searchIntro'));
        var s = add('soil-helper__search', '<input type="text" placeholder="' + esc(u('searchPh')) + '" aria-label="' + esc(u('optSearch')) + '"><button type="button">' + esc(u('searchBtn')) + '</button>');
        var input = s.querySelector('input');
        var exList = opts(u('ex').map(function (q) { return { t: esc(q), f: function () { answer(q); } }; }));
        function go() {
            var q = input.value.trim();
            if (!q) return;
            input.disabled = true;
            s.querySelector('button').disabled = true;
            exList.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
            say(q);
            setTimeout(function () { answer(q); }, 150);
        }
        s.querySelector('button').addEventListener('click', go);
        input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
        input.focus();
    }
    function answer(q) {
        lastQuery = q;
        if (SYMPTOM.test(q) && !KW.some(function (k) { return k.re.test(q); })) {
            bot(u('symptom'));
            findQna(q).then(function () { opts([{ t: u('askStaff'), f: staff }, { t: u('home'), f: home, ghost: true }]); });
            return;
        }
        var hit = KW.filter(function (k) { return k.re.test(q); })[0];
        if (hit) {
            bot(u(hit.msg));
            if (hit.prod) {
                var r = RX[hit.crop];
                var it = r.items.filter(function (i) { return i[0] === hit.prod; })[0] || r.items[0];
                card(hit.prod, it[1], it[2], it[3]);
            } else {
                bot(aLink(link('technical/guide.html'), esc(d('nav.guide') || u('openPage'))));
            }
            shortSlot(hit.tags);
            findQna(q).then(tail);
            return;
        }
        findQna(q).then(function (n) {
            if (!n) bot(u('noMatch'));
            opts([{ t: u('askStaff'), f: staff }, { t: u('home'), f: home, ghost: true }]);
        });
    }
    /* 답변이 끝난 공개 Q&A에서 비슷한 글 찾기 (한국어 화면) */
    var qnaCache = null;
    function findQna(q) {
        if (lang() !== 'ko') return Promise.resolve(0);
        var words = q.replace(/[?!.,~·]/g, ' ').split(/\s+/).filter(function (w) { return w.length >= 2; })
            .map(function (w) { return w.replace(/(이|가|은|는|을|를|에|의|도|요|어요|해요|나요|래요|져요)$/, ''); })
            .filter(function (w) { return w.length >= 2; });
        if (!words.length) return Promise.resolve(0);
        if (!qnaCache) {
            qnaCache = fetch(ROOT + 'api/qna', { headers: { Accept: 'application/json' } })
                .then(function (r) { return r.ok ? r.json() : { items: [] }; })
                .then(function (j) { return (j.items || []).filter(function (it) { return !it.private && it.status === 'done' && it.answer; }); })
                .catch(function () { return []; });
        }
        return qnaCache.then(function (list) {
            var scored = list.map(function (it) {
                var hay = [it.body, it.answer.judge, it.answer.manage, it.answer.check].join(' ');
                var n = words.filter(function (w) { return hay.indexOf(w) >= 0; }).length;
                return { it: it, n: n };
            }).filter(function (x) { return x.n > 0; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 2);
            if (!scored.length) return 0;
            bot(u('qaFound'));
            scored.forEach(function (x) {
                var it = x.it;
                add('soil-helper__qa', '<b>[' + esc(it.crop) + '] ' + esc(String(it.body).slice(0, 60)) + '</b><span>' + esc(String(it.answer.judge).slice(0, 90)) + '</span>' +
                    aLink(link('contactus/qna.html') + '#q-' + encodeURIComponent(it.id), esc(u('qaOpen'))));
            });
            return scored.length;
        });
    }
    function staff() {
        bot(u('staffGo'));
        if (lang() === 'ko') {
            var crop = lastCrop && RX[lastCrop] ? RX[lastCrop].qna : '';
            var qs = [];
            if (crop) qs.push('crop=' + encodeURIComponent(crop));
            if (lastQuery) qs.push('q=' + encodeURIComponent(lastQuery));
            bot(aLink(link('contactus/qna.html') + (qs.length ? '?' + qs.join('&') : ''), u('staffOpen')));
        } else {
            bot(aLink(link('contactus/contact-us.html'), u('staffOpen')));
        }
        opts([{ t: u('home'), f: home, ghost: true }]);
    }
    function call() {
        bot(u('callText') + '<br><a class="soil-helper__tel" href="' + TEL + '">' + esc(d('contactUs.tel')) + '</a>');
        opts([{ t: u('home'), f: home, ghost: true }]);
    }
    function stories() {
        bot(u('storiesText') + '<br>' + aLink(link('technical/guide.html') + '#shorts', esc(u('storiesOpen'))));
        opts([{ t: u('home'), f: home, ghost: true }]);
    }

    function ensureExtras() {
        if (window.CatalogExtras || document.querySelector('script[src*="catalog-extras.js"]')) return;
        var s = document.createElement('script');
        s.src = ROOT + 'assets/js/catalog-extras.js';
        s.async = true;
        document.head.appendChild(s);
    }

    window.CatalogHelper = { open: function () { toggle(true); } };

    function start() {
        var tries = 0;
        (function wait() {
            if (window.CatalogLang || tries > 60) { build(); ensureExtras(); return; }
            tries++;
            setTimeout(wait, 50);
        })();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})();
