/* eslint-disable react-hooks/exhaustive-deps */

import classes from "./PlaylistTracks.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
// import _ from "lodash";
import PlaylistTracksRenderer from "../../components/PlaylistTracksRenderer";
import AlbumPlaylistArtistDetailRenderer from "../../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const PlaylistTracks = () => {
  console.log("playlist tracks run");
  // const [isFollowing, setIsFollowing] = useState(false);
  const { playlistId } = useParams();

  const mainDivRef = useRef();
  const playlistDetailRef = useRef();

  const dispatch = useDispatch();

  // const runCheckFollowing = useSelector(
  //   (state) => state.collection.runCheckFollowing
  // );
  const token = useSelector((state) => {
    console.log("token useSelector run");
    return state.auth.token;
  });
  const country = useSelector((state) => {
    console.log("country useSelector run");
    return state.auth.country;
  });
  const userId = useSelector((state) => {
    return state.auth.userProfile.id;
  });
  const tracks = useSelector((state) => {
    console.log("tracks useSelector run");
    return state.collection.tracks[playlistId];
  });
  const playlistDetail = useSelector(
    (state) => state.collection.playlists[playlistId]
  );
  const isFollowing = useSelector((state) => state.collection.isFollowing);
  const bgColor = useSelector((state) => state.metadata.bgColor);

  // const checkIfFollowingPlaylist = () => {
  //   try {
  //     axios(
  //       `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     ).then((res) => {
  //       dispatch(actions.setIsFollowing([playlistId], [res.data[0]]));
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const followPlaylistHandler = () => {
    console.log("followPlaylist run");
    dispatch(actions.initFollowPlaylist(token, playlistId));
  };

  const unfollowPlaylistHandler = () => {
    console.log("unfollowPlaylist run");
    dispatch(actions.initUnfollowPlaylist(token, playlistId));
  };

  // const currentPlayingHandler = () => {
  //   dispatch(actions.setCurrentPlayingTrackIndex(0));
  //   dispatch(actions.setCurrentPlayingId(playlistId));
  // };

  const loadMore = () => {
    const offset = tracks ? tracks.length : 0;
    if (!isFetching) {
      dispatch(
        actions.initSetPlaylistTracks(token, playlistId, country, 15, offset)
      );
      isFetching = true;
    }
  };

  let isFetching = false;

  const checkToLoadMore = () => {
    if (
      playlistDetail.tracks.total > (tracks ? tracks.length : 0) &&
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
  //   checkIfFollowing();
  // }, [runCheckFollowing]);

  useEffect(() => {
    if (!playlistDetail)
      dispatch(actions.initSetPlaylistDetail(token, playlistId, country));

    if (isFollowing[playlistId] === undefined)
      dispatch(actions.initSetIsFollowingPlaylist(token, playlistId, userId));

    if (!tracks) loadMore();
    // }, [playlistId]);
  }, []);

  useEffect(() => {
    console.log("2nd useEffect run");
    if (tracks) {
      let tracksIds = [];
      tracks.forEach((track) => {
        if (isFollowing[track.track.id] === undefined)
          tracksIds.push(track.track.id);
      });

      if (tracksIds.length > 0)
        dispatch(actions.initSetIsFollowing(token, tracksIds));
    }
  }, [tracks]);

  return playlistDetail === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.playlistTracks}
      onScroll={checkToLoadMore}
      ref={mainDivRef}>
      <div
        className={classes.playlistDetail}
        style={{ backgroundColor: bgColor }}
        ref={playlistDetailRef}>
        <AlbumPlaylistArtistDetailRenderer
          data={playlistDetail}
          type='playlist'
        />
      </div>
      <div
        className={classes.playPauseDiv}
        style={{ backgroundColor: bgColor }}>
        <PlayCircleFilledIcon
          style={{ fontSize: "4.3rem", color: "#1DB954" }}
          // onClick={currentPlayingHandler}
        />
        <FavoriteBorderIcon
          style={{
            color: isFollowing[playlistId] ? "#1DB954":'gray',
            // border:'2px solid gray',
            marginLeft: "1.5rem",
            fontSize: "2.5rem",
          }}
          onClick={
            isFollowing[playlistId]
              ? unfollowPlaylistHandler
              : followPlaylistHandler
          }
        > */}
        {isFollowing[playlistId] && (
            <FavoriteIcon
              style={{
               color: "#1DB954",
               // : "white",
                // fontSize: "1rem",
                // marginRight: "0.5rem",
              }}
           />
         )}
         </FavoriteBorderIcon>
      </div>
      {tracks && <PlaylistTracksRenderer tracks={tracks} />}
      <div>
        {playlistDetail.tracks.total === (tracks ? tracks.length : 0) ? (
          <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
            THAT'S ALL
          </p>
        ) : (
          <LoadMore />
        )}
      </div>
    </div>
  );
};

