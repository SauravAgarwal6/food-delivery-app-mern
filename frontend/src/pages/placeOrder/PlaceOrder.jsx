// frontend/src/pages/placeOrder/PlaceOrder.jsx

import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    // Get necessary data and functions from context
    const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
    const navigate = useNavigate();

    // State to hold the delivery information from the form
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    // Function to update state when user types in the form
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    // Main function to handle the entire order and payment process
    const placeOrderHandler = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        // First, check if the Razorpay script has loaded and is ready
        if (!window.Razorpay) {
            alert("Payment gateway is not loaded. Please wait a moment and try again.");
            return; // Stop the function if Razorpay isn't available
        }

        // Format the cart items into the structure the backend needs
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItem[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItem[item._id] };
                orderItems.push(itemInfo);
            }
        });

        // Prepare the complete order data object
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2, // Assuming a $2 delivery fee
        };

        try {
            // 1. Call your backend to create a Razorpay order
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            
            if (response.data.success) {
                const { order } = response.data;

                // 2. Configure the options for the Razorpay payment modal
                const options = {
                    key: "rzp_test_RCnqt3shXsRE9a", // <-- YOUR TEST KEY ID IS HERE
                    amount: order.amount,
                    currency: order.currency,
                    name: "Tomato Food Delivery",
                    description: "Order Transaction",
                    order_id: order.id,
                    
                    // 3. Define the function that runs after payment is complete
                    handler: async function (response) {
                        const verificationData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        };

                        // 4. Call your backend to verify the payment signature
                        const verifyResponse = await axios.post(url + "/api/order/verify", verificationData);

                        if (verifyResponse.data.success) {
                            navigate("/myorders"); // Redirect to the "My Orders" page on success
                        } else {
                            alert("Payment Verification Failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        contact: data.phone
                    },
                    theme: {
                        color: "#ea580c" // Use a color that matches your brand
                    }
                };

                // 5. Create a new Razorpay instance and open the payment modal
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } else {
                alert("Error: " + (response.data.message || "Could not place order."));
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("A server error occurred. Please try again later.");
        }
    };

    // const navigate = useNavigate();
    useEffect(() =>{
        if(!token){
            navigate('/cart')
        }else if(getTotalCartAmount() === 0){
            navigate('/cart');
        }
    },[token]);

    return (
        <form onSubmit={placeOrderHandler} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-field">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-field">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-field">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₹{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;