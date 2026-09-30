create schema if not exists private;

create table if not exists private.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table private.portfolio_admins enable row level security;
revoke all on schema private from public, anon, authenticated;
revoke all on private.portfolio_admins from public, anon, authenticated;

create or replace function public.is_portfolio_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from private.portfolio_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_owner() from public, anon;
grant execute on function public.is_portfolio_owner() to authenticated;

create table if not exists public.portfolio_documents (
  id text primary key check (id = 'main'),
  owner_id uuid not null references auth.users (id) on delete restrict,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_documents enable row level security;

grant select on public.portfolio_documents to anon, authenticated;
grant insert, update on public.portfolio_documents to authenticated;

create policy "Portfolio is publicly readable"
  on public.portfolio_documents
  for select
  to anon, authenticated
  using (true);

create policy "Owner can insert portfolio"
  on public.portfolio_documents
  for insert
  to authenticated
  with check (owner_id = (select auth.uid()) and (select public.is_portfolio_owner()));

create policy "Owner can update portfolio"
  on public.portfolio_documents
  for update
  to authenticated
  using (owner_id = (select auth.uid()) and (select public.is_portfolio_owner()))
  with check (owner_id = (select auth.uid()) and (select public.is_portfolio_owner()));