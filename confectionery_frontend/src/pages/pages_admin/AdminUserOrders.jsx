import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../configuration/axiosConfig'
import '../CSS/AdminUserOrders.css'

const AdminUserOrders = () => {
	const { userId } = useParams()
	const [orders, setOrders] = useState([])

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
						{/* <th>User Name</th> */}
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
							{/* <td>
								{order.firstName} {order.lastName}
							</td> */}
							<td>{new Date(order.orderDate).toLocaleString()}</td>
							<td>{`${order.totalAmount} zł`}</td>
							<td>{order.status}</td>
							<td>
								{/* <select value={order.status} onChange={e => changeOrderStatus(order.orderId, e.target.value)}>
									<option value='Pending'>Pending</option>
									<option value='Completed'>Completed</option>
									<option value='Canceled'>Canceled</option>
								</select> */}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminUserOrders
