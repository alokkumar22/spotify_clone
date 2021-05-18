/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlbumTracksRenderer from "../../components/AlbumTracksRenderer";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.metadata.searchTerm);
  const token = useSelector((state) => state.auth.token);
  const albums = useSelector((state) => state.metadata.searchItems.albums);
  const playlists = useSelector(
    (state) => state.metadata.searchItems.playlists
  );
  const tracks = useSelector((state) => state.metadata.searchItems.tracks);

  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(actions.initSetSearchItems(token, searchTerm, 25, 0));
      setIsLoading(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (albums || playlists || tracks)
      setIsLoading(false)
  }, [albums, playlists, tracks])

  return isLoading ? <LoadMain />
    : <div className={classes.search}>
      {tracks && (
        <div className={classes.tracksSection}>
          <AlbumTracksRenderer type="searchTracks" tracks={tracks.items} />
        </div>
      )}

      {albums &&
        <div className={classes.albumSection}>
          <div className={classes.title}>
            <h3>Albums</h3>
            <Link to="/search/albums">
              <h4>See All</h4>
            </Link>
          </div>
          <TilesRenderer data={albums.items.slice(0, 6)} goToRouteOnImageClick="/search/albums" />
        </div>
      }

      {playlists && (
        <div className={classes.playlistSection}>
          <div className={classes.title}>
            <h3>Playlists</h3>
            <Link to="/search/playlists">
              <h4>See All</h4>
            </Link>
          </div>
          <TilesRenderer data={playlists.items.slice(0, 6)} goToRouteOnImageClick="/search/playlists" />
        </div>)
      }

      {/* {artists && (
        <div className={classes.title}>
          <h3>Artists</h3>
          <Link to="/search/artists">
            <h4>See All</h4>
          </Link>       
           <TilesRenderer data={artists.items.slice(0, 7)} goToRouteOnImageClick="/search/artists" />
        </div>) 
      } */}
    </div>
};

export default Search;
