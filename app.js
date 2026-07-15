const STORAGE_KEY = "bookflow-library";
const THEME_KEY = "bookflow-theme";
const CATALOG_SIZE = 1000;
const SPINE_COUNT = 20;

const bookForm = document.getElementById("bookForm");
const booksList = document.getElementById("booksList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const totalBooks = document.getElementById("totalBooks");
const completedBooks = document.getElementById("completedBooks");
const catalogCompleted = document.getElementById("catalogCompleted");
const bookCardTemplate = document.getElementById("bookCardTemplate");
const catalogItemTemplate = document.getElementById("catalogItemTemplate");
const catalogSearch = document.getElementById("catalogSearch");
const popularBooksList = document.getElementById("popularBooksList");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const formatInput = document.getElementById("format");
const unitInput = document.getElementById("unit");
const totalAmountInput = document.getElementById("totalAmount");
const currentAmountInput = document.getElementById("currentAmount");
const statusInput = document.getElementById("status");
const themeToggle = document.getElementById("themeToggle");
const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));
const catalogList = document.getElementById("catalogList");
const catalogFilter = document.getElementById("catalogFilter");
const catalogCategoryFilter = document.getElementById("catalogCategoryFilter");
const catalogStatusFilter = document.getElementById("catalogStatusFilter");
const catalogPercent = document.getElementById("catalogPercent");
const catalogShelfProgress = document.getElementById("catalogShelfProgress");
const dailyQuote = document.getElementById("dailyQuote");
const dataVizFilter = document.getElementById("dataVizFilter");
const dataVizStatusFilter = document.getElementById("dataVizStatusFilter");
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

const statusLabels = {
  planned: "Хочу прочитать",
  reading: "Читаю",
  finished: "Прочитано",
};

const formatLabels = {
  reading: "Читаю",
  audio: "Слушаю",
  both: "Читаю и слушаю",
};

const unitLabels = {
  pages: "стр.",
  minutes: "мин.",
};

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
  ["Как мы ориентируемся", "Майкл Бонд"],
  ["Картография", "Кеннет Филд"],
  ["Как лгать при помощи карт", "Марк Монмонье"],
  ["Карты. Их история, значение и язык", "Джерри Броттон"],
  ["История мира в 12 картах", "Джерри Броттон"],
  ["Великие карты", "Джерри Броттон"],
  ["Карта-призрак", "Стивен Джонсон"],
  ["На карте. Почему мир выглядит именно так", "Саймон Гарфилд"],
  ["Географические карты", "Алексей Постников"],
  ["Картография с основами топографии", "Александр Берлянт"],
  ["Картоведение", "Александр Берлянт"],
  ["Тематическое картографирование", "Александр Берлянт"],
  ["Геоинформационное картографирование", "Александр Берлянт"],
  ["Введение в геоинформационное картографирование", "Александр Берлянт"],
  ["Картографический метод исследования", "Константин Салищев"],
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
  "Как лгать при помощи карт|Марк Монмонье": {
    year: 1991,
    pages: 232,
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
  "Как мы ориентируемся|Майкл Бонд": {
    year: 2020,
    pages: 336,
    description:
      "Книга о навигации, памяти, картах в голове и том, как люди находят путь в городе, природе и незнакомом пространстве.",
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

applySavedTheme();
renderDailyQuote();
fillCatalog();
renderTabs("shelf");
renderBooks();
renderCatalog();
renderDataVizBooks();
renderStats();

themeToggle.addEventListener("click", toggleTheme);
catalogSearch.addEventListener("change", applyCatalogSelection);
catalogSearch.addEventListener("input", applyCatalogSelection);
searchInput.addEventListener("input", renderBooks);
statusFilter.addEventListener("change", renderBooks);
catalogFilter.addEventListener("input", renderCatalog);
catalogCategoryFilter.addEventListener("change", renderCatalog);
catalogStatusFilter.addEventListener("change", renderCatalog);
dataVizFilter.addEventListener("input", renderDataVizBooks);
dataVizStatusFilter.addEventListener("change", renderDataVizBooks);
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
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookForm);
  const title = formData.get("title").toString().trim();
  const author = formData.get("author").toString().trim();
  const format = formData.get("format").toString();
  const unit = formData.get("unit").toString();
  const totalAmount = Number(formData.get("totalAmount"));
  const currentAmount = Number(formData.get("currentAmount"));
  const status = formData.get("status").toString();
  const notes = formData.get("notes").toString().trim();

  if (!title || !author || totalAmount < 1 || currentAmount < 0 || currentAmount > totalAmount) {
    window.alert("Проверь данные: объем и прогресс должны быть корректными.");
    return;
  }

  books.unshift({
    id: crypto.randomUUID(),
    title,
    author,
    format,
    unit,
    totalAmount,
    currentAmount: normalizeCurrentAmount(currentAmount, totalAmount, status),
    status: normalizeStatus(status, currentAmount, totalAmount),
    notes,
  });

  persistAndRefresh();
  bookForm.reset();
  catalogSearch.value = "";
  currentAmountInput.value = "0";
  statusInput.value = "planned";
  formatInput.value = "reading";
  unitInput.value = "pages";
});

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((book) => ({
          id: book.id || crypto.randomUUID(),
          title: book.title || "",
          author: book.author || "",
          format: book.format || "reading",
          unit: book.unit || "pages",
          totalAmount: Number(book.totalAmount || 0),
          currentAmount: Number(book.currentAmount || 0),
          status: book.status || "planned",
          notes: book.notes || "",
        }))
      : [];
  } catch {
    return [];
  }
}

