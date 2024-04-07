import React, { useState } from 'react'
import './OrderHistory.css'

const OrderHistory = () => {
	// Przykładowe dane, które będą później pobierane z API
	const orders = [
		{ id: 1, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 1', 'Item 2'] },
		{ id: 2, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 3, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 4, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 5, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 6, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 7, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 8, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 9, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 10, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 11, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 12, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 13, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		{ id: 14, status: 'xxx', totalCost: 'xxx', purchasedItems: ['Item 3', 'Item 4'] },
		// ... więcej zamówień
	]

	const [visibleOrders, setVisibleOrders] = useState(3)

	const showMoreOrders = () => {
		setVisibleOrders(prevVisibleOrders => prevVisibleOrders + 3) // Pokazuje 3 więcej zamówień
	}

	return (
		<div className='orderHistoryContainer'>
			<h2>Order history</h2>
			{orders.slice(0, visibleOrders).map((order, index) => (
				<div className='orderItem' key={order.id}>
					<div>
						<span className='orderLabel'>Numer zamówienia:</span>
						<span className='orderValue'>{order.id}</span>
					</div>
					<div>
						<span className='orderLabel'>Status zamówienia:</span>
						<span className='orderValue'>{order.status}</span>
					</div>
					<div>
						<span className='orderLabel'>Całkowity koszt:</span>
						<span className='orderValue'>{order.totalCost}</span>
					</div>
					<div>
						<span className='orderLabel'>Lista zakupionych przedmiotów:</span>
						<span className='orderValue'>{order.purchasedItems.join(', ')}</span>
					</div>
				</div>
			))}
			{visibleOrders < orders.length && (
				<button onClick={showMoreOrders} className='showMoreButton'>
					Pokaż więcej
				</button>
			)}
		</div>
	)
}

export default OrderHistory
