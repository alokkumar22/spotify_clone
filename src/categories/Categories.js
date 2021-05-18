/* eslint-disable react-hooks/exhaustive-deps */

import classes from "./Categories.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";

const Categories = () => {
  const mainDivRef = useRef();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const categories = useSelector((state) => state.collection.browse.categories);

  const loadMore = () => {
    console.log(categories.length);
    dispatch(
      actions.initSetCategories(token, country, 15, categories.items.length)
    );
  };

  let isFetching = false;

  const checkToLoadMore = () => {
    if (
      categories.total > categories.items.length &&
      !isFetching &&
      mainDivRef.current.scrollHeight -
        mainDivRef.current.clientHeight -
        mainDivRef.current.scrollTop <
        10
    ) {
      loadMore();
      isFetching = true;
    }
  };

  useEffect(() => {
    if (!categories.items) loadMore();
    // if (mainDivRef.current)
    //   checkToLoadMore();
  }, []);

  return categories.items === undefined ? ( // initiallly featuredPlaylists is an empty object so we can't write featuredPlaylists===undefined
    <LoadMain />
  ) : (
    <div
      className={classes.categories}
      onScroll={checkToLoadMore}
      ref={mainDivRef}
    >
      <h3>Categories</h3>
      {categories.items && (
        <TilesRenderer
          goToRouteOnImageClick="/browse/categories"
          data={categories.items}
          type="category"
        />
      )}
      {/* {playlistDetail.tracks.total===tracks.length ? `THAT'S ALL`:<LoadMore/>} */}
      {categories.total === categories.items.length ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          {" "}
          THAT'S ALL
        </p>
      ) : (
        <LoadMore />
      )}
    </div>
  );
};

export default Categories;

// USING EVENT INSTEAD OF REFs TO FURTHER MAKE API CALLS UPON SCROLLING

/* eslint-disable react-hooks/exhaustive-deps */

// import classes from "./Categories.module.css";
// import React, { useEffect } from "react";
// import * as actions from "../store/actions/index";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import TilesRenderer from "../utility/renderers/tilesRenderer/TilesRenderer";
// import LoadMain from "../../ui/loadingAnimations/LoadMain";

// const Categories = () => {
//   const mainDivRef = useRef();
//   const dispatch = useDispatch();

//   const token = useSelector((state) => state.auth.token);
//   const country = useSelector((state) => state.auth.country);
//   const categories = useSelector((state) => state.collection.browse.categories);

//   const loadMore = () => {
//     console.log(categories.length);
//     dispatch(actions.initSetCategories(token, country, 15, categories.length));
//   };

//   let isFetching = false;

//   const checkToLoadMore = (event) => {
//     if (event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop < 10) {
//       if (!isFetching)
//         loadMore();
//       isFetching = true;
//     }
//   };

//   useEffect(() => {
//     dispatch(actions.initSetCategories(token, country, 15, categories.length));

//   }, []);

//   return categories === undefined ? (
//     <LoadMain />
//   ) :
//     <div className={classes.categories} onScroll={(event) => { checkToLoadMore(event) }} ref={mainDivRef}>
//       <h3 style={{ color: "white" }}>Categories</h3>
//       {categories && (
//         <TilesRenderer
//           goToRouteOnImageClick="/browse/categories"
//           data={categories}
//         />
//       )}
//     </div>

// };

// export default Categories;
