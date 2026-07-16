const STORAGE_KEY = "bookflow-library";
const THEME_KEY = "bookflow-theme";
const COVER_CACHE_KEY = "bookflow-cover-cache-v2";
const CATALOG_SIZE = 1000;
const SPINE_COUNT = 20;
const SUPABASE_URL = "https://sovvobuxpchevblupzch.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Em6Vw6BOPS_EqrU0dAFDZQ_i3JjW4a7";
const CLOUD_SYNC_DELAY = 350;

const bookForm = document.getElementById("bookForm");
const booksList = document.getElementById("booksList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const shelfSort = document.getElementById("shelfSort");
const totalBooks = document.getElementById("totalBooks");
const completedBooks = document.getElementById("completedBooks");
const catalogCompleted = document.getElementById("catalogCompleted");
const shelfTabCount = document.getElementById("shelfTabCount");
const dataVizTabCount = document.getElementById("dataVizTabCount");
const bookCardTemplate = document.getElementById("bookCardTemplate");
const catalogItemTemplate = document.getElementById("catalogItemTemplate");
const catalogSearch = document.getElementById("catalogSearch");
const popularBooksList = document.getElementById("popularBooksList");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const statusInput = document.getElementById("status");
const themeToggle = document.getElementById("themeToggle");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
const catalogList = document.getElementById("catalogList");
const catalogFilter = document.getElementById("catalogFilter");
const catalogCategoryFilter = document.getElementById("catalogCategoryFilter");
const catalogStatusFilter = document.getElementById("catalogStatusFilter");
const catalogSort = document.getElementById("catalogSort");
const catalogPercent = document.getElementById("catalogPercent");
const catalogShelfProgress = document.getElementById("catalogShelfProgress");
const dailyQuote = document.getElementById("dailyQuote");
const dataVizFilter = document.getElementById("dataVizFilter");
const dataVizStatusFilter = document.getElementById("dataVizStatusFilter");
const dataVizSort = document.getElementById("dataVizSort");
const dataVizPercent = document.getElementById("dataVizPercent");
const dataVizShelfProgress = document.getElementById("dataVizShelfProgress");
const dataVizList = document.getElementById("dataVizList");
const bookDetailsDialog = document.getElementById("bookDetailsDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogAuthor = document.getElementById("dialogAuthor");
const dialogYear = document.getElementById("dialogYear");
const dialogPages = document.getElementById("dialogPages");
const dialogAudio = document.getElementById("dialogAudio");
const dialogDescription = document.getElementById("dialogDescription");
const dialogStatus = document.getElementById("dialogStatus");
const dialogStatusBadge = document.getElementById("dialogStatusBadge");
const dialogClose = document.getElementById("dialogClose");
const dialogSaveStatus = document.getElementById("dialogSaveStatus");
const dialogCover = bookDetailsDialog.querySelector(".dialog-book-cover");
const dialogCoverImage = document.getElementById("dialogCoverImage");
const dialogReadLink = document.getElementById("dialogReadLink");
const dialogLitresBookLink = document.getElementById("dialogLitresBookLink");
const dialogListenLink = document.getElementById("dialogListenLink");
const dialogBuyLink = document.getElementById("dialogBuyLink");
const dialogNotes = document.getElementById("dialogNotes");
const authButton = document.getElementById("authButton");
const authButtonIcon = document.getElementById("authButtonIcon");
const authButtonLabel = document.getElementById("authButtonLabel");
const authDialog = document.getElementById("authDialog");
const authDialogClose = document.getElementById("authDialogClose");
const authForm = document.getElementById("authForm");
const authEmail = document.getElementById("authEmail");
const authSubmit = document.getElementById("authSubmit");
const authMessage = document.getElementById("authMessage");
const syncIndicator = document.getElementById("syncIndicator");
const syncLabel = document.getElementById("syncLabel");
const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const statusLabels = {
  planned: "Хочу прочитать",
  reading: "Читаю",
  listening: "Слушаю",
  finished: "Прочитано",
  listened: "Прослушано",
};
const validStatuses = Object.keys(statusLabels);
const completedStatuses = new Set(["finished", "listened"]);

const categoryLabels = {
  russian: "Русская литература",
  foreign: "Зарубежная литература",
  nonfiction: "Нонфикшн",
  fantasy: "Фантастика и фэнтези",
  modern: "Современная проза",
  dataviz: "Картография",
};

const bookQuotes = [
  ["Все счастливые семьи похожи друг на друга.", "Лев Толстой, Анна Каренина"],
  ["Надо любить жизнь больше, чем смысл жизни.", "Федор Достоевский, Братья Карамазовы"],
  ["Никогда не знаешь, что принесет завтрашний день.", "Михаил Булгаков, Мастер и Маргарита"],
  ["Мы в ответе за тех, кого приручили.", "Антуан де Сент-Экзюпери, Маленький принц"],
  ["Человек есть тайна.", "Федор Достоевский"],
  ["Свобода начинается с честности перед собой.", "Джордж Оруэлл, 1984"],
  ["Не все те, кто странствуют, сбились с пути.", "Джон Р. Р. Толкин"],
  ["Мужество не всегда ревет.", "Мэри Энн Радмахер"],
  ["Главное глазами не увидишь.", "Антуан де Сент-Экзюпери, Маленький принц"],
  ["Если ты можешь мечтать об этом, ты можешь это сделать.", "Уолт Дисней"],
  ["Время, потерянное с удовольствием, не считается потерянным.", "Бертран Рассел"],
  ["История любит тех, кто умеет ждать.", "Александр Дюма, Граф Монте-Кристо"],
];

const dataVizBooks = [
  ["Визуальное представление количественной информации", "Эдвард Тафти"],
  ["Наглядное объяснение", "Эдвард Тафти"],
  ["Отображение информации", "Эдвард Тафти"],
  ["Красивые доказательства", "Эдвард Тафти"],
  ["Как мы ориентируемся. Пространство и время без карт и GPS", "Маура О’Коннор"],
  ["Картография", "Кеннет Филд"],
  ["Все географические карты лгут", "Марк Монмонье"],
  ["Карты. Их история, значение и язык", "Джерри Броттон"],
  ["История мира в 12 картах", "Джерри Броттон"],
  ["Великие карты", "Джерри Броттон"],
  ["Карта-призрак", "Стивен Джонсон"],
  ["На карте. Почему мир выглядит именно так", "Саймон Гарфилд"],
  ["Географические карты", "Алексей Постников"],
  ["Картография с основами топографии", "Александр Берлянт"],
  ["Картоведение", "Александр Берлянт"],
  ["Тематическое картографирование", "Александр Берлянт"],
  ["Геоинформационное картографирование", "Ирина Лурье"],
  ["Введение в геоинформационное картографирование", "Александр Берлянт"],
  ["Картографический метод исследования", "Александр Берлянт"],
  ["Проектирование и составление карт", "Константин Салищев"],
  ["Основы картоведения", "Константин Салищев"],
  ["Картографическая генерализация", "Константин Салищев"],
  ["Геоинформатика", "Владимир Тикунов"],
  ["Геоинформационные системы", "Владимир Тикунов"],
  ["Геоинформационные системы и технологии", "Игорь Капралов"],
  ["Цифровая картография", "Александр Лурье"],
  ["Компьютерная картография", "Александр Лурье"],
  ["Топография с основами геодезии", "Николай Маслов"],
  ["Топографические карты", "Алексей Постников"],
  ["История русской картографии", "Лев Багров"],
  ["История географической карты и картографии", "Алексей Постников"],
  ["Развитие крупномасштабной картографии в России", "Алексей Постников"],
  ["Карты земель российских", "Алексей Постников"],
  ["Старинные карты России", "Владимир Булатов"],
  ["Московия на старинных картах", "Алексей Постников"],
  ["Русские географические карты XV-XVIII веков", "Алексей Постников"],
  ["История карт и картографирования", "Александр Берлянт"],
  ["Картография и телекоммуникация", "Владимир Тикунов"],
  ["Атлас мира. История картографических открытий", "Джерри Броттон"],
  ["Карты и цивилизация", "Норман Троуэр"],
  ["Мир на карте", "Джон Ренни Шорт"],
  ["Картография. История, культура, власть", "Джереми Блэк"],
  ["Власть карт", "Денис Вуд"],
];

const localBookCovers = new Map(
  [
    [
      "Визуальное представление количественной информации",
      "Эдвард Тафти",
      "assets/covers/cartography/tufte-visual-display.jpg",
    ],
    [
      "Наглядное объяснение",
      "Эдвард Тафти",
      "assets/covers/cartography/tufte-visual-explanations.jpg",
    ],
    [
      "Отображение информации",
      "Эдвард Тафти",
      "assets/covers/cartography/tufte-envisioning-information.jpg",
    ],
    [
      "Красивые доказательства",
      "Эдвард Тафти",
      "assets/covers/cartography/tufte-beautiful-evidence.jpg",
    ],
    [
      "Как мы ориентируемся. Пространство и время без карт и GPS",
      "Маура О’Коннор",
      "assets/covers/cartography/oconnor-wayfinding.jpg",
    ],
    [
      "Картография",
      "Кеннет Филд",
      "assets/covers/cartography/field-cartography.jpg",
    ],
    [
      "Все географические карты лгут",
      "Марк Монмонье",
      "assets/covers/cartography/monmonier-maps-lie.jpg",
    ],
    [
      "История мира в 12 картах",
      "Джерри Броттон",
      "assets/covers/cartography/brotton-twelve-maps.jpg",
    ],
    [
      "Великие карты",
      "Джерри Броттон",
      "assets/covers/cartography/brotton-great-maps.jpg",
    ],
    [
      "Карта-призрак",
      "Стивен Джонсон",
      "assets/covers/cartography/johnson-ghost-map.jpg",
    ],
    [
      "На карте. Почему мир выглядит именно так",
      "Саймон Гарфилд",
      "assets/covers/cartography/garfield-on-the-map.jpg",
    ],
    [
      "Картографический метод исследования",
      "Александр Берлянт",
      "assets/covers/cartography/berlyant-cartographic-method.jpg",
    ],
    [
      "Геоинформационное картографирование",
      "Ирина Лурье",
      "assets/covers/cartography/lurie-geoinformation-mapping.jpg",
    ],
    [
      "Карты и цивилизация",
      "Норман Троуэр",
      "assets/covers/cartography/thrower-maps-civilization.jpg",
    ],
    [
      "Картография. История, культура, власть",
      "Джереми Блэк",
      "assets/covers/cartography/black-maps-history.jpg",
    ],
    [
      "Власть карт",
      "Денис Вуд",
      "assets/covers/cartography/wood-power-of-maps.jpg",
    ],
  ].map(([title, author, path]) => [getBookKey({ title, author }), path])
);

const bookDetails = {
  "1984|Джордж Оруэлл": {
    year: 1949,
    pages: 328,
    description:
      "Антиутопия о мире тотального наблюдения, переписывания прошлого и борьбе человека за внутреннюю свободу.",
  },
  "Мастер и Маргарита|Михаил Булгаков": {
    year: 1967,
    pages: 480,
    description:
      "Роман о Москве, любви, творчестве и мистическом вмешательстве Воланда в очень человеческие слабости.",
  },
  "Война и мир|Лев Толстой": {
    year: 1869,
    pages: 1225,
    description:
      "Большой роман о семье, истории, войне 1812 года и том, как частная жизнь переплетается с движением эпохи.",
  },
  "Маленький принц|Антуан де Сент-Экзюпери": {
    year: 1943,
    pages: 96,
    description:
      "Философская сказка о дружбе, ответственности, одиночестве и способности видеть главное не глазами.",
  },
  "Атомные привычки|Джеймс Клир": {
    year: 2018,
    pages: 320,
    description:
      "Практичная книга о маленьких привычках, системах поведения и изменениях, которые складываются в большой результат.",
  },
  "Картография|Кеннет Филд": {
    year: 2018,
    pages: 552,
    description:
      "Современное руководство по картографическому дизайну: выбор проекций, цветов, подписей, условных знаков и структуры карты.",
  },
  "Все географические карты лгут|Марк Монмонье": {
    year: 2021,
    pages: 240,
    description:
      "Книга о том, как карты могут искажать реальность через проекции, масштаб, классификацию данных и визуальные решения.",
  },
  "История мира в 12 картах|Джерри Броттон": {
    year: 2012,
    pages: 544,
    description:
      "История картографии через двенадцать карт, которые показывают, как разные эпохи представляли власть, пространство и мир.",
  },
  "Карты. Их история, значение и язык|Джерри Броттон": {
    year: 2014,
    pages: 256,
    description:
      "Обзор того, как карты создавались, читались и использовались как язык культуры, политики и географического знания.",
  },
  "Карта-призрак|Стивен Джонсон": {
    year: 2006,
    pages: 320,
    description:
      "Документальная история о холере в Лондоне и карте Джона Сноу, которая стала важной вехой в эпидемиологии и городском анализе.",
  },
  "Как мы ориентируемся. Пространство и время без карт и GPS|Маура О’Коннор": {
    year: 2021,
    pages: 400,
    description:
      "Исследование того, как люди и животные находят путь, создают мысленные карты и как GPS меняет наше чувство пространства.",
  },
  "Картографический метод исследования|Александр Берлянт": {
    year: 1978,
    pages: 256,
    description:
      "Монография о применении карт в научных исследованиях, методах анализа картографического изображения и оценке точности результатов.",
  },
  "Геоинформационное картографирование|Ирина Лурье": {
    year: 2016,
    pages: 424,
    description:
      "Учебник о геоинформационных методах анализа, цифровой обработке космических снимков и создании карт на основе пространственных данных.",
  },
  "Визуальное представление количественной информации|Эдвард Тафти": {
    year: 1983,
    pages: 200,
    description:
      "Классическая работа о том, как проектировать ясные графики и показывать данные без визуального шума.",
  },
  "Наглядное объяснение|Эдвард Тафти": {
    year: 1997,
    pages: 160,
    description:
      "Книга о визуальных доказательствах, объяснении причинно-следственных связей и точности графического рассказа.",
  },
  "Отображение информации|Эдвард Тафти": {
    year: 1990,
    pages: 192,
    description:
      "Исследование плотной, многослойной и красивой подачи сложной информации на страницах, картах и диаграммах.",
  },
  "Красивые доказательства|Эдвард Тафти": {
    year: 2006,
    pages: 214,
    description:
      "Книга о визуальном мышлении, доказательствах, научных иллюстрациях и том, как форма помогает точной аргументации.",
  },
};

let activeDialogBook = null;

const baseBooks = [
  ["1984", "Джордж Оруэлл"],
  ["Гордость и предубеждение", "Джейн Остин"],
  ["Убить пересмешника", "Харпер Ли"],
  ["Великий Гэтсби", "Фрэнсис Скотт Фицджеральд"],
  ["Хоббит, или Туда и обратно", "Джон Р. Р. Толкин"],
  ["Гарри Поттер и философский камень", "Дж. К. Роулинг"],
  ["Над пропастью во ржи", "Джером Д. Сэлинджер"],
  ["О дивный новый мир", "Олдос Хаксли"],
  ["Маленький принц", "Антуан де Сент-Экзюпери"],
  ["Преступление и наказание", "Федор Достоевский"],
  ["Алхимик", "Пауло Коэльо"],
  ["Книжный вор", "Маркус Зусак"],
  ["Бегущий за ветром", "Халед Хоссейни"],
  ["Моби Дик", "Герман Мелвилл"],
  ["Джейн Эйр", "Шарлотта Бронте"],
  ["Властелин колец", "Джон Р. Р. Толкин"],
  ["Скотный двор", "Джордж Оруэлл"],
  ["451 градус по Фаренгейту", "Рэй Брэдбери"],
  ["Грозовой перевал", "Эмили Бронте"],
  ["Код да Винчи", "Дэн Браун"],
  ["Девушка с татуировкой дракона", "Стиг Ларссон"],
  ["Sapiens. Краткая история человечества", "Юваль Ной Харари"],
  ["Атомные привычки", "Джеймс Клир"],
  ["Полночная библиотека", "Мэтт Хейг"],
  ["Дюна", "Фрэнк Герберт"],
  ["Голодные игры", "Сьюзен Коллинз"],
  ["Виноваты звезды", "Джон Грин"],
  ["Хроники Нарнии", "Клайв С. Льюис"],
  ["Игра престолов", "Джордж Р. Р. Мартин"],
  ["Сто лет одиночества", "Габриэль Гарсиа Маркес"],
  ["Тень ветра", "Карлос Руис Сафон"],
  ["Портрет Дориана Грея", "Оскар Уайльд"],
  ["Дракула", "Брэм Стокер"],
  ["Имя розы", "Умберто Эко"],
  ["Норвежский лес", "Харуки Мураками"],
  ["Кафка на пляже", "Харуки Мураками"],
  ["Повесть о двух городах", "Чарльз Диккенс"],
  ["Граф Монте-Кристо", "Александр Дюма"],
  ["Отверженные", "Виктор Гюго"],
  ["Война и мир", "Лев Толстой"],
  ["Братья Карамазовы", "Федор Достоевский"],
  ["Анна Каренина", "Лев Толстой"],
  ["Франкенштейн", "Мэри Шелли"],
  ["Марсианин", "Энди Вейер"],
  ["Проект Аве Мария", "Энди Вейер"],
  ["Первому игроку приготовиться", "Эрнест Клайн"],
  ["Исчезнувшая", "Гиллиан Флинн"],
  ["Рассказ служанки", "Маргарет Этвуд"],
  ["Дорога", "Кормак Маккарти"],
  ["Под стеклянным колпаком", "Сильвия Плат"],
  ["Тайная история", "Донна Тартт"],
  ["Цирцея", "Мадлен Миллер"],
  ["Песнь Ахилла", "Мадлен Миллер"],
  ["Нормальные люди", "Салли Руни"],
  ["Маленькие женщины", "Луиза Мэй Олкотт"],
  ["Цвет пурпурный", "Элис Уокер"],
  ["Возлюбленная", "Тони Моррисон"],
  ["Сияние", "Стивен Кинг"],
  ["Оно", "Стивен Кинг"],
  ["Мизери", "Стивен Кинг"],
  ["Противостояние", "Стивен Кинг"],
  ["Семь мужей Эвелин Хьюго", "Тейлор Дженкинс Рид"],
  ["Дейзи Джонс и The Six", "Тейлор Дженкинс Рид"],
  ["Верити", "Колин Гувер"],
  ["Все закончится на нас", "Колин Гувер"],
  ["Маленькая жизнь", "Ханья Янагихара"],
  ["Безмолвный пациент", "Алекс Михаэлидес"],
  ["Психология денег", "Морган Хаузел"],
  ["Думай медленно... решай быстро", "Даниэль Канеман"],
  ["Сила привычки", "Чарльз Дахигг"],
  ["В работу с головой", "Кэл Ньюпорт"],
  ["Эссенциализм", "Грег МакКеон"],
  ["Ученица", "Тара Вестовер"],
  ["Становление", "Мишель Обама"],
  ["Стив Джобс", "Уолтер Айзексон"],
  ["Гении и аутсайдеры", "Малкольм Гладуэлл"],
  ["Тонкое искусство пофигизма", "Марк Мэнсон"],
  ["Интроверты", "Сьюзан Кейн"],
  ["Начни с почему", "Саймон Синек"],
  ["7 навыков высокоэффективных людей", "Стивен Кови"],
  ["Богатый папа, бедный папа", "Роберт Кийосаки"],
  ["Наедине с собой", "Марк Аврелий"],
  ["Сказать жизни Да!", "Виктор Франкл"],
  ["Посторонний", "Альбер Камю"],
  ["Процесс", "Франц Кафка"],
  ["Превращение", "Франц Кафка"],
  ["Лолита", "Владимир Набоков"],
  ["Мастер и Маргарита", "Михаил Булгаков"],
  ["Собачье сердце", "Михаил Булгаков"],
  ["Мы", "Евгений Замятин"],
  ["Мертвые души", "Николай Гоголь"],
  ["Идиот", "Федор Достоевский"],
  ["Записки из подполья", "Федор Достоевский"],
  ["Бесы", "Федор Достоевский"],
  ["Вишневый сад", "Антон Чехов"],
  ["Отцы и дети", "Иван Тургенев"],
  ["Евгений Онегин", "Александр Пушкин"],
  ["Доктор Живаго", "Борис Пастернак"],
  ["Жизнь и судьба", "Василий Гроссман"],
  ["Архипелаг ГУЛАГ", "Александр Солженицын"],
  ["Солярис", "Станислав Лем"],
  ["Имя ветра", "Патрик Ротфусс"],
  ["Рожденный туманом", "Брэндон Сандерсон"],
  ["Путь королей", "Брэндон Сандерсон"],
  ["Ложь Локка Ламоры", "Скотт Линч"],
  ["Американские боги", "Нил Гейман"],
  ["Никогде", "Нил Гейман"],
  ["Благие знамения", "Нил Гейман и Терри Пратчетт"],
  ["Морт", "Терри Пратчетт"],
  ["Стража! Стража!", "Терри Пратчетт"],
  ["Мелкие боги", "Терри Пратчетт"],
  ["Океан в конце дороги", "Нил Гейман"],
  ["Ночной цирк", "Эрин Моргенштерн"],
  ["Приорат апельсинового дерева", "Саманта Шеннон"],
  ["Станция Одиннадцать", "Эмили Сент-Джон Мандел"],
  ["Облачный атлас", "Дэвид Митчелл"],
  ["Искупление", "Иэн Макьюэн"],
  ["Щегол", "Донна Тартт"],
  ["Шантарам", "Грегори Дэвид Робертс"],
  ["Прислуга", "Кэтрин Стокетт"],
  ["Дающий", "Лоис Лоури"],
  ["Ребекка", "Дафна Дю Морье"],
  ["Парфюмер", "Патрик Зюскинд"],
  ["Невыносимая легкость бытия", "Милан Кундера"],
  ["Любовь во время чумы", "Габриэль Гарсиа Маркес"],
  ["Старик и море", "Эрнест Хемингуэй"],
  ["По ком звонит колокол", "Эрнест Хемингуэй"],
  ["И восходит солнце", "Эрнест Хемингуэй"],
  ["Зов предков", "Джек Лондон"],
  ["Белый Клык", "Джек Лондон"],
  ["К востоку от Эдема", "Джон Стейнбек"],
  ["О мышах и людях", "Джон Стейнбек"],
  ["Гроздья гнева", "Джон Стейнбек"],
  ["Жена путешественника во времени", "Одри Ниффенеггер"],
  ["Мемуары гейши", "Артур Голден"],
  ["Столпы Земли", "Кен Фоллетт"],
  ["Вторая жизнь Уве", "Фредрик Бакман"],
  ["Тревожные люди", "Фредрик Бакман"],
  ["Моя гениальная подруга", "Элена Ферранте"],
  ["Дом на лазурном берегу", "Ти Джей Клун"],
  ["Пачинко", "Мин Джин Ли"],
  ["Женщины", "Кристин Ханна"],
  ["Четыре ветра", "Кристин Ханна"],
  ["Соловей", "Кристин Ханна"],
  ["Парижская квартира", "Люси Фоли"],
  ["Большая маленькая ложь", "Лиана Мориарти"],
  ["Там, где раки поют", "Делия Оуэнс"],
];

const generatedCatalog = buildCatalog();
let books = loadBooks();
let coverCache = loadCoverCache();
let currentUser = null;
let cloudReady = false;
let cloudSyncTimer = null;
let cloudSyncInProgress = false;
let cloudSyncQueued = false;

applySavedTheme();
renderDailyQuote();
fillCatalog();
renderTabs("shelf");
renderBooks();
renderCatalog();
renderDataVizBooks();
renderStats();
openSharedBookFromUrl();
initializeSupabase();

themeToggle.addEventListener("click", toggleTheme);
authButton.addEventListener("click", handleAuthButtonClick);
authDialogClose.addEventListener("click", () => authDialog.close());
authForm.addEventListener("submit", handleAuthSubmit);
authDialog.addEventListener("click", (event) => {
  if (event.target === authDialog) {
    authDialog.close();
  }
});
catalogSearch.addEventListener("change", applyCatalogSelection);
catalogSearch.addEventListener("input", applyCatalogSelection);
searchInput.addEventListener("input", renderBooks);
statusFilter.addEventListener("change", renderBooks);
shelfSort.addEventListener("change", renderBooks);
catalogFilter.addEventListener("input", renderCatalog);
catalogCategoryFilter.addEventListener("change", renderCatalog);
catalogStatusFilter.addEventListener("change", renderCatalog);
catalogSort.addEventListener("change", renderCatalog);
dataVizFilter.addEventListener("input", renderDataVizBooks);
dataVizStatusFilter.addEventListener("change", renderDataVizBooks);
dataVizSort.addEventListener("change", renderDataVizBooks);
dialogClose.addEventListener("click", () => bookDetailsDialog.close());
dialogSaveStatus.addEventListener("click", saveDialogStatus);
bookDetailsDialog.addEventListener("click", (event) => {
  if (event.target === bookDetailsDialog) {
    bookDetailsDialog.close();
  }
});
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderTabs(button.dataset.tab);
  });

  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const currentIndex = tabButtons.indexOf(button);
    const nextIndex = (currentIndex + direction + tabButtons.length) % tabButtons.length;
    const nextButton = tabButtons[nextIndex];

    renderTabs(nextButton.dataset.tab);
    nextButton.focus();
  });
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookForm);
  const title = formData.get("title").toString().trim();
  const author = formData.get("author").toString().trim();
  const status = formData.get("status").toString();
  const notes = formData.get("notes").toString().trim();

  if (!title || !author) {
    window.alert("Укажи название и автора книги.");
    return;
  }

  books.unshift({
    id: crypto.randomUUID(),
    title,
    author,
    status,
    notes,
  });

  persistAndRefresh();
  bookForm.reset();
  catalogSearch.value = "";
  statusInput.value = "planned";
});