function persistAndRefresh() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  renderBooks();
  renderCatalog();
  renderDataVizBooks();
  renderStats();
}

function renderTabs(activeTab) {
  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === activeTab);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === activeTab);
  });
}

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const filter = statusFilter.value;
  const filteredBooks = books.filter((book) => {
    const matchesQuery =
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    const matchesStatus = filter === "all" || book.status === filter;
    return matchesQuery && matchesStatus;
  });

  booksList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const fragment = bookCardTemplate.content.cloneNode(true);
    const badge = fragment.querySelector(".status-badge");
    const formatBadge = fragment.querySelector(".format-badge");
    const title = fragment.querySelector(".book-title");
    const author = fragment.querySelector(".book-author");
    const progressLabel = fragment.querySelector(".progress-label");
    const progressPercent = fragment.querySelector(".progress-percent");
    const progressShelf = fragment.querySelector(".book-spine-progress");
    const notes = fragment.querySelector(".book-notes");
    const statusSelect = fragment.querySelector(".card-status");
    const formatSelect = fragment.querySelector(".card-format");
    const unitSelect = fragment.querySelector(".card-unit");
    const amountInput = fragment.querySelector(".card-amount");
    const shareButton = fragment.querySelector(".share-button");
    const deleteButton = fragment.querySelector(".delete-button");
    const progress = getProgress(book.currentAmount, book.totalAmount);

    badge.textContent = statusLabels[book.status];
    formatBadge.textContent = formatLabels[book.format];
    title.textContent = book.title;
    author.textContent = book.author;
    progressLabel.textContent =
      `${book.currentAmount} из ${book.totalAmount} ${unitLabels[book.unit]}`;
    progressPercent.textContent = `${progress}%`;
    notes.textContent = book.notes || "Без заметок";
    statusSelect.value = book.status;
    formatSelect.value = book.format;
    unitSelect.value = book.unit;
    amountInput.value = String(book.currentAmount);
    amountInput.max = String(book.totalAmount);

    renderSpines(progressShelf, progress, book.status);
    fragment.querySelector(".book-card").addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, textarea")) {
        return;
      }
      openBookDetails(book);
    });

    statusSelect.addEventListener("change", (event) => {
      const nextStatus = event.target.value;
      book.status = nextStatus;
      book.currentAmount = normalizeCurrentAmount(book.currentAmount, book.totalAmount, book.status);
      persistAndRefresh();
    });

    formatSelect.addEventListener("change", (event) => {
      book.format = event.target.value;
      if (book.format === "audio" && book.unit === "pages") {
        book.unit = "minutes";
      }
      persistAndRefresh();
    });

    unitSelect.addEventListener("change", (event) => {
      book.unit = event.target.value;
      persistAndRefresh();
    });

    amountInput.addEventListener("change", (event) => {
      const nextAmount = Number(event.target.value);
      if (Number.isNaN(nextAmount) || nextAmount < 0 || nextAmount > book.totalAmount) {
        event.target.value = String(book.currentAmount);
        return;
      }
      book.currentAmount = nextAmount;
      book.status = normalizeStatus(book.status, nextAmount, book.totalAmount);
      persistAndRefresh();
    });

    shareButton.addEventListener("click", async () => {
      const text = buildShareText(book);
      try {
        await navigator.clipboard.writeText(text);
        shareButton.textContent = "Скопировано";
        window.setTimeout(() => {
          shareButton.textContent = "Поделиться";
        }, 1500);
      } catch {
        window.alert(text);
      }
    });

    deleteButton.addEventListener("click", () => {
      books = books.filter((entry) => entry.id !== book.id);
      persistAndRefresh();
    });

    booksList.appendChild(fragment);
  });

  emptyState.classList.toggle("visible", filteredBooks.length === 0);
}

