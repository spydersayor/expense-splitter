# Vercel Deployment Script

## Quick Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Go to:** https://vercel.com/new
2. **Sign in** with GitHub
3. **Import repository:** `spydersayor/expense-splitter`
4. **Configure project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. **Add Environment Variable:**
   - **Name:** `VITE_BASE_URL`
   - **Value:** `https://expense-splitter-backend.railway.app` (or your backend URL)
6. **Click "Deploy"**

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod

# Set environment variable
vercel env add VITE_BASE_URL
# Enter: https://expense-splitter-backend.railway.app
```

### Method 3: One-Click Deploy

Click this button to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/spydersayor/expense-splitter&root-directory=frontend)

## After Deployment

Your app will be available at:
- **Frontend:** `https://expense-splitter.vercel.app`
- **Backend:** Deploy to Railway next

## Next Steps

1. Deploy backend to Railway
2. Update VITE_BASE_URL in Vercel
3. Test the full application
