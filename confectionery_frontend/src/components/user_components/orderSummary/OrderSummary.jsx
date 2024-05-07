import React from 'react'
import './OrderSummary.css'

const OrderSummary = ({ subtotal, delivery, total, onNextStep }) => {
	return (
		<div className='order-summary-container'>
			<h2>Order summary</h2>
			<div className='order-summary-item'>
				<span>Subtotal</span>
				<span>{subtotal.toFixed(2)}</span>
			</div>
			<div className='order-summary-item'>
				<span>Delivery</span>
				<span>{delivery.toFixed(2)}</span>
			</div>
			<hr />
			<div className='order-summary-total'>
				<strong>Total</strong>
				<strong>{total.toFixed(2)}</strong>
			</div>
			<button className='next-step-button' onClick={onNextStep}>
				Next step
			</button>
		</div>
	)
}

export default OrderSummary
