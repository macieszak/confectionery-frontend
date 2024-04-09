import React from 'react'
import './SummaryCartItem.css'

const SummaryCartItem = ({ item }) => {
	return (
		<div className='cart-item'>
			<div className='cart-item-image'>
				<img src={item.imageUrl} alt={item.name} />
			</div>
			<div className='cart-item-info'>
				<p>{item.name}</p>
				<div className='cart-item-quantity'>
					<span>{item.quantity}</span>
				</div>
				<p>${item.price}</p>
			</div>
		</div>
	)
}

export default SummaryCartItem
