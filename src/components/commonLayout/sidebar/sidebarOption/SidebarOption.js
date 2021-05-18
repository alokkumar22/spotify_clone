import React from "react";
import classes from "./SidebarOption.module.css";

const SidebarOption = ({ title, Icon }) => {

  return (
    <div className={classes.sidebarOption}
      style={{ backgroundColor: window.location.pathname.split("/").includes(title.toLowerCase()) ? '#282828' : "black", }} >
      {Icon ? ( <Icon style={{ fontSize: "1.6rem", marginRight: "1rem" }} /> ) : null}
      <p>{title}</p>
    </div>
  );
};

export default SidebarOption;


// if links on library page also uses this component to render themselves 

// import React from "react";
// import classes from "./SidebarOption.module.css";

// const SidebarOption = ({ type, title, Icon }) => {
//   return (
//     <div
//       className={classes.sidebarOption}
//       style={{
//         backgroundColor: window.location.pathname
//           .split("/")
//           .includes(title.toLowerCase())
//           ? "#282828"
//           : "black",
//         padding: type === "linksOnLibraryPage" ? "0.8rem" : null,
//         borderRadius: type === "linksOnLibraryPage" ? "0.8rem" : null,
//       }}
//     >
//       {Icon ? (
//         <Icon style={{ fontSize: "1.6rem", marginRight: "1rem" }} />
//       ) : null}
//       <p>{title}</p>
//     </div>
//   );
// };

// export default SidebarOption;