function loadBooks(storageKey = STORAGE_KEY) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map(normalizeStoredBook)
      : [];
  } catch {
    return [];
  }
}

function normalizeStoredBook(book) {
  let status = validStatuses.includes(book.status) ? book.status : "planned";

  if (book.format === "audio" && status === "reading") {
    status = "listening";
  } else if (book.format === "audio" && status === "finished") {
    status = "listened";
  }

  return {
    id: isUuid(book.id) ? book.id : crypto.randomUUID(),
    title: book.title || "",
    author: book.author || "",
    status,
    notes: book.notes || "",
  };
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value || ""
  );
}

function loadCoverCache() {
  try {
    const raw = localStorage.getItem(COVER_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCoverCache() {
  localStorage.setItem(COVER_CACHE_KEY, JSON.stringify(coverCache));
}

function persistAndRefresh() {
  localStorage.setItem(getActiveStorageKey(), JSON.stringify(books));
  refreshAllViews();

  if (currentUser && cloudReady) {
    scheduleCloudSync();
  } else if (currentUser) {
    localStorage.setItem(getPendingStorageKey(), "true");
  }
}

function refreshAllViews() {
  renderBooks();
  renderCatalog();
  renderDataVizBooks();
  renderStats();
}

function getActiveStorageKey() {
  return currentUser ? `${STORAGE_KEY}-${currentUser.id}` : STORAGE_KEY;
}

function getPendingStorageKey(userId = currentUser?.id) {
  return `${STORAGE_KEY}-${userId}-pending`;
}

async function initializeSupabase() {
  if (!supabaseClient) {
    setSyncState("error", "Supabase не загрузился", "Проверь подключение к интернету");
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    setSyncState("error", "Ошибка входа", error.message);
  } else {
    await handleAuthSession("INITIAL_SESSION", data.session);
  }

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION") {
      return;
    }

    window.setTimeout(() => {
      void handleAuthSession(event, session);
    }, 0);
  });
}

