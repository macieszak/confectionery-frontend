import React from 'react'
import MainInfo from '../components/mainInfo/MainInfo'
import AboutUsHome from '../components/aboutUsHome/AboutUsHome'
import NewsLetter from '../components/newsLetter/NewsLetter'

const Home = ({setMenu}) => {
  return (
    <div>
      <MainInfo setMenu={setMenu}/>
      <AboutUsHome setMenu={setMenu}/>
      <NewsLetter/>
    </div>
  )
}

export default Home
