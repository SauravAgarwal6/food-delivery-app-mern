import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ## Placing User Order 
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();
        
        // We have REMOVED the "clear cart" logic from here.

        const options = {
            amount: req.body.amount * 100, // Amount in paise
            currency: "INR",
            receipt: newOrder._id.toString(),
        };

        const order = await razorpay.orders.create(options);
        
        res.json({ success: true, order });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
}

// ## Verifying Payment
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    try {
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            const orderDetails = await razorpay.orders.fetch(razorpay_order_id);
            const dbOrderId = orderDetails.receipt; 

            // Find our order and update payment status
            const order = await orderModel.findByIdAndUpdate(dbOrderId, { payment: true });

            // --- THIS IS THE NEW LOCATION FOR THE "CLEAR CART" LOGIC ---
            // Now that payment is confirmed, we can clear the user's cart.
            await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
            // --------------------------------------------------------

            res.json({ success: true, message: "Payment Verified" });
        } else {
            res.status(400).json({ success: false, message: "Payment Verification Failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ## Fetching User's Orders
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders}) 
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//listing orders  for admin  panel
const listOrders  = async(req,res) => { 
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// const trackUserOrder = async (req, res) => {
//     try {
//         const order = await orderModel.findById(req.params.orderId);
//         // Ensure the order belongs to the user making the request
//         if (order && order.userId.toString() === req.body.userId) {
//             res.json({ success: true, data: order });
//         } else {
//             res.status(404).json({ success: false, message: "Order not found or access denied" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };

export { placeOrder, verifyPayment, userOrders,listOrders,updateStatus };