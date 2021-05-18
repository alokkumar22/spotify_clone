/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./ArtistAlbums.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
import { useParams } from "react-router";

const ArtistAlbums = () => {
    const mainDivRef = useRef(null);
    const { artistId } = useParams();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const country = useSelector((state) => state.auth.country);
    const artistAlbums = useSelector(
        (state) => state.collection.artistAlbums[artistId]
    );

    let isFetching = false;

    const loadMore = () => {
        const offset = artistAlbums ? artistAlbums.items.length : 0;
        dispatch(actions.initSetArtistAlbums(token, artistId, country, 15, offset));
    };

    const checkToLoadMore = () => {
        if ((artistAlbums.total > artistAlbums.items.length) && !isFetching && mainDivRef.current.scrollHeight - mainDivRef.current.clientHeight - mainDivRef.current.scrollTop < 10) {
            loadMore();
            isFetching = true;
        }
    };

    useEffect(() => {
        if (!artistAlbums)
            loadMore();
        // if (mainDivRef.current)
        //   checkToLoadMore();  
    }, []);


    return artistAlbums === undefined ? (
        <LoadMain />
    ) :
        <div className={classes.artistAlbums} onScroll={checkToLoadMore} ref={mainDivRef}>
            <h3 style={{ color: "white" }}>Albums</h3>
            {artistAlbums && (
                <TilesRenderer goToRouteOnImageClick={`/album`} data={artistAlbums.items} />)}
            {(artistAlbums && artistAlbums.total === artistAlbums.items.length) ? <p style={{ color: 'white', textAlign: 'center', marginTop: '1rem' }}> THAT'S ALL</p> : <LoadMore />}
        </div>

};

export default ArtistAlbums;
