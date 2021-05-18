/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./NewReleases.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
// import TilesRenderer from "../components/tilesRenderer/TilesRenderer";


const NewReleases = () => {
  const mainDivRef = useRef(null);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const newReleases = useSelector(
    (state) => state.collection.browse.newReleases
  );
  let isFetching = false;

  const loadMore = () => {
    dispatch(actions.initSetNewReleases(token, country, 15, newReleases.items.length));
  };

  const checkToLoadMore = () => {
    // console.log(newReleases.items.length)
    if ((newReleases.total > newReleases.items.length) && !isFetching && mainDivRef.current.scrollHeight - mainDivRef.current.clientHeight - mainDivRef.current.scrollTop < 10) {
      loadMore();
      isFetching = true;
    }
  };

  useEffect(() => {
    if (!newReleases.items)
      loadMore();
    // if (mainDivRef.current)
    //   checkToLoadMore();  
  }, []);


  return newReleases.items === undefined ? ( // initiallly newRe;eases is an empty object so we can't write newReleases===undefined
    <LoadMain />
  ) :
    <div className={classes.newReleases} onScroll={checkToLoadMore} ref={mainDivRef}>
      <h3 style={{ color: "white" }}>New Releases</h3>
      {newReleases && (  
        <TilesRenderer goToRouteOnImageClick={`/browse/newReleases`} data={newReleases.items} />)}
      {(newReleases.total === newReleases.items.length) ? <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}> THAT'S ALL</p> : <LoadMore />}
    </div>

};

export default NewReleases;
