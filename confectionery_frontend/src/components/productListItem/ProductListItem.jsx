import React from 'react'
import { Link } from 'react-router-dom';
import './ProductListItem.css'

const ProductListItem = ({ id, name, price, imageUrl, category }) => {


  return (
    <Link to={`/product/${id}`} className="productListItem">
      <div>
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
        <p>{category}</p> 
        <p>{price} zł</p>
      </div>
    </Link>
  )
}

export default ProductListItem
