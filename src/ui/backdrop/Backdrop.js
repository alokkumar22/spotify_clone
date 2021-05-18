import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = ({ closeAccountOptionsDropdownHandler }) => {
  return (
    <div
      className={classes.backdrop}
      onClick={closeAccountOptionsDropdownHandler}
    ></div>
  );
};

export default Backdrop;