function renderCatalog() {
  const query = catalogFilter.value.trim().toLowerCase();
  const categoryFilter = catalogCategoryFilter.value;
  const filter = catalogStatusFilter.value;
  const completedCount = generatedCatalog.filter((book) => getCatalogState(book) === "finished").length;
  const percent = Math.round((completedCount / generatedCatalog.length) * 100);

  catalogCompleted.textContent = String(completedCount);
  catalogPercent.textContent = `${percent}%`;
  renderSpines(catalogShelfProgress, percent, completedCount > 0 ? "reading" : "planned");

  const filteredCatalog = generatedCatalog.filter((book) => {
    const state = getCatalogState(book);
    const matchesQuery =
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter;
    const matchesState =
      filter === "all" ||
      (filter === "finished" && state === "finished") ||
      (filter === "active" && state === "reading") ||
      (filter === "new" && state === "planned");
    return matchesQuery && matchesCategory && matchesState;
  });

  catalogList.innerHTML = "";
  const groupedCatalog = groupCatalogByCategory(filteredCatalog);

  Object.entries(groupedCatalog).forEach(([category, categoryBooks]) => {
    const section = document.createElement("section");
    section.className = "catalog-section";

    const heading = document.createElement("div");
    heading.className = "catalog-section-heading";
    heading.innerHTML = `<h3>${categoryLabels[category]}</h3><span>${categoryBooks.length}</span>`;
    section.appendChild(heading);

    categoryBooks.forEach((book) => {
      const fragment = catalogItemTemplate.content.cloneNode(true);
      const title = fragment.querySelector(".catalog-title");
      const author = fragment.querySelector(".catalog-author");
      const stateBadge = fragment.querySelector(".catalog-state");
      const shelf = fragment.querySelector(".book-spine-progress");
      const state = getCatalogState(book);
      const progress = getCatalogProgress(book);

      title.textContent = book.title;
      author.textContent = book.author;
      stateBadge.textContent = statusLabels[state];
      renderSpines(shelf, progress, state);
      fragment.querySelector(".catalog-item").addEventListener("click", () => openBookDetails(book));

      section.appendChild(fragment);
    });

    catalogList.appendChild(section);
  });
}

