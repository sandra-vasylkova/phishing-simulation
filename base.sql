create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  password text not null,
  created_at timestamptz not null default now()
);