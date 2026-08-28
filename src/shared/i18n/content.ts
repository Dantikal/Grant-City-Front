import type { LanguageCode } from "@/shared/constants/languages";

type Dict = Record<string, string>;

/** Longer-form, fixed marketing/content copy. Kept separate from the UI dictionary
 *  to keep things readable. Property/agent card fields stay as editable data. */

const en: Dict = {
  // detail-page labels
  "pd.crumb": "Properties",
  "pd.about": "About this home",
  "pd.features": "Features",
  "pd.location": "Location",
  "pd.beds": "Beds",
  "pd.baths": "Baths",
  "pd.sqft": "Sqft",
  "ad.rating": "rating",
  "ad.placed": "homes placed",
  "ad.since": "Since {year}",
  "ad.listings": "{name}'s listings",
  "ad.message": "Message {name}",

  // FAQ
  "faq.q1": "What areas do you cover?",
  "faq.a1":
    "Eleven neighborhoods across inner Portland — concentrated on the east side, the Pearl, and the South Waterfront. If it's outside our patch, we'll tell you and point you to someone good.",
  "faq.q2": "How do you price a home for sale?",
  "faq.a2":
    "On the evidence — recent comparable sales, current competition, and the condition of your home. We give you a realistic number from day one, even when a higher one would win us the instruction.",
  "faq.q3": "Do you charge for a valuation?",
  "faq.a3":
    "No. A valuation and an honest conversation about your options are free, with no obligation to list with us afterwards.",
  "faq.q4": "Can you help me let and manage a property?",
  "faq.a4":
    "Yes — letting and full management are core services. We handle referencing, paperwork, maintenance and rent collection so it never becomes a second job.",
  "faq.q5": "How quickly do you respond?",
  "faq.a5": "We reply to every enquiry within one business day, usually much sooner.",

  // Testimonials (authors stay as data)
  "tst.1.q":
    "They priced our place honestly when three other agents inflated it to win the listing — and still sold it above asking in nine days.",
  "tst.1.d": "Sold in Ladd's Addition · 2025",
  "tst.2.q":
    "We were first-time buyers and completely overwhelmed. Mara talked us out of two houses before finding the one we actually needed.",
  "tst.2.d": "Bought in Sellwood · 2025",
  "tst.3.q":
    "Priya has managed our rental for three years and we genuinely never think about it. That's the whole point, isn't it?",
  "tst.3.d": "Managed let, Pearl District",

  // Services
  "svc.buying.title": "Buying",
  "svc.buying.body":
    "We learn what actually matters to you, then filter ruthlessly — including off-market homes you won't find on the portals.",
  "svc.buying.long":
    "Buying with us starts with a real conversation, not a portal search. We get to the bottom of what you actually need, then do the legwork — including knocking on doors and working our network for homes that never hit the open market. We're with you at every viewing and we'll talk you out of the wrong house as readily as into the right one.",
  "svc.buying.points":
    "Off-market access | Honest second opinions | Negotiation on your side | Survey & legal coordination",
  "svc.selling.title": "Selling",
  "svc.selling.body":
    "Honest pricing from day one, careful staging, and photography that flatters without lying. We hold out for the right buyer.",
  "svc.selling.long":
    "We price your home where it will actually sell, not where it wins us the instruction. Then we stage it carefully, photograph it properly, and market it to the buyers most likely to fall for it. One named agent runs your sale from first viewing to completion.",
  "svc.selling.points":
    "Straight pricing | Staging & photography | Targeted marketing | One agent, start to finish",
  "svc.letting.title": "Letting",
  "svc.letting.body":
    "Finding tenants who'll treat your place like their own, with vetting and paperwork handled so you never chase a reference.",
  "svc.letting.long":
    "We find tenants who'll look after your property and stay a while, handling referencing, contracts and deposit protection so you never have to. Clear, compliant, and calm.",
  "svc.letting.points":
    "Thorough referencing | Compliant paperwork | Deposit protection | Tenant matching",
  "svc.management.title": "Management",
  "svc.management.body":
    "Ongoing care for your rental — maintenance, inspections, and rent collection — so it never becomes a second job.",
  "svc.management.long":
    "Full management for owners who'd rather not field 2am phone calls. We handle maintenance, periodic inspections, rent collection and the steady drip of small things, with a trusted book of local trades behind us.",
  "svc.management.points":
    "Maintenance & trades | Periodic inspections | Rent collection | Single point of contact",

  // Agent bios (per id)
  "agent.agent-1.bio":
    "Mara founded Grand City after a decade at a high-volume brokerage left her wanting a slower, more honest way to work. She knows the inner east side block by block and has a reputation for pricing homes straight — even when it costs her the listing.",
  "agent.agent-2.bio":
    "Trained as an architect before moving into property, Devon gravitates toward new construction and contemporary homes. Buyers lean on him to read a floor plan honestly and spot the things a staging photo hides.",
  "agent.agent-3.bio":
    "Priya runs the lettings side of the company — matching tenants to homes they'll actually look after, and giving owners a manager who answers the phone. Calm, organized, and impossible to rattle.",
  "agent.agent-4.bio":
    "Theo is the company's mid-century devotee — he can date a house by its post-and-beam joinery and knows which east-hills streets get the best light. Patient with buyers who are waiting for exactly the right thing.",
};