export default PlaylistTracks;

// @@ using intersection observer for further api calls @@ //

// /* eslint-disable react-hooks/exhaustive-deps */

// import classes from "./PlaylistTracks.module.css";
// import React, { useEffect, useMemo, useState } from "react";
// import * as actions from "../store/actions/index";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import { useParams } from "react-router-dom";
// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import LoadMain from "../../ui/loadingAnimations/LoadMain";
// import LoadMore from "../../ui/loadingAnimations/LoadMore";
// import _ from "lodash";
// import PlaylistTracksRenderer from "../components/PlaylistTracksRenderer";
// import AlbumPlaylistArtistDetailRenderer from "../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import axios from "axios";

// const PlaylistTracks = () => {
//   console.log("playlist tracks run");
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { playlistId } = useParams();

//   const mainDivRef = useRef();
//   const playlistDetailRef = useRef();
//   const pageEnd = useRef(null);

//   const dispatch = useDispatch();

//   const runCheckFollowing = useSelector(
//     (state) => state.collection.runCheckFollowing
//   );
//   const token = useSelector((state) => {
//     console.log("token useSelector run");
//     return state.auth.token;
//   });
//   const country = useSelector((state) => {
//     console.log("country useSelector run");
//     return state.auth.country;
//   });
//   const userId = useSelector((state) => {
//     return state.auth.userProfile.id;
//   });
//   const tracks = useSelector((state) => {
//     console.log("tracks useSelector run");
//     return state.collection.tracks[playlistId];
//   });
//   const playlistDetail = useSelector(
//     (state) => state.collection.playlists[playlistId]
//   );
//   const bgColor = useSelector((state) => state.metadata.bgColor);

