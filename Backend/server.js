import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// App config
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// --- CORS Configuration ---
// Define the URLs that are allowed to access your backend
const allowedOrigins = [
  "http://localhost:5173", // Your local admin panel for development
  // "https://your-deployed-frontend-url.com" // IMPORTANT: Add your deployed frontend URL here later
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// Use the new CORS configuration
app.use(cors(corsOptions));
// --- End of CORS Configuration ---


// DB Connection
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/images', express.static('uploads'));
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('API is Working');
});

app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
});