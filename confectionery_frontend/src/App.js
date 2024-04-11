import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import { AuthProvider, useAuth } from './context/AuthContext'

import NavigationBar from './components/user_components/navigationBar/NavigationBar.jsx'
import AdminNavigationBar from './components/admin_components/adminNavigationBar/AdminNavigationBar'

import Home from './pages/pages_user/Home.jsx'
import AboutUs from './pages/pages_user/AboutUs.jsx'
import Product from './pages/pages_user/Product.jsx'
import Contact from './pages/pages_user/Contact.jsx'
import Cart from './pages/pages_user/Cart.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import User from './pages/pages_user/User.jsx'

import Products from './pages/pages_user/Products'
import AdminProducts from './pages/pages_admin/AdminProducts'
import AdminUsers from './pages/pages_admin/AdminUsers'
import AdminOrders from './pages/pages_admin/AdminOrders'

import ProfileInfo from './components/user_components/userProfileComponents/profileInfo/ProfileInfo.jsx'
import Wallet from './components/user_components/userProfileComponents/wallet/Wallet'
import Addresses from './components/user_components//userProfileComponents/addresses/Addresses'
import OrderHistory from './components/user_components/userProfileComponents/orderHistory/OrderHistory'
import Favorite from './components/user_components/userProfileComponents/favorite/Favorite'
import DeliveryPage from './components/user_components/deliveryPage/DeliveryPage.jsx'
import SummaryPage from './pages/pages_user/SummaryPage'

import Footer from './components/user_components/footer/Footer'
import AdminProductAdd from './pages/pages_admin/AdminProductAdd'

function App() {
	const [menu, setMenu] = useState('home')
	const [cartItemCount, setCartItemCount] = useState(0)
	const { user } = useAuth()
	const updateCartItemCount = newCount => {
		setCartItemCount(newCount)
	}
	console.log(user)

	return (
		<div className='main'>
			<BrowserRouter>
				<div className='content'>
					{user && user.role === 'admin' ? (
						<AdminNavigationBar menu={menu} setMenu={setMenu} />
					) : (
						<NavigationBar menu={menu} setMenu={setMenu} cartItemCount={cartItemCount} />
					)}

					<Routes>
						{user && user.role === 'admin' ? (
							<>
								<Route path='/admin/products' element={<AdminProducts />} />
								<Route path='/admin/add-product' element={<AdminProductAdd />} />
								<Route path='/admin/users' element={<AdminUsers />} />
								<Route path='/admin/orders' element={<AdminOrders />} />
							</>
						) : (
							<>
								<Route path='/' element={<Home setMenu={setMenu} />} />
								<Route path='/aboutus' element={<AboutUs />} />
								<Route path='/products' element={<Products />} />
								<Route path='/contacts' element={<Contact />} />
								<Route path='/product/:productId' element={<Product />} />
								<Route path='/cart' element={<Cart updateCartItemCount={updateCartItemCount} />} />
								<Route path='/delivery' element={<DeliveryPage />} />
								<Route path='/summary' element={<SummaryPage updateCartItemCount={updateCartItemCount} />} />
								<Route path='/user' element={<User />}>
									<Route path='profile' element={<ProfileInfo />} />
									<Route path='wallet' element={<Wallet />} />
									<Route path='addresses' element={<Addresses />} />
									<Route path='order-history' element={<OrderHistory />} />
									<Route path='favorite' element={<Favorite />} />
								</Route>
							</>
						)}
						<Route path='/login' element={<LoginSignUp />} />
					</Routes>
				</div>
				<Footer className='footer' />
			</BrowserRouter>
		</div>
	)
}

export default App
