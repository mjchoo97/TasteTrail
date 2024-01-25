import React from 'react'
import style from "./authlinks.module.css"
import Link from 'next/link'

const AuthLinks = () => {
    const status = "unauthenticated"
  return (
    <>
    {status === "unauthenticated"? 
        (<Link href="/login">Login</Link>) :
        (<>
            <Link href="/newrecipe">New Recipe</Link>
            <span className = {style.link}>Logout</span>
        </>
        ) 
    }
    </>

  )
}

export default AuthLinks