import classes from "./SearchAlbums.module.css";
import React from "react";
import { useSelector } from "react-redux";
import TilesRenderer from "../../../components/tilesRenderer/TilesRenderer";


const SearchAlbums = () => {
  const albums = useSelector((state) => state.metadata.searchItems.albums);
  return (
    <div className={classes.searchAlbums} >
      {albums.items && <TilesRenderer data={albums.items} goToRouteOnImageClick="/search/albums" />}
    </div>
  );
};

export default SearchAlbums;
