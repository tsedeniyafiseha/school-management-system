<h1 align="center">
    🎓 EduManage Pro
</h1>

<h3 align="center">
Modern School Management System<br>
Transform your educational institution with comprehensive management tools
</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Material--UI-5.12-blue?style=for-the-badge&logo=mui" alt="Material-UI" />
</p>

---

## 🌟 About EduManage Pro

EduManage Pro is a comprehensive, modern web-based school management system built with the MERN stack. It provides an intuitive interface for managing all aspects of educational institutions, from student enrollment to performance tracking.

## ✨ Key Features

### 👥 Multi-Role System
- **Admin Dashboard**: Complete control over students, teachers, classes, and subjects
- **Teacher Portal**: Attendance tracking, grade management, and student communication
- **Student Portal**: View grades, attendance, assignments, and communicate with teachers

### 📊 Core Functionality
- **Attendance Management**: Real-time attendance tracking with detailed reports
- **Performance Analytics**: Interactive charts and visualizations for student progress
- **Class Organization**: Efficient class and subject management
- **Communication Hub**: Seamless messaging between all user roles
- **Notice Board**: Announcements and important updates
- **Complaint System**: Structured feedback and issue resolution

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Material-UI components for a polished look
- Interactive data visualizations with Recharts
- Smooth animations and transitions
- Gradient-based modern color scheme

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Material-UI (MUI)** - Component library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Styled Components** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcrypt** - Password hashing

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd EduManage-Pro
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
MONGO_URL=mongodb://127.0.0.1/edumanagepro
SECRET_KEY=your_secret_key_here
```

Start backend server:
```bash
npm start
```
Backend runs on `http://localhost:5000`

3. **Frontend Setup**
```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
REACT_APP_BASE_URL=http://localhost:5000
```

Start frontend:
```bash
npm start
```
Frontend runs on `http://localhost:3000`

---

## 📦 MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Server from [mongodb.com](https://mongodb.com/try/download/community)
2. Install MongoDB Compass from [mongodb.com/compass](https://mongodb.com/try/download/compass)
3. Start MongoDB service:
```bash
mongod
```
4. Connect via Compass: `mongodb://127.0.0.1:27017/edumanagepro`

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Get connection string: `Database → Connect → Connect your application`
4. Use the connection string in your `.env` file

---

## 🌐 Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (MONGO_URL, SECRET_KEY)

### Frontend Deployment (Netlify/Vercel)

**Netlify:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add environment variable: `REACT_APP_BASE_URL=<your-backend-url>`

**Vercel:**
- Same configuration as Netlify
- Auto-deploys on push

---

## 📱 Features Breakdown

### Admin Features
- Add/Edit/Delete students, teachers, classes, and subjects
- View all system data and analytics
- Manage user accounts and permissions
- Post notices and announcements
- View and respond to complaints

### Teacher Features
- Take and manage attendance
- Grade assignments and exams
- View class and student details
- Communicate with students
- Submit complaints or feedback

### Student Features
- View personal dashboard with stats
- Check attendance records
- View grades and performance charts
- Access subject materials
- Submit complaints or queries

---

## 🎨 Customization

The project uses a modern gradient-based color scheme:
- Primary: Blue (#2563eb)
- Secondary: Purple (#7c3aed)
- Success: Green (#10b981)
- Danger: Red (#ef4444)

You can customize colors in:
- `frontend/src/index.css` - CSS variables
- `frontend/src/components/buttonStyles.js` - Button styles
- Component-level styled components

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please open an issue in the repository.

---

<p align="center">Made with ❤️ using MERN Stack</p>
