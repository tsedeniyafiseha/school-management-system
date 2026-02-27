# ⚡ Quick Start Guide - EduManage Pro

Get up and running in 5 minutes!

## 🚀 Super Quick Setup

### 1. Install Prerequisites
- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/try/download/community

### 2. Clone & Install
```bash
# Clone repository
git clone <your-repo-url>
cd EduManage-Pro

# Install backend
cd backend
npm install

# Install frontend (new terminal)
cd frontend
npm install
```

### 3. Configure Environment

**Backend** - Create `backend/.env`:
```env
MONGO_URL=mongodb://127.0.0.1:27017/edumanagepro
SECRET_KEY=mysecretkey123
```

**Frontend** - Create `frontend/.env`:
```env
REACT_APP_BASE_URL=http://localhost:5000
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Access Application
Open browser: http://localhost:3000

---

## 🎯 Quick Commands

### Development
```bash
# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm start

# Install new package (backend)
cd backend && npm install package-name

# Install new package (frontend)
cd frontend && npm install package-name
```

### Production Build
```bash
# Build frontend
cd frontend && npm run build

# The build folder is ready to deploy
```

---

## 👤 Default Credentials

### Guest Login
- **Admin**: yogendra@12 / zxc
- **Teacher**: tony@12 / zxc
- **Student**: Roll 1, Name: Dipesh Awasthi / zxc

### Create New Admin
1. Go to homepage
2. Click "Create Account"
3. Fill in details
4. Login with new credentials

---

## 🔧 Common Issues

### "Cannot connect to MongoDB"
```bash
# Start MongoDB
mongod

# Or check if running
mongo
```

### "Port already in use"
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in backend/.env
PORT=5001
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📁 Project Structure

```
EduManage-Pro/
├── backend/          # Node.js + Express API
│   ├── controllers/  # Business logic
│   ├── models/      # Database schemas
│   ├── routes/      # API routes
│   └── index.js     # Entry point
│
└── frontend/        # React application
    ├── src/
    │   ├── pages/   # Page components
    │   ├── components/ # Reusable components
    │   └── redux/   # State management
    └── public/      # Static files
```

---

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/src/index.css`:
```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
}
```

### Change App Name
- `frontend/src/pages/Homepage.js`
- `frontend/public/index.html`

### Add New Page
1. Create file in `frontend/src/pages/`
2. Add route in `frontend/src/App.js`

---

## 📚 Full Documentation

- **Setup Guide**: See SETUP.md
- **Deployment**: See DEPLOYMENT.md
- **Contributing**: See CONTRIBUTING.md
- **Main README**: See README.md

---

## 🆘 Need Help?

1. Check error messages
2. Review documentation
3. Search existing issues
4. Create new issue on GitHub

---

<p align="center">
🎉 You're ready to go! 🎉
</p>
