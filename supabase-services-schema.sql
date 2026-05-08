-- Supabase table schema for service management
-- Run in the SQL editor inside Supabase or via psql

-- Enable UUID generation if not already enabled
create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add an index for quick active-service queries
create index if not exists services_active_idx on public.services(active);

-- Seed the 13 services with the exact titles used in the contact form
insert into public.services (slug, title, description, active)
values
  ('full-stack', 'Full-Stack Web Development', 'High-performance, responsive, and dynamic websites designed for modern business goals.', true),
  ('ecommerce', 'E-commerce Setup & Infrastructure', 'Expert store configuration and optimization across global marketplaces.', true),
  ('ebooks', 'Premium Ebooks & Lead Magnets', 'High-value digital assets designed to build authority and capture leads.', true),
  ('templates', 'Custom Template Design', 'Tailor-made, fully editable templates crafted from scratch based on your unique vision.', true),
  ('motion-graphics', 'Visual Content & Motion Graphics', 'High-impact visuals designed to stop the scroll and drive engagement.', true),
  ('faceless', 'Faceless Content Automation', 'End-to-end video creation services for creators who scale without appearing on camera.', true),
  ('infographic', 'Strategic Infographic Design', 'Data-driven and visually compelling infographics to simplify complex information.', true),
  ('marketing', 'Digital Marketing & Performance', 'Comprehensive growth strategies across all major digital ecosystems.', true),
  ('maintenance', 'Technical Maintenance & Support', 'Ongoing technical management to keep your website and applications secure and active.', true),
  ('social-media', 'Social Media Management', 'Complete management of social profiles, engagement, and community growth.', true),
  ('ai-automation', 'AI-Powered Workflow Automation', 'Streamlining business operations through intelligent automation and AI integration.', true),
  ('mobile-apps', 'Mobile & App Development', 'High-performance mobile and web applications built from the ground up.', true),
  ('merch-branding', 'Elite Merchandise & Custom Branding', 'Premium apparel and custom promotional merchandise for physical brand presence.', true)
on conflict (slug) do nothing;

-- Admin queries
-- List all services and status
select id, slug, title, active, created_at, updated_at from public.services order by active desc, title;

-- List only active services for the public contact form
select id, slug, title from public.services where active = true order by title;

-- Toggle status for a service (set active or inactive)
update public.services set active = false, updated_at = now() where slug = 'social-media';
update public.services set active = true, updated_at = now() where slug = 'social-media';
