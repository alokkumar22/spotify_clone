/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./FeaturedPlaylists.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
// import TilesRenderer from "../components/tilesRenderer/TilesRenderer";



const FeaturedPlaylists = () => {
  const mainDivRef = useRef();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const featuredPlaylists = useSelector(
    (state) => state.collection.browse.featuredPlaylists
  );

  const loadMore = () => {
    dispatch(actions.initSetFeaturedPlaylists(token, country, 15, featuredPlaylists.items.length));
  };

  let isFetching = false;

  const checkToLoadMore = () => {
    if ((featuredPlaylists.total > featuredPlaylists.items.length) && !isFetching && mainDivRef.current.scrollHeight - mainDivRef.current.clientHeight - mainDivRef.current.scrollTop < 10) {
      loadMore();
      isFetching = true;
    }
  };

  useEffect(() => {
    if (!featuredPlaylists.items)
      loadMore();
    // if (mainDivRef.current)
    //   checkToLoadMore();  
  }, []);

  return featuredPlaylists.items === undefined ? ( // initiallly featuredPlaylists is an empty object so we can't write featuredPlaylists===undefined
    <LoadMain />
  ) :
    <div className={classes.featuredPlaylists} onScroll={checkToLoadMore} ref={mainDivRef} >
      <h3>Featured Playlists</h3>
      {featuredPlaylists.items && (  
        <TilesRenderer goToRouteOnImageClick={`/browse/featuredPlaylists`} data={featuredPlaylists.items} />)}
      {(featuredPlaylists.total === featuredPlaylists.items.length) ? <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}> THAT'S ALL</p> : <LoadMore />}

    </div>

};

export default FeaturedPlaylists;
