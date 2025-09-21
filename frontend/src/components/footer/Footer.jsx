import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-container'>
        <div className='footer-left'>
          <img src={assets.logo} alt="Logo" />
          <p>
            Delicious meals delivered with love. Explore our diverse menu and
            order your favorite dishes with ease.
          </p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
            <img src={assets.twitter_icon} alt="Twitter" />
          </div>
        </div>

        <div className='footer-center'>
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-right'>
          <h3>Get In Touch</h3>
          <ul>
            <li>+91-7388991122</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copy'>&copy; 2025 Saurav.com — All Rights Reserved</p>
    </footer>
  )
}

export default Footer