import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/exploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDisplay/FoodDisplay'
import AppDownload from '../../components/appDownload/AppDownload'
import BackToTopButton from '../../components/backToTopButton/backToTopButton'
const Home = () => {
  const[category,setCategory]= useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}   />
      <FoodDisplay category={category}  />
      <AppDownload/>
      <BackToTopButton/>
    </div>
    
  )
}

export default Home