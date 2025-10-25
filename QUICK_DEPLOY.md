# 🚀 Quick Deployment Commands

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `expense-splitter`
3. Make it **Public**
4. Don't initialize with README (we already have one)
5. Click "Create repository"

## Step 2: Push Your Code

Run these commands in your terminal:

```bash
cd "C:\Users\Spyder\Desktop\expense-splitter"
git remote add origin https://github.com/YOUR_USERNAME/expense-splitter.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com/new
2. Import your `expense-splitter` repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - **Name:** `VITE_BASE_URL`
   - **Value:** `https://your-backend-url.railway.app` (we'll get this next)
5. Click "Deploy"

## Step 4: Deploy Backend to Railway

1. Go to https://railway.app/new
2. Select "Deploy from GitHub repo"
3. Choose your `expense-splitter` repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `./mvnw package -DskipTests`
   - **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`
5. Add PostgreSQL Database:
   - Click "New" → "Database" → "PostgreSQL"
6. Set Environment Variables:
   - `DATABASE_URL` → (auto-generated)
   - `JWT_SECRET` → `ThisIsA256BitSecretKey_ChangeThisToYourOwnRandomLongKey123456`
   - `JWT_EXPIRATION` → `86400000`
   - `CORS_ORIGINS` → `https://your-frontend-url.vercel.app`
7. Deploy

## Step 5: Update Frontend Environment

1. Go back to Vercel dashboard
2. Update `VITE_BASE_URL` with your Railway backend URL
3. Redeploy

## Your App Will Be Live At:
- Frontend: `https://expense-splitter.vercel.app`
- Backend: `https://expense-splitter-backend.railway.app`
