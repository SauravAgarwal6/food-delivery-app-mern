import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './TrackOrderPage.css';
import { assets } from '../../assets/assets';

const TrackOrderPage = () => {
    const { orderId } = useParams();
    const { url, token } = useContext(StoreContext);
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrderDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/api/order/track/${orderId}`, { headers: { token } });
            if (response.data.success) {
                setOrderData(response.data.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrderDetails();
        }
    }, [token, orderId]);

    if (isLoading) {
        return <div className="track-order-container"><div className="loader"></div></div>;
    }

    if (!orderData) {
        return <div className="track-order-container"><p>Order not found.</p></div>;
    }

    // Determine which statuses are completed
    const statusMap = { "Food Processing": 1, "Out for delivery": 2, "Delivered": 3 };
    const currentStatusLevel = statusMap[orderData.status] || 0;

    return (
        <div className='track-order-container'>
            <h2>Track Your Order</h2>
            <div className="order-summary">
                <p>Order ID: <span>#{orderData._id}</span></p>
                <p>Status: <b>{orderData.status}</b></p>
            </div>
            
            <div className="timeline">
                <div className={`timeline-step ${currentStatusLevel >= 1 ? 'completed' : ''}`}>
                    <div className="timeline-icon"><img src={assets.order_placed_icon} alt=""/></div>
                    <p>Order Placed</p>
                </div>
                <div className="timeline-line"></div>
                <div className={`timeline-step ${currentStatusLevel >= 2 ? 'completed' : ''}`}>
                    <div className="timeline-icon"><img src={assets.out_for_delivery_icon} alt=""/></div>
                    <p>Out for Delivery</p>
                </div>
                <div className="timeline-line"></div>
                <div className={`timeline-step ${currentStatusLevel >= 3 ? 'completed' : ''}`}>
                    <div className="timeline-icon"><img src={assets.delivered_icon} alt=""/></div>
                    <p>Delivered</p>
                </div>
            </div>

            <div className="order-details-grid">
                <div className="order-items-details">
                    <h3>Items Ordered</h3>
                    {orderData.items.map((item, index) => (
                        <p key={index}>{item.name} x {item.quantity}</p>
                    ))}
                </div>
                <div className="shipping-address-details">
                    <h3>Shipping Address</h3>
                    <p>{orderData.address.firstName} {orderData.address.lastName}</p>
                    <p>{orderData.address.street}</p>
                    <p>{orderData.address.city}, {orderData.address.state} {orderData.address.zipcode}</p>
                    <p>{orderData.address.country}</p>
                    <p>Phone: {orderData.address.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default TrackOrderPage;