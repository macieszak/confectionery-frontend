import React, { useState, useEffect } from 'react'
import './CSS/Products.css'
import ProductListItem from '../components/productListItem/ProductListItem'
import productsData from '../assets/data/productsData'

const Products = () => {
	const [products, setProducts] = useState([])
	const [sortOption, setSortOption] = useState('default')
	const [searchTerm, setSearchTerm] = useState('')
	const [categoryFilter, setCategoryFilter] = useState('all')
	const [priceRange, setPriceRange] = useState('all')
	const [priceFilter, setPriceFilter] = useState('all')

	useEffect(() => {
		let filteredAndSortedProducts = productsData
			.filter(product => {
				// Filtrowanie po nazwie
				const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase())
				// Filtrowanie po kategorii
				const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
				// Filtrowanie po przedziale cenowym
				let matchesPrice = true
				if (priceFilter !== 'all') {
					const [minPrice, maxPrice] = priceFilter.split('-').map(Number)
					const price = parseFloat(product.price)
					matchesPrice = price >= minPrice && price <= maxPrice
				}
				return matchesSearchTerm && matchesCategory && matchesPrice
			})
			// Logika sortowania
			.sort((a, b) => {
				// Sortowanie według ceny
				if (sortOption === 'cheapest') {
					return parseFloat(a.price) - parseFloat(b.price)
				} else if (sortOption === 'expensive') {
					return parseFloat(b.price) - parseFloat(a.price)
				}
				return 0
			})

		setProducts(filteredAndSortedProducts)
	}, [searchTerm, sortOption, categoryFilter, priceFilter]) // Aktualizacja listy zależności

	return (
		<div className='products-page'>
			<div className='filter-bar'>
				<input
					type='text'
					placeholder='Search...'
					className='search-input'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<select className='sort-select' value={sortOption} onChange={e => setSortOption(e.target.value)}>
					<option value='default'>Sort by</option>
					<option value='cheapest'>Lowest Price</option>
					<option value='expensive'>Highest Price</option>
				</select>
			</div>

			<div className='filter-options-row'>
				<div className='filter-category'>
					<h4>Category</h4>
					<div>
						<button
							className={`filter-button ${categoryFilter === 'all' ? 'active' : ''}`}
							onClick={() => setCategoryFilter('all')}>
							All
						</button>
						<button
							className={`filter-button ${categoryFilter === 'cakes' ? 'active' : ''}`}
							onClick={() => setCategoryFilter('cakes')}>
							Cakes
						</button>
						<button
							className={`filter-button ${categoryFilter === 'cookies' ? 'active' : ''}`}
							onClick={() => setCategoryFilter('cookies')}>
							Cookies
						</button>
						{/* Dodaj więcej kategorii z odpowiednią logiką */}
					</div>
				</div>
				<div className='filter-price'>
					<h4>Price</h4>
					<div>
						<button
							className={`filter-button ${priceFilter === 'all' ? 'active' : ''}`}
							onClick={() => setPriceFilter('all')}>
							All
						</button>
						<button
							className={`filter-button ${priceFilter === '0-15' ? 'active' : ''}`}
							onClick={() => setPriceFilter('0-15')}>
							0-15zł
						</button>
						<button
							className={`filter-button ${priceFilter === '15-50' ? 'active' : ''}`}
							onClick={() => setPriceFilter('15-50')}>
							15zł-50zł
						</button>
						{/* Dodaj więcej opcji cenowych z odpowiednią logiką */}
					</div>
				</div>
			</div>

			<div className='products'>
				{products.map(product => (
					<ProductListItem key={product.id} {...product} />
				))}
			</div>
		</div>
	)
}

export default Products
