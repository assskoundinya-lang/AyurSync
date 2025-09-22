-- Users Table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  email text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Patients Table
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  date_of_birth date,
  gender text,
  occupation text,
  weight numeric,
  height numeric,
  email text,
  phone_number text,
  dosha_assessment jsonb,  -- stores vata-pitta-kapha balance details
  health_diet jsonb,       -- stores health & diet questionnaire responses
  created_at timestamp with time zone default now()
);

-- Diet Plans Table
create table if not exists diet_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  plan jsonb not null, -- generated AI 7-day diet plan
  created_at timestamp with time zone default now()
);
