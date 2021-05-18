/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./AlbumTracks.module.css";
import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import AlbumTracksRenderer from "../../components/AlbumTracksRenderer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AlbumPlaylistArtistDetailRenderer from "../../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
// import _ from "lodash";
// import axios from "axios";

const AlbumTracks = () => {
  console.log("album tracks run");

  // const [isFollowing, setIsFollowing] = useState(false);

  const { albumId } = useParams();

  const mainDivRef = useRef();
  const albumDetailRef = useRef();

  const dispatch = useDispatch();
  // const runCheckFollowing = useSelector(
  //   (state) => state.collection.runCheckFollowing
  // );
  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const tracks = useSelector((state) => state.collection.tracks[albumId]);
  const albumDetail = useSelector((state) => state.collection.albums[albumId]);
  // const followingAlbums = useSelector(
  //   (state) => state.collection.following.albums
  // );
  const isFollowing = useSelector((state) => state.collection.isFollowing);
  const bgColor = useSelector((state) => state.metadata.bgColor);

  // const currentPlayingHandler = () => {
  //   dispatch(actions.setCurrentPlayingTrackIndex(0));
  //   dispatch(actions.setCurrentPlayingId(albumId));
  // };

  // const checkFollowing = () => {
  //   return _.find(followingAlbums.items, (item) => item.album.id === albumId);
  // };
  // const checkFollowing = () => {
  //   try {
  //     axios(
  //       `https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     ).then((res) => {
  //       console.log(res.data[0]);
  //       setIsFollowing(res.data[0]);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const followAlbumHandler = () => {
    dispatch(actions.initFollowAlbum(token, albumId));
  };

  const unfollowAlbumHandler = () => {
    dispatch(actions.initUnfollowAlbum(token, albumId));
  };
  const loadMore = () => {
    const offset = tracks ? tracks.length : 0;
    dispatch(actions.initSetAlbumTracks(token, albumId, country, 15, offset));
  };

  let isFetching = false;

  const checkToLoadMore = () => {
    if (
      albumDetail.total_tracks > (tracks ? tracks.length : 0) &&
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
  //   // console.log("checkFollowing useeffect run");
  //   checkFollowing();
  // }, [runCheckFollowing]);

  useEffect(() => {
    if (!albumDetail) {
      dispatch(actions.initSetAlbumDetail(token, albumId, country));
    }

    if (isFollowing[albumId] === undefined)
      dispatch(actions.initSetIsFollowingAlbum(token, albumId));

    if (!tracks) loadMore();
  }, []);

  useEffect(() => {
    console.log("2nd useEffect run");
    if (tracks) {
      let tracksIds = [];
      tracks.forEach((track) => {
        if (isFollowing[track.id] === undefined) tracksIds.push(track.id);
      });

      if (tracksIds.length > 0)
        dispatch(actions.initSetIsFollowing(token, tracksIds));
    }
  }, [tracks]);

  return albumDetail === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.albumTracks}
      onScroll={checkToLoadMore}
      ref={mainDivRef}
    >
      <div
        className={classes.albumDetail}
        ref={albumDetailRef}
        style={{ backgroundColor: bgColor }}
      >
        <AlbumPlaylistArtistDetailRenderer data={albumDetail} type="album" />
      </div>

      <div
        className={classes.playPauseDiv}
        style={{ backgroundColor: bgColor }}
      >
        <PlayCircleFilledIcon
          // onClick={currentPlayingHandler}
          style={{ fontSize: "4.3rem", color: "#1DB954" }}
        />
        <FavoriteIcon
          style={{
            color: isFollowing[albumId] ? "#1DB954" : "white",
            marginLeft: "1rem",
            fontSize: "2.6rem",
          }}
          onClick={
            isFollowing[albumId] ? unfollowAlbumHandler : followAlbumHandler
          }
        />
      </div>
      {tracks && (
        <AlbumTracksRenderer type="normalAlbumTracks" tracks={tracks} />
      )}
      {/* AlbumTracksRenderer has been also used for displaying SearchTracks (Search.js) .. to differentiate both of them, type prop is taken */}
      {albumDetail.total_tracks === (tracks ? tracks.length : 0) ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          THAT'S ALL
        </p>
      ) : (
        <LoadMore />
      )}
    </div>
  );
};

export default AlbumTracks;