const ru: Dict = {
  "pd.crumb": "Недвижимость",
  "pd.about": "Об этом доме",
  "pd.features": "Особенности",
  "pd.location": "Расположение",
  "pd.beds": "Спальни",
  "pd.baths": "Санузлы",
  "pd.sqft": "кв. футов",
  "ad.rating": "рейтинг",
  "ad.placed": "продано домов",
  "ad.since": "С {year} года",
  "ad.listings": "Объекты агента {name}",
  "ad.message": "Написать {name}",

  "faq.q1": "Какие районы вы охватываете?",
  "faq.a1":
    "Одиннадцать районов внутреннего Портленда — в основном восточная часть, Pearl и South Waterfront. Если объект вне нашей зоны, мы честно скажем и порекомендуем хорошего специалиста.",
  "faq.q2": "Как вы оцениваете дом для продажи?",
  "faq.a2":
    "По фактам — недавние сопоставимые сделки, текущая конкуренция и состояние вашего дома. Мы даём реалистичную цифру с первого дня, даже если завышенная цена принесла бы нам контракт.",
  "faq.q3": "Берёте ли вы плату за оценку?",
  "faq.a3":
    "Нет. Оценка и честный разговор о ваших вариантах бесплатны, без обязательства выставлять объект через нас.",
  "faq.q4": "Поможете сдать в аренду и управлять недвижимостью?",
  "faq.a4":
    "Да — аренда и полное управление входят в основные услуги. Мы берём на себя проверку, документы, обслуживание и сбор арендной платы, чтобы это не стало второй работой.",
  "faq.q5": "Как быстро вы отвечаете?",
  "faq.a5":
    "Мы отвечаем на каждое обращение в течение одного рабочего дня, обычно гораздо быстрее.",

  "tst.1.q":
    "Они честно оценили наш дом, когда три других агента завысили цену ради контракта — и всё равно продали выше запрошенной за девять дней.",
  "tst.1.d": "Продано в Ladd's Addition · 2025",
  "tst.2.q":
    "Мы были покупателями впервые и совершенно растерялись. Мара отговорила нас от двух домов, прежде чем нашёлся тот, что нам действительно нужен.",
  "tst.2.d": "Покупка в Sellwood · 2025",
  "tst.3.q":
    "Прия управляет нашей арендой уже три года, и мы о ней просто не думаем. В этом ведь и весь смысл, верно?",
  "tst.3.d": "Управление арендой, Pearl District",

  "svc.buying.title": "Покупка",
  "svc.buying.body":
    "Узнаём, что для вас действительно важно, и фильтруем безжалостно — включая внерыночные дома, которых нет на порталах.",
  "svc.buying.long":
    "Покупка с нами начинается с настоящего разговора, а не с поиска по порталу. Мы выясняем, что вам действительно нужно, и делаем всю работу — включая поиск домов, которые никогда не выходят на открытый рынок. Мы рядом на каждом просмотре и отговорим вас от неподходящего дома так же охотно, как поможем с правильным.",
  "svc.buying.points":
    "Доступ к внерыночным объектам | Честное второе мнение | Переговоры на вашей стороне | Координация осмотра и юридических вопросов",
  "svc.selling.title": "Продажа",
  "svc.selling.body":
    "Честная цена с первого дня, аккуратная подготовка и фотографии, которые украшают без обмана. Мы ждём правильного покупателя.",
  "svc.selling.long":
    "Мы оцениваем ваш дом там, где он реально продастся, а не там, где это принесёт нам контракт. Затем аккуратно готовим его, правильно фотографируем и предлагаем тем покупателям, кому он, скорее всего, понравится. Один закреплённый агент ведёт продажу от первого просмотра до завершения.",
  "svc.selling.points":
    "Честная цена | Подготовка и фотосъёмка | Целевой маркетинг | Один агент от и до",
  "svc.letting.title": "Аренда",
  "svc.letting.body":
    "Находим арендаторов, которые отнесутся к жилью как к своему, с проверкой и документами, чтобы вы не бегали за рекомендациями.",
  "svc.letting.long":
    "Мы находим арендаторов, которые позаботятся о вашем жилье и останутся надолго, берём на себя проверку, договоры и защиту депозита. Понятно, по закону и спокойно.",
  "svc.letting.points":
    "Тщательная проверка | Документы по закону | Защита депозита | Подбор арендаторов",
  "svc.management.title": "Управление",
  "svc.management.body":
    "Постоянная забота о вашей аренде — обслуживание, осмотры и сбор платы, чтобы это не стало второй работой.",
  "svc.management.long":
    "Полное управление для владельцев, которым не хочется отвечать на звонки в 2 ночи. Мы берём на себя обслуживание, плановые осмотры, сбор платы и поток мелких дел, опираясь на проверенных местных мастеров.",
  "svc.management.points":
    "Обслуживание и мастера | Плановые осмотры | Сбор платы | Единая точка контакта",

  "agent.agent-1.bio":
    "Мара основала Grand City после десяти лет в крупном агентстве, захотев работать спокойнее и честнее. Она знает внутреннюю восточную часть квартал за кварталом и славится честной оценкой домов — даже когда это стоит ей контракта.",
  "agent.agent-2.bio":
    "По образованию архитектор, Девон тяготеет к новостройкам и современным домам. Покупатели полагаются на него, чтобы честно прочитать планировку и заметить то, что скрывает постановочное фото.",
  "agent.agent-3.bio":
    "Прия ведёт направление аренды в компании — подбирает арендаторов, которые действительно заботятся о жилье, и даёт владельцам управляющего, который берёт трубку. Спокойная, организованная и невозмутимая.",
  "agent.agent-4.bio":
    "Тео — поклонник середины века в компании: он определит возраст дома по соединениям балок и знает, на каких улицах восточных холмов лучший свет. Терпелив с покупателями, ждущими именно того, что нужно.",
};

