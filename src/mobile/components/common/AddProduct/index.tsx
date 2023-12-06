import React, { useState } from 'react'
import classes from "./addproduct.module.scss"
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const AddProduct = () => {
  return (
    <div className={classes.pluMinus}>
        <AiOutlineMinus/>
            <input type="number" value={1} min="0" max="10"/>
        <AiOutlinePlus/>
    </div>
  )
}

export default AddProduct