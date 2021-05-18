import React from "react";
import { useSelector } from "react-redux";
import Tile from "../../../components/tile/Tile";
import classes from "./SearchArtists.module.css";

const SearchArtists = () => {

  const artists = useSelector((state) => state.metadata.searchItems.artists);

  const renderFn = () => {
    return artists.items.map((item) => {
      return (
        <Tile
          key={item.id}
          goToRouteOnImageClick={`/search/artists/${item.id}`}
          item={item}
        />
      );
    });
  };

  return (
    <div className={classes.searchArtists}>{artists.items && renderFn()}</div>
  );
};

export default SearchArtists;
