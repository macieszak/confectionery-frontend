// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import '../CSS/AdminProductEdit.css'
// import axios from '../../configuration/axiosConfig'

// const AdminProductEdit = () => {
// 	const { productId } = useParams()
// 	const navigate = useNavigate()
// 	const [product, setProduct] = useState(null)

// 	const saveChanges = async () => {
// 		try {
// 			const formData = new FormData();
// 			formData.append('name', product.name);
// 			formData.append('category', product.category);
// 			formData.append('price', product.price);
// 			formData.append('description', product.description);
// 			// formData.append('image', selectedFile); // Jeśli obraz jest aktualizowany

// 			const response = await axios.put(`/admin/products/${productId}`, formData, {
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 				},
// 			});

// 			alert('Product details saved successfully!');
// 			navigate('/admin/products');
// 		} catch (error) {
// 			console.error('Failed to save product changes:', error);
// 			alert('Failed to save changes');
// 		}
// 	};

// 	const deleteProduct = async () => {
// 		try {
// 			await axios.delete(`/api/admin/products/${productId}`);
// 			alert('Product deleted successfully!');
// 			navigate('/admin/products');
// 		} catch (error) {
// 			console.error('Failed to delete product:', error);
// 			alert('Failed to delete product');
// 		}
// 	};

// 	useEffect(() => {
// 		const fetchProductDetails = async () => {
// 			try {
// 				const response = await axios.get(`/admin/products/${productId}`)
// 				setProduct(response.data)
// 			} catch (error) {
// 				console.error('Error fetching product details:', error)
// 				// Opcjonalnie można dodać obsługę błędów np. wyświetlanie komunikatu
// 			}
// 		}

// 		if (productId) {
// 			fetchProductDetails()
// 		}
// 	}, [productId])

// 	const handleSaveChanges = () => {
// 		// Logika do zapisywania zmian
// 		console.log('Changes saved')
// 		navigate('/admin/products')
// 	}

// 	const handleDeleteProduct = () => {
// 		// Logika do usuwania produktu
// 		console.log('Product deleted')
// 		navigate('/admin/products')
// 	}

// 	if (!product) {
// 		return <div>Loading...</div>
// 	}

// 	return (
// 		<div className='product-container'>
// 			<div className='product-image-section'>
// 				<img src={product.imageUrl} alt={product.name} className='product-image' />
// 				<input
// 					type='file'
// 					accept='image/*'
// 					id='file'
// 					className='custom-file-input'
// 					onChange={e => setProduct({ ...product, imageUrl: URL.createObjectURL(e.target.files[0]) })}
// 				/>
// 				<label htmlFor='file' className='file-input-label'>
// 					Choose File
// 				</label>
// 			</div>
// 			<div className='product-details-section'>
// 				<label htmlFor='product-name'>Product name:</label>
// 				<input
// 					type='text'
// 					id='product-name'
// 					value={product.name}
// 					onChange={e => setProduct({ ...product, name: e.target.value })}
// 					className='product-title'
// 				/>
// 				<label htmlFor='product-category'>Product category:</label>
// 				<input
// 					type='text'
// 					id='product-category'
// 					value={product.category}
// 					onChange={e => setProduct({ ...product, category: e.target.value })}
// 					className='product-category'
// 				/>
// 				<label htmlFor='product-price'>Product price:</label>
// 				<input
// 					type='number'
// 					id='product-price'
// 					value={product.price}
// 					onChange={e => setProduct({ ...product, price: e.target.value })}
// 					className='product-price'
// 				/>
// 				<label htmlFor='product-description'>Product description:</label>
// 				<textarea
// 					id='product-description'
// 					value={product.description}
// 					onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>
// 				<div className='product-actions'>
// 					<button onClick={saveChanges} className='save-changes-btn'>
// 						Save Changes
// 					</button>
// 					<button onClick={deleteProduct} className='delete-product-btn'>
// 						Delete Product
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default AdminProductEdit

// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import axios from '../../configuration/axiosConfig'
// import '../CSS/AdminProductEdit.css'

// const AdminProductEdit = () => {
// 	const { productId } = useParams()
// 	const navigate = useNavigate()
// 	const [product, setProduct] = useState({
// 		name: '',
// 		category: '',
// 		price: '',
// 		description: '',
// 		imageUrl: '', // Dodane do stanu
// 	})
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [selectedFile, setSelectedFile] = useState(null)

// 	useEffect(() => {
// 		setIsLoading(true)
// 		axios
// 			.get(`/admin/products/${productId}`)
// 			.then(response => {
// 				setProduct(response.data)
// 				setIsLoading(false)
// 			})
// 			.catch(error => {
// 				console.error('Error fetching product details:', error)
// 				setIsLoading(false)
// 			})
// 	}, [productId])

// 	const handleChange = e => {
// 		const { name, value } = e.target
// 		setProduct(prev => ({ ...prev, [name]: value }))
// 	}

// 	const handleImageChange = e => {
// 		const file = e.target.files[0]
// 		if (file) {
// 			setProduct(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }))
// 			setSelectedFile(file)
// 		}
// 	}

// 	const saveChanges = async () => {
// 		if (!product.name || !product.category || !product.price || !product.description) {
// 			alert('Please fill out all fields')
// 			return
// 		}

