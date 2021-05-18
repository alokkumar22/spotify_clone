// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect } from "react";
// import classes from "./style.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../store/actions/index";
// import TilesRenderer from "../components/tilesRenderer/TilesRenderer";
// import LoadMain from "../../ui/loadingAnimations/LoadMain";

// const FollowingPlaylists = () => {
//   const dispatch = useDispatch();

//   const token = useSelector((state) => state.auth.token);
//   const followingPlaylists = useSelector(
//     (state) => state.collection.following.playlists
//   );

//   useEffect(() => {
//     dispatch(actions.initSetFollowingPlaylists(token));  // getting all followingPlaylists
//   }, []);

//   return followingPlaylists.items === undefined ? (
//     <LoadMain />
//   ) :
//     <div className={classes.followingPlaylists}>
//       {followingPlaylists.items && (
//         <TilesRenderer goToRouteOnImageClick={`/playlist`} data={followingPlaylists.items} /> )}
//     </div>
// };

// export default FollowingPlaylists;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import classes from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions/index';
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";

const FollowingAlbums = () => {
  console.log("followingAlbums");
  const mainDivRef = useRef(null);
  // const { artistId } = useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const followingPlaylists = useSelector(
    (state) => state.collection.following.playlists
  );

  let isFetching = false;

  const loadMore = () => {
    const offset = followingPlaylists.items
      ? followingPlaylists.items.length
      : 0;
    dispatch(actions.initSetFollowingPlaylists(token, 15, offset));
  };

  const checkToLoadMore = () => {
    if (
      followingPlaylists.total > followingPlaylists.items.length &&
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
    if (!followingPlaylists.items) loadMore();
  }, []);

  return followingPlaylists.items === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.followingPlaylists}
      onScroll={checkToLoadMore}
      ref={mainDivRef}
    >
      <h3 style={{ color: "white", margin:"1rem 0rem" }}>Playlists</h3>
      {followingPlaylists.items && (
        <TilesRenderer
          goToRouteOnImageClick={`/playlist`}
          data={followingPlaylists.items}
        />
      )}
      {followingPlaylists.total === followingPlaylists.items.length ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          THAT'S ALL
        </p>
      ) : (
        <LoadMore />
      )}
    </div>
  );
};

export default FollowingAlbums;