const ky: Dict = {
  "pd.crumb": "Кыймылсыз мүлк",
  "pd.about": "Бул үй жөнүндө",
  "pd.features": "Өзгөчөлүктөр",
  "pd.location": "Жайгашуусу",
  "pd.beds": "Уктоочу бөлмө",
  "pd.baths": "Жуунучу бөлмө",
  "pd.sqft": "чарчы фут",
  "ad.rating": "рейтинг",
  "ad.placed": "сатылган үйлөр",
  "ad.since": "{year}-жылдан бери",
  "ad.listings": "{name} агенттин объекттери",
  "ad.message": "{name} агентке жазуу",

  "faq.q1": "Кайсы райондорду камтыйсыздар?",
  "faq.a1":
    "Портленддин ичиндеги он бир район — негизинен чыгыш тарап, Pearl жана South Waterfront. Эгер объект биздин аймактан тышкары болсо, чынын айтып, жакшы адисти сунуштайбыз.",
  "faq.q2": "Үйдү сатууга кантип баалайсыздар?",
  "faq.a2":
    "Фактыларга таянып — жакынкы окшош сатуулар, азыркы атаандаштык жана үйүңүздүн абалы. Биринчи күндөн реалдуу баа беребиз, жогорку баа бизге келишим алып келсе да.",
  "faq.q3": "Баалоо үчүн акы аласыздарбы?",
  "faq.a3":
    "Жок. Баалоо жана мүмкүнчүлүктөрүңүз тууралуу чынчыл сүйлөшүү акысыз, кийин биз аркылуу коюуга милдет жок.",
  "faq.q4": "Ижарага берүүгө жана башкарууга жардам бересиздерби?",
  "faq.a4":
    "Ооба — ижара жана толук башкаруу негизги кызматтарга кирет. Текшерүү, документтер, тейлөө жана ижара акысын чогултууну өзүбүз аткарабыз, ал экинчи жумушка айланбасы үчүн.",
  "faq.q5": "Канча тез жооп бересиздер?",
  "faq.a5": "Ар бир кайрылууга бир жумуш күндүн ичинде, көбүнчө андан да тез жооп беребиз.",

  "tst.1.q":
    "Үч башка агент келишим алуу үчүн бааны көтөргөндө, алар үйүбүздү чынчыл баалашты — жана аны тогуз күндө суралган баадан жогору сатышты.",
  "tst.1.d": "Ladd's Addition'до сатылды · 2025",
  "tst.2.q":
    "Биз биринчи жолу сатып алуучу элек жана таптакыр айран калдык. Мара бизге чындап керектүү үйдү тапканга чейин эки үйдөн баш тарттырды.",
  "tst.2.d": "Sellwood'до сатып алынды · 2025",
  "tst.3.q":
    "Прия үч жылдан бери биздин ижараны башкарып келет, биз ал жөнүндө таптакыр ойлонбойбуз. Дал ушул максат эмеспи?",
  "tst.3.d": "Башкарылган ижара, Pearl District",

  "svc.buying.title": "Сатып алуу",
  "svc.buying.body":
    "Сиз үчүн чындап маанилүүсүн билип алып, аёосуз чыпкалайбыз — порталдардан таппай турган рыноктон тышкаркы үйлөрдү кошкондо.",
  "svc.buying.long":
    "Биз менен сатып алуу порталдан издөө эмес, чыныгы сүйлөшүүдөн башталат. Сизге эмне керек экенин аныктап, бардык ишти аткарабыз — ачык рынокко чыкпаган үйлөрдү издөөнү кошкондо. Ар бир көрүүдө жаныңыздабыз жана туура эмес үйдөн да, туура үйгө багыттагандай эле, баш тарттырабыз.",
  "svc.buying.points":
    "Рыноктон тышкаркы объекттерге жетүү | Чынчыл экинчи пикир | Сиздин тарапта сүйлөшүү | Кароо жана юридикалык координация",
  "svc.selling.title": "Сатуу",
  "svc.selling.body":
    "Биринчи күндөн чынчыл баа, кылдат даярдоо жана алдабай көркөмдөгөн сүрөттөр. Туура сатып алуучуну күтөбүз.",
  "svc.selling.long":
    "Биз үйүңүздү бизге келишим алып келген жерде эмес, чындап сатыла турган баада баалайбыз. Андан соң кылдат даярдап, туура сүрөткө тартып, аны жактырчу сатып алуучуларга сунуштайбыз. Бир дайындалган агент сатууну биринчи көрүүдөн аякташына чейин алып барат.",
  "svc.selling.points":
    "Туура баа | Даярдоо жана фотосүрөт | Багытталган маркетинг | Бир агент башынан аягына чейин",
  "svc.letting.title": "Ижара",
  "svc.letting.body":
    "Жайды өзүнүкүндөй караган ижарачыларды табабыз, текшерүү жана документтерди өзүбүз чечип, сиз сунуш-каттарды кубалабайсыз.",
  "svc.letting.long":
    "Жайыңызды карап, узак турган ижарачыларды табабыз, текшерүү, келишим жана депозитти коргоону өзүбүз аткарабыз. Так, мыйзамдуу жана тынч.",
  "svc.letting.points":
    "Кылдат текшерүү | Мыйзамдуу документтер | Депозитти коргоо | Ижарачыны тандоо",
  "svc.management.title": "Башкаруу",
  "svc.management.body":
    "Ижараңызга туруктуу кам көрүү — тейлөө, текшерүү жана акы чогултуу — ал экинчи жумушка айланбасы үчүн.",
  "svc.management.long":
    "Түнкү 2дө чалууларга жооп бергиси келбеген ээлер үчүн толук башкаруу. Тейлөө, мезгил-мезгили менен текшерүү, акы чогултуу жана майда иштердин агымын ишенимдүү жергиликтүү усталар менен аткарабыз.",
  "svc.management.points":
    "Тейлөө жана усталар | Мезгилдик текшерүү | Акы чогултуу | Бирдиктүү байланыш чекити",

  "agent.agent-1.bio":
    "Мара чоң агенттикте он жыл иштеп, тынчыраак жана чынчылыраак иштегиси келгенден кийин Grand City'ди негиздеген. Ал ички чыгыш тарапты кварталма-квартал билет жана үйлөрдү чынчыл баалоосу менен белгилүү — бул ага келишимди жоготтурса да.",
  "agent.agent-2.bio":
    "Кыймылсыз мүлккө өтөөрдөн мурун архитектор болуп окуган Девон жаңы курулуштарга жана заманбап үйлөргө ыктайт. Сатып алуучулар планды чынчыл окуп, постановкалык сүрөт жашырган нерселерди байкоо үчүн ага таянышат.",
  "agent.agent-3.bio":
    "Прия компаниянын ижара багытын жүргүзөт — жайды чындап караган ижарачыларды тандап, ээлерге телефон көтөргөн башкаруучу берет. Токтоо, иреттүү жана эч качан саспайт.",
  "agent.agent-4.bio":
    "Тео — компаниянын кылымдын орто чениндеги стилге берилген адамы: ал үйдүн жашын устун-арка туташуусунан аныктайт жана чыгыш дөбөлөрүнүн кайсы көчөлөрүндө эң жакшы жарык бар экенин билет. Так керектүүсүн күткөн сатып алуучуларга чыдамдуу.",
};

const zh: Dict = {
  "pd.crumb": "房产",
  "pd.about": "房源介绍",
  "pd.features": "配套特色",
  "pd.location": "位置",
  "pd.beds": "卧室",
  "pd.baths": "卫生间",
  "pd.sqft": "平方英尺",
  "ad.rating": "评分",
  "ad.placed": "成交房屋",
  "ad.since": "自 {year} 年",
  "ad.listings": "{name} 的房源",
  "ad.message": "给 {name} 留言",

  "faq.q1": "你们服务哪些区域？",
  "faq.a1":
    "波特兰市区内的十一个社区——主要集中在东区、Pearl 和 South Waterfront。如果房子不在我们的服务范围内，我们会如实告知，并为您推荐靠谱的同行。",
  "faq.q2": "你们如何为待售房屋定价？",
  "faq.a2":
    "以事实为依据——近期可比成交、当前竞争情况以及房屋自身状况。我们从第一天起就给出真实的数字，即使报高价能帮我们拿下委托。",
  "faq.q3": "估价收费吗？",
  "faq.a3":
    "不收费。估价以及关于您各种选择的坦诚沟通都是免费的，之后也没有必须委托我们挂牌的义务。",
  "faq.q4": "你们能帮我出租和管理房产吗？",
  "faq.a4":
    "可以——租赁与全托管是我们的核心服务。资质核查、合同文件、维修养护和租金代收都由我们负责，不会让它变成您的第二份工作。",
  "faq.q5": "你们多久回复？",
  "faq.a5": "每一条咨询我们都会在一个工作日内回复，通常要快得多。",

  "tst.1.q":
    "另外三家中介为了拿下委托把价格抬得很高，而他们给出的是诚实的定价——最后仍在九天内以高于挂牌价成交。",
  "tst.1.d": "成交于 Ladd's Addition · 2025",
  "tst.2.q":
    "我们是首次购房者，完全不知所措。Mara 劝我们放弃了两套房子，才找到真正适合我们的那一套。",
  "tst.2.d": "购于 Sellwood · 2025",
  "tst.3.q": "Priya 帮我们管理出租房已经三年，我们几乎从不需要操心。这不正是重点所在吗？",
  "tst.3.d": "托管出租，Pearl District",

  "svc.buying.title": "购房",
  "svc.buying.body": "先弄清什么对您真正重要，再进行严格筛选——包括门户网站上找不到的非公开房源。",
  "svc.buying.long":
    "和我们一起买房，从一次真正的交谈开始，而不是从门户网站的搜索开始。我们弄清您真正需要什么，然后亲自跑腿——包括上门询问、动用人脉去找那些从未公开上市的房子。每一次看房我们都在场，劝您放弃错误的房子和推荐对的房子一样干脆。",
  "svc.buying.points": "非公开房源渠道 | 诚实的第二意见 | 站在您这边谈判 | 验房与法律事务协调",
  "svc.selling.title": "售房",
  "svc.selling.body": "从第一天起诚实定价、用心布置，照片好看但不失真。我们会等到对的买家。",
  "svc.selling.long":
    "我们按房子真正能成交的价格定价，而不是按能帮我们拿下委托的价格。然后精心布置、专业拍摄，并推广给最可能心动的买家。一位专属顾问从第一次看房负责到交割完成。",
  "svc.selling.points": "实价定价 | 布置与摄影 | 精准营销 | 一位顾问全程负责",
  "svc.letting.title": "租赁",
  "svc.letting.body": "找到会像对待自己家一样爱惜房子的租客，资质核查与文件都由我们处理。",
  "svc.letting.long":
    "我们寻找会爱惜您的房子并愿意长住的租客，资质核查、合同和押金托管都由我们负责。清晰、合规、省心。",
  "svc.letting.points": "严格资质核查 | 合规文件 | 押金托管 | 租客匹配",
  "svc.management.title": "托管",
  "svc.management.body": "持续照看您的出租房——维修、巡检和租金代收，不让它变成第二份工作。",
  "svc.management.long":
    "为不想半夜接电话的业主提供全托管。我们负责维修养护、定期巡检、租金代收以及各种琐碎小事，背后有一批值得信赖的本地施工师傅。",
  "svc.management.points": "维修与施工 | 定期巡检 | 租金代收 | 单一对接人",

  "agent.agent-1.bio":
    "Mara 在一家走量的中介公司工作十年后，希望以更从容、更诚实的方式做事，于是创立了 Grand City。她对内东区了如指掌，以实价定价著称——即使这会让她丢掉委托。",
  "agent.agent-2.bio":
    "转行做房产之前，Devon 学的是建筑，因此偏爱新建楼盘和现代住宅。买家依靠他如实解读户型图，并发现摆拍照片掩盖的问题。",
  "agent.agent-3.bio":
    "Priya 负责公司的租赁业务——为房子匹配真正会爱惜它的租客，也让业主拥有一位随叫随到的管理人。沉稳、有条理，遇事不慌。",
  "agent.agent-4.bio":
    "Theo 是公司里的中古建筑迷——他能凭梁柱结构判断房龄，也清楚东侧山坡哪几条街采光最好。对于等待完全合适房源的买家，他很有耐心。",
};

