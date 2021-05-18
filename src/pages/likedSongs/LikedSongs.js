/* eslint-disable react-hooks/exhaustive-deps */

import classes from "./LikedSongs.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import PlaylistTracksRenderer from "../../components/PlaylistTracksRenderer";
import AlbumPlaylistArtistDetailRenderer from "../../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";

const LikedSongs = () => {
  const { playlistId } = useParams();

  const mainDivRef = useRef();
  const likedSongsDetailRef = useRef();
  // const pageEnd = useRef();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const likedSongs = useSelector((state) => state.collection.likedSongs);

  const bgColor = useSelector((state) => state.metadata.bgColor);

  const currentPlayingHandler = () => {
    dispatch(actions.setCurrentPlayingTrackIndex(0));
    dispatch(actions.setCurrentPlayingId(playlistId));
  };

  const loadMore = () => {
    const offset = likedSongs.items ? likedSongs.items.length : 0;
    dispatch(actions.initSetLikedSongs(token, country, 15, offset));
  };

  let isFetching = false;

  const checkToLoadMore = () => {
    if (
      likedSongs.total > (likedSongs.items ? likedSongs.items.length : 0) &&
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

  // useEffect(() => {
  //   if (likedSongsDetailRef.current)
  //     likedSongsDetailRef.current.style.backgroundColor = bgColor;
  // }, [bgColor]);

  useEffect(() => {
    if (!likedSongs.items) loadMore();
  }, []);

  const data = {
    name: "Liked Songs",
    owner: { display_name: "Alok kumar" },
    tracks: { total: likedSongs.total },
  };

  return likedSongs.items === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.likedSongs}
      onScroll={checkToLoadMore}
      ref={mainDivRef}
    >
      <div className={classes.likedSongsDetail} ref={likedSongsDetailRef} style={{backgroundColor:bgColor}}>
        <AlbumPlaylistArtistDetailRenderer data={data} type="playlist" />
      </div>
      <div
        className={classes.playPauseDiv}
        style={{ backgroundColor: bgColor }}
      >
        <PlayCircleFilledIcon
          style={{ fontSize: "4.3rem", color: "#1DB954" }}
          onClick={currentPlayingHandler}
        />
      </div>
      <PlaylistTracksRenderer tracks={likedSongs.items} type='likedTracks'/>
      {likedSongs.total === likedSongs.items.length ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          {" "}
          THAT'S ALL
        </p>
      ) : (
        <LoadMore />
      )}
      {/* <button onClick={loadMore} ref={pageEnd}>Load More</button> */}
    </div>
  );
};

export default LikedSongs;

// if (pageEnd.current) {
//   const observer = new IntersectionObserver((enteries) => {
//     if (enteries[0].isIntersecting) {
//       loadMore();
//     }
//   }, { threshold: 1 })
//   observer.observe(pageEnd.current)
// }

// {/* <button onClick={loadMore} ref={pageEnd}>Load More</button> */ }
