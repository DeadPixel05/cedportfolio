# Supabase Setup

The admin editor uses Supabase email/password authentication and one shared Postgres portfolio document. Keep public signup disabled; only the provisioned owner should be able to save changes.

## Configure the project

1. Create a Supabase project and add the values from the root `.env.example` to local `.env.local` and the Vercel project environment. Set `NEXT_PUBLIC_SITE_URL` to the canonical site origin.
2. In Supabase Authentication, disable new-user signups and create the administrator account. Copy its user UUID.
3. Apply `migrations/20260930000000_create_portfolio_documents.sql` using the Supabase SQL editor or Supabase CLI.
4. Register the owner by replacing the UUID below with the administrator's user UUID:

   ```sql
   insert into private.portfolio_admins (user_id)
   values ('00000000-0000-0000-0000-000000000000');
   ```

5. Set `SUPABASE_OWNER_ID` to that same UUID locally and in Vercel. It must match the row in `private.portfolio_admins`.
6. In Supabase Auth URL configuration, set the site URL and allow the recovery callback for local development and the production domain, including `/auth/callback`. Configure email delivery and the password recovery template to use this callback URL.
7. Sign in at `/login`. The site serves the bundled starter portfolio until the first successful save creates the shared row. Subsequent saves update the portfolio for every visitor.

Only the Supabase project URL and publishable key are used by the app. Do not place a service-role key in the browser or the Vercel app environment.