// --- Bishkek developments added from src/.info_for_claude ---
const propsEn: Dict = {
  "prop.prop-osipenko.desc":
    "A premium club-format low-rise of just 4 floors in Bishkek's Pervomaisky district — gated grounds, an underground car park, and seismic resilience to 8–9 points. Built legally and fully financed by ООО «БГС». Completion February 2027.",
  "prop.prop-osipenko.features":
    "Club format · only 4 floors | Underground parking | Gated private grounds | Seismic resilience 8–9 | Total area 2,235 m²",
  "prop.prop-semak.desc":
    "A new comfort-class landmark in Bishkek — a 17-storey monolithic tower with a ceramic-granite façade. Individual heating per apartment, underground parking for 118 cars, and 240 modern homes from $1,400/m². Completion Q4 2028.",
  "prop.prop-semak.features":
    "17 storeys · 240 apartments | Individual heating | Underground parking (118) | Ceramic-granite façade | From $1,400 / m²",
  "prop.prop-fuchika.desc":
    "Comfort by the park, from established builder СК «Сталькон» (since 2001) — a 10-storey monolithic complex of 198 homes steps from Fuchika Park. Gated grounds with 24/7 security, 1,500 m² of ground-floor retail, and flexible self-finish (PSO) layouts. Completion Q4 2026.",
  "prop.prop-fuchika.features":
    "10 storeys · 198 apartments | Beside Fuchika Park | 1,500 m² ground-floor retail | Gated · 24/7 security | Self-finish (PSO) layouts",
};

const propsRu: Dict = {
  "prop.prop-osipenko.desc":
    "Клубный дом премиального формата всего на 4 этажа в Первомайском районе Бишкека — огороженная территория, подземный паркинг и сейсмостойкость до 8–9 баллов. Проект строится легально и полностью профинансирован ООО «БГС». Сдача — февраль 2027.",
  "prop.prop-osipenko.features":
    "Клубный формат · всего 4 этажа | Подземный паркинг | Огороженная территория | Сейсмостойкость 8–9 | Общая площадь 2 235 м²",
  "prop.prop-semak.desc":
    "Новый ориентир комфорт-класса в Бишкеке — 17-этажная монолитная башня с фасадом из керамогранита. Индивидуальное отопление в каждой квартире, подземный паркинг на 118 мест и 240 современных квартир от $1 400/м². Сдача — IV квартал 2028.",
  "prop.prop-semak.features":
    "17 этажей · 240 квартир | Индивидуальное отопление | Подземный паркинг (118) | Фасад из керамогранита | От $1 400 / м²",
  "prop.prop-fuchika.desc":
    "Комфорт у парка от опытного застройщика СК «Сталькон» (с 2001 года) — 10-этажный монолитный комплекс на 198 квартир в нескольких шагах от парка им. Фучика. Закрытая территория с охраной 24/7, 1 500 м² коммерции на первом этаже и гибкие планировки под самоотделку (ПСО). Сдача — IV квартал 2026.",
  "prop.prop-fuchika.features":
    "10 этажей · 198 квартир | Рядом с парком Фучика | 1 500 м² коммерции на 1 этаже | Закрытая территория · охрана 24/7 | Планировки под самоотделку (ПСО)",
};

const propsKy: Dict = {
  "prop.prop-osipenko.desc":
    "Бишкектин Биринчи Май районундагы болгону 4 кабаттан турган премиум класстагы клубдук үй — тосулган аймак, жер астындагы унаа токтотуучу жай жана 8–9 баллга чейин сейсмикалык туруктуулук. Долбоор мыйзамдуу курулуп, ООО «БГС» тарабынан толук каржыланган. Тапшыруу — 2027-жылдын феврали.",
  "prop.prop-osipenko.features":
    "Клубдук формат · болгону 4 кабат | Жер астындагы паркинг | Тосулган аймак | Сейсмикалык туруктуулук 8–9 | Жалпы аянты 2 235 м²",
  "prop.prop-semak.desc":
    "Бишкектеги комфорт класстагы жаңы багыт — керамогранит фасады бар 17 кабаттуу монолит мунара. Ар бир батирде өзүнчө жылытуу, 118 орундуу жер астындагы паркинг жана $1 400/м²дан башталган 240 заманбап батир. Тапшыруу — 2028-жылдын IV чейреги.",
  "prop.prop-semak.features":
    "17 кабат · 240 батир | Өзүнчө жылытуу | Жер астындагы паркинг (118) | Керамогранит фасад | $1 400/м²дан",
  "prop.prop-fuchika.desc":
    "Тажрыйбалуу СК «Сталькон» (2001-жылдан бери) курган парк жанындагы комфорт — Фучика паркынан бир нече кадам алыстыктагы 198 батирлүү 10 кабаттуу монолит комплекс. 24/7 кайтарылган тосулган аймак, 1-кабатта 1 500 м² соода аянты жана өз алдынча бүтүрүүгө (ПСО) ийкемдүү пландаштыруу. Тапшыруу — 2026-жылдын IV чейреги.",
  "prop.prop-fuchika.features":
    "10 кабат · 198 батир | Фучика паркынын жанында | 1-кабатта 1 500 м² соода | Тосулган аймак · 24/7 кайтаруу | Өз алдынча бүтүрүү (ПСО) пландары",
};

