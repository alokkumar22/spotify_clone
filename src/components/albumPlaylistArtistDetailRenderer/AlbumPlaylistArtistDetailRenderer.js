import React from "react";
import { average } from "color.js";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import classes from "./AlbumPlaylistArtistDetailRenderer.module.css";
import _ from "lodash";
import spotifyIcon from "../../assets/SpotifyIcon.svg";

const AlbumPlaylistArtistDetailRenderer = (props) => {
  const dispatch = useDispatch();

  const getPrimaryColor = (url) => {
    average(url).then((color) => {
      dispatch(
        actions.setPrimaryColor(`rgb(${color[0]},${color[1]},${color[2]})`)
      );
    });
  };

  switch (props.type) {
    case "playlist":
      return (
        <div className={classes.mainDiv}>
          <img
            src={
              _.compact([_.get(props.data, "images[0].url"), spotifyIcon])[0]
            }
            alt=""
            onLoad={() => {
              getPrimaryColor(
                _.compact([_.get(props.data, "images[0].url"), spotifyIcon])[0]
              );
            }}
          ></img>
          <div>
            <p>PLAYLIST</p>
            <h2 className={classes.name} style={{ fontSize: "4rem" }}>
              {props.data.name}
            </h2>
            <p className={classes.description} style={{ marginBottom: "5px" }}>
              {props.data.description}
            </p>
            <span style={{ marginBottom: "5px" }}>
              {props.data.owner.display_name}
            </span>{" "}
            <span
              style={{
                width: "4.5px",
                height: "5px",
                verticalAlign: "middle",
                display: "inline-block",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            >
            </span>
            <span>{props.data.tracks.total} songs</span>
          </div>
        </div>
      );

    case "album":
      return (
        <div className={classes.mainDiv}>
          <img
            src={props.data.images[0].url}
            alt=""
            onLoad={() => {
              getPrimaryColor(props.data.images[0].url);
            }}
          ></img>
          <div>
            <p>ALBUM</p>
            <h2 className={classes.name} style={{ fontSize: "4rem" }}>
              {props.data.name}
            </h2>
            <span style={{ marginBottom: "5px" }}>
              {props.data.artists[0].name}
            </span>
            <span
              style={{
                width: "4.5px",
                height: "5px",
                verticalAlign: "middle",
                display: "inline-block",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            ></span>
            <span style={{ marginBottom: "5px" }}>
              {props.data.release_date.substring(0, 4)}
            </span>
            <span
              style={{
                width: "4.5px",
                height: "5px",
                verticalAlign: "middle",
                display: "inline-block",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            ></span>
            <span>{props.data.total_tracks} songs</span>
          </div>
        </div>
      );

    case "artist":
      getPrimaryColor(props.data.images[0].url);
      return (
        <div className={classes.mainDiv}>
          <div>
            <p>Verified Artist</p>
            <h2
              className={classes.name}
              style={{ fontSize: "5rem", margin: "0.7rem 0" }}
            >
              {props.data.name}
            </h2>{" "}
            <span>{props.data.followers.total} monthly listeners</span>
          </div>
        </div>
      );

    default:
      return null;
  }

  // if we don't want to have multiple switch cases

  //   return (
  //     <div className={classes.renderAlbumPlaylistprops.data}>
  //       <img
  //         src={props.props.data.images[0].url}
  //         alt=""
  //         onLoad={() => {
  //           getPrimaryColor(props.props.data.images[0].url);
  //         }}
  //       ></img>
  //       <div>
  //         <p>{props.type}</p>
  //         <h2 style={{ fontSize: "4rem" }}>{props.props.data.name}</h2>
  //         type==='playlist' &&{" "}
  //         <p className={classes.description} style={{ marginBottom: "5px" }}>
  //           {props.props.data.description}
  //         </p>
  //         type==='playlist' &&{" "}
  //         <span className={classes.ownerName} style={{ marginBottom: "5px" }}>
  //           {props.props.data.owner.display_name}
  //         </span>
  //         type==='album' &&{" "}
  //         <span className={classes.artists} style={{ marginBottom: "5px" }}>
  //           {props.props.data.artists[0].name}
  //         </span>
  //         {" * "}
  //         type==='album' &&{" "}
  //         <span className={classes.release_date} style={{ marginBottom: "5px" }}>
  //           {props.release_date.substring(0, 4)}
  //         </span>
  //         {" * "}
  //         type==='playlist' &&{" "}
  //         <span className={classes.toalTracks}>
  //           {props.props.data.total.tracks} songs
  //         </span>{" "}
  //         type==='album' &&{" "}
  //         <span className={classes.totalTracks}>
  //           {props.props.data.total_tracks} songs
  //         </span>
  //         type==='artist' &&{" "}
  //         <span className={classes.totalFollowers}>
  //           {props.props.data.followers.total} monthly listeners
  //         </span>
  //       </div>
  //     </div>
  //   );
};

export default AlbumPlaylistArtistDetailRenderer;
