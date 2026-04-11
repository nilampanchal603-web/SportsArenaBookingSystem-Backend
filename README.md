# 📦 SportsArena Backend

Scalable MERN backend for SportsArena – a comprehensive sports facility and coaching management platform.

## 🚀 Features

- User Authentication (Register/Login) & Role Management
- JWT-based Authorization
- Arena & Facility Management APIs
- Session & Booking Management APIs
- Coach Earnings Tracking
- Razorpay Payment Integration
- Feedback & Ratings APIs
- Email Notifications
- Admin / Arena Manager APIs

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Razorpay API
- Nodemailer (Emails)

## 📁 Project Structure

```text
src/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── templates/
 └── utils/
```

## ⚙️ Environment Variables

Create a `.env` file in root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## ▶️ Run Locally

```bash
npm install
npm start
```

## 🌐 API Base URL

```text
http://localhost:5000/api
```

## 📌 Notes

- Do not commit `.env` file
- Use MongoDB Atlas for production
- Ensure Razorpay keys and Email credentials are correct

## 👨‍💻 Author

SportsArena Project