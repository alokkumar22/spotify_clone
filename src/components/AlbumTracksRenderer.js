import React, { useState } from "react";
import classes from "./Tracks.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFormattedDuration } from "../helpers/HelperFcns";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import * as actions from "../store/actions/index";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch } from "react-redux";

const AlbumTracksRenderer = ({ type, tracks }) => {
  const [showTraingle, setShowTriangle] = useState(false);
  const [hoveringIdx, setHoveringIdx] = useState();

  const dispatch = useDispatch();

  const token = useSelector((state) => {
    console.log("token useSelector run");
    return state.auth.token;
  });
  const bgColor = useSelector((state) => state.metadata.bgColor);
  const isFollowing = useSelector((state) => state.collection.isFollowing);

  return (
    <div
      className={classes.tracks}
      style={{ backgroundColor: type === "normalAlbumTracks" ? bgColor : null }}
    >
      <table>
        <thead>
          <tr className={classes.headingRow}>
            <th className={classes.serialNum}>#</th>
            <th className={classes.title} style={{ paddingRight: "200px" }}>
              TITLE
            </th>
            {type === "renderAlbumTracks" && <th>ALBUM</th>}
            <th>DURATION</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((item, index) => {
            return (
              <tr
                key={index}
                onMouseEnter={(e) => {
                  setHoveringIdx(
                    e.target.parentElement.firstElementChild.innerText
                  );
                  setShowTriangle(true);
                }}
                onMouseLeave={() => {
                  // e.target.parentElement.firstElementChild.innerHTML = "@";
                  setShowTriangle(false);
                }}
              >
                <td className={classes.serialNum}>
                  {showTraingle && Number(hoveringIdx) === index + 1 ? (
                    <PlayArrowIcon />
                  ) : (
                    index + 1
                  )}
                </td>
                <td className={classes.title} style={{ paddingRight: "200px" }}>
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.artists.map((artist, index) => {
                        if (index < item.artists.length - 1)
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
                </td>
                {type === "renderAlbumTracks" && (
                  <td className={classes.album}>
                    <Link to={`/album/${item.album.id}`}>
                      {item.album.name}
                    </Link>
                  </td>
                )}
                <td className={classes.duration}>
                  <div>
                    <FavoriteIcon
                      style={{
                        color: isFollowing[item.id] ? "#1DB954" : "white",
                        fontSize: "1rem",
                        marginRight:'0.5rem'
                      }}
                      onClick={
                        isFollowing[item.id]
                          ? () => {
                              dispatch(
                                actions.initUnfollowTrack(token, item.id)
                              );
                            }
                          : () => {
                              dispatch(actions.initFollowTrack(token, item.id));
                            }
                      }
                    />
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

export default AlbumTracksRenderer;
