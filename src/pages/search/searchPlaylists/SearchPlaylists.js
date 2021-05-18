import classes from "./SearchPlaylists.module.css";
import React from "react";
import { useSelector } from "react-redux";
import TilesRenderer from "../../../components/tilesRenderer/TilesRenderer";

const SearchPlaylists = () => {
  const playlists = useSelector(
    (state) => state.metadata.searchItems.playlists
  );

  return (
    <div
      className={classes.searchPlaylists}  >
      {playlists.items && <TilesRenderer data={playlists.items} goToRouteOnImageClick="/search/playlists" />}
    </div>
  );
};

export default SearchPlaylists;
