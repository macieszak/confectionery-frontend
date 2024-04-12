import React, { useState, useEffect } from 'react'
import '../CSS/AdminUserOrders.css'

const sampleOrdersData = [
	{
		orderId: 1,
		userName: 'John Doe',
		userEmail: 'john@example.com',
		date: '2022-01-01',
		total: 120.0,
		status: 'Completed',
	},
	{
		orderId: 2,
		userName: 'Jane Doe',
		userEmail: 'jane@example.com',
		date: '2022-01-15',
		total: 75.5,
		status: 'Pending',
	},
	{
		orderId: 3,
		userName: 'Jane Doe',
		userEmail: 'jane@example.com',
		date: '2022-01-15',
		total: 75.5,
		status: 'Pending',
	},
	{
		orderId: 4,
		userName: 'Jane Doe',
		userEmail: 'jane@example.com',
		date: '2022-01-15',
		total: 75.5,
		status: 'Pending',
	},
	{
		orderId: 5,
		userName: 'Jane Doe',
		userEmail: 'jane@example.com',
		date: '2022-01-15',
		total: 75.5,
		status: 'Pending',
	},
]

const AdminUserOrders = () => {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		// Tutaj należałoby pobrać dane zamówień użytkownika z API
		setOrders(sampleOrdersData) // przykładowe dane dla demonstracji
	}, [])

	const toggleOrderStatus = orderId => {
		// Logika do zmiany statusu zamówienia (np. z "Pending" na "Completed")
		// Symulacja aktualizacji statusu
		const updatedOrders = orders.map(order =>
			order.orderId === orderId ? { ...order, status: order.status === 'Completed' ? 'Pending' : 'Completed' } : order
		)
		setOrders(updatedOrders)
	}

	const changeOrderStatus = (orderId, newStatus) => {
		const updatedOrders = orders.map(order => (order.orderId === orderId ? { ...order, status: newStatus } : order))
		setOrders(updatedOrders)
	}

	return (
		<div className='admin-user-orders'>
			<h2>User Orders</h2>
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
							<td>{order.userName}</td>
							<td>{order.userEmail}</td>
							<td>{order.date}</td>
							<td>{order.total} zł</td>
							<td>{order.status}</td>
							<td>
								<select value={order.status} onChange={e => changeOrderStatus(order.orderId, e.target.value)}>
									<option value='Pending'>Pending</option>
									<option value='Completed'>Completed</option>
									<option value='Canceled'>Canceled</option>
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
