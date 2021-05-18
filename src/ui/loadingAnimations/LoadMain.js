import React from "react";
import classes from "./LoadingAnimations.module.css";
import loadMainIcon from "../../assets/loadMain.svg";

const LoadMain = () => {
  console.log("loadingAnimations");
  return (
    <div className={classes.loadMain}>
      <img
        src={loadMainIcon}
        alt=''
        style={{
          backgroundColor: "black",
          height: "200px",
          width: "200px",
        }}
      />
    </div>
  );
};

export default LoadMain;
