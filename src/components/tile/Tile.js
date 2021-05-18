// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import React from "react";
// import { Link } from "react-router-dom";
// import classes from "./Tile.module.css";
// import _ from 'lodash';

// const Tile = (props) => {
//   let src = undefined;
//   if (props.type === 'followingAlbum')
//     src = props.item.album.images[0].url;
//   else if (props.type === 'category')
//     src = props.item.icons[0].url;
//   else
//     src = props.item.images[0].url;

//   return (
//     <div key={props.item.id} className={classes.item}>
//       <Link to={props.goToRouteOnImageClick}>
//         <img style={props.avatarShape === 'circular' ? { borderRadius: '50%' } : { borderRadius: '0%' }}
//          src = {src}
//           alt=""
//         />
//       </Link>
//       <p>{props.item.name}</p>
//       {props.item.description ? <p>{props.item.description}</p> : null}
//       {/* <div className={classes.overlay}>
//         <button className={classes.playBtn}>
//           <PlayCircleFilledIcon style={{ fontSize: "3rem", color: "lightgreen"}}/>
//         </button>
//       </div> */}
//     </div>
//   );
// };
// export default Tile;

import React from "react";
import { Link } from "react-router-dom";
import classes from "./Tile.module.css";
import _ from "lodash";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import spotifyIcon from "../../assets/SpotifyIcon.svg";

const Tile = (props) => {
  return (
    <div key={props.item.id} className={classes.item}>
      <Link to={props.goToRouteOnImageClick}>
        <img
          style={{
            borderRadius: props.avatarShape === "circular" ? "50%" : "0%",
          }}
          // src={([_.get(props.item, 'images[0].url'), _.get(props.item, 'icons[0].url')].filter(Boolean))[0]}
          src={
            _.compact([
              _.get(props.item, "images[0].url"),
              _.get(props.item, "icons[0].url"), // for categories
              _.get(props.item, "album.images[0].url"), // for artistAlbums
              _.get(props.item, "track.album.images[0].url"), // for recentlyPlayed tracks on home page
              spotifyIcon,
            ])[0]
          }
          alt=""
        />
      </Link>
      <p>
        {
          _.compact([
            props.item.name,
            _.get(props.item, "album.name"), // for artistAlbums
            _.get(props.item, "track.album.name"), // for recentlyPlayed tracks on home page
          ])[0]
        }
      </p>
      <p>
        {
          _.compact([
            props.item.description,
            _.get(props.item, "album.description"),
            _.get(props.item, "track.name"),
          ])[0]
        }
      </p>
      <PlayCircleFilledIcon
        className={classes.playCircleFilledIcon}
        style={{ fontSize: "3.5rem", color: "#1DB954" }}
      />
    </div>
  );
};

export default Tile;
