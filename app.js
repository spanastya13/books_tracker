const STORAGE_KEY = "bookflow-library";

const bookForm = document.getElementById("bookForm");
const booksList = document.getElementById("booksList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const totalBooks = document.getElementById("totalBooks");
const completedBooks = document.getElementById("completedBooks");
const pagesInProgress = document.getElementById("pagesInProgress");
const bookCardTemplate = document.getElementById("bookCardTemplate");

const statusLabels = {
  planned: "Хочу прочитать",
  reading: "Читаю",
  finished: "Прочитано",
};

let books = loadBooks();

renderBooks();
renderStats();

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookForm);
  const title = formData.get("title").toString().trim();
  const author = formData.get("author").toString().trim();
  const pages = Number(formData.get("pages"));
  const currentPage = Number(formData.get("currentPage"));
  const status = formData.get("status").toString();
  const notes = formData.get("notes").toString().trim();

  if (!title || !author || pages < 1 || currentPage < 0 || currentPage > pages) {
    window.alert("Проверь данные: страницы и текущий прогресс должны быть корректными.");
    return;
  }

  books.unshift({
    id: crypto.randomUUID(),
    title,
    author,
    pages,
    currentPage: normalizeCurrentPage(currentPage, pages, status),
    status: normalizeStatus(status, currentPage, pages),
    notes,
  });

  persistAndRefresh();
  bookForm.reset();
  document.getElementById("currentPage").value = "0";
  document.getElementById("status").value = "planned";
});

searchInput.addEventListener("input", renderBooks);
statusFilter.addEventListener("change", renderBooks);

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedBooks();
  } catch {
    return seedBooks();
  }
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
    const card = fragment.querySelector(".book-card");
    const badge = fragment.querySelector(".status-badge");
    const title = fragment.querySelector(".book-title");
    const author = fragment.querySelector(".book-author");
    const progressLabel = fragment.querySelector(".progress-label");
    const progressPercent = fragment.querySelector(".progress-percent");
    const progressFill = fragment.querySelector(".progress-fill");
    const notes = fragment.querySelector(".book-notes");
    const statusSelect = fragment.querySelector(".card-status");
    const pageInput = fragment.querySelector(".card-page");
    const deleteButton = fragment.querySelector(".delete-button");

    const progress = getProgress(book.currentPage, book.pages);

    badge.textContent = statusLabels[book.status];
    title.textContent = book.title;
    author.textContent = book.author;
    progressLabel.textContent = `${book.currentPage} из ${book.pages} стр.`;
    progressPercent.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;
    notes.textContent = book.notes || "Без заметок";
    statusSelect.value = book.status;
    pageInput.value = String(book.currentPage);
    pageInput.max = String(book.pages);

    card.dataset.id = book.id;

    statusSelect.addEventListener("change", (event) => {
      const nextStatus = event.target.value;
      book.status = normalizeStatus(nextStatus, book.currentPage, book.pages);
      book.currentPage = normalizeCurrentPage(book.currentPage, book.pages, book.status);
      persistAndRefresh();
    });

    pageInput.addEventListener("change", (event) => {
      const nextPage = Number(event.target.value);

      if (Number.isNaN(nextPage) || nextPage < 0 || nextPage > book.pages) {
        event.target.value = String(book.currentPage);
        return;
      }

      book.currentPage = nextPage;
      book.status = normalizeStatus(book.status, nextPage, book.pages);
      persistAndRefresh();
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
  pagesInProgress.textContent = String(
    books
      .filter((book) => book.status === "reading")
      .reduce((sum, book) => sum + book.currentPage, 0)
  );
}

function normalizeStatus(status, currentPage, pages) {
  if (currentPage >= pages) {
    return "finished";
  }

  if (currentPage > 0) {
    return "reading";
  }

  return status === "finished" ? "planned" : status;
}

function normalizeCurrentPage(currentPage, pages, status) {
  if (status === "finished") {
    return pages;
  }

  return Math.min(currentPage, pages);
}

function getProgress(currentPage, pages) {
  return Math.round((currentPage / pages) * 100);
}

function seedBooks() {
  return [
    {
      id: crypto.randomUUID(),
      title: "Атомные привычки",
      author: "Джеймс Клир",
      pages: 320,
      currentPage: 320,
      status: "finished",
      notes: "Полезно перечитать главы про системы и маленькие шаги.",
    },
    {
      id: crypto.randomUUID(),
      title: "1984",
      author: "Джордж Оруэлл",
      pages: 328,
      currentPage: 146,
      status: "reading",
      notes: "Остановилась на части про Министерство правды.",
    },
    {
      id: crypto.randomUUID(),
      title: "Sapiens",
      author: "Юваль Ной Харари",
      pages: 512,
      currentPage: 0,
      status: "planned",
      notes: "",
    },
  ];
}
