import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'; // Use this simplified import for dotenv
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';


// App config
const app = express();
// Use the PORT from the .env file, or default to 3000
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // This must come before your routes to parse JSON bodies
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/images', express.static('uploads'));
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/', (req, res) => {
    res.send('API is Working');
});

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
});
