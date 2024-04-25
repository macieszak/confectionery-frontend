import React, { useState, useEffect } from 'react'
import '../CSS/AdminProducts.css'
import ProductListItem from '../../components/user_components/productListItem/ProductListItem'
import { useNavigate } from 'react-router-dom'
import axios from '../../configuration/axiosConfig'
import { useAuth } from '../../context/AuthContext';


const AdminProducts = () => {
	const [products, setProducts] = useState([])
	const [sortOption, setSortOption] = useState('default')
	const [searchTerm, setSearchTerm] = useState('')
	const [categoryFilter, setCategoryFilter] = useState('all')
	const [priceFilter, setPriceFilter] = useState('all')

	const navigate = useNavigate()
	const { user } = useAuth(); 

	//
	const fetchFilteredProducts = () => {
		const params = {
			category: categoryFilter !== 'all' ? categoryFilter : null,
			minPrice: priceFilter === '0-15' ? 0 : (priceFilter === '15-50' ? 15 : null),
			maxPrice: priceFilter === '0-15' ? 15 : (priceFilter === '15-50' ? 50 : null)
		};
	
		axios.get(`http://localhost:8080/api/user/products/filter`, { params })
			.then(response => {
				setProducts(response.data.map(product => ({
					...product,
					imageUrl: product.image.name
				})));
			})
			.catch(error => {
				console.error('Error fetching filtered products', error);
			});
	};


	const handleSortChange = (e) => {
		const sortValue = e.target.value;
		setSortOption(sortValue);
	
		fetchSortedProducts(sortValue);
	};
	
	const fetchSortedProducts = (sortOption) => {
		axios.get(`http://localhost:8080/api/user/products/sorted`, {
			params: { sort: sortOption }
		})
		.then(response => {
			setProducts(response.data.map(product => ({
				...product,
				imageUrl: product.image.name  
			})));
		})
		.catch(error => {
			console.log('Error fetching sorted products', error);
		});
	};

	const fetchAllProducts = () => {
		axios.get('http://localhost:8080/api/user/products/all')
			.then(response => {
				setProducts(response.data.map(product => ({
					...product,
					imageUrl: product.image.name  
				})));
			})
			.catch(error => {
				console.log('Error fetching all products', error);
			});
	};
	

	useEffect(() => {
		if (searchTerm) {
			fetchProductsBySearch(searchTerm);
		} else {
			// Możesz zdecydować, czy chcesz wyświetlić wszystkie produkty, gdy nie ma wyszukiwania
			fetchAllProducts();
		}
	}, [searchTerm]);

	const fetchProductsBySearch = (query) => {
		axios.get(`http://localhost:8080/api/user/products/search`, {
			params: { query }
		})
		.then(response => {
			setProducts(response.data.map(product => ({
				...product,
				imageUrl: product.image.name  
			})));
		})
		.catch(error => {
			console.log('Error fetching products by search', error);
		});
	};


	useEffect(() => {
		fetchSortedProducts(sortOption);
	}, [sortOption]);  // To gwarantuje, że każda zmiana opcji sortowania pobierze dane na nowo

	useEffect(() => {
		fetchFilteredProducts();
	}, [categoryFilter, priceFilter]);  // Zareaguj na zmianę filtrów


	//




	useEffect(() => {
        axios.get('http://localhost:8080/api/admin/products/all')
             .then(response => {
                 setProducts(response.data.map(product => ({
                     ...product,
                     imageUrl: product.image.name  
                 })));
             })
             .catch(error => console.log('Error fetching products', error));
    }, []);

	const goToAddProductPage = () => navigate('/admin/add-product')
	const handleProductClick = productId => navigate(`/admin/product/${productId}`)

	return (
		<div className='admin-products-page'>
			<h2>Admin Products Management</h2>
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
				<button className='add-product-btn' onClick={goToAddProductPage}>
					Add New Product
				</button>
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
					</div>
				</div>
			</div>
			<div className='products'>
				{products.map(product => (
					<ProductListItem key={product.id} {...product} onClick={handleProductClick} />
				))}
			</div>
		</div>
	)
}

export default AdminProducts
