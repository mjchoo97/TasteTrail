import Link from 'next/link'
import React from 'react'
import styles from "./navbar.module.css"
import AuthLinks from '../authlinks/AuthLinks'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
            <Link href="/">TasteTrail.</Link>
        </div>

      <div className={styles.links}>
         <Link href="/receipelist">Recipes</Link>
        <AuthLinks/>
      </div>
    </div>
  )
}

export default Navbar