import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productsData from '../assets/data/productsData'
import './CSS/Product.css'
import { FaHeart } from 'react-icons/fa'

const Product = () => {
	const { productId } = useParams() // Pobranie ID produktu z URL
	const [product, setProduct] = useState(null) // Stan dla przechowywania danych produktu
	const [quantity, setQuantity] = useState(1) // Stan dla ilości produktu

	useEffect(() => {
		// Znajdowanie produktu na podstawie `productId`
		const product = productsData.find(p => p.id.toString() === productId)
		setProduct(product)
	}, [productId])

	if (!product) {
		return <div>Ładowanie...</div>
	}

	const handleQuantityChange = delta => {
		setQuantity(prev => Math.max(1, prev + delta)) // Zapobiegamy wartościom < 1
	}

	return (
		<div className='product-container'>
			<div className='product-image-section'>
				<img src={product.imageUrl} alt={product.name} className='product-image' />
			</div>
			<div className='product-details-section'>
				<h2 className='product-title'>{product.name}</h2>
				<p className='product-category'>{product.category}</p>
				<p className='product-price'>{product.price} zł</p>
				<div className='product-quantity'>
					<button onClick={() => handleQuantityChange(-1)}>-</button>
					<span className='quantity-value'>{quantity}</span>
					<button onClick={() => handleQuantityChange(1)}>+</button>
				</div>
				<div className='product-actions'>
					<button className='add-to-cart-btn'>Add to cart</button>
					<button className='add-to-favorites-btn'>❤</button>
				</div>
				<div className='product-description'>
					<p>Description</p>
					<div className='product-description-text'>
						<p>{product.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