//   const checkFollowing = () => {
//     try {
//       axios(
//         `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       ).then((res) => {
//         console.log(res.data[0]);
//         setIsFollowing(res.data[0]);
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const followPlaylist = () => {
//     dispatch(actions.initFollowPlaylist(token, playlistId));
//   };

//   const unfollowPlaylist = () => {
//     dispatch(actions.initUnfollowPlaylist(token, playlistId));
//   };

//   const currentPlayingHandler = () => {
//     dispatch(actions.setCurrentPlayingTrackIndex(0));
//     dispatch(actions.setCurrentPlayingId(playlistId));
//   };

//   let isFetching = false;

//   const loadMore = () => {
//     const offset = tracks ? tracks.length : 0;
//     if (!isFetching) {
//       dispatch(
//         actions.initSetPlaylistTracks(token, playlistId, country, 15, offset)
//       );
//       setLoading(true);
//       isFetching = true;
//     }
//   };

//   useEffect(() => {
//     checkFollowing();
//   }, [runCheckFollowing]);

//   useEffect(() => {
//     if (!playlistDetail)
//       dispatch(actions.initSetPlaylistDetail(token, playlistId, country));
//     if (!tracks) loadMore();
//   }, []);

//   useEffect(() => {
//     console.log("run");
//     // if (pageEnd && pageEnd.current) {
//     // console.log("inside");
//     const observer = new IntersectionObserver(
//       (enteries) => {
//         if (enteries[0].isIntersecting) {
//           loadMore();
//         }
//       },
//       { threshold: [0, 1] }
//     );
//     if (pageEnd && pageEnd.current) {
//       console.log("observe");
//       observer.observe(pageEnd.current);
//     }
//     return () => observer.unobserve(pageEnd.current);
//   }, [pageEnd]);

//   // useEffect(() => {
//   //   if (playlistDetailRef.current)
//   //     playlistDetailRef.current.style.backgroundColor = bgColor;
//   // }, [bgColor]);

//   return playlistDetail === undefined ? (
//     <LoadMain />
//   ) : (
//     <div
//       className={classes.playlistTracks}
//       // onScroll={checkToLoadMore}
//       ref={mainDivRef}
//     >
//       <div
//         className={classes.playlistDetail}
//         style={{ backgroundColor: bgColor }}
//         ref={playlistDetailRef}
//       >
//         <AlbumPlaylistArtistDetailRenderer
//           data={playlistDetail}
//           type="playlist"
//         />
//       </div>
//       <div
//         className={classes.playPauseDiv}
//         style={{ backgroundColor: bgColor }}
//       >
//         <PlayCircleFilledIcon
//           style={{ fontSize: "4.3rem", color: "green" }}
//           onClick={currentPlayingHandler}
//         />
//         <FavoriteIcon
//           style={{
//             color: isFollowing ? "green" : "white",
//             marginLeft: "1rem",
//             fontSize: "2.6rem",
//           }}
//           onClick={isFollowing ? unfollowPlaylist : followPlaylist}
//         />
//       </div>
//       {tracks && <PlaylistTracksRenderer tracks={tracks} />}
//       <div>
//         {playlistDetail.tracks.total === (tracks ? tracks.length : 0) ? (
//           <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
//             THAT'S ALL
//           </p>
//         ) : (
//           <LoadMore />
//         )}
//       </div>
//       <button onClick={loadMore} ref={pageEnd}>
//         Load More
//       </button>
//     </div>
//   );
// };

// export default PlaylistTracks;

// @@ showing loading spinner only when playlist detail api is called .. if playlist detail is already present then spinner won't show (line 289) @@  //

// /* eslint-disable react-hooks/exhaustive-deps */

// import classes from "./PlaylistTracks.module.css";
// import React, { useEffect, useState} from "react";
// import * as actions from "../store/actions/index";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import { useParams } from "react-router-dom";
// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import LoadMain from "../../ui/loadingAnimations/LoadMain";
// import LoadMore from "../../ui/loadingAnimations/LoadMore";
// import PlaylistTracksRenderer from "../components/PlaylistTracksRenderer";
// import AlbumPlaylistArtistDetailRenderer from "../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";

// const PlaylistTracks = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const { playlistId } = useParams();

//   const mainDivRef = useRef();
//   const playlistDetailRef = useRef();
//   // const pageEnd = useRef();

//   const dispatch = useDispatch();

//   const token = useSelector((state) => state.auth.token);
//   const country = useSelector((state) => state.auth.country);
//   const tracks = useSelector((state) => state.collection.tracks[playlistId]);
//   const playlistDetail = useSelector(
//     (state) => state.collection.playlists[playlistId]
//   );
//   const bgColor = useSelector((state) => state.metadata.bgColor);

//   const loadMore = () => {
//     const offset = tracks ? tracks.length : 0;
//     dispatch(
//       actions.initSetPlaylistTracks(token, playlistId, country, 15, offset)
//     );
//   };

//   let isFetching = false;

//   const checkToLoadMore = () => {
//     if (mainDivRef.current.scrollHeight - mainDivRef.current.clientHeight - mainDivRef.current.scrollTop < 10) {
//       if (!isFetching)
//         loadMore();
//       isFetching = true;
//     }
//   };

//   useEffect(() => {
//     if (playlistDetailRef.current)
//       playlistDetailRef.current.style.backgroundColor = bgColor;
//   }, [bgColor]);

//   useEffect(() => {
//     if (!playlistDetail) {
//       dispatch(actions.initSetPlaylistDetail(token, playlistId, country));
//       setIsLoading(true)
//     }
//   }, []);

//   useEffect(() => {
//     if (playlistDetail) setIsLoading(false);
//     if (mainDivRef.current) checkToLoadMore();
//   }, [playlistDetail]);

//   return isLoading ? (
//     <LoadMain />
//   ) :
//     <div className={classes.playlistTracks} onScroll={checkToLoadMore} ref={mainDivRef}>
//       <div className={classes.playlistDetail} ref={playlistDetailRef}>
//         {playlistDetail ? (<AlbumPlaylistArtistDetailRenderer data={playlistDetail} type="playlist" />) : null}
//       </div>
//       <div className={classes.playPauseDiv} style={{ backgroundColor: bgColor }}>
//         <PlayCircleFilledIcon style={{ fontSize: "4.3rem", color: "lightgreen" }} />
//       </div>
//       {tracks && <PlaylistTracksRenderer tracks={tracks} />}
//       {(tracks && playlistDetail.tracks.total === tracks.length) ?<p style={{color:'white', textAlign:'center', marginTop:'1rem'}}> THAT'S ALL</p> : <LoadMore />}
//       {/* <button onClick={loadMore} ref={pageEnd}>Load More</button> */}
//     </div>

// };

// export default PlaylistTracks;

// // if (pageEnd.current) {
// //   const observer = new IntersectionObserver((enteries) => {
// //     if (enteries[0].isIntersecting) {
// //       loadMore();
// //     }
// //   }, { threshold: 1 })
// //   observer.observe(pageEnd.current)
// // }

// // {/* <button onClick={loadMore} ref={pageEnd}>Load More</button> */ }
