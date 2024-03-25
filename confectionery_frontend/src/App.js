import './App.css'
import NavigationBar from "./components/navigationBar/NavigationBar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import AboutUs from './pages/AboutUs.jsx';
import Product from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import LoginSignUp from './pages/LoginSignUp.jsx'
import User from './pages/User';


function App() {
  return (
    <div>
      <BrowserRouter>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/contacts' element={<Contact/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/> 
        </Route>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/user' element={<User/>}/>
         <Route path='/login' element={<LoginSignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




