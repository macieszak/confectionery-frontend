import React from 'react'
import MainInfo from '../../components/user_components/mainInfo/MainInfo'
import AboutUsHome from '../../components/user_components/aboutUsHome/AboutUsHome'
import NewsLetter from '../../components/user_components/newsLetter/NewsLetter'

const Home = ({setMenu}) => {
  return (
    <div>
      <MainInfo setMenu={setMenu}/>
      <AboutUsHome setMenu={setMenu}/>
      {/* <NewsLetter setMenu={setMenu}/> */}
    </div>
  )
}

export default Home
