/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./style.module.css";
import * as actions from "../../store/actions/index";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
// import LoadMore from "../../ui/loadingAnimations/LoadMore";

const FollowingArtists = () => {
  // console.log("followingArtists");
  const mainDivRef = useRef(null);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const followingArtists = useSelector(
    (state) => state.collection.following.artists
  );

  let isFetching = false;

  const loadMore = () => {
    console.log("loadMore run");
    const after = followingArtists.items
      ? followingArtists.items[followingArtists.items.length - 1].id
      : undefined;
    dispatch(actions.initSetFollowingArtists(token, after, 50));
  };

  // const checkToLoadMore = () => {
  //   console.log("checkToLoadMore");
  //   if (
  //     followingArtists.total > followingArtists.items.length &&
  //     !isFetching &&
  //     mainDivRef.current.scrollHeight -
  //       mainDivRef.current.clientHeight -
  //       mainDivRef.current.scrollTop <
  //       10
  //   ) {
  //     loadMore();
  //     isFetching = true;
  //   }
  // };

  useEffect(() => {
    if (!followingArtists.items) {
      loadMore();
    }
  }, []);

  return followingArtists.items === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.followingArtists}
      // onScroll={checkToLoadMore}
      ref={mainDivRef}
    >
      <h3 style={{ color: "white", margin:"1rem 0rem"}}>Artists</h3>
      {followingArtists.items && (
        <TilesRenderer
          goToRouteOnImageClick={`/artist`}
          data={followingArtists.items}
          type="followingAlbum"
        />
      )}
      {/* {followingArtists.total === followingArtists.items.length ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          {" "}
          THAT'S ALL
        </p>
      ) : (
        <LoadMore />
      )} */}
    </div>
  );
};

export default FollowingArtists;
