# 🚀 Deployment Guide - EduManage Pro

This guide will walk you through deploying EduManage Pro to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB database set up (Atlas recommended for production)
- [ ] Environment variables configured
- [ ] Code pushed to GitHub repository
- [ ] Backend tested locally
- [ ] Frontend tested locally

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient for testing)

### Step 2: Configure Database Access
1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Create username and password (save these!)
4. Set privileges to **Read and write to any database**

### Step 3: Configure Network Access
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Confirm

### Step 4: Get Connection String
1. Go to **Database** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `edumanagepro`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edumanagepro?retryWrites=true&w=majority
```

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend
1. Ensure your code is pushed to GitHub
2. Make sure `package.json` has correct start script:
```json
"scripts": {
  "start": "nodemon index.js",
  "build": "npm i"
}
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 3: Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Select the repository

### Step 4: Configure Service
- **Name**: `edumanage-pro-backend` (or your choice)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### Step 5: Add Environment Variables
Click **Advanced** → **Add Environment Variable**

Add these variables:
```
MONGO_URL = your_mongodb_atlas_connection_string
SECRET_KEY = your_random_secret_key_here
```

For SECRET_KEY, generate a random string (at least 32 characters).

### Step 6: Deploy
1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://edumanage-pro-backend.onrender.com`)

### Important Notes:
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading for production use

---

## 🎨 Frontend Deployment (Netlify)

### Step 1: Prepare Frontend
1. Update `.env` with your backend URL:
```env
REACT_APP_BASE_URL=https://your-backend-url.onrender.com
```

2. Test build locally:
```bash
cd frontend
npm run build
```

### Step 2: Create Netlify Account
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up with GitHub

### Step 3: Deploy Site
1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

### Step 4: Add Environment Variables
1. Go to **Site settings** → **Environment variables**
2. Add variable:
```
REACT_APP_BASE_URL = https://your-backend-url.onrender.com
```

### Step 5: Deploy
1. Click **Deploy site**
2. Wait for deployment (2-5 minutes)
3. Your site is live!

### Custom Domain (Optional)
1. Go to **Domain settings**
2. Click **Add custom domain**
3. Follow instructions to configure DNS

---

## 🔄 Alternative: Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project
1. Click **Add New** → **Project**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Add Environment Variable
```
REACT_APP_BASE_URL = https://your-backend-url.onrender.com
```

### Step 4: Deploy
Click **Deploy** and wait for completion.

---

## 🧪 Testing Deployment

### Test Backend
```bash
curl https://your-backend-url.onrender.com
```

### Test Frontend
1. Open your frontend URL in browser
2. Try logging in as guest
3. Check all features work
4. Open browser console for errors

---

## 🔒 Security Checklist

- [ ] Changed default SECRET_KEY
- [ ] MongoDB user has strong password
- [ ] Environment variables not committed to Git
- [ ] CORS configured properly in backend
- [ ] HTTPS enabled (automatic on Render/Netlify)

---

## 📊 Monitoring

### Render Dashboard
- View logs: **Logs** tab in your service
- Monitor usage: **Metrics** tab
- Check status: Service status indicator

### Netlify Dashboard
- View deployments: **Deploys** tab
- Check analytics: **Analytics** tab
- View logs: **Functions** → **Logs**

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Service won't start
- Check logs in Render dashboard
- Verify environment variables are set
- Ensure MongoDB connection string is correct

**Problem**: Database connection fails
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user credentials
- Ensure connection string format is correct

### Frontend Issues

**Problem**: Can't connect to backend
- Verify REACT_APP_BASE_URL is correct
- Check backend is running
- Look for CORS errors in browser console

**Problem**: Build fails
- Check build logs in Netlify/Vercel
- Verify all dependencies are in package.json
- Test build locally first

### Common Errors

**"Network Error"**
- Backend is sleeping (wait 60 seconds)
- Backend URL is wrong
- CORS not configured

**"Cannot connect to database"**
- MongoDB Atlas IP whitelist
- Wrong connection string
- Database user permissions

---

## 🔄 Continuous Deployment

Both Render and Netlify support automatic deployments:

1. Push changes to GitHub
2. Services automatically detect changes
3. New version deploys automatically
4. No manual intervention needed

To disable auto-deploy:
- **Render**: Service Settings → Auto-Deploy
- **Netlify**: Site Settings → Build & Deploy → Stop auto publishing

---

## 💰 Cost Considerations

### Free Tier Limits

**Render Free Tier:**
- 750 hours/month
- Sleeps after 15 min inactivity
- 512 MB RAM
- Shared CPU

**Netlify Free Tier:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared RAM
- No backup

### When to Upgrade

Consider paid plans when:
- Users complain about slow first load
- Need 24/7 uptime
- Require more storage/bandwidth
- Need better performance

---

## 📞 Support

If you encounter issues:
1. Check service status pages
2. Review documentation
3. Check community forums
4. Contact support (paid plans)

---

## ✅ Post-Deployment

After successful deployment:
1. Test all features thoroughly
2. Set up monitoring/alerts
3. Document your deployment URLs
4. Share with users
5. Monitor performance

---

<p align="center">🎉 Congratulations! Your app is now live! 🎉</p>