const propsZh: Dict = {
  "prop.prop-osipenko.desc":
    "位于比什凯克五一区的高端会所式低层住宅，仅 4 层——封闭式园区、地下车库，抗震等级达 8–9 级。项目合法建设，由 ООО «БГС» 全额出资。交付时间：2027 年 2 月。",
  "prop.prop-osipenko.features":
    "会所式 · 仅 4 层 | 地下车库 | 封闭式私家园区 | 抗震 8–9 级 | 总建筑面积 2,235 m²",
  "prop.prop-semak.desc":
    "比什凯克舒适型住宅的新地标——17 层现浇塔楼，采用瓷质大理石外立面。每户独立供暖，118 个车位的地下车库，240 套现代住宅，起价 $1,400/m²。交付时间：2028 年第四季度。",
  "prop.prop-semak.features":
    "17 层 · 240 套住宅 | 独立供暖 | 地下车库（118 位） | 瓷质大理石外立面 | $1,400 / m² 起",
  "prop.prop-fuchika.desc":
    "由资深开发商 СК «Сталькон»（成立于 2001 年）打造的公园旁舒适住宅——10 层现浇建筑，共 198 套住宅，紧邻富奇克公园。封闭式园区配 24/7 保安，首层 1,500 m² 商业配套，并提供毛坯（ПСО）灵活户型。交付时间：2026 年第四季度。",
  "prop.prop-fuchika.features":
    "10 层 · 198 套住宅 | 紧邻富奇克公园 | 首层 1,500 m² 商业 | 封闭园区 · 24/7 保安 | 毛坯（ПСО）户型",
};

// --- Real company profile (Grand City & Business-Expert, Bishkek) — overrides base UI copy ---
const companyEn: Dict = {
  "hero.badge": "Real estate & consulting · est. 2022",
  "hero.subtitle":
    "A real-estate and business-consulting center in Bishkek — pairing independent valuation and deep analytics with hands-on property sales, so every decision pays off.",
  "hero.homesPlaced": "Deals supported",
  "footer.tagline":
    "A real-estate and business-consulting center in Bishkek. Transparency, analytics and results.",

  "home.about.eyebrow": "About the company",
  "home.about.title": "Helping you make the best property decisions.",
  "home.about.p1":
    "Grand City is a real-estate and business-consulting center, founded in 2022 as the evolution of the Business-Expert appraisal and analytics center. We combine independent valuation and deep analytics with practical tools for selling property.",
  "home.about.p2":
    "Our mission is to help you get the most value from buying, selling or developing property — backed by transparency, automation and a focus on results.",
  "home.about.badgeText": "of combined expertise in valuation, analytics and development.",

  "values.local.t": "Transparent",
  "values.local.b": "You see exactly what you pay for.",
  "values.honest.t": "Expert",
  "values.honest.b": "20+ years and certified appraisers.",
  "values.small.t": "Result-driven",
  "values.small.b": "Active sales, handled end to end.",

  "about.title": "A real-estate & consulting center built on transparency.",
  "about.subtitle":
    "Grand City & Business-Expert — independent valuation, analytics and property sales in Bishkek.",
  "about.storyTitle": "Founded in 2022 as the evolution of Business-Expert.",
  "about.p1":
    "The Grand City center grew out of Business-Expert, combining professional analytics and independent appraisal with practical property-sales tools. We work across the full cycle — from finding land and proving a project's investment case to selling the finished homes and commercial space.",
  "about.p2":
    "Our mission: to help clients make the best property decisions and get the most value from buying, selling and developing real estate — with a convenient online way to access information.",
  "about.p3":
    "Our principles are transparency, process automation, a strong reputation and a focus on results — backed by certified top-category appraisers and our own in-house marketing team.",

  "founder.eyebrow": "Founder",
  "founder.name": "Maria Nirenberg",
  "founder.role": "Founder · Principal",
  "founder.bio":
    "More than 15 years of experience in real estate, independent valuation, investment analysis, finance and development. My approach combines deep strategy with simple execution — turning your ideas into clear, effective business decisions with guaranteed returns.",

  "svc.buying.title": "Valuation",
  "svc.buying.body":
    "Independent appraisal with official reports for banks, courts, insurers and deals.",
  "svc.buying.long":
    "We provide independent valuation with official reports — for apartments, houses and land, commercial property, equipment and vehicles, businesses and intangible assets. Reports are prepared for banks, courts and insurers, and to support purchase, mortgage, inheritance and division of property.",
  "svc.buying.points":
    "Apartments, houses & land | Commercial property | Equipment & vehicles | Business & intangible assets",
  "svc.selling.title": "Business Plans & Feasibility",
  "svc.selling.body":
    "Investment analysis and feasibility studies to justify a project for you and the banks.",
  "svc.selling.long":
    "We develop business plans, investment analysis and technical-economic studies — to prove a project's investment case for you and for lenders, and to support management decisions, tax optimization and reporting to banks, courts and insurers.",
  "svc.selling.points":
    "Investment analysis | Feasibility studies (TEO) | Collateral & lending | Reporting for banks & courts",
  "svc.letting.title": "Buying & Selling",
  "svc.letting.body":
    "Primary and secondary market — apartments from developers and help to buy or sell yours.",
  "svc.letting.long":
    "On the primary market we offer apartments directly from contractors and developers at the best prices; on the secondary market we help you buy or sell at a fair price. We have a large partner base of land plots and listings across Bishkek.",
  "svc.letting.points":
    "Primary-market homes | Secondary market | Land-plot partner base | Best-price offers",
  "svc.management.title": "Exclusive Seller Service",
  "svc.management.body":
    "Full packaging of your property — photo/video, copy, ads and priority listings — for a fast sale.",
  "svc.management.long":
    "We don't just list a property — we prepare it deeply. Our in-house marketing team handles professional photo and video (including drone), selling copy and creatives, targeted ads and priority placement on the leading marketplaces, plus legal checks and direct negotiation with the buyer — for a fixed fee, no hidden mark-ups.",
  "svc.management.points":
    "Pro photo, video & drone | Selling copy & creatives | Targeted ads & priority listings | Fixed fee, no hidden mark-ups",
  "svc.buying.short": "Reports for banks & courts",
  "svc.selling.short": "Investment analysis, feasibility",
  "svc.letting.short": "Primary & secondary market",
  "svc.management.short": "Full packaging, fast sale",
};

