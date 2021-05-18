/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./style.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
// import { useParams } from "react-router";

const FollowingAlbums = () => {
  console.log("followingAlbums");
  const mainDivRef = useRef(null);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const followingAlbums = useSelector(
    (state) => state.collection.following.albums
  );

  let isFetching = false;

  const loadMore = () => {
    const offset = followingAlbums.items ? followingAlbums.items.length : 0;
    dispatch(actions.initSetFollowingAlbums(token, country, 15, offset));
  };

  const checkToLoadMore = () => {
    if (
      followingAlbums.total > followingAlbums.items.length &&
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
    if (!followingAlbums.items) loadMore();
  }, []);

  return followingAlbums.items === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.followingAlbums}
      onScroll={checkToLoadMore}
      ref={mainDivRef}>
      <h3 style={{ color: "white", margin: "1rem 0rem" }}>Albums</h3>
      {followingAlbums.items && (
        <TilesRenderer
          goToRouteOnImageClick={`/album`}
          data={followingAlbums.items}
          type='followingAlbum'
        />
      )}
      {followingAlbums.total === followingAlbums.items.length ? (
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
