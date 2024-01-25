"use client";

import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'

const Receipe = () => {

  const testobj = {
    "name":"Quick tortilla sandwich with chicken breast",
    "category":"breakfast",
    "ingredients":[
      {"volume":"1","unit":"piece(s)","ingredient":"meat"},
      {"volume":"1000","unit":"g","ingredient":"minced pork"}
    ],
    "insturctions":[
      "Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipicibe elit, sed do eiusmod tempor inci didunt ut labore e dolore magna aliqua.  ",
      "onsectetur adipicibe elit, sed do eiusmod tempor in","t aliquip ex mea commodo co nsequat duis aute irure."
    ]
  }
  const [servings,setServings] = useState(1)

  console.log(servings)

  return (
    <div className={styles.container}>
      <div className ={styles.foodName}>
          {testobj.name}
      </div>
      <div className = {styles.imgWrapper}>
        <div className = {styles.imgContainer}>
          <Image  src ="/foodsample.jpg" alt="" fill className = {styles.imgg}/>
        </div>
      </div>
      <div className = {styles.ingTitle}>Ingredients:</div>
      <div className = {styles.ingredientContainer}>
        <div className= {styles.adjust}>
          Adjust Servings
          <input className = {styles.input} defaultValue={servings} onChange = {(e) =>{e.target.value !=0?setServings(e.target.value):setServings(servings)}}></input>
        </div>
        {testobj.ingredients.map((ing,ind)=>{
          return(
            <div key = {ind} className = {styles.ingWrapper}>
              <div className ={styles.count}>{(ind+1).toString()+`. ` + (ing.volume*servings) +` `+ing.unit}</div>
              <div className = {styles.material}>{ing.ingredient}</div>
            </div>
          )    
        })}    
      </div>
      <div className = {styles.ingTitle}>Instructions:</div>
      <div className = {styles.instuContainer}>
        {testobj.insturctions.map((step,index) =>{
          return(
            <div key = {index} className = {styles.instuWrapper}>
              <div className ={styles.stepscount}>{index+1}</div>
              <div className = {styles.steps}>{step}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Receipe