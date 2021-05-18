/* eslint-disable react-hooks/exhaustive-deps */

import classes from "./ArtistTracks.module.css";
import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { average } from "color.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import ArtistsTopTracksRenderer from "../../components/ArtistTopTracksRenderer";
import AlbumPlaylistArtistDetailRenderer from "../../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
import { Link } from "react-router-dom";
// import _ from "lodash";
import axios from "axios";

const ArtistTracks = () => {
  console.log("artist tracks");
  // const [isFollowing, setIsFollowing] = useState(false);
  const [changeSize, setChangeSize] = useState(false);

  const { artistId } = useParams();

  const mainDivRef = useRef();
  const artistDetailRef = useRef();
  // const followButtonRef = useRef();

  const dispatch = useDispatch();

  // const runCheckFollowing = useSelector(
  //   (state) => state.collection.runCheckFollowing
  // );
  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const tracks = useSelector((state) => state.collection.tracks[artistId]);
  const artistDetail = useSelector(
    (state) => state.collection.artists[artistId]
  );
  const artistAlbums = useSelector(
    (state) => state.collection.artistAlbums[artistId]
  );
  const relatedArtists = useSelector(
    (state) => state.collection.artistRelatedArtists[artistId]
  );
  const isFollowing = useSelector((state) => state.collection.isFollowing);
  const bgColor = useSelector((state) => state.metadata.bgColor);

  // const checkFollowing = () => {
  //   console.log("checkFollowing run");
  //   axios(
  //     `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   ).then((res) => {
  //     console.log(res.data[0]);
  //     setIsFollowing(res.data[0]);
  //   });
  // };

  // const getPrimaryColor = (url) => {
  //   average(url).then((color) => {
  //     dispatch(
  //       actions.setPrimaryColor(`rgb(${color[0]},${color[1]},${color[2]})`)
  //     );
  //   });
  // };

  const followArtistHandler = () => {
    dispatch(actions.initFollowArtist(token, "artist", artistId));
  };

  const unfollowArtistHandler = () => {
    dispatch(actions.initUnfollowArtist(token, "artist", artistId));
  };

  // useEffect(() => {
  //   console.log("checkFollowing useeffect run");
  //   checkFollowing();
  // }, [runCheckFollowing, artistId]);

  useEffect(() => {
    if (!artistDetail)
      dispatch(actions.initSetArtistDetail(token, artistId, country));

    if (isFollowing[artistId] === undefined)
      dispatch(actions.initSetIsFollowingArtist(token, artistId));

    if (!tracks)
      dispatch(actions.initSetArtistTopTracks(token, artistId, country));

    if (!artistAlbums)
      dispatch(actions.initSetArtistAlbums(token, artistId, country, 15, 0));

    if (!relatedArtists)
      dispatch(actions.initSetRelatedArtists(token, artistId));
  }, [artistId]); // we are going to this page again when we click on one of the related artist and if we take an empty dependency array then this useEffect won't run so no data will be shown upon clicking one of the related artist

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

  // useEffect(() => {
  //   if (artistDetail) {
  //     artistDetail.images[0] && getPrimaryColor(artistDetail.images[0].url);
  //     artistDetailRef.current.style.backgroundImage = artistDetail.images[0]
  //       ? `linear-gradient(to right, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 0.10) 30% ), url(${artistDetail.images[0].url})`
  //       : null;
  //   }
  // }, [artistDetail]);

  return artistDetail === undefined ? (
    <LoadMain />
  ) : (
    <div className={classes.artistTracks} ref={mainDivRef}>
      
      
      
      <div
        className={classes.artistDetail}
        ref={artistDetailRef}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 0.10) 30% ),  url(${artistDetail.images[0].url})`,
        }}
      >
        <AlbumPlaylistArtistDetailRenderer 
          data={artistDetail} type="artist" 
        />
      </div>

      <div
        className={classes.playPauseDiv}
        style={{ backgroundColor: bgColor }}
      >
        <PlayCircleFilledIcon
          style={{ fontSize: "4.3rem", color: "#1DB954" }}
        />
        <button
          className={changeSize && classes.changeSize}
          onClick={
            // setChangeSize(!changeSize);
            isFollowing[artistId] ? unfollowArtistHandler : followArtistHandler
          }
        >
          {isFollowing[artistId] ? "FOLLOWING" : "FOLLOW"}
        </button>
      </div>
      {tracks && <ArtistsTopTracksRenderer tracks={tracks} />}
      {artistAlbums && (
        <div
          className={classes.artistAlbumsSection}
          style={{ padding: "1rem" }}
        >
          <div className={classes.title}>
            <h3>Albums</h3>
            <Link to={`/artist/${artistId}/albums`}>
              <h4>SEE ALL</h4>
            </Link>
          </div>
          <TilesRenderer
            data={artistAlbums.items.slice(0, 6)}
            goToRouteOnImageClick="/album"
          />
        </div>
      )}
      {relatedArtists && (
        <div
          className={classes.relatedArtistsSection}
          style={{ padding: "1rem" }}
        >
          <div className={classes.title}>
            <h3>Fans also like</h3>
            <Link to={`/artist/${artistId}/related`}>
              <h4>SEE ALL</h4>
            </Link>
          </div>
          <TilesRenderer
            data={relatedArtists.slice(0, 6)}
            goToRouteOnImageClick="/artist"
            avatarShape="circular"
          />
        </div>
      )}
    </div>
  );
};

export default ArtistTracks;

// /* eslint-disable react-hooks/exhaustive-deps */

// import classes from "./ArtistTracks.module.css";
// import React, { useEffect, useState } from "react";
// import * as actions from "../store/actions/index";
// import { average } from "color.js";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useRef } from "react";
// import { useParams } from "react-router-dom";
// import LoadMain from "../../ui/loadingAnimations/LoadMain";
// import ArtistsTopTracksRenderer from "../components/ArtistTopTracksRenderer";
// import AlbumPlaylistArtistDetailRenderer from "../components/albumPlaylistArtistDetailRenderer/AlbumPlaylistArtistDetailRenderer";
// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import TilesRenderer from "../components/tilesRenderer/TilesRenderer";
// import { Link } from "react-router-dom";
// import _ from "lodash";
// import axios from "axios";

// const ArtistTracks = () => {
//   console.log("artist tracks");
//   const [isFollowing, setIsFollowing] = useState(false);
//   const { artistId } = useParams();
//   console.log(artistId);

//   const mainDivRef = useRef();
//   const artistDetailRef = useRef();

//   const dispatch = useDispatch();

//   const token = useSelector((state) => state.auth.token);
//   const country = useSelector((state) => state.auth.country);
//   const tracks = useSelector((state) => state.collection.tracks[artistId]);
//   const artistDetail = useSelector(
//     (state) => state.collection.artists[artistId]
//   );
//   const followingArtists = useSelector(
//     (state) => state.collection.following.artists
//   );
//   const artistAlbums = useSelector(
//     (state) => state.collection.artistAlbums[artistId]
//   );
//   const relatedArtists = useSelector(
//     (state) => state.collection.artistRelatedArtists[artistId]
//   );
//   const bgColor = useSelector((state) => state.metadata.bgColor);

//   const checkFollowing = () => {
//     return _.find(followingArtists.items, (item) => item.id === artistId);
//   };

//   const getPrimaryColor = (url) => {
//     average(url).then((color) => {
//       dispatch(
//         actions.setPrimaryColor(`rgb(${color[0]},${color[1]},${color[2]})`)
//       );
//     });
//   };

//   const followArtist = () => {
//     dispatch(actions.initFollowArtist(token, "artist", artistId));
//   };
//   const unfollowArtist = () => {
//     dispatch(actions.initUnfollowArtist(token, "artist", artistId));
//   };

//   useEffect(() => {
//     if (!artistDetail)
//       dispatch(actions.initSetArtistDetail(token, artistId, country));

//     if (!tracks)
//       dispatch(actions.initSetArtistTopTracks(token, artistId, country));

//     if (!artistAlbums)
//       dispatch(actions.initSetArtistAlbums(token, artistId, country, 15, 0));

//     if (!relatedArtists)
//       dispatch(actions.initSetRelatedArtists(token, artistId));
//   });

//   useEffect(() => {
//     if (artistDetail) {
//       getPrimaryColor(artistDetail.images[0].url);
//       artistDetailRef.current.style.backgroundImage = `linear-gradient(to right, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 0.10) 30% ),
//       url(${artistDetail.images[0].url})`;
//     }
//   }, [artistDetail]);

