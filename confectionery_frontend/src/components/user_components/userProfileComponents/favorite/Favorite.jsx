import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import './Favorite.css'
import cake2 from '../../../../assets/productsImage/cake2.png'
import cake1 from '../../../../assets/productsImage/cake1.png'

const Favorite = () => {
	const [favorites, setFavorites] = useState([
		{ id: 1, name: 'Product Name', price: 'Price', imageUrl: cake2 },
		{ id: 2, name: 'Product Name', price: 'Price', imageUrl: cake1 },
		{ id: 3, name: 'Product Name', price: 'Price', imageUrl: cake2 },
		{ id: 4, name: 'Product Name', price: 'Price', imageUrl: cake1 },
		{ id: 5, name: 'Product Name', price: 'Price', imageUrl: cake2 },
		{ id: 6, name: 'Product Name', price: 'Price', imageUrl: cake1 },
		{ id: 7, name: 'Product Name', price: 'Price', imageUrl: cake2 },
		{ id: 8, name: 'Product Name', price: 'Price', imageUrl: cake1 },
		{ id: 9, name: 'Product Name', price: 'Price', imageUrl: cake2 },
		{ id: 10, name: 'Product Name', price: 'Price', imageUrl: cake1 },
	])

	const [visibleFavorites, setVisibleFavorites] = useState(6)

	const removeFavorite = id => {
		setFavorites(favorites.filter(favorite => favorite.id !== id))
	}

	const showMoreFavorites = () => {
		setVisibleFavorites(prevVisible => prevVisible + 6)
	}

	return (
		<div className='favoritePage'>
			<h2>Favourite Products</h2>
			<div className='favoriteGrid'>
				{favorites.slice(0, visibleFavorites).map(product => (
					<div key={product.id} className='favoriteItem'>
						<img src={product.imageUrl} alt={product.name} />
						<div>
							<h3>{product.name}</h3>
							<p>{product.price} zł</p>
						</div>
						<MdDelete className='delete' onClick={() => removeFavorite(product.id)} />
					</div>
				))}
			</div>
			{visibleFavorites < favorites.length && (
				<button onClick={showMoreFavorites} className='showMoreButton'>
					Show More
				</button>
			)}
		</div>
	)
}

export default Favorite