async function handleAuthButtonClick() {
  if (!currentUser) {
    authMessage.textContent = "";
    authMessage.removeAttribute("data-state");
    authDialog.showModal();
    window.setTimeout(() => authEmail.focus(), 0);
    return;
  }

  authButton.disabled = true;
  const { error } = await supabaseClient.auth.signOut();
  authButton.disabled = false;

  if (error) {
    setSyncState("error", "Не удалось выйти", error.message);
  }
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  if (!supabaseClient) {
    showAuthMessage("Supabase не загрузился. Обнови страницу и попробуй снова.", "error");
    return;
  }

  if (!["http:", "https:"].includes(window.location.protocol)) {
    showAuthMessage("Вход работает на опубликованной странице GitHub Pages.", "error");
    return;
  }

  const email = authEmail.value.trim();
  if (!email) {
    return;
  }

  authSubmit.disabled = true;
  showAuthMessage("Отправляю ссылку...", "progress");

  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  authSubmit.disabled = false;

  if (error) {
    showAuthMessage(error.message, "error");
    return;
  }

  showAuthMessage("Ссылка отправлена. Открой письмо на этом устройстве.", "success");
}

function showAuthMessage(message, state) {
  authMessage.textContent = message;
  authMessage.dataset.state = state;
}

async function handleAuthSession(event, session) {
  const previousUserId = currentUser?.id || null;
  currentUser = session?.user || null;
  updateAuthUi();

  if (!currentUser) {
    cloudReady = false;
    window.clearTimeout(cloudSyncTimer);

    if (event === "SIGNED_OUT") {
      books = [];
      refreshAllViews();
    }

    setSyncState("local", "Локально", "Войди, чтобы синхронизировать полку");
    return;
  }

  if (previousUserId === currentUser.id && cloudReady) {
    return;
  }

  setSyncState("syncing", "Синхронизация", currentUser.email || "");

  try {
    await migrateLocalBooksToCloud();
    await loadBooksFromCloud();
    cloudReady = true;
    setSyncState("synced", "В облаке", currentUser.email || "");

    if (authDialog.open) {
      authDialog.close();
    }
  } catch (error) {
    cloudReady = false;
    const cachedBooks = loadBooks(`${STORAGE_KEY}-${currentUser.id}`);
    if (cachedBooks.length > 0) {
      books = cachedBooks;
      refreshAllViews();
    }
    setSyncState(
      "error",
      "Нужна таблица",
      "Выполни файл supabase-schema.sql в SQL Editor"
    );
    console.error("Supabase sync error:", error);
  }
}

function updateAuthUi() {
  const isSignedIn = Boolean(currentUser);
  authButtonLabel.textContent = isSignedIn ? "Выйти" : "Войти";
  authButtonIcon.setAttribute("href", isSignedIn ? "#icon-log-out" : "#icon-user");
  const label = isSignedIn
    ? `Выйти из ${currentUser.email || "аккаунта"}`
    : "Войти и синхронизировать полку";
  authButton.title = label;
  authButton.setAttribute("aria-label", label);
}

function setSyncState(state, label, title) {
  syncIndicator.dataset.state = state;
  syncLabel.textContent = label;
  syncIndicator.title = title || label;
}

async function migrateLocalBooksToCloud() {
  const hasPendingUserChanges =
    localStorage.getItem(getPendingStorageKey()) === "true";
  const localBooks = mergeBooksById(
    loadBooks(STORAGE_KEY),
    hasPendingUserChanges
      ? loadBooks(`${STORAGE_KEY}-${currentUser.id}`)
      : []
  );

  if (localBooks.length === 0) {
    return;
  }

  const { error } = await supabaseClient
    .from("user_books")
    .upsert(localBooks.map(bookToCloudRow), { onConflict: "id" });

  if (error) {
    throw error;
  }

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(getPendingStorageKey());
}

function mergeBooksById(...collections) {
  const merged = new Map();

  collections.flat().forEach((book) => {
    merged.set(book.id, book);
  });

  return Array.from(merged.values());
}