const companyRu: Dict = {
  "hero.badge": "Недвижимость и консалтинг · с 2022",
  "hero.subtitle":
    "Центр недвижимости и бизнес-консалтинга в Бишкеке — объединяем независимую оценку и глубокую аналитику с практическими продажами недвижимости, чтобы каждое решение приносило пользу.",
  "hero.homesPlaced": "Сделок сопровождено",
  "footer.tagline":
    "Центр недвижимости и бизнес-консалтинга в Бишкеке. Прозрачность, аналитика и результат.",

  "home.about.eyebrow": "О компании",
  "home.about.title": "Помогаем принимать лучшие решения о недвижимости.",
  "home.about.p1":
    "«Гранд Сити» — центр недвижимости и бизнес-консалтинга, образованный в 2022 году как продолжение Центра независимой оценки и аналитики «Бизнес-Эксперт». Мы объединяем независимую оценку и глубокую аналитику с практическими инструментами продажи недвижимости.",
  "home.about.p2":
    "Наша миссия — помочь получить максимальную пользу от покупки, продажи и преобразования недвижимости, опираясь на прозрачность, автоматизацию процессов и ориентацию на результат.",
  "home.about.badgeText": "совокупного опыта в оценке, аналитике и девелопменте.",

  "values.local.t": "Прозрачность",
  "values.local.b": "Вы понимаете, за что платите.",
  "values.honest.t": "Экспертность",
  "values.honest.b": "20+ лет и сертифицированные оценщики.",
  "values.small.t": "Результат",
  "values.small.b": "Активные продажи под ключ.",

  "about.title": "Центр недвижимости и консалтинга, построенный на прозрачности.",
  "about.subtitle":
    "«Гранд Сити» и «Бизнес-Эксперт» — независимая оценка, аналитика и продажа недвижимости в Бишкеке.",
  "about.storyTitle": "Образован в 2022 году как продолжение «Бизнес-Эксперт».",
  "about.p1":
    "Центр «Гранд Сити» вырос из «Бизнес-Эксперт», объединив профессиональную аналитику и независимую оценку с практическими инструментами продажи недвижимости. Мы работаем по полному циклу — от подбора участков и обоснования инвестиционной привлекательности проекта до продажи готовых квартир и коммерческих помещений.",
  "about.p2":
    "Наша миссия: помогать клиентам принимать наилучшие решения о недвижимости и получать максимальную пользу от её покупки, продажи и преобразования — с удобной онлайн-системой получения информации.",
  "about.p3":
    "Наши принципы — прозрачность, автоматизация процессов, высокая репутация и ориентация на результат, при поддержке сертифицированных оценщиков высшей категории и собственного отдела маркетинга.",

  "founder.eyebrow": "Основатель",
  "founder.name": "Мария Ниренберг",
  "founder.role": "Основатель",
  "founder.bio":
    "Более 15 лет опыта в недвижимости, независимой оценке, инвестиционном анализе, финансах и девелопменте. Мой подход — сочетание глубокой стратегии и простоты исполнения: превращаю ваши идеи в понятные и эффективные бизнес-решения с гарантированной доходностью.",

  "svc.buying.title": "Оценка",
  "svc.buying.body":
    "Независимая оценка с официальными отчётами для банков, судов, страховых и сделок.",
  "svc.buying.long":
    "Проводим независимую оценку с официальными отчётами — квартиры, дома и участки, коммерческая недвижимость, оборудование и транспорт, бизнес и нематериальные активы. Отчёты для банков, судов и страховых, а также для сопровождения купли-продажи, залога, наследства и раздела имущества.",
  "svc.buying.points":
    "Квартиры, дома и участки | Коммерческая недвижимость | Оборудование и транспорт | Бизнес и нематериальные активы",
  "svc.selling.title": "Бизнес-планы и ТЭО",
  "svc.selling.body": "Инвестиционный анализ и ТЭО для обоснования проекта для вас и банков.",
  "svc.selling.long":
    "Разрабатываем бизнес-планы, инвестиционный анализ и технико-экономические обоснования — чтобы обосновать инвестиционную привлекательность проекта для вас и кредиторов, поддержать управленческие решения, оптимизацию налогообложения и отчётность для банков, судов и страховых.",
  "svc.selling.points":
    "Инвестиционный анализ | ТЭО | Залог и кредитование | Отчётность для банков и судов",
  "svc.letting.title": "Купля-продажа",
  "svc.letting.body":
    "Первичный и вторичный рынок — квартиры от застройщиков и помощь купить или продать вашу.",
  "svc.letting.long":
    "На первичном рынке предлагаем квартиры от подрядчиков и застройщиков по лучшим ценам; на вторичном — помогаем выгодно купить или продать. У нас большая партнёрская база земельных участков и предложений по Бишкеку.",
  "svc.letting.points":
    "Квартиры на первичке | Вторичный рынок | База земельных участков | Лучшие цены",
  "svc.management.title": "Эксклюзивная продажа",
  "svc.management.body":
    "Полная «упаковка» объекта — фото/видео, тексты, реклама и приоритетные размещения — для быстрой продажи.",
  "svc.management.long":
    "Мы не просто «выставляем объект», а проводим глубокую подготовку. Собственный отдел маркетинга берёт на себя профессиональную фото- и видеосъёмку (включая дрон), продающие тексты и креативы, таргетированную рекламу и приоритетное размещение на ведущих маркетплейсах, а также юридическую проверку и прямые переговоры с покупателем — за фиксированный гонорар, без скрытых накруток.",
  "svc.management.points":
    "Проф. фото, видео и дрон | Продающие тексты и креативы | Таргет и приоритет размещения | Фикс. гонорар без накруток",
  "svc.buying.short": "Отчёты для банков и судов",
  "svc.selling.short": "Инвестанализ и ТЭО",
  "svc.letting.short": "Первичка и вторичка",
  "svc.management.short": "Упаковка и быстрая продажа",
};

