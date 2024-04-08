import './App.css'
import NavigationBar from './components/navigationBar/NavigationBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import User from './pages/User'
import React, { useState } from 'react'
import Footer from './components/footer/Footer'
import Products from './pages/Products'
import { AuthProvider } from './context/AuthContext'
import ProfileInfo from './components/userComponents/profileInfo/ProfileInfo'
import Wallet from './components/userComponents/wallet/Wallet'
import Addresses from './components/userComponents/addresses/Addresses'
import OrderHistory from './components/userComponents/orderHistory/OrderHistory'
import Favorite from './components/userComponents/favorite/Favorite'

function App() {
	const [menu, setMenu] = useState('home')
	const [cartItemCount, setCartItemCount] = useState(0);
	const updateCartItemCount = (newCount) => {
		setCartItemCount(newCount);
	  };

	return (
		<div className='main'>
			<AuthProvider>
				<BrowserRouter>
					<div className='content'>
					<NavigationBar menu={menu} setMenu={setMenu} cartItemCount={cartItemCount} />
						<Routes>
							<Route path='/' element={<Home setMenu={setMenu} />} />
							<Route path='/aboutus' element={<AboutUs />} />
							<Route path='/products' element={<Products />} />
							<Route path='/contacts' element={<Contact />} />
							<Route path='/product/:productId' element={<Product />} />
							<Route path='/cart' element={<Cart updateCartItemCount={updateCartItemCount} />} />
							<Route path='/user' element={<User />}>
								<Route path='profile' element={<ProfileInfo />} />
								<Route path='wallet' element={<Wallet />} />
								<Route path='addresses' element={<Addresses />} />
								<Route path='order-history' element={<OrderHistory />} />
								<Route path='favorite' element={<Favorite />} />
							</Route>
							<Route path='/login' element={<LoginSignUp />} />
						</Routes>
					</div>
					<Footer className='footer' />
				</BrowserRouter>
			</AuthProvider>
		</div>
	)
}

export default App