async function loadBooksFromCloud() {
  const { data, error } = await supabaseClient
    .from("user_books")
    .select("id, title, author, format, status, notes, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  books = (data || []).map(cloudRowToBook);
  localStorage.setItem(getActiveStorageKey(), JSON.stringify(books));
  refreshAllViews();
}

function bookToCloudRow(book) {
  return {
    id: book.id,
    user_id: currentUser.id,
    title: book.title,
    author: book.author,
    format: ["listening", "listened"].includes(book.status) ? "audio" : "reading",
    unit: "pages",
    total_amount: 1,
    current_amount: isCompletedStatus(book.status) ? 1 : 0,
    status: book.status,
    notes: book.notes,
    updated_at: new Date().toISOString(),
  };
}

function cloudRowToBook(row) {
  return normalizeStoredBook({
    id: row.id,
    title: row.title,
    author: row.author,
    format: row.format,
    status: row.status,
    notes: row.notes,
  });
}

function scheduleCloudSync() {
  window.clearTimeout(cloudSyncTimer);
  setSyncState("syncing", "Сохраняю", currentUser?.email || "");
  cloudSyncTimer = window.setTimeout(() => {
    void syncBooksToCloud();
  }, CLOUD_SYNC_DELAY);
}

async function syncBooksToCloud() {
  if (!currentUser || !cloudReady) {
    return;
  }

  if (cloudSyncInProgress) {
    cloudSyncQueued = true;
    return;
  }

  cloudSyncInProgress = true;
  const userId = currentUser.id;

  try {
    if (books.length > 0) {
      const { error: upsertError } = await supabaseClient
        .from("user_books")
        .upsert(books.map(bookToCloudRow), { onConflict: "id" });

      if (upsertError) {
        throw upsertError;
      }
    }

    const { data: cloudRows, error: selectError } = await supabaseClient
      .from("user_books")
      .select("id");

    if (selectError) {
      throw selectError;
    }

    const localIds = new Set(books.map((book) => book.id));
    const staleIds = (cloudRows || [])
      .map((row) => row.id)
      .filter((id) => !localIds.has(id));

    if (staleIds.length > 0) {
      const { error: deleteError } = await supabaseClient
        .from("user_books")
        .delete()
        .in("id", staleIds);

      if (deleteError) {
        throw deleteError;
      }
    }

    if (currentUser?.id === userId) {
      localStorage.removeItem(getPendingStorageKey(userId));
      setSyncState("synced", "В облаке", currentUser.email || "");
    }
  } catch (error) {
    setSyncState("error", "Не сохранено", error.message);
    console.error("Supabase save error:", error);
  } finally {
    cloudSyncInProgress = false;

    if (cloudSyncQueued) {
      cloudSyncQueued = false;
      scheduleCloudSync();
    }
  }
}

function renderTabs(activeTab) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === activeTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === activeTab);
  });
}

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const filter = statusFilter.value;
  const sort = shelfSort.value;
  const filteredBooks = books.filter((book) => {
    const matchesQuery =
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    const matchesStatus = filter === "all" || book.status === filter;
    return matchesQuery && matchesStatus;
  });
  const sortedBooks = sortBooksByVolume(filteredBooks, sort);

  booksList.innerHTML = "";

  sortedBooks.forEach((book) => {
    const fragment = bookCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".book-card");
    const badge = fragment.querySelector(".status-badge");
    const title = fragment.querySelector(".book-title");
    const author = fragment.querySelector(".book-author");
    const notes = fragment.querySelector(".book-notes");
    const shareButton = fragment.querySelector(".share-button");
    const deleteButton = fragment.querySelector(".delete-button");

    card.dataset.status = book.status;
    badge.textContent = formatStatusLabel(book.status);
    title.textContent = book.title;
    author.textContent = book.author;
    notes.textContent = book.notes || "Без заметок";

    card.addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, textarea")) {
        return;
      }
      openBookDetails(book);
    });

    shareButton.addEventListener("click", async () => {
      const shared = await shareBook(book);
      if (shared) {
        const iconUse = shareButton.querySelector("use");
        shareButton.dataset.copied = "true";
        shareButton.setAttribute("aria-label", "Скопировано");
        shareButton.title = "Скопировано";
        iconUse?.setAttribute("href", "#icon-check");
        window.setTimeout(() => {
          shareButton.dataset.copied = "false";
          shareButton.setAttribute("aria-label", "Поделиться");
          shareButton.title = "Поделиться";
          iconUse?.setAttribute("href", "#icon-share");
        }, 1500);
      }
    });

    deleteButton.addEventListener("click", () => {
      books = books.filter((entry) => entry.id !== book.id);
      persistAndRefresh();
    });

    booksList.appendChild(fragment);
  });

  emptyState.classList.toggle("visible", sortedBooks.length === 0);
}

function renderCatalog() {
  const query = catalogFilter.value.trim().toLowerCase();
  const categoryFilter = catalogCategoryFilter.value;
  const filter = catalogStatusFilter.value;
  const sort = catalogSort.value;
  const completedCount = generatedCatalog.filter((book) =>
    isCompletedStatus(getCatalogState(book))
  ).length;
  const percent = Math.round((completedCount / generatedCatalog.length) * 100);

  catalogCompleted.textContent = String(completedCount);
  catalogPercent.textContent = `${percent}%`;
  renderSpines(catalogShelfProgress, percent, completedCount > 0 ? "finished" : "planned");

  const filteredCatalog = generatedCatalog.filter((book) => {
    const state = getCatalogState(book);
    const matchesQuery =
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    const matchesState =
      filter === "all" || state === filter;
    return matchesQuery && matchesCategory && matchesState;
  });
  const sortedCatalog = sortBooksByVolume(filteredCatalog, sort);

  catalogList.innerHTML = "";
  const groupedCatalog = groupCatalogByCategory(sortedCatalog);

  Object.entries(groupedCatalog).forEach(([category, categoryBooks]) => {
    const section = document.createElement("section");
    section.className = "catalog-section";
    section.dataset.category = category;

    const heading = document.createElement("div");
    heading.className = "catalog-section-heading";
    heading.innerHTML = `<h3>${categoryLabels[category]}</h3><span>${categoryBooks.length}</span>`;
    section.appendChild(heading);

    categoryBooks.forEach((book) => {
      const fragment = catalogItemTemplate.content.cloneNode(true);
      const title = fragment.querySelector(".catalog-title");
      const author = fragment.querySelector(".catalog-author");
      const stateBadge = fragment.querySelector(".catalog-state");
      const item = fragment.querySelector(".catalog-item");
      const state = getCatalogState(book);

      title.textContent = book.title;
      author.textContent = book.author;
      item.dataset.status = state;
      stateBadge.textContent = formatStatusLabel(state);
      makeCatalogItemInteractive(item, book);

      section.appendChild(fragment);
    });

    catalogList.appendChild(section);
  });
}

function renderDataVizBooks() {
  const query = dataVizFilter.value.trim().toLowerCase();
  const filter = dataVizStatusFilter.value;
  const sort = dataVizSort.value;
  const collection = dataVizBooks.map(([title, author]) => ({
    title,
    author,
    category: "dataviz",
  }));
  const completedCount = collection.filter((book) =>
    isCompletedStatus(getCatalogState(book))
  ).length;
  const percent = Math.round((completedCount / collection.length) * 100);

  dataVizPercent.textContent = `${percent}%`;
  renderSpines(dataVizShelfProgress, percent, completedCount > 0 ? "finished" : "planned");

  const filteredBooks = collection.filter((book) => {
    const state = getCatalogState(book);
    const matchesQuery =
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    const matchesState =
      filter === "all" || state === filter;
    return matchesQuery && matchesState;
  });
  const sortedBooks = sortBooksByVolume(filteredBooks, sort);

  dataVizList.innerHTML = "";

  sortedBooks.forEach((book) => {
    const fragment = catalogItemTemplate.content.cloneNode(true);
    const title = fragment.querySelector(".catalog-title");
    const author = fragment.querySelector(".catalog-author");
    const stateBadge = fragment.querySelector(".catalog-state");
    const item = fragment.querySelector(".catalog-item");
    const state = getCatalogState(book);

    title.textContent = book.title;
    author.textContent = book.author;
    item.dataset.status = state;
    stateBadge.textContent = formatStatusLabel(state);
    makeCatalogItemInteractive(item, book);

    dataVizList.appendChild(fragment);
  });
}

function makeCatalogItemInteractive(item, book) {
  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.setAttribute("aria-label", `Подробнее: ${book.title}, ${book.author}`);
  item.addEventListener("click", () => openBookDetails(book));
  item.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;

    event.preventDefault();
    openBookDetails(book);
  });
}

function openBookDetails(book) {
  const existingBook = getCatalogMatch(book) || book;
  const meta = getBookMeta(existingBook);
  activeDialogBook = {
    title: existingBook.title,
    author: existingBook.author,
    category: book.category || inferCategory(book.title, book.author),
    meta,
  };

  const status = existingBook.status || "planned";
  dialogTitle.textContent = existingBook.title;
  dialogAuthor.textContent = existingBook.author;
  dialogYear.textContent = String(meta.year);
  dialogPages.textContent = String(meta.pages);
  dialogAudio.textContent = meta.audio;
  dialogDescription.textContent = meta.description;
  dialogStatus.value = status;
  dialogStatusBadge.textContent = formatStatusLabel(status);
  dialogNotes.textContent = existingBook.notes || "Без заметок";
  dialogNotes.classList.toggle("is-empty", !existingBook.notes);
  setupBookLinks(
    existingBook,
    dialogReadLink,
    dialogLitresBookLink,
    dialogListenLink,
    dialogBuyLink
  );
  resetDialogCover(existingBook);

  bookDetailsDialog.showModal();
  void loadBookCover(existingBook, dialogCover, dialogCoverImage);
}

function saveDialogStatus() {
  if (!activeDialogBook) {
    return;
  }

  const status = dialogStatus.value;
  const existingBook = getCatalogMatch(activeDialogBook);

  if (existingBook) {
    existingBook.status = status;
  } else {
    books.unshift({
      id: crypto.randomUUID(),
      title: activeDialogBook.title,
      author: activeDialogBook.author,
      status,
      notes: "",
    });
  }

  persistAndRefresh();
  bookDetailsDialog.close();
}

function renderStats() {
  totalBooks.textContent = String(books.length);
  completedBooks.textContent = String(
    books.filter((book) => isCompletedStatus(book.status)).length
  );
  shelfTabCount.textContent = String(books.length);
  dataVizTabCount.textContent = String(dataVizBooks.length);
}

function renderDailyQuote() {
  const [quote, source] = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];
  dailyQuote.innerHTML = `<span class="quote-text">“${quote}”</span><span class="quote-source">${source}</span>`;
}

function renderSpines(container, percent, status) {
  container.innerHTML = "";
  const filledCount = Math.round((Math.max(0, Math.min(100, percent)) / 100) * SPINE_COUNT);

  for (let index = 0; index < SPINE_COUNT; index += 1) {
    const spine = document.createElement("span");
    spine.className = "book-spine";

    if (index < filledCount) {
      if (status === "finished") {
        spine.classList.add("is-finished");
      } else {
        spine.classList.add("is-reading");
      }
    }

    container.appendChild(spine);
  }
}

function applyCatalogSelection() {
  const selected = generatedCatalog.find(
    (book) => `${book.title} - ${book.author}` === catalogSearch.value
  );
  if (!selected) {
    return;
  }

  titleInput.value = selected.title;
  authorInput.value = selected.author;
  statusInput.value = "planned";
}

function fillCatalog() {
  popularBooksList.innerHTML = "";
  generatedCatalog.forEach((book) => {
    const option = document.createElement("option");
    option.value = `${book.title} - ${book.author}`;
    popularBooksList.appendChild(option);
  });
}

function sortBooksByVolume(collection, sort) {
  if (sort === "default") {
    return collection;
  }

  return [...collection].sort((firstBook, secondBook) => {
    const firstVolume = getBookVolume(firstBook);
    const secondVolume = getBookVolume(secondBook);
    return sort === "big-first" ? secondVolume - firstVolume : firstVolume - secondVolume;
  });
}

function getBookVolume(book) {
  const known = bookDetails[`${book.title}|${book.author}`];
  return Number(known?.pages || estimatePages(book));
}

function getBookMeta(book) {
  const key = `${book.title}|${book.author}`;
  const known = bookDetails[key];
  const pages = Number(known?.pages || estimatePages(book));
  const year = known?.year || estimateYear(book);
  const audio = estimateAudioTime(pages);

  return {
    year,
    pages,
    audio,
    description: known?.description || buildBookDescription(book),
  };
}