// 		const formData = new FormData()
// 		formData.append('name', product.name)
// 		formData.append('category', product.category)
// 		formData.append('price', product.price)
// 		formData.append('description', product.description)
// 		if (selectedFile) {
// 			formData.append('image', selectedFile)
// 		}

// 		try {
// 			await axios.put(`/api/admin/products/${productId}`, formData, {
// 				headers: {
// 					'Content-Type': 'multipart/form-data',
// 				},
// 			})
// 			alert('Product details saved successfully!')
// 			navigate('/admin/products')
// 		} catch (error) {
// 			console.error('Failed to save product changes:', error)
// 			alert('Failed to save changes')
// 		}
// 	}

// 	const deleteProduct = async () => {
// 		if (window.confirm('Are you sure you want to delete this product?')) {
// 			try {
// 				await axios.delete(`/admin/products/${productId}`)
// 				alert('Product deleted successfully!')
// 				navigate('/admin/products')
// 			} catch (error) {
// 				console.error('Failed to delete product:', error)
// 				alert('Failed to delete product')
// 			}
// 		}
// 	}

// 	if (isLoading) {
// 		return <div>Loading...</div>
// 	}

// 	return (
// 		<div className='product-container'>
// 			<div className='product-image-section'>
// 				<img src={product.imageUrl || 'default_image_path.jpg'} alt={product.name} className='product-image' />
// 				<input type='file' accept='image/*' id='file' className='custom-file-input' onChange={handleImageChange} />
// 				<label htmlFor='file' className='file-input-label'>
// 					Choose File
// 				</label>
// 			</div>
// 			<div className='product-details-section'>
// 				<label htmlFor='product-name'>Product name:</label>
// 				<input
// 					type='text'
// 					id='product-name'
// 					name='name'
// 					value={product.name}
// 					onChange={handleChange}
// 					className='product-title'
// 				/>
// 				<label htmlFor='product-category'>Product category:</label>
// 				<input
// 					type='text'
// 					id='product-category'
// 					name='category'
// 					value={product.category}
// 					onChange={handleChange}
// 					className='product-category'
// 				/>
// 				<label htmlFor='product-price'>Product price:</label>
// 				<input
// 					type='number'
// 					id='product-price'
// 					name='price'
// 					value={product.price}
// 					onChange={handleChange}
// 					className='product-price'
// 				/>
// 				<label htmlFor='product-description'>Product description:</label>
// 				<textarea
// 					id='product-description'
// 					name='description'
// 					value={product.description}
// 					onChange={handleChange}></textarea>
// 				<div className='product-actions'>
// 					<button onClick={saveChanges} className='save-changes-btn'>
// 						Save Changes
// 					</button>
// 					<button onClick={deleteProduct} className='delete-product-btn'>
// 						Delete Product
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default AdminProductEdit

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
	const [imageSrc, setImageSrc] = useState('') // Store base64 image
	const [isLoading, setIsLoading] = useState(false)

	// Fetch product details and image
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

	// Fetch image data as base64
	const fetchImage = async imageName => {
		try {
			const response = await axios.get(`/admin/products/img/${imageName}`, { responseType: 'blob' })
			const imageBlob = response.data
			const reader = new FileReader()
			reader.readAsDataURL(imageBlob)
			reader.onloadend = () => {
				setImageSrc(reader.result)
			}
		} catch (error) {
			console.error('Failed to load image:', error)
			setImageSrc('') // Reset or set to a default image path
		}
	}

	const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProduct(prev => ({ ...prev, imageUrl: reader.result, imageFile: file }));
            };
        }
    };

	const saveChanges = async () => {
		const formData = new FormData()
		formData.append('name', product.name)
		formData.append('category', product.category)
		formData.append('price', product.price)
		formData.append('description', product.description)
		if (product.imageFile) {
			formData.append('image', product.imageFile)
		}

		try {
			await axios.put(`/admin/products/${productId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			alert('Product details updated successfully!')
			navigate('/admin/products')
		} catch (error) {
			alert('Failed to save changes: ' + error.message)
			console.error('Failed to save product changes:', error)
		}
	}

	const deleteProduct = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`/api/admin/products/${productId}`);
                alert('Product deleted successfully!');
                navigate('/admin/products');
            } catch (error) {
                alert('Failed to delete product: ' + error.message);
                console.error('Failed to delete product:', error);
            }
        }
    };

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='product-container'>
			<div className='product-image-section'>
				<img src={imageSrc || 'default_image_path.jpg'} alt={product.name} className='product-image' />
				<input type='file' accept='image/*' id='file' className='custom-file-input' onChange={handleImageChange} />
                <label htmlFor='file' className='file-input-label'>Choose File</label>
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
				<label htmlFor='product-category'>Product category:</label>
				<input
					type='text'
					id='product-category'
					value={product.category}
					onChange={e => setProduct({ ...product, category: e.target.value })}
					className='product-category'
				/>
				<label htmlFor='product-price'>Product price:</label>
				<input
					type='number'
					id='product-price'
					value={product.price}
					onChange={e => setProduct({ ...product, price: e.target.value })}
					className='product-price'
				/>
				<label htmlFor='product-description'>Product description:</label>
				<textarea
					id='product-description'
					value={product.description}
					onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>
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