//   return artistDetail === undefined ? (
//     <LoadMain />
//   ) : (
//     <div className={classes.artistTracks} ref={mainDivRef}>
//       <div className={classes.artistDetail} ref={artistDetailRef}>
//         <AlbumPlaylistArtistDetailRenderer data={artistDetail} type="artist" />
//       </div>
//       <div
//         className={classes.playPauseDiv}
//         style={{ backgroundColor: bgColor }}
//       >
//         <PlayCircleFilledIcon
//           style={{ fontSize: "4.3rem", color: "lightgreen" }}
//         />
//         <button onClick={checkFollowing() ? unfollowArtist : followArtist}>
//           {checkFollowing() ? "FOLLOWING" : "FOLLOW"}
//         </button>
//       </div>
//       {tracks && <ArtistsTopTracksRenderer tracks={tracks} />}
//       {artistAlbums && (
//         <div
//           className={classes.artistAlbumsSection}
//           style={{ padding: "1rem" }}
//         >
//           <div className={classes.title}>
//             <h3>Albums</h3>
//             <Link to={`/artist/${artistId}/albums`}>
//               <h4>SEE ALL</h4>
//             </Link>
//           </div>
//           <TilesRenderer
//             data={artistAlbums.items.slice(0, 6)}
//             goToRouteOnImageClick="/album"
//           />
//         </div>
//       )}
//       {relatedArtists && (
//         <div
//           className={classes.relatedArtistsSection}
//           style={{ padding: "1rem" }}
//         >
//           <div className={classes.title}>
//             <h3>Fans also like</h3>
//             <Link to={`/artist/${artistId}/related`}>
//               <h4>SEE ALL</h4>
//             </Link>
//           </div>
//           <TilesRenderer
//             data={relatedArtists.slice(0, 6)}
//             goToRouteOnImageClick="/artist"
//             avatarShape="circular"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArtistTracks;
