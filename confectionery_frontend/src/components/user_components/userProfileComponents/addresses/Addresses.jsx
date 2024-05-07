import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import { FaEdit, FaSave } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import axios from '../../../../configuration/axiosConfig'
import './Addresses.css'

const Addresses = () => {
	const { user } = useContext(AuthContext)
	const [addresses, setAddresses] = useState([])
	const [editIndex, setEditIndex] = useState(-1)
	const [editedAddress, setEditedAddress] = useState('')
	const [newAddress, setNewAddress] = useState('')

	useEffect(() => {
		if (user?.id) {
			axios
				.get(`users/${user.id}/addresses`)
				.then(response => {
					console.log('Loaded addresses:', response.data)
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

		console.log('Updating address with ID: ', addresses[index].id)

		const updatedAddress = {
			address: editedAddress,
		}

		axios
			.put(`/users/${user.id}/addresses/${addresses[index].id}`, updatedAddress)
			.then(response => {
				const updatedAddresses = [...addresses]
				updatedAddresses[index] = response.data
				setAddresses(updatedAddresses)
				setEditIndex(-1)
				toast.success('Address updated successfully!')
			})
			.catch(error => {
				console.error('Error updating address:', error.response || error)
				toast.error(`Failed to update address: ${error.response?.data?.message || error.message}`)
			})
	}

	const handleDelete = index => {
		axios
			.delete(`/users/${user.id}/addresses/${addresses[index].id}`)
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
			}

			if (!newAddress.trim()) {
				toast.error('New address field cannot be empty.')
				return
			}

			axios
				.post(`/users/${user.id}/addresses`, addressData)
				.then(response => {
					setAddresses([...addresses, response.data])
					setNewAddress('')
					toast.success('New address added successfully!')
				})
				.catch(error => {
					if (error.response && error.response.status === 409) {
						toast.error('You already have such an address.')
					} else {
						toast.error('Failed to add new address')
					}
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
