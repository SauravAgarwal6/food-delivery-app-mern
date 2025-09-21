import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder,verifyPayment,userOrders, listOrders, updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyPayment); // Add this new route for payment verification
orderRouter.post("/myorders", authMiddleware, userOrders); // Make sure this exists
orderRouter.get("/list",listOrders);
orderRouter.post("/status", updateStatus);
// orderRouter.get("/track/:orderId", authMiddleware, trackUserOrder);
export default orderRouter;