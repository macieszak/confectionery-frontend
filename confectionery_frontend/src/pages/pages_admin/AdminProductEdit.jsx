import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../configuration/axiosConfig'
import '../CSS/AdminProductEdit.css'

const AdminProductEdit = () => {
	const navigate = useNavigate()
	const { productId } = useParams()
	const [product, setProduct] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		imageUrl: '',
	})
	const [imageSrc, setImageSrc] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		setIsLoading(true)
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`/admin/products/${productId}`)
				setProduct({
					name: data.name,
					category: data.category,
					price: data.price,
					description: data.description,
					imageUrl: data.image.name,
				})
				fetchImage(data.image.name)
			} catch (error) {
				console.error('Error fetching product details:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchProduct()
	}, [productId])

	const fetchImage = async imageName => {
		try {
			const response = await axios.get(`/user/products/img/${imageName}`, { responseType: 'blob' })
			const imageBlob = response.data
			const reader = new FileReader()
			reader.readAsDataURL(imageBlob)
			reader.onloadend = () => {
				setImageSrc(reader.result)
			}
		} catch (error) {
			console.error('Failed to load image:', error)
			setImageSrc('')
		}
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = () => {
				setProduct(prev => ({ ...prev, imageUrl: reader.result, imageFile: file }))
			}
		}
	}

	const saveChanges = async () => {
		if (!validateForm()) {
			alert('Please correct the errors in the form')
			return
		}

		const formData = new FormData()
		formData.append('name', product.name)
		formData.append('category', product.category)
		formData.append('price', product.price)
		formData.append('description', product.description)
		if (product.imageFile) {
			formData.append('image', product.imageFile)
		}

		try {
			await axios.put(`/admin/products/edit/${productId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			alert('Product details updated successfully!')
			navigate('/admin/products')
		} catch (error) {
			alert('Failed to save changes: ' + error.message)
			console.error('Failed to save product changes:', error)
		}
	}

	const validateForm = () => {
		let errors = {}
		let isValid = true

		if (!product.name.trim()) {
			errors.name = 'Name is required'
			isValid = false
		}

		if (!product.category.trim()) {
			errors.category = 'Category is required'
			isValid = false
		}

		if (!product.price) {
			errors.price = 'Price is required'
			isValid = false
		} else if (parseFloat(product.price) <= 0) {
			errors.price = 'Price must be greater than 0'
			isValid = false
		}

		if (!product.description.trim()) {
			errors.description = 'Description is required'
			isValid = false
		}

		setErrors(errors)
		return isValid
	}

	const deleteProduct = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await axios.delete(`/admin/products/delete/${productId}`)
				alert('Product deleted successfully!')
				navigate('/admin/products')
			} catch (error) {
				alert('Failed to delete product: ' + error.message)
				console.error('Failed to delete product:', error)
			}
		}
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='product-container'>
			<div className='product-image-section'>
				<img src={imageSrc || 'default_image_path.jpg'} alt={product.name} className='product-image' />
				<input type='file' accept='image/*' id='file' className='custom-file-input' onChange={handleImageChange} />
				<label htmlFor='file' className='file-input-label'>
					Choose File
				</label>
				{errors.image && <div className='error'>{errors.image}</div>}
			</div>
			<div className='product-details-section'>
				<label htmlFor='product-name'>Product name:</label>
				<input
					type='text'
					id='product-name'
					value={product.name}
					onChange={e => setProduct({ ...product, name: e.target.value })}
					className='product-title'
				/>
				{errors.name && <div className='error'>{errors.name}</div>}
				<label htmlFor='product-category'>Product category:</label>
				<input
					type='text'
					id='product-category'
					value={product.category}
					onChange={e => setProduct({ ...product, category: e.target.value })}
					className='product-category'
				/>
				{errors.category && <div className='error'>{errors.category}</div>}
				<label htmlFor='product-price'>Product price:</label>
				<input
					type='number'
					id='product-price'
					value={product.price}
					onChange={e => setProduct({ ...product, price: e.target.value })}
					className='product-price'
				/>
				{errors.price && <div className='error'>{errors.price}</div>}
				<label htmlFor='product-description'>Product description:</label>
				<textarea
					id='product-description'
					value={product.description}
					onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>
				{errors.description && <div className='error'>{errors.description}</div>}
				<div className='product-actions'>
					<button onClick={saveChanges} className='save-changes-btn'>
						Save Changes
					</button>
					<button onClick={deleteProduct} className='delete-product-btn'>
						Delete Product
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminProductEdit
