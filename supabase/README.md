# Supabase Database Setup

## Running Migrations

### Option 1: Via Supabase Dashboard (Recommended for first time)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open `migrations/001_admin_system.sql`
4. **IMPORTANT**: Replace `{{ADMIN_EMAIL}}` with your actual admin email address
5. Run the SQL

### Option 2: Via Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Admin Email Configuration

Before running the migration, edit `001_admin_system.sql` and replace:

```sql
admin_email TEXT := '{{ADMIN_EMAIL}}';
```

With your actual admin email:

```sql
admin_email TEXT := 'your-email@example.com';
```

This email will automatically be granted admin privileges when signing up.

## Tables Created

- **profiles**: Extended user data with admin status
- **site_settings**: Key-value store for site configuration

## Functions Created

- `is_admin(user_id)`: Check if a user is an admin
- `get_admin_stats()`: Get dashboard statistics
- `get_signup_analytics(days)`: Get signup data for charts
