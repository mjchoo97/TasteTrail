"use client";

import React, { useState } from 'react'
import styles from './searchbar.module.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

const Searchbar = () => {

    const [searchText,setsearchText] = useState("")

    const router = useRouter()
    
    const handleSubmit =(e) =>{
            e.preventDefault();
            router.push(`/searchpage/${searchText}`)
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.search}>                
            <input className = {styles.input} placeholder='Looking good' onChange = {(e) =>{setsearchText(e.target.value)}}></input>
            <span className={styles.searchicon} onClick={handleSubmit}>
                <Image src = "/search-icon.png" width={30} height={30}/>
            </span>
        </div>
    </form>
  )
}

export default Searchbar