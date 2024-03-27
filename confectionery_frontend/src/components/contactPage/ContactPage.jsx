import React from 'react'
import './ContactPage.css'
import cake_contact_image from '../../assets/cake_contact.png'

const ContactPage = () => {
  return (
    <div className='contact-page-main'>
        <h1 className='contacts'>Contacts</h1>
        <div className='contact-page'>
            <div className='text-part'>
                <p className='text-headers'>Phone:</p>
                <p className="text">000-000-000</p>
                <p className='text-headers'>Opening time:</p>
                <p className="text">Monday - Sunday: 8:00 AM - 16:00 PM </p>
                <p className='text-headers'>Location:</p>
                <p className="text">XYZ</p>
            </div>
            <div className='image-part'>
                <img src={cake_contact_image} alt="pie_image"/>
            </div>
        </div>

        <div className='newsletter'>
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated!</p>
            <div>
                <input type="email" placeholder='Your Email id' />
                <button>Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default ContactPage
