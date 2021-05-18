import React from 'react'
import classes from './DropdownItem.module.css'

const DropdownItem = (props) => {
    return (
        <li className={classes.dropdownItem}>
           {props.title} 
        </li>
    )
}

export default DropdownItem
