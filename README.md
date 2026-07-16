# BookFlow

Небольшой трекер книг на чистом HTML, CSS и JavaScript.

## Что умеет

- стартовать с пустой полки
- добавлять книги вручную или выбирать из встроенного каталога на 1000 позиций
- отмечать формат: текст, аудио или текст плюс аудио
- вести прогресс в страницах или минутах
- менять статус и быстро копировать текст для шеринга
- входить по email без пароля
- синхронизировать личную полку через Supabase
- использовать `localStorage` как резервный локальный кэш

## Как открыть локально

Интерфейс можно посмотреть, просто открыв `index.html` в браузере. Вход по
email работает на опубликованной странице GitHub Pages.

## Как включить Supabase

Проект уже подключен к Supabase через публичный `Publishable key`. Устанавливать
`npm`-пакеты не нужно.

1. Открой нужный проект в Supabase.
2. Перейди в `SQL Editor`.
3. Нажми `New query`.
4. Вставь содержимое файла `supabase-schema.sql`.
5. Нажми `Run`.

Запрос создаст таблицу `user_books`, включит RLS и разрешит каждому
авторизованному пользователю работать только со своей полкой.

Затем открой `Authentication` -> `URL Configuration` и укажи:

```text
Site URL:
https://spanastya13.github.io/books_tracker/

Redirect URLs:
https://spanastya13.github.io/books_tracker/
```

После публикации обновленных файлов нажми `Войти`, введи email и открой ссылку
из письма. Книги из старого `localStorage` перенесутся в Supabase при первом
входе.

## Как выложить на GitHub

Если через сайт GitHub:

1. Открой репозиторий.
2. Нажми `Add file` -> `Upload files`.
3. Перетащи файлы проекта.
4. Нажми `Commit changes`.

Если через git и token:

```bash
git init
git add .
git commit -m "Add reading tracker"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

При `git push` GitHub попросит не пароль, а token.
