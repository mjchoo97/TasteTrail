import Homesearch from '@/components/homesearch/Homesearch'
import React from 'react'
import styles from "./page.module.css"

const Home = () => {
  return (
    <div className = {styles.container}>
      <div className = {styles.bgimage}></div>
      <Homesearch/>
    </div>
  )
}

export default Home