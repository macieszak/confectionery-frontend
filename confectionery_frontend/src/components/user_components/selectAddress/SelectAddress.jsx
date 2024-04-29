import React, { useState, useEffect, useContext } from 'react'
import axios from '../../../configuration/axiosConfig'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './SelectAddress.css'

const SelectAddress = () => {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()
	const [addresses, setAddresses] = useState([])
	const [newAddress, setNewAddress] = useState('')

	useEffect(() => {
		if (user) {
			axios
				.get(`/addresses/user/${user.id}`)
				.then(response => {
					setAddresses(response.data)
				})
				.catch(error => {
					console.error('Failed to fetch addresses:', error)
				})
		}
	}, [user])


	const handleAddNewAddress = () => {
		if (newAddress.trim()) {
			const addressData = {
				address: newAddress,
				userId: user.id,
			}

			if (!newAddress.trim()) {
				toast.error('New address field cannot be empty.')
				return
			}

			if (newAddress) {
				axios
					.post('/addresses/add', addressData)
					.then(response => {
						setAddresses([...addresses, response.data])
						setNewAddress('')
					})
					.catch(error => {
						console.error('Failed to add new address:', error)
					})
			}
		}
	}

	const handleSelectAddress = address => {
		console.log('Selected address:', address)
		navigate('/summary', { state: { selectedAddress: address } })
	}

	return (
		<div className='select-address-container'>
			<h2>Select your delivery address</h2>
			{addresses.map((address, index) => (
				<div key={index} className='address-item' onClick={() => handleSelectAddress(address)}>
					{address.address}
				</div>
			))}
			<input type='text' placeholder='New Address' value={newAddress} onChange={e => setNewAddress(e.target.value)} />
			<button onClick={handleAddNewAddress}>Add a new address</button>
		</div>
	)
}

export default SelectAddress
