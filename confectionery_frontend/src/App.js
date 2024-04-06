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
import { AuthProvider } from './context/AuthContext';


function App() {
	const [menu, setMenu] = useState('home')

	return (
		<div className='main'>
			<AuthProvider>
				<BrowserRouter>
					<div className='content'>
						<NavigationBar menu={menu} setMenu={setMenu} />
						<Routes>
							<Route path='/' element={<Home setMenu={setMenu} />} />
							<Route path='/aboutus' element={<AboutUs />} />
							<Route path='/products' element={<Products />} />
							<Route path='/contacts' element={<Contact />} />
							<Route path='/product/:productId' element={<Product />} />
							<Route path='/cart' element={<Cart />} />
							<Route path='/user' element={<User />} />
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
