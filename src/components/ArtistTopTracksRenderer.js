import React, { useEffect, useRef, useState } from "react";
import classes from "./Tracks.module.css";
import { useSelector } from "react-redux";
import { getFormattedDuration } from "../helpers/HelperFcns";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/index";

const ArtistsTopTracksRenderer = ({ tracks, artistId }) => {
  const [showIcons, setShowIcons] = useState(false);
  const [hoverIdx, setHoverIdx] = useState();

  const dispatch = useDispatch();

  const mainDivRef = useRef();

  const token = useSelector((state) => {
    console.log("token useSelector run");
    return state.auth.token;
  });
  const bgColor = useSelector((state) => state.metadata.bgColor);
  const isFollowing = useSelector((state) => state.collection.isFollowing);

  // useEffect(() => {
  //   mainDivRef.current.style.backgroundColor = bgColor;
  // });

  return (
    <div
      className={classes.tracks}
      ref={mainDivRef}
      style={{ backgroundColor: bgColor }}
    >
      <div className={classes.playPauseBtn}></div>
      <table>
        <thead>
          <tr className={classes.headingRow}>
            <th className={classes.serialNum}>#</th>
            <th className={classes.title} style={{ paddingRight: "200px" }}>
              TITLE
            </th>
            <th>DURATION</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((item, index) => {
            return (
              <tr
                key={index}
                onMouseEnter={(e) => {
                  setHoverIdx(
                    e.target.parentElement.firstElementChild.innerText
                  );
                  setShowIcons(true);
                }}
                onMouseLeave={() => {
                  // e.target.parentElement.firstElementChild.innerHTML = "@";
                  setShowIcons(false);
                }}
              >
                <td className={classes.serialNum}>
                  {showIcons && Number(hoverIdx) === index + 1 ? (
                    <PlayArrowIcon />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className={classes.title} style={{ paddingRight: "200px" }}>
                  <p>{item.name}</p>
                </td>
                <td className={classes.duration}>
                  <div>
                    {showIcons && Number(hoverIdx) === index + 1 && (
                      <FavoriteBorderIcon
                        style={{
                          color: isFollowing[item.id] ? "#1DB954" : "gray",
                          fontSize: "1rem",
                          marginRight: "0.5rem",
                        }}
                        onClick={
                          isFollowing[item.id]
                            ? () => {
                                dispatch(
                                  actions.initUnfollowTrack(token, item.id)
                                );
                              }
                            : () => {
                                dispatch(
                                  actions.initFollowTrack(token, item.id)
                                );
                              }
                        }
                      >
                        {isFollowing[item.id] && (
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
                    <p>{getFormattedDuration(item.duration_ms)}</p>
                  </div>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistsTopTracksRenderer;
