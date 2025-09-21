import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar.jsx'
// import { Routes, Route } from 'react-router-dom'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Cart from './pages/cart/Cart.jsx'
import PlaceOrder from './pages/placeOrder/PlaceOrder.jsx'
import Footer from './components/footer/Footer.jsx'
import LoginPopUp from './components/loginPopUp/LoginPopUp.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const App = () => {
  const[showLogin,setShowLogin] = useState(false);
  return (
     <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}

    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/cart' element = {<Cart/>}/>
        <Route path='/order' element = {<PlaceOrder/>}/>
        <Route path='/myorders' element ={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App