function estimatePages(book) {
  const base = 220 + ((book.title.length * 17 + book.author.length * 11) % 260);
  return Math.round(base / 8) * 8;
}

function estimateYear(book) {
  const knownClassicAuthors = ["Лев Толстой", "Федор Достоевский", "Антон Чехов", "Александр Пушкин"];
  if (knownClassicAuthors.includes(book.author)) {
    return 1870 + ((book.title.length + book.author.length) % 35);
  }
  return 1990 + ((book.title.length * 3 + book.author.length * 5) % 35);
}

function estimateAudioTime(pages) {
  const minutes = Math.max(90, Math.round(pages * 1.9));
  return formatMinutes(minutes);
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${hours} ч ${remainder} мин`;
}

function buildBookDescription(book) {
  const category = book.category || inferCategory(book.title, book.author);
  const descriptions = {
    russian: "Произведение русской литературы, которое можно читать как разговор с эпохой, языком и человеческими характерами.",
    foreign: "Зарубежная книга о людях, выборе и обстоятельствах, которые меняют героев и их взгляд на мир.",
    nonfiction: "Нонфикшн о мышлении, обществе, привычках или культуре, который помогает смотреть на привычные вещи точнее.",
    fantasy: "История с сильным миром, конфликтом и приключением, где вымышленное пространство помогает говорить о реальном опыте.",
    modern: "Современная проза о близких человеческих состояниях, отношениях, памяти и поиске своего места.",
    dataviz: "Книга о картах, пространственных данных, картографическом мышлении или истории того, как люди изображали мир.",
  };
  return descriptions[category] || descriptions.foreign;
}

function buildShareText(book) {
  return [
    `Сейчас у меня в трекере "${book.title}" — ${book.author}.`,
    `Статус: ${statusLabels[book.status]}.`,
  ].join(" ");
}

function setupBookLinks(book, readLink, litresBookLink, listenLink, buyLink) {
  const query = buildBookQuery(book);
  readLink.href = `https://books.yandex.ru/search?text=${query}`;
  litresBookLink.href = `https://www.litres.ru/search/?q=${query}`;
  listenLink.href = `https://www.litres.ru/search/?q=${query}&art_types=audiobook`;
  buyLink.href = `https://www.chitai-gorod.ru/search?phrase=${query}`;
  litresBookLink.querySelector("small").textContent = "ЛитРес · поиск";
  listenLink.querySelector("small").textContent = "ЛитРес · поиск аудиокниги";
}

function buildBookQuery(book) {
  return encodeURIComponent(`${book.title} ${book.author}`);
}

function resetDialogCover(book) {
  dialogCover.classList.remove("has-cover", "is-empty", "is-loading");
  dialogCoverImage.onload = null;
  dialogCoverImage.onerror = null;
  dialogCoverImage.removeAttribute("src");
  dialogCover.querySelector("span").textContent = `Ищем обложку «${book.title}»`;
}

async function loadBookCover(book, cover, image) {
  const key = getBookKey(book);
  const localCover = localBookCovers.get(key);
  const cachedCover = coverCache[key];
  cover.classList.add("is-loading");

  if (localCover) {
    const loaded = await tryApplyCoverImage(book, cover, image, localCover);
    if (loaded) {
      return;
    }
  }

  if (cachedCover) {
    const loaded = await tryApplyCoverImage(book, cover, image, cachedCover);
    if (loaded) {
      return;
    }

    delete coverCache[key];
    saveCoverCache();
  }

  const coverLoaders = [fetchOpenLibraryCoverUrls, fetchGoogleCoverUrls];

  for (const loader of coverLoaders) {
    try {
      const urls = await loader(book);
      for (const url of urls) {
        const loaded = await tryApplyCoverImage(book, cover, image, url);
        if (loaded) {
          coverCache[key] = url;
          saveCoverCache();
          return;
        }
      }
    } catch {
      // Try the next cover provider.
    }
  }

  setCoverFallback(book, cover, image);
}

async function fetchGoogleCoverUrls(book) {
  const data = await fetchJsonWithTimeout(
    `https://www.googleapis.com/books/v1/volumes?q=${buildGoogleBooksQuery(book)}&maxResults=10&printType=books`
  );
  const items = [...(data.items || [])].sort(
    (first, second) =>
      scoreBookMatch(second.volumeInfo?.title, second.volumeInfo?.authors, book) -
      scoreBookMatch(first.volumeInfo?.title, first.volumeInfo?.authors, book)
  );
  const sizes = ["extraLarge", "large", "medium", "small", "thumbnail", "smallThumbnail"];
  const urls = [];

  for (const item of items) {
    for (const size of sizes) {
      const url = item.volumeInfo?.imageLinks?.[size];
      if (url) {
        prepareCoverUrls({ url, size }).forEach((prepared) => {
          if (!urls.includes(prepared)) {
            urls.push(prepared);
          }
        });
      }
    }
  }

  return urls;
}

