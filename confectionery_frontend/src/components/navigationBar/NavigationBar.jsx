import React, { useState } from 'react'
import './NavigationBar.css'
import logo from '../../assets/logo.png'
import cart_logo from '../../assets/cart.png'
import user_logo from '../../assets/user.svg'

const NavigationBar = () => {

    const [menu, setMenu] =  useState("home");

  return (
    <div className='navigationBar'>
        <div className="nav-logo">
            <img src={logo} alt="website logo" width={100} height={100}/>
        </div>
    <ul className='nav-menu'>
        <li onClick={() => {setMenu("home")}}>HOME {menu == "home" ? <hr /> :<></>} </li>
        <li onClick={() => {setMenu("about us")}}>ABOUT US {menu == "about us" ? <hr /> :<></>}</li>
        <li onClick={() => {setMenu("product")}}>PRODUCT {menu == "product" ? <hr /> :<></>}</li>
        <li onClick={() => {setMenu("contact")}}>CONTACT {menu == "contact" ? <hr /> :<></>}</li>
    </ul>
    <div className='nav-login-cart'>
        <button>LOGIN</button>
        <img src={user_logo} alt="user logo" />
        <img src={cart_logo} alt="cart logo"/>
        <div className="nav-cart-count">0</div>
        <select name="language" id="language">
            <option value="EN">EN</option>
            <option value="PL">PL</option>
        </select>
    </div>

    </div>
  )
}

export default NavigationBar
