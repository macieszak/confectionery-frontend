import React from 'react'
import './AboutUsPage.css'
import background_img from '../../../assets/aboutus-background.jpg'
import { FaTruck } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaCakeCandles } from "react-icons/fa6";

const AboutUsPage = () => {
  return (
    <div className='about-us-main'>
      
      <div className='about-us-img'>
        <img src={background_img} alt="photo of cookies on the table" />
      </div>
      
      <div className='about-us-info'>
        <h1>About Us</h1>
        <p>Welcome to Sweet Bakery, where every bite tells a story of tradition, passion, and the finest ingredients. Established in the heart of the city, our bakery has been serving up delectable treats made from family recipes passed down through generations since 1985. Our commitment to quality and craftsmanship shines through in every pastry, cake, and cookie we create, making life's moments even sweeter. Join us on a journey of flavor that celebrates the joy of baking and the community we've built around it.</p>
      </div>

      <div className='about-us-info2'>
        <h1>Why Trust Us</h1>
      </div>

      <div className='all-values'>

          <div className='specific-value'>
            <FaTruck className='icon'/>
            <p>Fast delivery</p>
          </div>
          
          <div className='specific-value'>
            <FaHeart className='icon'/>
            <p>Made with love</p>
          </div>
          
          <div className='specific-value'>
            <FaShieldAlt className='icon'/>
            <p>Safe payment</p>
          </div>
          
          <div className='specific-value'>
            <FaCakeCandles className='icon'/>
            <p>Fresh and yummy</p>
          </div>
       
        </div>

      </div>
  )
}

export default AboutUsPage
