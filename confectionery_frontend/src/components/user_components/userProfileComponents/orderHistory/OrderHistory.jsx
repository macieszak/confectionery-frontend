import React, { useState, useEffect } from 'react'
import './OrderHistory.css'
import { useAuth } from '../../../../context/AuthContext'
import axios from '../../../../configuration/axiosConfig'
import { format } from 'date-fns'

const OrderHistory = () => {
	const [orders, setOrders] = useState([])
	const [visibleOrders, setVisibleOrders] = useState(3)
	const [loading, setLoading] = useState(true)
	const { user } = useAuth()

	useEffect(() => {
		if (user) {
			setLoading(true)
			axios
				.get(`/orders/user/${user.id}`)
				.then(response => {
					setOrders(response.data)
					setLoading(false)
				})
				.catch(error => {
					console.error('Failed to fetch orders', error)
					setLoading(false)
				})
		}
	}, [user])

	const showMoreOrders = () => {
		setVisibleOrders(prevVisibleOrders => prevVisibleOrders + 3)
	}

	if (!user) {
		return <div>Please log in to view your order history.</div>
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className='orderHistoryContainer'>
			<h2>Order History</h2>
			{orders.slice(0, visibleOrders).map(order => (
				<div className='orderItem' key={order.orderId}>
					<div>
						<span className='orderLabel'>Order Status:</span>
						<span className='orderValue'>{order.status}</span>
					</div>
					<div>
						<span className='orderLabel'>Total Cost:</span>
						<span className='orderValue'>{order.totalPrice.toFixed(2)}</span>
					</div>
					<div>
						<span className='orderLabel'>Purchased Items:</span>
						<span className='orderValue'>{order.products.map(product => product.name).join(', ')}</span>
					</div>
					<div>
						<span className='orderLabel'>Order Date:</span>
						<span className='orderValue'>{format(new Date(order.orderDate), 'yyyy-MM-dd HH:mm')}</span>
					</div>
				</div>
			))}
			{visibleOrders < orders.length && (
				<button onClick={showMoreOrders} className='showMoreButton'>
					Show More
				</button>
			)}
		</div>
	)
}

export default OrderHistory
