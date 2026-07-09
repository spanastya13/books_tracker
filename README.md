# BookFlow

Небольшой трекер чтения книг на чистом HTML, CSS и JavaScript.

## Что умеет

- добавлять книги с автором, количеством страниц и заметками
- менять статус: хочу прочитать, читаю, прочитано
- обновлять текущую страницу и видеть прогресс
- фильтровать и искать по библиотеке
- сохранять данные в `localStorage`

## Как открыть локально

Можно просто открыть `index.html` в браузере или запустить локальный сервер:

```bash
python3 -m http.server 4173
```

После этого открой `http://localhost:4173`.

## Как выложить на GitHub

```bash
git init
git add .
git commit -m "Add reading tracker"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

## Как включить GitHub Pages

1. Открой репозиторий на GitHub.
2. Перейди в `Settings` -> `Pages`.
3. В `Build and deployment` выбери `Deploy from a branch`.
4. Укажи ветку `main` и папку `/root`.
5. Сохрани настройки и дождись ссылки на сайт.
