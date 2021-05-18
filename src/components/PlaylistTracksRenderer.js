import React, { useEffect, useState, useRef } from "react";
import classes from "./Tracks.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import * as actions from "../store/actions/index";
import { useDispatch } from "react-redux";
import { getFormattedDate, getFormattedDuration } from "../helpers/HelperFcns";

const PlaylistTracksRenderer = (props) => {
  console.log("playlistTracksRenderer run");
  const [showIcons, setShowIcons] = useState(false);
  const [hoverIdx, setHoverIdx] = useState();
  const [clickIdx, setClickIdx] = useState();

  console.log(clickIdx);
  console.log(hoverIdx);

  const dispatch = useDispatch();

  const mainDivRef = useRef(null);
  // const headerRef = useRef(null);
  const token = useSelector((state) => {
    console.log("token useSelector run");
    return state.auth.token;
  });
  const bgColor = useSelector((state) => state.metadata.bgColor);
  const isFollowing = useSelector((state) => state.collection.isFollowing);

  // const followTrack = () => {
  //   dispatch(actions.initFollowTrack(token, playlistId));
  // };

  // const unfollowTrack = () => {
  //   dispatch(actions.initUnfollowTrack(token, playlistId));
  // };

  // useEffect(() => {
  //   mainDivRef.current.style.backgroundColor = bgColor;
  // }, [bgColor]);

  return (
    <div
      className={classes.tracks}
      ref={mainDivRef}
      style={{ backgroundColor: bgColor }}>
      <table>
        <thead>
          <tr className={classes.headingRow}>
            <th className={classes.serialNum}>#</th>
            <th className={classes.title}>TITLE</th>
            <th style={{ width: "300px" }}>ALBUM</th>
            <th>DATE ADDED</th>
            <th style={{ paddingLeft: "0.4rem" }}>DURATION</th>
          </tr>
        </thead>
        <tbody>
          {props.tracks.map((item, index) => {
            return (
              <tr
                key={item.track.id}
                onMouseEnter={(e) => {
                  setHoverIdx(
                    e.target.parentElement.firstElementChild.innerText
                  );
                  setShowIcons(true);
                }}
                onMouseLeave={() => {
                  setShowIcons(false);
                }}
                // onClick={(e) => {
                //   console.log(
                //     e.target.parentElement.firstElementChild.innerText
                //   );
                //   setClickIdx(
                //     e.target.parentElement.firstElementChild.innerText
                //   );
                // }}
                // style={{
                //   backgroundColor:
                //     Number(clickIdx) === index + 1
                //       ? "rgba(199, 191, 191, 0.164)"
                //       : null,
                // }}
              >
                <td className={classes.serialNum}>
                  {showIcons && Number(hoverIdx) === index + 1 ? (
                    <PlayArrowIcon />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className={classes.title}>
                  <img src={item.track.album.images[0].url} alt='' />
                  <div>
                    <p>{item.track.name}</p>
                    <p>
                      {item.track.artists.map((artist, index) => {
                        if (index < item.track.artists.length - 1)
                          return (
                            <Link
                              className={classes.artistLink}
                              to={`/artist/${artist.id}`}>
                              {`${artist.name}, `}
                            </Link>
                          );
                        else
                          return (
                            <Link
                              className={classes.artistLink}
                              to={`/artist/${artist.id}`}>
                              {artist.name}
                            </Link>
                          );
                      })}
                    </p>
                  </div>
                </td>
                <td className={classes.album}>
                  <Link to={`/album/${item.track.album.id}`}>
                    {item.track.album.name}
                  </Link>
                </td>
                <td className={classes.dateAdded}>
                  {getFormattedDate(item.added_at)}
                </td>
                <td className={classes.duration}>
                  <div>
                    {props.type !== "likedTracks" &&
                      showIcons &&
                      Number(hoverIdx) === index + 1 && (
                        <FavoriteBorderIcon
                          style={{
                            color: isFollowing[item.track.id]
                              ? "#1DB954"
                              : "gray",
                            fontSize: "1rem",
                            marginRight: "0.5rem",
                          }}
                          onClick={
                            isFollowing[item.track.id]
                              ? () => {
                                  dispatch(
                                    actions.initUnfollowTrack(
                                      token,
                                      item.track.id
                                    )
                                  );
                                }
                              : () => {
                                  dispatch(
                                    actions.initFollowTrack(
                                      token,
                                      item.track.id
                                    )
                                  );
                                }
                          }>
                          {isFollowing[item.track.id] && (
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
                      )}
                    <p>{getFormattedDuration(item.track.duration_ms)}</p>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistTracksRenderer;
