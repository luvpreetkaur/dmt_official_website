# DMT website

Next.js site (public pages + `/admin` panel) backed by Supabase (database, login, file storage). Hosted on Vercel.

## Run it locally (works without any setup, shows demo content)

    npm install
    npm run dev

Open http://localhost:3000

## Go live: 4 steps

### 1. Supabase (free)
1. Create a project at supabase.com.
2. SQL Editor -> New query -> paste everything from `supabase/schema.sql` -> Run.
3. Authentication -> Users -> Add user -> enter your admin email + password (tick "Auto confirm").
4. Authentication -> Sign In / Providers -> turn OFF "Allow new users to sign up". This makes sure only people you add can edit the site.
5. Project Settings -> API: copy the Project URL and the anon public key.

### 2. Put the code on GitHub
Create a repo and push this folder.

### 3. Vercel (free)
1. vercel.com -> Add New Project -> import the repo.
2. Add environment variables (same as `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy.

### 4. Connect divyahmomentsoftrance.com
Vercel project -> Settings -> Domains -> add `divyahmomentsoftrance.com` and `www.divyahmomentsoftrance.com`. Vercel shows the exact DNS records to add at your domain registrar (usually an A record for the root and a CNAME for www).

## Using the admin
Go to `/admin` and log in. Tabs: Homepage, Events, Lineup, Gallery, About, Links. Changes show on the public site within about 30 seconds.

- Event dates are always entered in India time (IST), wherever you are.
- An event moves to "Past events" automatically 12 hours after it starts.
- Each event can have its own ticket link; events without one use the default link in the Links tab.
- Uploads go to Supabase storage (free tier: 1 GB total, 50 MB per file). For long videos, paste a YouTube link instead.
