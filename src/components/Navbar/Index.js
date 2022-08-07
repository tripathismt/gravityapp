import React from 'react'
import style from './Navbar.module.css'
import logo from './logo.png'


 function Navbar() {
  return (
    <div className={style.navbar}>
        
        <img className={style.logo} src={logo} alt="company logo" />
       
    </div>
  )
}

export default(Navbar)

