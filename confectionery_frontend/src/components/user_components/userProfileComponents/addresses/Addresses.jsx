// import React, { useState } from 'react'
// import { FaEdit, FaSave } from 'react-icons/fa'
// import { MdDelete } from 'react-icons/md'
// import './Addresses.css'

// const Addresses = () => {
// 	const [adresy, setAdresy] = useState([
// 		'Adres 1',
// 		'Adres 2',
// 		'Adres 3',
// 		// ...dodatkowe adresy
// 	])

// 	const [editIndex, setEditIndex] = useState(-1) // Indeks edytowanego adresu, -1 oznacza, że żaden nie jest edytowany
// 	const [editedAddress, setEditedAddress] = useState('') // Stan dla przechowywania edytowanego adresu
// 	const [newAddress, setNewAddress] = useState('') // Stan dla przechowywania nowego adresu

// 	const handleEdit = index => {
// 		setEditIndex(index)
// 		setEditedAddress(adresy[index])
// 	}

// 	const handleSave = index => {
// 		const updatedAdresy = [...adresy]
// 		updatedAdresy[index] = editedAddress
// 		setAdresy(updatedAdresy)
// 		setEditIndex(-1)
// 	}

// 	const handleDelete = index => {
// 		const updatedAdresy = adresy.filter((_, i) => i !== index)
// 		setAdresy(updatedAdresy)
// 	}

// 	const handleAddNewAddress = () => {
// 		if (newAddress) {
// 			setAdresy(adresy.concat(newAddress))
// 			setNewAddress('')
// 		}
// 	}

// 	const handleNewAddressChange = e => {
// 		setNewAddress(e.target.value)
// 	}

// 	const handleEditedAddressChange = e => {
// 		setEditedAddress(e.target.value)
// 	}

// 	return (
// 		<div className='addressesContainer'>
// 			<h2>Delivery details</h2>
// 			{adresy.map((adres, index) => (
// 				<div className='addressItem' key={index}>
// 					{editIndex === index ? (
// 						<input type='text' value={editedAddress} onChange={handleEditedAddressChange} className='editInput' />
// 					) : (
// 						<span>{adres}</span>
// 					)}
// 					<div className='addressActions'>
// 						{editIndex === index ? (
// 							<button onClick={() => handleSave(index)} className='actionButton'>
// 								<FaSave />
// 							</button>
// 						) : (
// 							<button onClick={() => handleEdit(index)} className='actionButton'>
// 								<FaEdit />
// 							</button>
// 						)}
// 						<button onClick={() => handleDelete(index)} className='actionButton'>
// 							<MdDelete />
// 						</button>
// 					</div>
// 				</div>
// 			))}
// 			<div className='newAddressContainer'>
// 				<input
// 					type='text'
// 					value={newAddress}
// 					onChange={handleNewAddressChange}
// 					className='newAddressInput'
// 					placeholder='Enter new address'
// 				/>
// 				<button onClick={handleAddNewAddress} className='addAddressButton'>
// 					Add new address
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// export default Addresses

import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import axios from '../../../../configuration/axiosConfig'
import { FaEdit, FaSave } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import './Addresses.css'

const Addresses = () => {
	const { user } = useContext(AuthContext)
	const [addresses, setAddresses] = useState([])
	const [editIndex, setEditIndex] = useState(-1)
	const [editedAddress, setEditedAddress] = useState('')
	const [newAddress, setNewAddress] = useState('')

	useEffect(() => {
		// Fetch addresses when the component mounts
		if (user?.id) {
			axios
				.get(`addresses/user/${user.id}`)
				.then(response => {
					console.log('Loaded addresses:', response.data) // Check what's actually loaded
					setAddresses(response.data)
				})
				.catch(error => {
					console.error('Error fetching addresses:', error)
					toast.error('Error fetching addresses')
				})
		}
	}, [user])

	const handleEditChange = e => {
		setEditedAddress(e.target.value)
	}

	const handleEdit = index => {
		setEditIndex(index)
		setEditedAddress(addresses[index].address)
	}

	const handleSave = index => {
		if (!editedAddress.trim()) {
			toast.error('Address cannot be empty.')
			return
		}

		console.log('Updating address with ID: ', addresses[index].id) // Log the ID to debug

		const updatedAddress = {
			address: editedAddress,
			userId: user.id, // Ensure ID is being passed correctly
		}

		axios
			.put(`/addresses/update/${addresses[index].id}`, updatedAddress)
			.then(response => {
				const updatedAddresses = [...addresses]
				updatedAddresses[index] = response.data // assuming the response data is the updated address object
				setAddresses(updatedAddresses)
				setEditIndex(-1)
				toast.success('Address updated successfully!')
			})
			.catch(error => {
				console.error('Error updating address:', error.response || error) // More detailed error logging
				toast.error(`Failed to update address: ${error.response?.data?.message || error.message}`)
			})
	}

	const handleDelete = index => {
		axios
			.delete(`/addresses/delete/${addresses[index].id}`)
			.then(() => {
				const updatedAddresses = addresses.filter((_, i) => i !== index)
				setAddresses(updatedAddresses)
				toast.success('Address deleted successfully!')
			})
			.catch(error => {
				console.error('Failed to delete address:', error)
				toast.error('Failed to delete address')
			})
	}

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

			axios
				.post('/addresses/add', addressData)
				.then(response => {
					setAddresses([...addresses, response.data])
					setNewAddress('')
					toast.success('New address added successfully!')
				})
				.catch(error => {
					console.error('Failed to add address:', error)
					toast.error('Failed to add new address')
				})
		}
	}

	const handleNewAddressChange = e => {
		setNewAddress(e.target.value)
	}

	return (
		<div className='addressesContainer'>
			<h2>Addresses</h2>
			{addresses.map((address, index) => (
				<div key={index} className='addressItem'>
					{editIndex === index ? (
						<input type='text' value={editedAddress} onChange={handleEditChange} className='editInput' />
					) : (
						<span>{address.address}</span>
					)}
					<div className='addressActions'>
						{editIndex === index ? (
							<button onClick={() => handleSave(index)} className='actionButton'>
								<FaSave />
							</button>
						) : (
							<button onClick={() => handleEdit(index)} className='actionButton'>
								<FaEdit />
							</button>
						)}
						<button onClick={() => handleDelete(index)} className='actionButton'>
							<MdDelete />
						</button>
					</div>
				</div>
			))}
			<div className='newAddressContainer'>
				<input
					type='text'
					value={newAddress}
					onChange={handleNewAddressChange}
					className='newAddressInput'
					placeholder='Enter new address'
				/>
				<button onClick={handleAddNewAddress} className='addAddressButton'>
					Add Address
				</button>
			</div>
		</div>
	)
}

export default Addresses
