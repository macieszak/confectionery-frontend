import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/AdminUsers.css'

const initialUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', money: '100.00', orders: 5, status: 'Active' },
	{ id: 2, name: 'Janesss Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 3, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 4, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 5, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 6, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 7, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 7, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 7, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 7, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 7, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
	{ id: 7, name: 'Jane Doe', email: 'jane@example.com', money: '150.50', orders: 2, status: 'Inactive' },
]

const AdminUsers = () => {
	const [users, setUsers] = useState(initialUsers)
	const navigate = useNavigate()

	const toggleUserStatus = userId => {
		const updatedUsers = users.map(user =>
			user.id === userId ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
		)
		setUsers(updatedUsers)
	}

	const viewUserOrders = userId => {
		navigate(`/admin/users/${userId}/orders`)
	}

	return (
		<div className='admin-users'>
			<h2>Users Management</h2>
			<table>
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Email</th>
						<th>Amount of Money</th>
						<th>Number of Orders</th>
						<th>Account Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.money}</td>
							<td>{user.orders}</td>
							<td>{user.status}</td>
							<td>
								<div className='action-buttons'>
									<button
										onClick={() => toggleUserStatus(user.id)}
										className={user.status === 'Active' ? 'button-block' : 'button-unblock'}>
										{user.status === 'Active' ? 'Block' : 'Unblock'}
									</button>
									<button className='view-orders-button' onClick={() => viewUserOrders(user.id)}>
										View Orders
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default AdminUsers
