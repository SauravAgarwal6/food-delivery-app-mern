import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../foodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list, searchQuery } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list
                    .filter(item => {
                        const categoryMatch = category === "All" || category === item.category;
                        const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
                        return categoryMatch && searchMatch;
                    })
                    .map((item, index) => {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay;