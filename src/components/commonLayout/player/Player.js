// import React from "react";
// import classes from "./Player.module.css";

// const Player = () => {
//   return (
//     <div
//       className={classes.player}
//     ></div>
//   );
// };

// export default Player;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import SpotifyPlayer from "react-spotify-web-playback";
import _ from "lodash";
import classes from "./Player.module.css";
import axios from "axios";
import RepeatIcon from "@material-ui/icons/Repeat";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { Link } from "react-router-dom";

const Player = () => {
  console.log("player run");
  // const [play, setPlay] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState({});

  const token = useSelector((state) => state.auth.token);
  const currentPlayingId = useSelector(
    (state) => state.collection.currentPlayingId
  );
  const currentPlayingTracksList = useSelector(
    (state) => state.collection.tracks[currentPlayingId]
  );
  const currentPlayingTrackIndex = useSelector(
    (state) => state.collection.currentPlayingTrackIndex
  );

  // useEffect(() => {
  //   if (currentPlayingTrackIndex) setPlay(true);
  // }, [currentPlayingTrackIndex]);

  useEffect(() => {
    console.log("player useeffect run");
    axios(`https://api.spotify.com/v1/me/player?market=IN`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setCurrentPlaying(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const uri = _.compact([
    _.get(
      currentPlayingTracksList &&
        currentPlayingTracksList[currentPlayingTrackIndex],
      "track.uri"
    ),
    _.get(
      currentPlayingTracksList &&
        currentPlayingTracksList[currentPlayingTrackIndex],
      "uri"
    ),
  ])[0];

  return currentPlaying.item ? (
    <div className={classes.player}>
      <div className={classes.leftSection}>
        <img
          src={_.get(currentPlaying, "item.album.images[0].url")}
          alt=""
        ></img>
        <div>
          <p>{currentPlaying.item.name}</p>
          <p>
            {currentPlaying.item.artists.map((artist, index) => {
              if (index < currentPlaying.item.artists.length - 1)
                return (
                  <Link
                    className={classes.artistLink}
                    to={`/artist/${artist.id}`}
                  >
                    {`${artist.name}, `}
                  </Link>
                );
              else
                return (
                  <Link
                    className={classes.artistLink}
                    to={`/artist/${artist.id}`}
                  >
                    {artist.name}
                  </Link>
                );
            })}
          </p>
        </div>
      </div>
      <div className={classes.midSection}>
        <div>
          <ShuffleIcon style={{ color: "white" }} />
          <SkipPreviousIcon style={{ color: "white" }} />
          <PlayCircleFilledIcon
            style={{ color: "white", fontSize: "2.5rem" }}
          />
          <SkipNextIcon style={{ color: "white" }} />
          <RepeatIcon style={{ color: "white" }} />
        </div>
        <div>
          <p>1:24</p>
          <div>
            <div
              style={{
                height: "4px",
                width: "30%",
                backgroundColor: "white",
              }}
            ></div>
          </div>
          <p>3:48</p>
        </div>
      </div>
      <div className={classes.rightSection}>
        <VolumeDownIcon />
        <div style={{ height: "4px", width: "80%", backgroundColor: "gray" }}>
          <div
            style={{
              height: "100%",
              width: "30%",
              backgroundColor: "lightgray",
            }}
          ></div>
        </div>
      </div>
    </div>
  ) : null;
  // if (!token) return null;
  // return (
  // <SpotifyPlayer className={classes.spotifyPlayer}
  //   styles={{
  //     backgroundColor: "rgb(14, 12, 12)",
  //     position: "fixed",
  //     zIndex: "500",
  //     bottom: "0rem",
  //   }}
  //   token={token}
  //   showSaveIcon
  //   callback={(state) => {
  //     if (!state.isPlaying) setPlay(false);
  //   }}
  //   play={play}
  //   uris={uri ? [uri] : []}
  // />
  // );
  // return <div className={classes.player}></div>;
};

export default Player;
