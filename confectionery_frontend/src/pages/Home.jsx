import React from 'react'
import MainInfo from '../components/mainInfo/MainInfo'
import AboutUsHome from '../components/aboutUsHome/AboutUsHome'

const Home = ({setMenu}) => {
  return (
    <div>
      <MainInfo setMenu={setMenu}/>
      <AboutUsHome setMenu={setMenu}/>
    </div>
  )
}

export default Home
