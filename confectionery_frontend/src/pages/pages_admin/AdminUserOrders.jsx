import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../configuration/axiosConfig'
import '../CSS/AdminUserOrders.css'

const AdminUserOrders = () => {
	const { userId } = useParams()
	const [orders, setOrders] = useState([])

	const changeOrderStatus = (orderId, newStatus) => {
		axios
			.put(`/admin/orders/${orderId}/status`, { newStatus: newStatus })
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
			.get(`/admin/users/${userId}/orders`)
			.then(response => {
				setOrders(response.data)
			})
			.catch(error => {
				console.error('Error fetching orders:', error)
			})
	}, [userId])

	return (
		<div className='admin-user-orders'>
			<h2>User Orders</h2>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
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

							<td>{new Date(order.orderDate).toLocaleString()}</td>
							<td>{`${order.totalAmount} zł`}</td>
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

export default AdminUserOrders
