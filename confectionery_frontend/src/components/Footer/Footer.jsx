import React from 'react'
import './Footer.css'
import logo from '../../assets/logo2.png'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={logo} alt="logo icon" />
        </div>
        <div className='footer-opening-hours'>
            <h1>Opening time:</h1>
            <p>Monday - Sunday: 8:00 AM - 16:00 PM</p>
        </div>
        <div className='footer-social-media'>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <div className='footer-instagram'>
                <FaInstagram/>
            </div>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <div className='footer-facebook'>
                <FaFacebook/>
            </div>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <div className='footer-twitter'>
                <FaTwitter/>
            </div>
        </a>
        </div>

    </div>
  )
}

export default Footer
