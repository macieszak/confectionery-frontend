import React, { useState, useEffect } from 'react'
import axios from '../../configuration/axiosConfig'
import '../CSS/AdminOrders.css'

const AdminOrders = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const changeOrderStatus = (orderId, newStatus) => {
		axios
			.post(`/admin/orders/${orderId}/status`, { newStatus: newStatus })
			.then(response => {
				const updatedOrders = orders.map(order => {
					if (order.orderId === orderId) {
						return { ...order, status: response.data.status }
					}
					return order
				})
				setOrders(updatedOrders)
			})
			.catch(error => {
				console.error('Error updating order status:', error)
			})
	}

	useEffect(() => {
		axios
			.get('/admin/orders/all')
			.then(response => {
				setOrders(response.data)
				setLoading(false)
			})
			.catch(error => {
				console.error('Error fetching orders:', error)
				setError('Failed to fetch orders')
				setLoading(false)
			})
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>

	return (
		<div className='admin-users-orders'>
			<h2>All Orders</h2>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>User Name</th>
						<th>Email</th>
						<th>Date</th>
						<th>Total</th>
						<th className='status-column'>Status</th>
						<th className='action-column'>Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => (
						<tr key={order.orderId}>
							<td>{order.orderId}</td>
							<td>{order.firstName + ' ' + order.lastName}</td>
							<td>{order.email}</td>
							<td>{new Date(order.orderDate).toLocaleString()}</td>
							<td>{order.totalAmount} zł</td>
							<td>{order.status}</td>
							<td>
								<select value={order.status} onChange={e => changeOrderStatus(order.orderId, e.target.value)}>
									<option value='PENDING'>PENDING</option>
									<option value='COMPLETED'>COMPLETED</option>
									<option value='CANCELLED'>CANCELLED</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminOrders
