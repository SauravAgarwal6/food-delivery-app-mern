import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 1. Add loading state

    const fetchOrders = async () => {
        setIsLoading(true); // 2. Set loading to true
        try {
            const response = await axios.post(url + "/api/order/myorders", {}, { headers: { token } });
            const sortedData = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setData(sortedData);
        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Could not fetch your orders.");
        } finally {
            setIsLoading(false); // 3. Set loading back to false
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={order._id || index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <p>
                            {order.items.map((item, itemIndex) => (
                                itemIndex === order.items.length - 1
                                    ? `${item.name} x ${item.quantity}`
                                    : `${item.name} x ${item.quantity}, `
                            ))}
                        </p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p>
                            <span className="order-status">&#x25cf;</span>
                            <b> {order.status}</b>
                        </p>
                        {/* 4. Update the button's text and disabled state */}
                        <button onClick={fetchOrders} disabled={isLoading}>
                            {isLoading ? 'Refreshing...' : 'Track Order'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;