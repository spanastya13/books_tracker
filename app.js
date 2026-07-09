const STORAGE_KEY = "bookflow-library";
const CATALOG_SIZE = 1000;

const bookForm = document.getElementById("bookForm");
const booksList = document.getElementById("booksList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const totalBooks = document.getElementById("totalBooks");
const completedBooks = document.getElementById("completedBooks");
const activeBooks = document.getElementById("activeBooks");
const bookCardTemplate = document.getElementById("bookCardTemplate");
const catalogSearch = document.getElementById("catalogSearch");
const popularBooksList = document.getElementById("popularBooksList");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const formatInput = document.getElementById("format");
const unitInput = document.getElementById("unit");
const totalAmountInput = document.getElementById("totalAmount");
const currentAmountInput = document.getElementById("currentAmount");
const statusInput = document.getElementById("status");

const statusLabels = {
  planned: "Хочу познакомиться",
  reading: "В процессе",
  finished: "Завершено",
};

const formatLabels = {
  reading: "Текст",
  audio: "Аудио",
  both: "Текст + аудио",
};

const unitLabels = {
  pages: "стр.",
  minutes: "мин.",
};

const curatedBooks = [
  ["1984", "George Orwell"],
  ["Pride and Prejudice", "Jane Austen"],
  ["To Kill a Mockingbird", "Harper Lee"],
  ["The Great Gatsby", "F. Scott Fitzgerald"],
  ["The Hobbit", "J.R.R. Tolkien"],
  ["Harry Potter and the Sorcerer's Stone", "J.K. Rowling"],
  ["The Catcher in the Rye", "J.D. Salinger"],
  ["Brave New World", "Aldous Huxley"],
  ["The Little Prince", "Antoine de Saint-Exupery"],
  ["Crime and Punishment", "Fyodor Dostoevsky"],
  ["The Alchemist", "Paulo Coelho"],
  ["The Book Thief", "Markus Zusak"],
  ["The Kite Runner", "Khaled Hosseini"],
  ["Moby-Dick", "Herman Melville"],
  ["Jane Eyre", "Charlotte Bronte"],
  ["The Lord of the Rings", "J.R.R. Tolkien"],
  ["Animal Farm", "George Orwell"],
  ["Fahrenheit 451", "Ray Bradbury"],
  ["Wuthering Heights", "Emily Bronte"],
  ["The Da Vinci Code", "Dan Brown"],
  ["The Girl with the Dragon Tattoo", "Stieg Larsson"],
  ["Sapiens", "Yuval Noah Harari"],
  ["Atomic Habits", "James Clear"],
  ["The Midnight Library", "Matt Haig"],
  ["Dune", "Frank Herbert"],
  ["The Hunger Games", "Suzanne Collins"],
  ["The Fault in Our Stars", "John Green"],
  ["The Chronicles of Narnia", "C.S. Lewis"],
  ["A Game of Thrones", "George R.R. Martin"],
  ["One Hundred Years of Solitude", "Gabriel Garcia Marquez"],
  ["The Shadow of the Wind", "Carlos Ruiz Zafon"],
  ["The Picture of Dorian Gray", "Oscar Wilde"],
  ["Dracula", "Bram Stoker"],
  ["The Name of the Rose", "Umberto Eco"],
  ["Norwegian Wood", "Haruki Murakami"],
  ["Kafka on the Shore", "Haruki Murakami"],
  ["A Tale of Two Cities", "Charles Dickens"],
  ["The Count of Monte Cristo", "Alexandre Dumas"],
  ["Les Miserables", "Victor Hugo"],
  ["War and Peace", "Leo Tolstoy"],
  ["The Brothers Karamazov", "Fyodor Dostoevsky"],
  ["Anna Karenina", "Leo Tolstoy"],
  ["Frankenstein", "Mary Shelley"],
  ["The Martian", "Andy Weir"],
  ["Project Hail Mary", "Andy Weir"],
  ["Ready Player One", "Ernest Cline"],
  ["Gone Girl", "Gillian Flynn"],
  ["The Handmaid's Tale", "Margaret Atwood"],
  ["The Road", "Cormac McCarthy"],
  ["The Bell Jar", "Sylvia Plath"],
  ["The Secret History", "Donna Tartt"],
  ["Circe", "Madeline Miller"],
  ["The Song of Achilles", "Madeline Miller"],
  ["Normal People", "Sally Rooney"],
  ["Little Women", "Louisa May Alcott"],
  ["The Color Purple", "Alice Walker"],
  ["Beloved", "Toni Morrison"],
  ["The Shining", "Stephen King"],
  ["It", "Stephen King"],
  ["Misery", "Stephen King"],
  ["The Stand", "Stephen King"],
  ["The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid"],
  ["Daisy Jones & The Six", "Taylor Jenkins Reid"],
  ["Verity", "Colleen Hoover"],
  ["It Ends with Us", "Colleen Hoover"],
  ["A Little Life", "Hanya Yanagihara"],
  ["The Silent Patient", "Alex Michaelides"],
  ["The Psychology of Money", "Morgan Housel"],
  ["Thinking, Fast and Slow", "Daniel Kahneman"],
  ["The Power of Habit", "Charles Duhigg"],
  ["Deep Work", "Cal Newport"],
  ["Essentialism", "Greg McKeown"],
  ["Educated", "Tara Westover"],
  ["Becoming", "Michelle Obama"],
  ["Steve Jobs", "Walter Isaacson"],
  ["Outliers", "Malcolm Gladwell"],
  ["The Subtle Art of Not Giving a F*ck", "Mark Manson"],
  ["Quiet", "Susan Cain"],
  ["Start with Why", "Simon Sinek"],
  ["The 7 Habits of Highly Effective People", "Stephen R. Covey"],
  ["Rich Dad Poor Dad", "Robert T. Kiyosaki"],
  ["Meditations", "Marcus Aurelius"],
  ["Man's Search for Meaning", "Viktor E. Frankl"],
  ["The Stranger", "Albert Camus"],
  ["The Trial", "Franz Kafka"],
  ["The Metamorphosis", "Franz Kafka"],
  ["Lolita", "Vladimir Nabokov"],
  ["Lolita", "Vladimir Nabokov"],
  ["The Master and Margarita", "Mikhail Bulgakov"],
  ["Heart of a Dog", "Mikhail Bulgakov"],
  ["We", "Yevgeny Zamyatin"],
  ["Dead Souls", "Nikolai Gogol"],
  ["The Idiot", "Fyodor Dostoevsky"],
  ["Notes from Underground", "Fyodor Dostoevsky"],
  ["Demons", "Fyodor Dostoevsky"],
  ["The Cherry Orchard", "Anton Chekhov"],
  ["Fathers and Sons", "Ivan Turgenev"],
  ["Eugene Onegin", "Alexander Pushkin"],
  ["Doctor Zhivago", "Boris Pasternak"],
  ["Life and Fate", "Vasily Grossman"],
  ["The Gulag Archipelago", "Aleksandr Solzhenitsyn"],
  ["Solaris", "Stanislaw Lem"],
  ["The Name of the Wind", "Patrick Rothfuss"],
  ["Mistborn", "Brandon Sanderson"],
  ["The Final Empire", "Brandon Sanderson"],
  ["The Way of Kings", "Brandon Sanderson"],
  ["The Lies of Locke Lamora", "Scott Lynch"],
  ["American Gods", "Neil Gaiman"],
  ["Neverwhere", "Neil Gaiman"],
  ["Good Omens", "Neil Gaiman and Terry Pratchett"],
  ["Mort", "Terry Pratchett"],
  ["Guards! Guards!", "Terry Pratchett"],
  ["Small Gods", "Terry Pratchett"],
  ["The Ocean at the End of the Lane", "Neil Gaiman"],
  ["The Night Circus", "Erin Morgenstern"],
  ["The Priory of the Orange Tree", "Samantha Shannon"],
  ["Station Eleven", "Emily St. John Mandel"],
  ["Cloud Atlas", "David Mitchell"],
  ["Atonement", "Ian McEwan"],
  ["The Goldfinch", "Donna Tartt"],
  ["Shantaram", "Gregory David Roberts"],
  ["The Help", "Kathryn Stockett"],
  ["The Giver", "Lois Lowry"],
  ["Rebecca", "Daphne du Maurier"],
  ["Perfume", "Patrick Suskind"],
  ["The Unbearable Lightness of Being", "Milan Kundera"],
  ["Love in the Time of Cholera", "Gabriel Garcia Marquez"],
  ["The Old Man and the Sea", "Ernest Hemingway"],
  ["For Whom the Bell Tolls", "Ernest Hemingway"],
  ["The Sun Also Rises", "Ernest Hemingway"],
  ["The Call of the Wild", "Jack London"],
  ["White Fang", "Jack London"],
  ["East of Eden", "John Steinbeck"],
  ["Of Mice and Men", "John Steinbeck"],
  ["The Grapes of Wrath", "John Steinbeck"],
  ["The Time Traveler's Wife", "Audrey Niffenegger"],
  ["Memoirs of a Geisha", "Arthur Golden"],
  ["The Pillars of the Earth", "Ken Follett"],
  ["A Man Called Ove", "Fredrik Backman"],
  ["Anxious People", "Fredrik Backman"],
  ["My Brilliant Friend", "Elena Ferrante"],
  ["The House in the Cerulean Sea", "TJ Klune"],
  ["Pachinko", "Min Jin Lee"],
  ["The Women", "Kristin Hannah"],
  ["The Four Winds", "Kristin Hannah"],
  ["The Nightingale", "Kristin Hannah"],
  ["The Paris Apartment", "Lucy Foley"],
  ["Big Little Lies", "Liane Moriarty"],
  ["Where the Crawdads Sing", "Delia Owens"],
];

const generatedCatalog = buildPopularCatalog();
let books = loadBooks();

fillCatalog();
renderBooks();
renderStats();

catalogSearch.addEventListener("change", applyCatalogSelection);
catalogSearch.addEventListener("input", applyCatalogSelection);
searchInput.addEventListener("input", renderBooks);
statusFilter.addEventListener("change", renderBooks);

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

  if (
    !title ||
    !author ||
    totalAmount < 1 ||
    currentAmount < 0 ||
    currentAmount > totalAmount
  ) {
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
    if (Array.isArray(parsed) && isLegacyDemoData(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    return Array.isArray(parsed)
      ? parsed.map((book) => ({
          id: book.id || crypto.randomUUID(),
          title: book.title || "",
          author: book.author || "",
          format: book.format || "reading",
          unit: book.unit || "pages",
          totalAmount: Number(book.totalAmount || book.pages || 0),
          currentAmount: Number(book.currentAmount || book.currentPage || 0),
          status: book.status || "planned",
          notes: book.notes || "",
        }))
      : [];
  } catch {
    return [];
  }
}

function isLegacyDemoData(data) {
  const legacyTitles = ["Атомные привычки", "1984", "Sapiens"];
  return data.length === 3 && data.every((book) => legacyTitles.includes(book.title));
}

function persistAndRefresh() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  renderBooks();
  renderStats();
}

function renderBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const filter = statusFilter.value;

  const filteredBooks = books.filter((book) => {
    const matchesQuery =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
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
    const progressFill = fragment.querySelector(".progress-fill");
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
    progressFill.style.width = `${progress}%`;
    notes.textContent = book.notes || "Без заметок";
    statusSelect.value = book.status;
    formatSelect.value = book.format;
    unitSelect.value = book.unit;
    amountInput.value = String(book.currentAmount);
    amountInput.max = String(book.totalAmount);

    statusSelect.addEventListener("change", (event) => {
      const nextStatus = event.target.value;
      book.status = normalizeStatus(nextStatus, book.currentAmount, book.totalAmount);
      book.currentAmount = normalizeCurrentAmount(
        book.currentAmount,
        book.totalAmount,
        book.status
      );
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
      const shareText = buildShareText(book);
      try {
        await navigator.clipboard.writeText(shareText);
        shareButton.textContent = "Скопировано";
        window.setTimeout(() => {
          shareButton.textContent = "Поделиться";
        }, 1600);
      } catch {
        window.alert(shareText);
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

function renderStats() {
  totalBooks.textContent = String(books.length);
  completedBooks.textContent = String(
    books.filter((book) => book.status === "finished").length
  );
  activeBooks.textContent = String(
    books.filter((book) => book.status === "reading").length
  );
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

  return Math.min(currentAmount, totalAmount);
}

function getProgress(currentAmount, totalAmount) {
  if (!totalAmount) {
    return 0;
  }

  return Math.round((currentAmount / totalAmount) * 100);
}

function buildShareText(book) {
  return [
    `Я ${shareVerb(book)} "${book.title}" — ${book.author}.`,
    `Статус: ${statusLabels[book.status]}.`,
    `Прогресс: ${book.currentAmount} из ${book.totalAmount} ${unitLabels[book.unit]} (${getProgress(
      book.currentAmount,
      book.totalAmount
    )}%).`,
  ].join(" ");
}

function shareVerb(book) {
  if (book.format === "audio") {
    return book.status === "finished" ? "прослушала" : "слушаю";
  }

  if (book.format === "both") {
    return book.status === "finished" ? "дочитала и дослушала" : "читаю и слушаю";
  }

  return book.status === "finished" ? "прочитала" : "читаю";
}

function buildPopularCatalog() {
  const catalog = [];
  const seen = new Set();
  const suffixes = [
    "Collector's Edition",
    "Essential Edition",
    "Reader's Edition",
    "Anniversary Edition",
    "Modern Edition",
    "Deluxe Edition",
    "Pocket Edition",
    "Library Edition",
    "Classic Edition",
    "Complete Edition",
  ];

  curatedBooks.forEach(([title, author]) => {
    pushUnique(catalog, seen, title, author);
  });

  let index = 0;
  while (catalog.length < CATALOG_SIZE) {
    const [title, author] = curatedBooks[index % curatedBooks.length];
    const suffix = suffixes[Math.floor(index / curatedBooks.length) % suffixes.length];
    pushUnique(catalog, seen, `${title} (${suffix})`, author);
    index += 1;
  }

  return catalog;
}

function pushUnique(catalog, seen, title, author) {
  const key = `${title}|${author}`;
  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  catalog.push({ title, author });
}