const companyKy: Dict = {
  "hero.badge": "Кыймылсыз мүлк жана консалтинг · 2022-жылдан",
  "hero.subtitle":
    "Бишкектеги кыймылсыз мүлк жана бизнес-консалтинг борбору — көз карандысыз баалоону жана терең аналитиканы кыймылсыз мүлктү сатуунун практикалык куралдары менен айкалыштырабыз, ар бир чечим пайда алып келет.",
  "hero.homesPlaced": "Коштолгон бүтүмдөр",
  "footer.tagline":
    "Бишкектеги кыймылсыз мүлк жана бизнес-консалтинг борбору. Айкындык, аналитика жана натыйжа.",

  "home.about.eyebrow": "Компания жөнүндө",
  "home.about.title": "Кыймылсыз мүлк боюнча эң туура чечимдерди кабыл алууга жардам беребиз.",
  "home.about.p1":
    "«Гранд Сити» — 2022-жылы «Бизнес-Эксперт» көз карандысыз баалоо жана аналитика борборунун уландысы катары түзүлгөн кыймылсыз мүлк жана бизнес-консалтинг борбору. Биз көз карандысыз баалоону жана терең аналитиканы кыймылсыз мүлктү сатуунун практикалык куралдары менен бириктиребиз.",
  "home.about.p2":
    "Биздин миссия — кыймылсыз мүлктү сатып алуудан, сатуудан жана өзгөртүүдөн максималдуу пайда алууга жардам берүү, айкындыкка, процесстерди автоматташтырууга жана натыйжага багытталуу менен.",
  "home.about.badgeText": "баалоо, аналитика жана девелопмент боюнча жалпы тажрыйба.",

  "values.local.t": "Айкындык",
  "values.local.b": "Эмне үчүн төлөп жатканыңызды түшүнөсүз.",
  "values.honest.t": "Эксперттик",
  "values.honest.b": "20+ жыл жана сертификацияланган баалоочулар.",
  "values.small.t": "Натыйжа",
  "values.small.b": "Активдүү сатуу, башынан аягына чейин.",

  "about.title": "Айкындыкка негизделген кыймылсыз мүлк жана консалтинг борбору.",
  "about.subtitle":
    "«Гранд Сити» жана «Бизнес-Эксперт» — Бишкектеги көз карандысыз баалоо, аналитика жана кыймылсыз мүлктү сатуу.",
  "about.storyTitle": "2022-жылы «Бизнес-Эксперт»тин уландысы катары түзүлгөн.",
  "about.p1":
    "«Гранд Сити» борбору «Бизнес-Эксперт»тен өсүп чыгып, кесипкөй аналитиканы жана көз карандысыз баалоону кыймылсыз мүлктү сатуунун практикалык куралдары менен бириктирди. Биз толук цикл боюнча иштейбиз — жер тилкелерин тандоодон жана долбоордун инвестициялык жагымдуулугун негиздөөдөн баштап, даяр батирлерди жана коммерциялык жайларды сатууга чейин.",
  "about.p2":
    "Биздин миссия: кардарларга кыймылсыз мүлк боюнча эң туура чечимдерди кабыл алууга жана аны сатып алуудан, сатуудан жана өзгөртүүдөн максималдуу пайда алууга жардам берүү — маалымат алуунун ыңгайлуу онлайн системасы менен.",
  "about.p3":
    "Биздин принциптер — айкындык, процесстерди автоматташтыруу, жогорку аброй жана натыйжага багытталуу, жогорку категориядагы сертификацияланган баалоочулар жана өзүбүздүн маркетинг бөлүмү менен.",

  "founder.eyebrow": "Негиздөөчү",
  "founder.name": "Мария Ниренберг",
  "founder.role": "Негиздөөчү",
  "founder.bio":
    "Кыймылсыз мүлк, көз карандысыз баалоо, инвестициялык талдоо, каржы жана девелопмент тармагында 15 жылдан ашык тажрыйба. Менин ыкмам — терең стратегияны жана жөнөкөй аткарууну айкалыштыруу: идеяларыңызды кепилденген кирешеси бар түшүнүктүү жана натыйжалуу бизнес-чечимдерге айландырам.",

  "svc.buying.title": "Баалоо",
  "svc.buying.body":
    "Банктар, соттор, камсыздандыруу жана бүтүмдөр үчүн расмий отчёттор менен көз карандысыз баалоо.",
  "svc.buying.long":
    "Көз карандысыз баалоону расмий отчёттор менен жүргүзөбүз — батирлер, үйлөр жана жер тилкелери, коммерциялык кыймылсыз мүлк, жабдуулар жана транспорт, бизнес жана материалдык эмес активдер. Отчёттор банктар, соттор жана камсыздандыруу үчүн, ошондой эле сатып алуу-сатуу, күрөө, мурас жана мүлктү бөлүштүрүүнү коштоо үчүн.",
  "svc.buying.points":
    "Батирлер, үйлөр жана жер | Коммерциялык мүлк | Жабдуу жана транспорт | Бизнес жана материалдык эмес активдер",
  "svc.selling.title": "Бизнес-пландар жана ТЭН",
  "svc.selling.body": "Долбоорду сиз жана банктар үчүн негиздөөгө инвестициялык талдоо жана ТЭН.",
  "svc.selling.long":
    "Бизнес-пландарды, инвестициялык талдоону жана техникалык-экономикалык негиздемелерди иштеп чыгабыз — долбоордун инвестициялык жагымдуулугун сиз жана кредиторлор үчүн далилдөө, башкаруу чечимдерин, салыкты оптималдаштырууну жана банктарга, сотторго жана камсыздандырууга отчётту колдоо үчүн.",
  "svc.selling.points":
    "Инвестициялык талдоо | ТЭН | Күрөө жана кредит | Банктарга жана сотторго отчёт",
  "svc.letting.title": "Сатып алуу-сатуу",
  "svc.letting.body":
    "Биринчилик жана экинчилик рынок — курулушчулардан батирлер жана сиздикин сатууга жардам.",
  "svc.letting.long":
    "Биринчилик рынокто подрядчиктерден жана курулушчулардан эң жакшы баада батирлерди сунуштайбыз; экинчиликте — пайдалуу сатып алууга же сатууга жардам беребиз. Бишкек боюнча жер тилкелеринин жана сунуштардын чоң өнөктөш базасы бар.",
  "svc.letting.points":
    "Биринчилик батирлер | Экинчилик рынок | Жер тилке базасы | Эң жакшы баалар",
  "svc.management.title": "Эксклюзивдүү сатуу",
  "svc.management.body":
    "Объектти толук «таңгактоо» — фото/видео, тексттер, жарнама жана артыкчылыктуу жайгаштыруу — тез сатуу үчүн.",
  "svc.management.long":
    "Биз объектти жөн гана «коюп» койбостон, терең даярдайбыз. Өзүбүздүн маркетинг бөлүмү кесипкөй фото жана видео тартууну (дрон менен), сатуучу тексттерди жана креативдерди, багытталган жарнаманы жана алдыңкы маркетплейстерде артыкчылыктуу жайгаштырууну, ошондой эле юридикалык текшерүүнү жана сатып алуучу менен түз сүйлөшүүнү аткарат — туруктуу гонорар үчүн, жашыруун кошумчаларсыз.",
  "svc.management.points":
    "Кесипкөй фото, видео, дрон | Сатуучу текст жана креатив | Таргет жана артыкчылыктуу жайгаштыруу | Туруктуу гонорар, кошумчасыз",
  "svc.buying.short": "Банк жана сот үчүн отчёт",
  "svc.selling.short": "Инвестталдоо жана ТЭН",
  "svc.letting.short": "Биринчи жана экинчи рынок",
  "svc.management.short": "Толук даярдоо, тез сатуу",
};

