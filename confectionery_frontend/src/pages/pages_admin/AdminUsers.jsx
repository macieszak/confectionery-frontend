import React, { useState, useEffect } from 'react';
import axios from '../../configuration/axiosConfig'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users when the component is mounted
        axios.get('/admin/users/all')
            .then(response => {
                setUsers(response.data); // Set users state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                // Handle errors here, e.g., unauthorized access, server issues, etc.
            });
    }, []);

    const toggleUserStatus = userId => {
        const updatedUsers = users.map(user =>
            user.userId === userId ? { ...user, accountStatus: user.accountStatus === 'Active' ? 'Inactive' : 'Active' } : user
        );
        setUsers(updatedUsers);
        // Potentially send a request to the backend to update the user status
    };

    const viewUserOrders = userId => {
        navigate(`/admin/users/${userId}/orders`);
    };

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
                        <tr key={user.userId}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.mail}</td>
                            <td>{user.amountOfMoney}</td>
                            <td>{user.numberOfOrders}</td>
                            <td>{user.accountStatus}</td>
                            <td>
                                <div className='action-buttons'>
                                    <button
                                        onClick={() => toggleUserStatus(user.userId)}
                                        className={user.accountStatus === 'Active' ? 'button-block' : 'button-unblock'}>
                                        {user.accountStatus === 'Active' ? 'Block' : 'Unblock'}
                                    </button>
                                    <button className='view-orders-button' onClick={() => viewUserOrders(user.userId)}>
                                    View Orders
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUsers;