async function fetchOpenLibraryCoverUrls(book) {
  const params = new URLSearchParams({
    title: book.title,
    author: book.author,
    limit: "10",
  });
  const data = await fetchJsonWithTimeout(`https://openlibrary.org/search.json?${params}`);
  const docs = [...(data.docs || [])].sort(
    (first, second) =>
      scoreBookMatch(second.title, second.author_name, book) -
      scoreBookMatch(first.title, first.author_name, book)
  );
  const urls = [];

  docs.forEach((entry) => {
    if (entry.cover_i) {
      urls.push(`https://covers.openlibrary.org/b/id/${entry.cover_i}-L.jpg?default=false`);
    }

    const isbn = entry.isbn?.[0];
    if (isbn) {
      urls.push(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`);
    }
  });

  return Array.from(new Set(urls));
}

function prepareCoverUrls(cover) {
  const original = cover.url
    .replace(/^http:\/\//, "https://")
    .replace("&edge=curl", "")
    .replace("?edge=curl&", "?");

  if (!["thumbnail", "smallThumbnail"].includes(cover.size)) {
    return [original];
  }

  const enlarged = original.replace(/([?&])zoom=\d/, "$1zoom=2");
  return enlarged === original ? [original] : [enlarged, original];
}

function tryApplyCoverImage(book, cover, image, coverUrl) {
  if (!isActiveDialogBook(book)) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => finish(false), 8000);

    function finish(success) {
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;

      if (success && isActiveDialogBook(book)) {
        cover.classList.remove("is-loading", "is-empty");
        cover.classList.add("has-cover");
        resolve(true);
        return;
      }

      resolve(false);
    }

    image.onload = () => {
      const isUsable = image.naturalWidth >= 40 && image.naturalHeight >= 60;
      finish(isUsable);
    };
    image.onerror = () => finish(false);
    image.src = coverUrl;
  });
}

function setCoverFallback(book, cover, image) {
  if (!isActiveDialogBook(book)) {
    return;
  }

  image.removeAttribute("src");
  cover.classList.remove("has-cover", "is-loading");
  cover.classList.add("is-empty");
  cover.querySelector("span").textContent = book.title;
}

function isActiveDialogBook(book) {
  return activeDialogBook && getBookKey(activeDialogBook) === getBookKey(book);
}

function scoreBookMatch(title, authors, book) {
  const normalizedTitle = normalizeSearchText(title);
  const targetTitle = normalizeSearchText(book.title);
  const authorText = normalizeSearchText(Array.isArray(authors) ? authors.join(" ") : authors);
  const targetAuthorTokens = normalizeSearchText(book.author)
    .split(" ")
    .filter((token) => token.length > 2);
  let score = 0;

  if (normalizedTitle === targetTitle) {
    score += 120;
  } else if (normalizedTitle.includes(targetTitle) || targetTitle.includes(normalizedTitle)) {
    score += 60;
  }

  targetAuthorTokens.forEach((token) => {
    if (authorText.includes(token)) {
      score += 20;
    }
  });

  return score;
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .trim();
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

function buildGoogleBooksQuery(book) {
  return encodeURIComponent(`intitle:${book.title} inauthor:${book.author}`);
}

function getBookKey(book) {
  return `${book.title}|${book.author}`.trim().toLowerCase();
}

async function shareBook(book) {
  const title = `${book.title} — ${book.author}`;
  const text = buildShareText(book);
  const url = buildShareUrl(book);

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (error) {
      if (error.name === "AbortError") {
        return false;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    window.prompt("Скопируй ссылку на книгу:", url);
    return true;
  }
}

function buildShareUrl(book) {
  const url = new URL(window.location.href);
  url.searchParams.set("book", JSON.stringify(buildSharePayload(book)));
  return url.toString();
}

function buildSharePayload(book) {
  return {
    title: book.title,
    author: book.author,
    status: book.status,
    notes: book.notes,
  };
}

function openSharedBookFromUrl() {
  const sharedBook = getSharedBookFromUrl();
  if (!sharedBook) {
    return;
  }

  const existingBook = getCatalogMatch(sharedBook);
  openBookDetails(existingBook || sharedBook);
}

function getSharedBookFromUrl() {
  const rawBook = new URLSearchParams(window.location.search).get("book");
  if (!rawBook) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawBook);
    if (!parsed.title || !parsed.author) {
      return null;
    }

    return normalizeStoredBook({
      id: crypto.randomUUID(),
      title: String(parsed.title),
      author: String(parsed.author),
      format: parsed.format,
      status: parsed.status,
      notes: parsed.notes || "",
    });
  } catch {
    return null;
  }
}

function buildCatalog() {
  const catalog = [];
  const seen = new Set();
  const suffixes = [
    "Часть 1",
    "Часть 2",
    "Издание для клуба читателей",
    "Юбилейное издание",
    "Современное издание",
    "Большая библиотека",
    "Классическое издание",
  ];

  baseBooks.forEach(([title, author]) => {
    pushUnique(catalog, seen, title, author, inferCategory(title, author));
  });

  dataVizBooks.forEach(([title, author]) => {
    pushUnique(catalog, seen, title, author, "dataviz");
  });

  let index = 0;
  while (catalog.length < CATALOG_SIZE) {
    const [title, author] = baseBooks[index % baseBooks.length];
    const suffix = suffixes[Math.floor(index / baseBooks.length) % suffixes.length];
    pushUnique(catalog, seen, `${title} (${suffix})`, author, inferCategory(title, author));
    index += 1;
  }

  return catalog;
}

function pushUnique(catalog, seen, title, author, category) {
  const key = `${title}|${author}`;
  if (seen.has(key)) {
    return;
  }
  seen.add(key);
  catalog.push({ title, author, category });
}

function inferCategory(title, author) {
  const nonfictionAuthors = [
    "Юваль Ной Харари",
    "Джеймс Клир",
    "Морган Хаузел",
    "Даниэль Канеман",
    "Чарльз Дахигг",
    "Кэл Ньюпорт",
    "Грег МакКеон",
    "Тара Вестовер",
    "Мишель Обама",
    "Уолтер Айзексон",
    "Малкольм Гладуэлл",
    "Марк Мэнсон",
    "Сьюзан Кейн",
    "Саймон Синек",
    "Стивен Кови",
    "Роберт Кийосаки",
    "Марк Аврелий",
    "Виктор Франкл",
    "Александр Солженицын",
  ];
  const russianAuthors = [
    "Федор Достоевский",
    "Лев Толстой",
    "Михаил Булгаков",
    "Евгений Замятин",
    "Николай Гоголь",
    "Антон Чехов",
    "Иван Тургенев",
    "Александр Пушкин",
    "Борис Пастернак",
    "Василий Гроссман",
    "Владимир Набоков",
  ];
  const fantasyTitles = [
    "Хоббит",
    "Гарри Поттер",
    "Властелин колец",
    "Дюна",
    "Хроники Нарнии",
    "Игра престолов",
    "Франкенштейн",
    "Марсианин",
    "Проект Аве Мария",
    "Первому игроку приготовиться",
    "Солярис",
    "Имя ветра",
    "Рожденный туманом",
    "Путь королей",
    "Ложь Локка Ламоры",
    "Американские боги",
    "Никогде",
    "Благие знамения",
    "Морт",
    "Стража",
    "Мелкие боги",
    "Океан в конце дороги",
    "Ночной цирк",
    "Приорат апельсинового дерева",
  ];
  const modernAuthors = [
    "Мэтт Хейг",
    "Джон Грин",
    "Харуки Мураками",
    "Гиллиан Флинн",
    "Донна Тартт",
    "Мадлен Миллер",
    "Салли Руни",
    "Тейлор Дженкинс Рид",
    "Колин Гувер",
    "Ханья Янагихара",
    "Алекс Михаэлидес",
    "Фредрик Бакман",
    "Элена Ферранте",
    "Ти Джей Клун",
    "Мин Джин Ли",
    "Кристин Ханна",
    "Люси Фоли",
    "Лиана Мориарти",
    "Делия Оуэнс",
  ];

  if (nonfictionAuthors.includes(author)) {
    return "nonfiction";
  }
  if (russianAuthors.includes(author)) {
    return "russian";
  }
  if (fantasyTitles.some((keyword) => title.includes(keyword))) {
    return "fantasy";
  }
  if (modernAuthors.includes(author)) {
    return "modern";
  }
  return "foreign";
}

function groupCatalogByCategory(catalog) {
  const grouped = {
    russian: [],
    foreign: [],
    nonfiction: [],
    fantasy: [],
    modern: [],
    dataviz: [],
  };

  catalog.forEach((book) => {
    grouped[book.category].push(book);
  });

  return Object.fromEntries(
    Object.entries(grouped).filter(([, categoryBooks]) => categoryBooks.length > 0)
  );
}

function getCatalogMatch(book) {
  return books.find(
    (entry) =>
      entry.title.trim().toLowerCase() === book.title.trim().toLowerCase() &&
      entry.author.trim().toLowerCase() === book.author.trim().toLowerCase()
  );
}

function getCatalogState(book) {
  const match = getCatalogMatch(book);
  return match ? match.status : "planned";
}

function formatStatusLabel(status) {
  const label = statusLabels[status] || statusLabels.planned;
  return isCompletedStatus(status) ? `✓ ${label}` : label;
}

function isCompletedStatus(status) {
  return completedStatuses.has(status);
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  document.body.dataset.theme = savedTheme;
  themeToggle.setAttribute(
    "aria-label",
    savedTheme === "dark" ? "Включить дневную тему" : "Включить ночную тему"
  );
  themeToggle.title = savedTheme === "dark" ? "Дневная тема" : "Ночная тема";
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  themeToggle.setAttribute(
    "aria-label",
    nextTheme === "dark" ? "Включить дневную тему" : "Включить ночную тему"
  );
  themeToggle.title = nextTheme === "dark" ? "Дневная тема" : "Ночная тема";
}
