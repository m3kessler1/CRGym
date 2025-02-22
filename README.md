# Gym Management Full Stack (MERN) 🏋️‍♂️

## 📌 Project Description

This is a **Node.js + TypeScript** backend for a Gym Management system. It provides secure authentication using **JWT (RSA Encryption)**, user registration, login, and session management. The API follows **RESTful principles** and integrates with **MongoDB** for data storage.

This project also includes a **frontend built with Vite + React.js**, featuring:
- **Login, Signup, Update Profile Pages**
- **Home Page**
- **Workouts Page**
- **Book a Coach Page**
- **Workout Coach Dashboard**

---

## ✨ Features

- 📝 **User Registration & Login** with **bcrypt password hashing**
- 🔐 **JWT Authentication (RSA Encryption) & Middleware for Protected Routes**
- 📦 **MongoDB Integration** using **Mongoose**
- 📂 **Structured Codebase** with MVC Architecture
- ✅ **CORS Configuration** for Secure API Requests
- 🎨 **Frontend Built with Vite + React.js**

---

## 🛠️ Tech Stack

### **Backend**
- **Node.js** (Express.js)
- **TypeScript**
- **MongoDB** (Mongoose ODM)
- **JWT Authentication** (RSA Encryption)
- **bcrypt.js** (Password Hashing)
- **Axios** (Frontend API Calls)
- **CORS** (Cross-Origin Resource Sharing)

### **Frontend**
- **Vite + React.js**
- **React Router** (Navigation)
- **Material UI** (Styling)
- **Axios** (API Requests)

---

## 📂 Folder Structure (Roughly)
```
📦 gym-management-backend
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 db.ts  # Database connection
 ┃ ┣ 📂 controllers
 ┃ ┃ ┗ 📜 userController.ts  # Business logic
 ┃ ┣ 📂 models
 ┃ ┃ ┗ 📜 User.ts  # Mongoose schema
 ┃ ┣ 📂 routes
 ┃ ┃ ┗ 📜 userRoutes.ts  # API routes
 ┃ ┣ 📂 middleware
 ┃ ┃ ┗ 📜 authMiddleware.ts  # JWT authentication middleware
 ┃ ┣ 📂 types
 ┃ ┃ ┗ 📜 custom.d.ts  # Extend Express Request type
 ┃ ┣ 📜 server.ts  # Entry point
 ┣ 📂 keys  # RSA Keys for JWT
 ┃ ┣ 📜 private.pem
 ┃ ┣ 📜 public.pem
 ┣ 📂 frontend  # Frontend Vite Project
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📜 App.tsx  # Main component
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┣ 📜 Login.tsx
 ┃ ┃ ┃ ┣ 📜 Register.tsx
 ┃ ┃ ┃ ┣ 📜 Workouts.tsx
 ┃ ┃ ┃ ┣ 📜 BookCoach.tsx
 ┃ ┃ ┗ 📜 index.tsx  # React Entry Point
 ┣ 📜 .env  # Environment variables
 ┣ 📜 package.json  # Dependencies
 ┣ 📜 tsconfig.json  # TypeScript config
 ┣ 📜 README.md  # Project documentation
```

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/adityasinghz/gym-management.git
cd gym-management
```

### **2️⃣ Install Backend Dependencies**
```sh
cd gym-management-be
npm install
```

### **3️⃣ Install Frontend Dependencies**
```sh
cd gym-management-fe
npm install
```

### **4️⃣ Set Up Environment Variables**
Create a **.env** file in the root directory and add:
```sh
PORT=4000
MONGO_URI=mongodb://localhost:27017/gymDB
REACT_APP_USER_URL=http://localhost:4000/api
```

### **5️⃣ Generate RSA Keys for JWT Authentication**
```sh
openssl genpkey -algorithm RSA -out keys/private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in keys/private.pem -out keys/public.pem
```

### **6️⃣ Start the Backend Server**
```sh
cd gym-management-fe
npm start  # Uses ts-node for development
```

### **7️⃣ Start the Frontend Server**
```sh
cd gym-management-fe
npm run dev  # Starts Vite development server
```

---

## 🎯 Future Enhancements

- ✅ **Refresh Token Implementation**
- ✅ **User Roles (Admin, Trainer, Member)**
- ✅ **Email Verification (Nodemailer)**
- ✅ **Google OAuth Login**
- ✅ **Workout & Subscription Management**
- ✅ **Interactive Workout Tracking**
- ✅ **Enhanced Booking System for Coaches**

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

🔗 **GitHub:** [adityasinghz](https://github.com/adityasinghz)\
📧 **Email:** [adityasingh246810@gmail.com](adityasingh246810@gmail.com)

