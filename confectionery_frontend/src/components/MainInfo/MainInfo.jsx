import React from 'react'
import './MainInfo.css'
import croissant from '../../assets/croissant.jpg'
import { Link } from 'react-router-dom'
import cake from '../../assets/cake.png'
import cookies from '../../assets/cookies.png'


const MainInfo = ({ setMenu }) => {
  
  return (
    <div className='main-info'>
      
      <div className="main-info-left">
        <h1>The best </h1>
        <h1>confectionery shop </h1>
        <h1>in Poland</h1>
        <p>We don’t compromise on the taste and quality of our products for our customers.</p>
        <p>All our products are made by very experienced chefs, and the item are freshly cooked.</p>
        <Link to='/products'><button className='main-info-left-button' onClick={() => setMenu('product')} >CHECK THE OFFER</button></Link>
      </div>

      <div className="main-info-right">
        <img src={cookies} alt="croissant-image" />
      </div>
     
    </div>
  )
}

export default MainInfo
