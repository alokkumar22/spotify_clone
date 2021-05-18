/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./RelatedArtists.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
import { useParams } from "react-router";

const RelatedArtists = () => {
    const mainDivRef = useRef(null);
    const dispatch = useDispatch();
    const { artistId } = useParams(null);

    const token = useSelector((state) => state.auth.token);
    const relatedArtists = useSelector(
        (state) => state.collection.artistRelatedArtists[artistId]
    );

    const loadMore = () => {
        dispatch(actions.initSetRelatedArtists(token, artistId));
    };

    useEffect(() => {
        if (!relatedArtists)
            loadMore();
    }, []);


    return relatedArtists === undefined ? ( // initiallly newReleases is an empty object so we can't write relatedArtists===undefined
        <LoadMain />
    ) :
        <div className={classes.relatedArtists} ref={mainDivRef}>
            <h3 style={{ color: "white" }}>Artists</h3>
            {relatedArtists && (
                <TilesRenderer goToRouteOnImageClick={`/artist`} data={relatedArtists} avatarShape='circular'/>)
            }
        </div>

};

export default RelatedArtists;
