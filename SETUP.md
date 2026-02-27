# 🛠️ Setup Guide - EduManage Pro

Complete setup instructions for local development.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Choose one:
  - Local installation - [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up](https://www.mongodb.com/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation

```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
git --version   # Should show git version
```

---

## 📥 Step 1: Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to project directory
cd EduManage-Pro
```

---

## 🗄️ Step 2: MongoDB Setup

### Option A: Local MongoDB

#### Windows:
1. Download MongoDB Community Server
2. Run installer (use default settings)
3. MongoDB runs as a service automatically
4. Download MongoDB Compass for GUI

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Verify MongoDB is Running:
```bash
# Try connecting
mongosh
# or
mongo
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create a new cluster (M0 Free)
4. Add database user (Database Access)
5. Whitelist IP: 0.0.0.0/0 (Network Access)
6. Get connection string (Connect → Connect your application)

---

## 🔧 Step 3: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install
```

### Create Environment File

Create a file named `.env` in the `backend` folder:

```env
# For Local MongoDB
MONGO_URL=mongodb://127.0.0.1:27017/edumanagepro

# For MongoDB Atlas
# MONGO_URL=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/edumanagepro?retryWrites=true&w=majority

# Secret key for JWT (change this!)
SECRET_KEY=your_super_secret_key_change_this

# Port (optional)
PORT=5000
```

### Start Backend Server

```bash
npm start
```

You should see:
```
Server is running on port 5000
Connected to MongoDB
```

If you see errors, check the Troubleshooting section below.

---

## 🎨 Step 4: Frontend Setup

Open a new terminal (keep backend running):

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

### Create Environment File

Create a file named `.env` in the `frontend` folder:

```env
REACT_APP_BASE_URL=http://localhost:5000
```

### Start Frontend Server

```bash
npm start
```

The app should automatically open in your browser at `http://localhost:3000`

---

## 🎯 Step 5: Initial Setup

### Create Admin Account

1. Open browser to `http://localhost:3000`
2. Click "Create Account" or "Sign up"
3. Fill in admin details:
   - Admin Name: Your Name
   - School Name: Your School
   - Email: your@email.com
   - Password: (choose a strong password)
4. Click "Register"

### Login as Admin

1. Use the credentials you just created
2. You'll be redirected to the Admin Dashboard

### Add Sample Data (Optional)

As admin, you can:
1. Add Classes (e.g., "Class 10A", "Class 9B")
2. Add Subjects (e.g., "Mathematics", "Science")
3. Add Teachers
4. Add Students

---

## 🧪 Step 6: Test the Application

### Test Guest Login

1. Logout from admin
2. Go to homepage
3. Click "Explore as Guest"
4. Choose a role (Admin/Teacher/Student)

Default guest credentials are in the code:
- **Admin**: yogendra@12 / zxc
- **Teacher**: tony@12 / zxc
- **Student**: Roll 1, Name: Dipesh Awasthi / zxc

### Test Features

- ✅ Create classes and subjects
- ✅ Add students and teachers
- ✅ Take attendance
- ✅ Add marks
- ✅ View dashboards
- ✅ Post notices
- ✅ Submit complaints

---

## 📁 Project Structure

```
EduManage-Pro/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── .env             # Environment variables
│   ├── index.js         # Server entry point
│   └── package.json     # Backend dependencies
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── assets/      # Images, icons
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   ├── App.js       # Main app component
│   │   └── index.js     # Entry point
│   ├── .env             # Environment variables
│   └── package.json     # Frontend dependencies
│
├── README.md            # Project overview
├── SETUP.md            # This file
└── DEPLOYMENT.md       # Deployment guide
```

---

## 🐛 Troubleshooting

### Backend Issues

#### "Cannot connect to MongoDB"

**Local MongoDB:**
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS
brew services list

# Linux
sudo systemctl status mongodb
```

**MongoDB Atlas:**
- Check connection string format
- Verify username/password
- Ensure IP whitelist includes 0.0.0.0/0

#### "Port 5000 already in use"

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change port in `.env`:
```env
PORT=5001
```

#### "Module not found"

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

#### "Cannot connect to backend"

1. Verify backend is running on port 5000
2. Check `.env` has correct URL:
   ```env
   REACT_APP_BASE_URL=http://localhost:5000
   ```
3. Restart frontend after changing `.env`

#### "Module not found" or Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Port 3000 already in use

The terminal will ask if you want to use another port. Type `Y` and press Enter.

### Database Issues

#### "Authentication failed"

- Check MongoDB username/password
- Verify user has correct permissions
- For Atlas: ensure user is created in Database Access

#### "Database not found"

MongoDB creates databases automatically. Just ensure:
- Connection string has database name
- User has write permissions

### Common Errors

#### CORS Errors

If you see CORS errors in browser console:
1. Check backend is running
2. Verify frontend `.env` has correct backend URL
3. Backend should have CORS enabled (already configured)

#### "Network Error"

- Backend not running
- Wrong backend URL in frontend `.env`
- Firewall blocking connection

---

## 🔄 Development Workflow

### Making Changes

1. **Backend changes:**
   - Edit files in `backend/`
   - Server auto-restarts (nodemon)
   - Check terminal for errors

2. **Frontend changes:**
   - Edit files in `frontend/src/`
   - Browser auto-refreshes
   - Check browser console for errors

### Git Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

---

## 🎨 Customization

### Change Colors

Edit `frontend/src/index.css`:
```css
:root {
  --color-primary: #2563eb;    /* Change primary color */
  --color-secondary: #7c3aed;  /* Change secondary color */
}
```

### Change App Name

1. `frontend/src/pages/Homepage.js` - Update title
2. `frontend/public/index.html` - Update `<title>`
3. `package.json` files - Update name field

### Add New Features

1. Backend: Add routes in `backend/routes/`
2. Frontend: Add pages in `frontend/src/pages/`
3. Connect with Redux for state management

---

## 📚 Useful Commands

### Backend
```bash
npm start          # Start server
npm install        # Install dependencies
npm install <pkg>  # Add new package
```

### Frontend
```bash
npm start          # Start dev server
npm run build      # Create production build
npm test           # Run tests
npm install <pkg>  # Add new package
```

### MongoDB
```bash
mongosh                    # Connect to MongoDB
show dbs                   # List databases
use edumanagepro          # Switch to database
show collections          # List collections
db.users.find()           # Query users
```

---

## 🔐 Security Notes

### Development
- Default credentials are for testing only
- Change SECRET_KEY in production
- Don't commit `.env` files to Git

### Production
- Use strong passwords
- Enable HTTPS
- Use environment variables
- Regular backups
- Update dependencies

---

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [Material-UI Components](https://mui.com/)

---

## 🆘 Getting Help

If you're stuck:

1. Check error messages carefully
2. Review this guide
3. Check browser console (F12)
4. Check terminal output
5. Search error on Google/Stack Overflow
6. Check GitHub issues

---

## ✅ Checklist

Before starting development:

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Environment files created
- [ ] Backend running successfully
- [ ] Frontend running successfully
- [ ] Can access app in browser
- [ ] Admin account created
- [ ] Sample data added

---

<p align="center">🎉 You're all set! Happy coding! 🎉</p>
