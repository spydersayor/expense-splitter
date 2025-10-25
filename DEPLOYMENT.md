# 🚀 Deployment Guide - Expense Splitter

This guide will help you deploy your Expense Splitter application to production.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway account (free)
- Git installed locally

## 🔧 Step-by-Step Deployment

### 1. Create GitHub Repository

**Option A: Using GitHub Web Interface**
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `expense-splitter`
5. Make it public
6. Don't initialize with README (we already have one)
7. Click "Create repository"

**Option B: Using Command Line**
```bash
# Install GitHub CLI first: https://cli.github.com/
gh auth login
gh repo create expense-splitter --public --source=. --remote=origin --push
```

### 2. Push Your Code to GitHub

```bash
cd C:\Users\Spyder\Desktop\expense-splitter
git remote add origin https://github.com/YOUR_USERNAME/expense-splitter.git
git branch -M main
git push -u origin main
```

### 3. Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"**
3. **Import your repository** `expense-splitter`
4. **Configure the project:**
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Set Environment Variables:**
   - `VITE_BASE_URL` → `https://your-backend-url.railway.app` (we'll get this in step 4)
6. **Click "Deploy"**

### 4. Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)** and sign in with GitHub
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your `expense-splitter` repository**
5. **Configure the service:**
   - Root Directory: `backend`
   - Build Command: `./mvnw package -DskipTests`
   - Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`
6. **Add PostgreSQL Database:**
   - Click "New" → "Database" → "PostgreSQL"
7. **Set Environment Variables:**
   - `DATABASE_URL` → (auto-generated from PostgreSQL service)
   - `JWT_SECRET` → Generate a random string (use online generator)
   - `JWT_EXPIRATION` → `86400000`
   - `CORS_ORIGINS` → `https://your-frontend-url.vercel.app`
8. **Deploy**

### 5. Update Frontend Environment

1. **Go back to Vercel**
2. **Update Environment Variables:**
   - `VITE_BASE_URL` → Your Railway backend URL
3. **Redeploy** the frontend

### 6. Configure GitHub Actions (Optional)

The repository already includes GitHub Actions workflow for automated deployment.

**Set up secrets in GitHub:**
1. Go to your repository → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VERCEL_TOKEN` → Get from Vercel dashboard
   - `VERCEL_ORG_ID` → Get from Vercel dashboard
   - `VERCEL_PROJECT_ID` → Get from Vercel dashboard
   - `RAILWAY_TOKEN` → Get from Railway dashboard

## 🔗 Quick Links

After deployment, your app will be available at:

- **Frontend:** `https://expense-splitter.vercel.app`
- **Backend:** `https://expense-splitter-backend.railway.app`
- **Database:** Managed by Railway

## 🧪 Testing Your Deployment

1. **Test Frontend:**
   - Visit your Vercel URL
   - Try registering a new user
   - Try logging in

2. **Test Backend:**
   - Visit `https://your-backend-url.railway.app/actuator/health`
   - Should return `{"status":"UP"}`

3. **Test Database:**
   - Create a group in the frontend
   - Add an expense
   - Check if data persists

## 🛠️ Local Development

For local development, use the single-command setup:

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

## 🔧 Troubleshooting

### Common Issues

**Frontend not connecting to backend:**
- Check `VITE_BASE_URL` in Vercel environment variables
- Ensure CORS is configured correctly in backend

**Backend not starting:**
- Check Railway logs
- Verify environment variables are set
- Ensure database connection string is correct

**Database connection issues:**
- Check if PostgreSQL service is running in Railway
- Verify `DATABASE_URL` environment variable

### Getting Help

- Check the logs in Vercel and Railway dashboards
- Review the GitHub Actions workflow logs
- Check the application logs: `docker-compose logs -f`

## 📊 Monitoring

- **Vercel:** Monitor frontend performance and deployments
- **Railway:** Monitor backend performance and database usage
- **GitHub Actions:** Monitor CI/CD pipeline

## 🔄 Updates

To update your deployed application:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. Vercel and Railway will automatically redeploy

## 💰 Cost

- **Vercel:** Free tier includes 100GB bandwidth/month
- **Railway:** Free tier includes $5 credit/month
- **GitHub:** Free for public repositories

## 🎉 Success!

Your Expense Splitter application is now live and accessible worldwide!

**Next Steps:**
- Share your app with friends and family
- Monitor usage and performance
- Add new features
- Scale as needed

---

Need help? Check the main README.md or create an issue in the GitHub repository.
