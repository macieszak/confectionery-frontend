import React from 'react';
import './CartItem.css';

const CartItem = ({ item, decrementQuantity, incrementQuantity, removeItem }) => {
  return (
    <div className='cart-item'>
      <div className='cart-item-image'>
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className='cart-item-info'>
        <p>{item.name}</p>
        <div className='cart-item-quantity'>
          <button onClick={() => decrementQuantity(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => incrementQuantity(item.id)}>+</button>
        </div>
        <p>${item.price}</p>
        <button className='cart-item-remove' onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
