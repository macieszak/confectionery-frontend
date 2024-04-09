import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './SelectAddress.css'

const SelectAddress = () => {
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	const handleSelectAddress = address => {
		console.log('Wybrano adres:', address)
		navigate('/summary')
	}

	const handleAddNewAddress = () => {
		if (newAddress) {
			setAddresses(currentAddresses => [...currentAddresses, newAddress])
			setNewAddress('')
		}
	}

	// Tymczasowe adresy na potrzeby stylizacji i implementacji logiki
	const [addresses, setAddresses] = useState(
		currentUser?.addresses || ['123 Main St, Anytown, AN', '456 Maple Ave, Othertown, OT']
	)
	const [newAddress, setNewAddress] = useState('')

	return (
		<div className='select-address-container'>
			<h2>Select your delivery address</h2>
			{addresses.map((address, index) => (
				<div key={index} className='address-item' onClick={() => handleSelectAddress(address)}>
					{address}
				</div>
			))}
			<input type='text' placeholder='New Address' value={newAddress} onChange={e => setNewAddress(e.target.value)} />
			<button onClick={handleAddNewAddress}>Add a new address</button>
		</div>
	)
}

export default SelectAddress