const companyZh: Dict = {
  "hero.badge": "房地产与咨询 · 成立于 2022 年",
  "hero.subtitle":
    "位于比什凯克的房地产与商业咨询中心——将独立评估与深度分析同房产实操销售结合起来，让每一个决策都产生价值。",
  "hero.homesPlaced": "已服务交易",
  "footer.tagline": "位于比什凯克的房地产与商业咨询中心。透明、分析与结果。",

  "home.about.eyebrow": "关于公司",
  "home.about.title": "帮助您做出最优的房产决策。",
  "home.about.p1":
    "「Grand City」是一家房地产与商业咨询中心，成立于 2022 年，由独立评估与分析中心「Business-Expert」发展而来。我们将独立评估和深度分析与房产销售的实用工具结合在一起。",
  "home.about.p2":
    "我们的使命是帮助您在购买、出售和改造房产中获得最大价值——依托透明、流程自动化和以结果为导向。",
  "home.about.badgeText": "在评估、分析与开发领域的综合经验。",

  "values.local.t": "透明",
  "values.local.b": "您清楚每一笔费用花在哪里。",
  "values.honest.t": "专业",
  "values.honest.b": "20 年以上经验与持证评估师。",
  "values.small.t": "结果导向",
  "values.small.b": "主动销售，全程包办。",

  "about.title": "以透明为基石的房地产与咨询中心。",
  "about.subtitle": "「Grand City」与「Business-Expert」——比什凯克的独立评估、分析与房产销售。",
  "about.storyTitle": "2022 年成立，由「Business-Expert」发展而来。",
  "about.p1":
    "「Grand City」中心脱胎于「Business-Expert」，将专业分析和独立评估与房产销售的实用工具结合起来。我们提供全周期服务——从选地、论证项目的投资价值，到销售建成的住宅与商业物业。",
  "about.p2":
    "我们的使命：帮助客户做出最优的房产决策，并从购买、出售和改造房产中获得最大价值——同时提供便捷的线上信息获取方式。",
  "about.p3":
    "我们的原则是透明、流程自动化、良好口碑和以结果为导向——由最高级别持证评估师和自有营销团队提供支持。",

  "founder.eyebrow": "创始人",
  "founder.name": "玛丽亚·尼伦贝格",
  "founder.role": "创始人",
  "founder.bio":
    "在房地产、独立评估、投资分析、金融与开发领域拥有 15 年以上经验。我的方法是把深度策略与简洁执行结合起来——把您的想法转化为清晰高效、收益有保障的商业决策。",

  "svc.buying.title": "资产评估",
  "svc.buying.body": "面向银行、法院、保险公司及交易的独立评估，出具正式报告。",
  "svc.buying.long":
    "我们提供出具正式报告的独立评估——涵盖公寓、住宅与地块、商业物业、设备与车辆、企业及无形资产。报告可用于银行、法院和保险公司，也可用于买卖、抵押、继承和财产分割的全程支持。",
  "svc.buying.points": "公寓、住宅与地块 | 商业物业 | 设备与车辆 | 企业与无形资产",
  "svc.selling.title": "商业计划与可行性研究",
  "svc.selling.body": "投资分析与可行性研究，为您和银行论证项目价值。",
  "svc.selling.long":
    "我们编制商业计划、投资分析和技术经济论证——向您和贷款方证明项目的投资价值，并支持管理决策、税务优化以及面向银行、法院和保险公司的报告。",
  "svc.selling.points": "投资分析 | 可行性研究（ТЭО） | 抵押与信贷 | 面向银行与法院的报告",
  "svc.letting.title": "买卖代理",
  "svc.letting.body": "一手与二手市场——开发商直供房源，以及协助您买入或卖出。",
  "svc.letting.long":
    "在一手市场，我们以最优价格提供来自承建方和开发商的房源；在二手市场，我们协助您以公道的价格买入或卖出。我们在比什凯克拥有庞大的地块与房源合作数据库。",
  "svc.letting.points": "一手房源 | 二手市场 | 地块合作数据库 | 最优价格",
  "svc.management.title": "独家代售",
  "svc.management.body": "对房产进行完整包装——图片/视频、文案、广告与优先展位——实现快速成交。",
  "svc.management.long":
    "我们不只是「把房子挂出去」，而是做深度准备。自有营销团队负责专业图片与视频拍摄（含航拍）、销售文案与创意、精准投放广告以及在主流平台的优先展位，同时提供法律核查和与买家的直接谈判——固定佣金，绝无隐性加价。",
  "svc.management.points":
    "专业图片、视频与航拍 | 销售文案与创意 | 精准投放与优先展位 | 固定佣金，无隐性加价",
  "svc.buying.short": "面向银行与法院的报告",
  "svc.selling.short": "投资分析与可行性研究",
  "svc.letting.short": "一手与二手市场",
  "svc.management.short": "全面包装，快速成交",
};

// --- Filter / sort / status labels ---
const filtersEn: Dict = {
  "catalog.anyCategory": "Any category",
  "category.complex": "Residential complexes",
  "category.home": "Apartments & houses",
  "listingType.buy": "For sale",
  "listingType.rent": "To rent",
  "listingType.luxury": "Luxury",
  "kind.house": "House",
  "kind.bungalow": "Bungalow",
  "kind.loft": "Loft",
  "kind.apartment": "Apartment",
  "kind.townhouse": "Townhouse",
  "kind.new-build": "New build",
  "kind.land": "Land plot",
  "sort.newest": "Newest first",
  "sort.price-asc": "Price: low to high",
  "sort.price-desc": "Price: high to low",
  "sort.beds-desc": "Most bedrooms",
  "status.for-sale": "For sale",
  "status.to-let": "To let",
  "status.new-build": "New build",
  "status.sold": "Sold",
};
const filtersRu: Dict = {
  "catalog.anyCategory": "Любой тип",
  "category.complex": "Жилые комплексы",
  "category.home": "Квартиры и дома",
  "listingType.buy": "Продажа",
  "listingType.rent": "Аренда",
  "listingType.luxury": "Премиум",
  "kind.house": "Дом",
  "kind.bungalow": "Бунгало",
  "kind.loft": "Лофт",
  "kind.apartment": "Квартира",
  "kind.townhouse": "Таунхаус",
  "kind.new-build": "Новостройка",
  "kind.land": "Земельный участок",
  "sort.newest": "Сначала новые",
  "sort.price-asc": "Цена: по возрастанию",
  "sort.price-desc": "Цена: по убыванию",
  "sort.beds-desc": "Больше спален",
  "status.for-sale": "Продажа",
  "status.to-let": "Аренда",
  "status.new-build": "Новостройка",
  "status.sold": "Продано",
};
const filtersKy: Dict = {
  "catalog.anyCategory": "Каалаган түрү",
  "category.complex": "Турак жай комплекстери",
  "category.home": "Батирлер жана үйлөр",
  "listingType.buy": "Сатуу",
  "listingType.rent": "Ижара",
  "listingType.luxury": "Премиум",
  "kind.house": "Үй",
  "kind.bungalow": "Бунгало",
  "kind.loft": "Лофт",
  "kind.apartment": "Батир",
  "kind.townhouse": "Таунхаус",
  "kind.new-build": "Жаңы курулуш",
  "kind.land": "Жер участок",
  "sort.newest": "Адегенде жаңылары",
  "sort.price-asc": "Баасы: өсүү боюнча",
  "sort.price-desc": "Баасы: кемүү боюнча",
  "sort.beds-desc": "Көбүрөөк бөлмө",
  "status.for-sale": "Сатууда",
  "status.to-let": "Ижарага",
  "status.new-build": "Жаңы курулуш",
  "status.sold": "Сатылды",
};

const filtersZh: Dict = {
  "catalog.anyCategory": "不限类型",
  "category.complex": "住宅综合体",
  "category.home": "公寓与住宅",
  "listingType.buy": "出售",
  "listingType.rent": "出租",
  "listingType.luxury": "豪华",
  "kind.house": "独栋住宅",
  "kind.bungalow": "平房",
  "kind.loft": "阁楼公寓",
  "kind.apartment": "公寓",
  "kind.townhouse": "联排别墅",
  "kind.new-build": "新建楼盘",
  "kind.land": "地块",
  "sort.newest": "最新优先",
  "sort.price-asc": "价格：从低到高",
  "sort.price-desc": "价格：从高到低",
  "sort.beds-desc": "卧室最多",
  "status.for-sale": "出售",
  "status.to-let": "出租",
  "status.new-build": "新建楼盘",
  "status.sold": "已售出",
};

export const content: Record<LanguageCode, Dict> = {
  en: { ...en, ...propsEn, ...companyEn, ...filtersEn },
  ru: { ...ru, ...propsRu, ...companyRu, ...filtersRu },
  ky: { ...ky, ...propsKy, ...companyKy, ...filtersKy },
  zh: { ...zh, ...propsZh, ...companyZh, ...filtersZh },
};
