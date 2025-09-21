import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import MyOrders from '../../pages/MyOrders/MyOrders.jsx';
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { setSearchQuery,getTotalCartAmount,token,setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.clear('token');
    setToken("");
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt="logo" className='logo' />
      </Link>
      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
        </li>
      </ul>
      <div className="right-side">
        <div className="search-container">
          <img 
            src={assets.search_icon} 
            alt="search" 
            onClick={() => setIsSearchVisible(!isSearchVisible)} 
          />
          <input
            type="text"
            className={isSearchVisible ? "search-input active" : "search-input"}
            placeholder="Search for food..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='navbar-cart-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>

        {!token?<button onClick={() => setShowLogin(true)}>sign in</button>
        : <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="profile" />
          <ul className='nav-profile-dropdown'>
            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="bag" />Orders</li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="logout" />LogOut</li>

          </ul>

        </div>
        }
        
      </div>
    </div>
  );
}

export default Navbar;