import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../configuration/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import '../CSS/AdminProductEdit.css';

const AdminProductAdd = () => {
	const { user } = useAuth(); 
	const navigate = useNavigate();
	const [product, setProduct] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
		image: null, 
	});
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		let tempErrors = {};
		let isValid = true;

		if (!product.name.trim()) {
			tempErrors['name'] = 'Name is required';
			isValid = false;
		}
		if (!product.category.trim()) {
			tempErrors['category'] = 'Category is required';
			isValid = false;
		}
		if (!product.price) {
			tempErrors['price'] = 'Price is required';
			isValid = false;
		} else if (parseFloat(product.price) <= 0) {
			tempErrors['price'] = 'Price must be greater than 0';
			isValid = false;
		}
		if (!product.description.trim()) {
			tempErrors['description'] = 'Description is required';
			isValid = false;
		}
		if (!product.image) {
			tempErrors['image'] = 'Image is required';
			isValid = false;
		}

		setErrors(tempErrors);
		return isValid;
	};

	const saveChanges = () => {
		if (!validateForm()) {
			alert('Please correct the errors in the form');
			return;
		}

		const formData = new FormData();
		formData.append('name', product.name);
		formData.append('category', product.category);
		formData.append('price', product.price);
		formData.append('description', product.description);
		formData.append('image', product.image);

		axios.post('http://localhost:8080/api/admin/products/add', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(response => {
			alert('New product added successfully!');
			navigate('/admin/products');
		})
		.catch(error => {
			alert('Failed to add product');
			console.error('There was an error!', error);
		});
	};

	return (
		<div className='product-container'>
			<div className='product-image-section'>
				{product.image && <img src={URL.createObjectURL(product.image)} alt="Preview" className='product-image' />}
				<input
					type='file'
					accept='image/*'
					id='file'
					className='custom-file-input'
					onChange={e => setProduct({ ...product, image: e.target.files[0] })}
				/>
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
					onChange={e => setProduct({ ...product, description: e.target.value })}
				></textarea>
				{errors.description && <div className='error'>{errors.description}</div>}
				<div className='product-actions'>
					<button onClick={saveChanges} className='save-changes-btn'>
						Add Product
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminProductAdd;
