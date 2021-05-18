import React from "react";
import { useSelector } from "react-redux";
import AlbumTracksRenderer from "../utility/renderers/AlbumTracksRenderer";
import classes from "./recommendations.module.css";

const Recommendations = () => {
  const recommendationsTracks = useSelector(
    (state) => state.collection.recommendations.tracks
  );

  return (
    <div className={classes.recommendations}>
      <AlbumTracksRenderer
        type={recommendationsTracks}
        data={recommendationsTracks}
      />
    </div>
  );
};

export default Recommendations;
