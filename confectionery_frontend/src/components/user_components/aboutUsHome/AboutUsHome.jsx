import React from 'react'
import './AboutUsHome.css'
import { Link } from 'react-router-dom'

const AboutUsHome = ({ setMenu }) => {
	return (
		<div className='about-us-home'>
			<div className='about-us-info'>
				<h1>About Us</h1>
				<p>
					Welcome to Sweet Bakery, where every bite tells a story of tradition, passion, and the finest ingredients.
					Established in the heart of the city, our bakery has been serving up delectable treats made from family
					recipes passed down through generations since 1985. Our commitment to quality and craftsmanship shines through
					in every pastry, cake, and cookie we create, making life's moments even sweeter. Join us on a journey of
					flavor that celebrates the joy of baking and the community we've built around it.
				</p>
			</div>

			<div className='about-us-more-information'>
				<h1>Do you want to know more information about us?</h1>
				<Link to='/aboutus'>
					<button onClick={() => setMenu('about us')}>Check it out!</button>
				</Link>
			</div>
		</div>
	)
}

export default AboutUsHome
