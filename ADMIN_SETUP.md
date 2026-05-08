# Admin Panel Setup Guide

## Overview
This admin panel allows you to manage which services are active or inactive. The contact form will display services with green dots (🟢 active) or red dots (🔴 inactive/wishlist).

## Prerequisites
- Supabase account
- Your project running locally or deployed

## Step-by-Step Setup

### 1. Set Up Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to your project settings
3. Copy your **Project URL** and **Anon Key** from the API section

### 2. Create Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_ADMIN_PASSWORD=your-secret-password
   ```

3. **IMPORTANT**: Never commit `.env` to Git. It's already in `.gitignore`.

### 3. Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `supabase-services-schema.sql`
4. Run the query to create the `services` table and seed the 13 services

Or run it directly:
```bash
psql -h db.XXXX.supabase.co -U postgres < supabase-services-schema.sql
```

### 4. Install Dependencies (if not already done)

```bash
npm install @supabase/supabase-js
```

### 5. Start Development Server

```bash
npm run dev
```

### 6. Access Admin Panel

- Main site: `http://localhost:8080`
- Admin panel: `http://localhost:8080/admin`
- Default password: (from your `.env` VITE_ADMIN_PASSWORD)

## Admin Panel Features

### Dashboard
- **View all services** with active/inactive status
- **Green indicator (🟢)** = Active service
- **Red indicator (🔴)** = Inactive service (wishlist)
- **Active count** = Number of services available in contact form
- **Inactive count** = Number of services in wishlist

### Toggle Service Status

1. Click on a service card
2. Click the **Active** or **Inactive** button
3. Status updates instantly in Supabase
4. Contact form reflects the change in real-time

## Contact Form Integration

The contact form at `/` (home page) automatically displays:
- Only **active** services can be selected
- **Inactive** services appear disabled in the dropdown
- Status indicators (🟢/🔴) show service availability

## Database Schema

### Services Table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### 13 Default Services
1. Full-Stack Web Development
2. E-commerce Setup & Infrastructure
3. Premium Ebooks & Lead Magnets
4. Custom Template Design
5. Visual Content & Motion Graphics
6. Faceless Content Automation
7. Strategic Infographic Design
8. Digital Marketing & Performance
9. Technical Maintenance & Support
10. Social Media Management
11. AI-Powered Workflow Automation
12. Mobile & App Development
13. Elite Merchandise & Custom Branding

## Useful SQL Queries

### Get all services and their status
```sql
SELECT id, slug, title, active, updated_at 
FROM public.services 
ORDER BY active DESC, title;
```

### Get only active services
```sql
SELECT id, slug, title 
FROM public.services 
WHERE active = true 
ORDER BY title;
```

### Toggle a service (example: make Social Media Management inactive)
```sql
UPDATE public.services 
SET active = false, updated_at = now() 
WHERE slug = 'social-media';
```

### Get services updated in the last 24 hours
```sql
SELECT id, title, active, updated_at 
FROM public.services 
WHERE updated_at > now() - interval '1 day'
ORDER BY updated_at DESC;
```

## Troubleshooting

### Admin panel shows "Missing Supabase environment variables"
- Check that `.env` file exists with correct values
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart development server after updating `.env`

### Services table not found in Supabase
- Run the SQL migration from `supabase-services-schema.sql`
- Verify in Supabase SQL Editor that the table exists

### Cannot login to admin panel
- Check your `VITE_ADMIN_PASSWORD` in `.env`
- Ensure you're using the correct password
- Default example password is `admin123` but change it

### Contact form still shows old services
- Clear browser cache and reload
- Verify services are in Supabase database
- Check browser console for errors
- Ensure Supabase is accessible from your network

## Security Notes

🔒 **Important:**
- Change the default admin password immediately
- In production, consider using Supabase Auth instead of simple password
- Don't commit `.env` file (already in `.gitignore`)
- Use environment variables for sensitive data
- Consider using Row Level Security (RLS) on Supabase for production

## Next Steps

### Production Deployment
1. Deploy to Vercel/Netlify/your hosting platform
2. Set environment variables in your hosting platform
3. Ensure Supabase database is accessible
4. Test admin panel on production URL

### Enhanced Security (Optional)
1. Implement Supabase Auth for admin login
2. Use Row Level Security policies
3. Add audit logging for service changes
4. Implement rate limiting on API endpoints

## Support

For issues with:
- **Supabase**: Visit [supabase.com/docs](https://supabase.com/docs)
- **React**: Visit [react.dev](https://react.dev)
- **Your project**: Check console errors and verify environment variables
