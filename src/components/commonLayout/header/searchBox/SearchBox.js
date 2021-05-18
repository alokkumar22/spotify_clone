/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./SearchBox.module.css";
import * as actions from "../../../../store/actions/index";
// import SearchIcon from '@material-ui/icons/Search';

const SearchBox = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const searchBoxRef = useRef();

  useEffect(() => {
    const pathname = window.location.pathname.split("/");
    if (pathname.includes("search")) {
      searchBoxRef.current.style.display = "contents";
    } else {
      searchBoxRef.current.style.display = "none";
    }
  });

  useEffect(() => {
    if (input.length > 0) {
      const timeoutId = setTimeout(() => {
        dispatch(actions.setSearchTerm(input));
      }, 600);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [input]);

  return (
    <div className={classes.searchBox} ref={searchBoxRef}>
      <input
        placeholder="Artists, songs, or podcasts"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
      />
    </div>
  );
};

export default SearchBox;

// ########################################################################################
// using debouncedInput
// ########################################################################################

// const SearchBox = () => {
//   const [input, setInput] = useState("");
//   const [debouncedInput, setDebouncedInput] = useState("");

//   const dispatch = useDispatch();
//   const searchBoxRef = useRef();

//   useEffect(() => {
//     const pathname = window.location.pathname.split("/");
//     if (pathname.includes("search")) {
//       searchBoxRef.current.style.display = "contents";
//     } else {
//       searchBoxRef.current.style.display = "none";
//     }
//   });

//   useEffect(() => {
//     if (input.length > 0) {
//       const timeoutId = setTimeout(() => {
//         setDebouncedInput(input);
//       }, 600);
//       return () => {
//         clearTimeout(timeoutId);
//       };
//     }
//   }, [input]);

//   useEffect(() => {
//     dispatch(actions.setSearchTerm(debouncedInput));
//   }, [debouncedInput]);

//   return (
//     <div className={classes.searchBox} ref={searchBoxRef}>
//       <input
//         placeholder="Artists, songs, or podcasts"
//         onChange={(e) => {
//           setinput(e.target.value);
//         }}
//         value={input}
//       />
//     </div>
//   );
// };

// export default SearchBox;
