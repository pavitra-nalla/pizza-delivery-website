# Pizza Slice 

## Overview
**Pizza Slice** is a premium, full-stack pizza ordering web application. It features a complete custom pizza builder where users can select their base, sauce, cheese, veggies, and meats, beautifully visualized on the frontend. The project seamlessly integrates a secure checkout experience powered by Razorpay.

## Features
- **Custom Pizza Builder**: Build your pizza visually with live price updates and real-time previews.
- **Premium User Interface**: Crafted using React, TailwindCSS, Framer Motion, and shadcn/ui.
- **Razorpay Integration**: Secure, test-mode payment gateway for simulated pizza checkouts.
- **Order Tracking**: Track the status of your orders from kitchen to delivery.
- **Robust Backend**: Node.js and Express API with MongoDB for storing orders, inventory and user data.

## Tech Stack
### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- shadcn/ui (Accessible Components)
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Razorpay API
- dotenv

## Folder Structure
```text
/
├── frontend/             # React/Vite frontend source code
│   ├── src/              # UI components, pages, hooks, contexts
│   ├── public/           # Static assets, favicon
│   ├── index.html        # Entry HTML
│   └── package.json      # Frontend dependencies
├── backend/              # Node.js/Express backend API
│   ├── controllers/      # API route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express API routers
│   ├── config/           # Database connections
│   └── package.json      # Backend dependencies
├── README.md             # Project documentation
└── .gitignore            # Git ignore rules
```

## Installation Steps
Ensure you have Node.js and MongoDB installed on your locally or use a cloud MongoDB cluster.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pizza-slice.git
   cd pizza-slice
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```
   *Note: In `frontend/src/context/AppContext.tsx` or `.env`, ensure the API URL points to the running backend (default: `http://localhost:5000`).*

3. **Backend Setup:**
   ```bash
   cd ../backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory with:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   RAZORPAY_KEY_ID=your_razorpay_test_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
   ```

## How to Run the Project

You need two terminal windows to run both servers.

1. **Run the Backend (Terminal 1):**
   ```bash
   cd backend
   npm run server   # Or `npm start` depending on your package.json
   ```

2. **Run the Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:8080` (or the port Vite provides).

## Future Improvements
- [ ] User authentication and JWT authorization.
- [ ] Admin dashboard for inventory management.
- [ ] Automated testing suite (Jest/Cypress).

