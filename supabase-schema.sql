create table if not exists public.user_books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  author text not null,
  format text not null default 'reading'
    check (format in ('reading', 'audio', 'both')),
  unit text not null default 'pages'
    check (unit in ('pages', 'minutes')),
  total_amount integer not null
    check (total_amount > 0),
  current_amount integer not null default 0
    check (current_amount >= 0 and current_amount <= total_amount),
  status text not null default 'planned'
    check (status in ('planned', 'reading', 'finished')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_books_user_id_idx
  on public.user_books (user_id);

alter table public.user_books enable row level security;

revoke all on public.user_books from anon;
grant select, insert, update, delete on public.user_books to authenticated;

drop policy if exists "Users read own books" on public.user_books;
create policy "Users read own books"
  on public.user_books
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users add own books" on public.user_books;
create policy "Users add own books"
  on public.user_books
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own books" on public.user_books;
create policy "Users update own books"
  on public.user_books
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete own books" on public.user_books;
create policy "Users delete own books"
  on public.user_books
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
