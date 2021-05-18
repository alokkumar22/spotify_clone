import classes from "./Button.module.css";
import React from "react";

const Button = (props) => {
 if(props.type==='loadMoreBtn')
    return <button className={`${classes.loadMoreBtn} ${classes.btn}`}>{props.children}</button>
};

export default Button;
