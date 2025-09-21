import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    // Link to the user who placed the order
    userId: {
        type: String,
        required: true
    },
    // Array of items in the order
    items: {
        type: Array,
        required: true
    },
    // Total cost of the order
    amount: {
        type: Number,
        required: true
    },
    // Delivery address for the order
    address: {
        type: Object,
        required: true
    },
    // Current status of the order
    status: {
        type: String,
        default: "Food Processing" // Default status when an order is created
    },
    // Date the order was placed
    date: {
        type: Date,
        default: Date.now() // Automatically sets the current date
    },
    // Payment status
    payment: {
        type: Boolean,
        default: false // Defaults to false, can be updated upon successful payment
    }
});

// Create the model from the schema
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;  