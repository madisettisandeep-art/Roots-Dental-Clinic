# Setting Up Free Supabase PostgreSQL for Roots Dental Clinic 🚀

This guide explains how to connect your Roots Dental Clinic application to **Supabase's Free PostgreSQL Database** ($0/month forever).

---

## Step 1: Create a Free Supabase Project (1 Minute)

1. Go to [https://supabase.com](https://supabase.com) and click **Start your project** (Sign up / Log in with GitHub).
2. Click **New Project**.
3. Fill in the project details:
   - **Name**: `roots-dental-clinic`
   - **Database Password**: Set a strong password (save this!).
   - **Region**: Choose the closest region (e.g., `South Asia (Mumbai)` or your preferred region).
   - **Pricing Plan**: **Free Plan** ($0.00 / month).
4. Click **Create new project** and wait ~60 seconds for provisioning to finish.

---

## Step 2: Get Your Supabase Connection Strings

1. In your Supabase dashboard, click the **Settings** (gear icon) in the bottom-left sidebar.
2. Click **Database**.
3. Scroll down to the **Connection string** section.
4. Select the **URI** tab:
   - Choose **Mode: Transaction (Pooler)**: Copy this string. It will look like:
     ```
     postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
     ```
   - Choose **Mode: Session (Direct)**: Copy this string. It will look like:
     ```
     postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres
     ```

---

## Step 3: Configure Your `.env` File

Open your `.env` file in the root of `Roots Dental` and paste your Supabase connection strings (remember to replace `[YOUR-PASSWORD]` with the actual database password you chose):

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"

AUTH_SECRET="roots_dental_jwt_secret_production_2026_super_secure_key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## Step 4: Push the Schema & Seed Initial Clinic Data

Run the following two commands in your terminal:

```bash
# 1. Create all 12 tables and relations in Supabase PostgreSQL
npx prisma db push

# 2. Seed all 10 verified treatments, 4 specialist doctors, reviews, FAQs, and hours
npm run prisma:seed
```

---

## Step 5: Start Your Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Your application is now running live on **Supabase Cloud PostgreSQL**!

You can also view, edit, and query your database tables directly inside the **Supabase Dashboard → Table Editor**.