function renderDataVizBooks() {
  const query = dataVizFilter.value.trim().toLowerCase();
  const filter = dataVizStatusFilter.value;
  const collection = dataVizBooks.map(([title, author]) => ({
    title,
    author,
    category: "dataviz",
  }));
  const completedCount = collection.filter((book) => getCatalogState(book) === "finished").length;
  const percent = Math.round((completedCount / collection.length) * 100);

  dataVizPercent.textContent = `${percent}%`;
  renderSpines(dataVizShelfProgress, percent, completedCount > 0 ? "reading" : "planned");

  const filteredBooks = collection.filter((book) => {
    const state = getCatalogState(book);
    const matchesQuery =
      book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
    const matchesState =
      filter === "all" ||
      (filter === "finished" && state === "finished") ||
      (filter === "active" && state === "reading") ||
      (filter === "new" && state === "planned");
    return matchesQuery && matchesState;
  });

  dataVizList.innerHTML = "";

  filteredBooks.forEach((book) => {
    const fragment = catalogItemTemplate.content.cloneNode(true);
    const title = fragment.querySelector(".catalog-title");
    const author = fragment.querySelector(".catalog-author");
    const stateBadge = fragment.querySelector(".catalog-state");
    const shelf = fragment.querySelector(".book-spine-progress");
    const state = getCatalogState(book);
    const progress = getCatalogProgress(book);

    title.textContent = book.title;
    author.textContent = book.author;
    stateBadge.textContent = statusLabels[state];
    renderSpines(shelf, progress, state);
    fragment.querySelector(".catalog-item").addEventListener("click", () => openBookDetails(book));

    dataVizList.appendChild(fragment);
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
  dialogStatusBadge.textContent = statusLabels[status];

  bookDetailsDialog.showModal();
}

function saveDialogStatus() {
  if (!activeDialogBook) {
    return;
  }

  const status = dialogStatus.value;
  const existingBook = getCatalogMatch(activeDialogBook);
  const totalAmount = activeDialogBook.meta.pages;
  const currentAmount =
    status === "finished" ? totalAmount : status === "reading" ? Math.max(1, Math.round(totalAmount * 0.12)) : 0;

  if (existingBook) {
    existingBook.status = status;
    existingBook.totalAmount = existingBook.totalAmount || totalAmount;
    existingBook.currentAmount =
      status === "planned"
        ? 0
        : normalizeCurrentAmount(
            Math.max(existingBook.currentAmount, currentAmount),
            existingBook.totalAmount,
            status
          );
  } else {
    books.unshift({
      id: crypto.randomUUID(),
      title: activeDialogBook.title,
      author: activeDialogBook.author,
      format: "reading",
      unit: "pages",
      totalAmount,
      currentAmount,
      status,
      notes: "",
    });
  }

  persistAndRefresh();
  bookDetailsDialog.close();
}

function renderStats() {
  totalBooks.textContent = String(books.length);
  completedBooks.textContent = String(books.filter((book) => book.status === "finished").length);
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
  formatInput.value = "reading";
  unitInput.value = "pages";
  totalAmountInput.value = "300";
  currentAmountInput.value = "0";
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

function normalizeStatus(status, currentAmount, totalAmount) {
  if (currentAmount >= totalAmount) {
    return "finished";
  }
  if (currentAmount > 0) {
    return "reading";
  }
  return status === "finished" ? "planned" : status;
}

function normalizeCurrentAmount(currentAmount, totalAmount, status) {
  if (status === "finished") {
    return totalAmount;
  }
  if (status === "planned") {
    return 0;
  }
  return Math.min(currentAmount, totalAmount);
}

function getProgress(currentAmount, totalAmount) {
  if (!totalAmount) {
    return 0;
  }
  return Math.round((currentAmount / totalAmount) * 100);
}

function getBookMeta(book) {
  const key = `${book.title}|${book.author}`;
  const known = bookDetails[key];
  const pages = Number(book.unit === "minutes" ? known?.pages || estimatePages(book) : book.totalAmount || known?.pages || estimatePages(book));
  const year = known?.year || estimateYear(book);
  const audio = book.unit === "minutes" ? formatMinutes(book.totalAmount) : estimateAudioTime(pages);

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
    `Формат: ${formatLabels[book.format]}.`,
    `Статус: ${statusLabels[book.status]}.`,
    `Прогресс: ${book.currentAmount} из ${book.totalAmount} ${unitLabels[book.unit]}.`,
  ].join(" ");
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

function getCatalogProgress(book) {
  const match = getCatalogMatch(book);
  return match ? getProgress(match.currentAmount, match.totalAmount) : 0;
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
