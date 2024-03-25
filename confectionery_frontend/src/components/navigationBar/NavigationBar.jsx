import React, { useState } from 'react'
import './NavigationBar.css'
import logo from '../../assets/logo.png'
import cart_logo from '../../assets/cart.png'
import user_logo from '../../assets/user.svg'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const NavigationBar = () => {

    const [menu, setMenu] =  useState("home");

  return (
    <div className='navigationBar'>

        <div className="nav-logo">
            <img src={logo} alt="website logo" width={100} height={100}/>
        </div>

        <ul className='nav-menu'>
            <li onClick={() => {setMenu("home")}}><Link style= {{textDecoration:'none'}} to='/'>Home</Link> {menu == "home" ? <hr /> :<></>} </li>

            <li onClick={() => {setMenu("about us")}}><Link style= {{textDecoration:'none'}} to='/aboutus'>About us</Link>{menu == "about us" ? <hr /> :<></>}</li>

            <li onClick={() => {setMenu("product")}}><Link style= {{textDecoration:'none'}} to='/products'>Product</Link> {menu == "product" ? <hr /> :<></>}</li>

            <li onClick={() => {setMenu("contact")}}><Link style= {{textDecoration:'none'}} to='/contacts'>Contact</Link> {menu == "contact" ? <hr /> :<></>}</li>
        </ul>

        <div className='nav-login-cart'>
            <Link to='/login'><button>Login</button></Link>
            {/* <Link to='/user'><img src={user_logo} alt="user logo"/></Link> */}
            
            <Link to='/user'> <FaRegUser className='user-icon'></FaRegUser> </Link>
           
            {/* <Link to='/cart'><img src={cart_logo} alt="cart logo" className='cart-icon'/></Link> */}
            <Link to='/cart'> <FaShoppingCart className='cart-icon'/> </Link>
        
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
