/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./CategoryIdPlaylists.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useParams } from "react-router-dom";

import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";
import LoadMain from "../../ui/loadingAnimations/LoadMain";
import LoadMore from "../../ui/loadingAnimations/LoadMore";
import { camelCaseToSentenceCase } from "../../helpers/HelperFcns";

const CategoryIdPlaylists = () => {
  const { categoryId } = useParams();
  console.log(categoryId);
  const mainDivRef = useRef();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const playlists = useSelector(
    (state) => state.collection.categoryIdPlaylists[categoryId]
  );

  const loadMore = () => {
    const offset = playlists ? playlists.items.length : 0;
    dispatch(
      actions.initSetCategoryIdPlaylists(token, categoryId, country, 15, offset)
    );
  };

  let isFetching = false;

  const checkToLoadMore = () => {
    if (
      playlists.total > playlists.items.length &&
      !isFetching &&
      mainDivRef.current.scrollHeight -
        mainDivRef.current.clientHeight -
        mainDivRef.current.scrollTop <
        10
    ) {
      loadMore();
      isFetching = true;
    }
  };

  useEffect(() => {
    if (!playlists) loadMore();
  }, []);

  return playlists === undefined ? (
    <LoadMain />
  ) : (
    <div
      className={classes.categoryIdPlaylists}
      onScroll={checkToLoadMore}
      ref={mainDivRef}>
      <h3>Playlists inside {camelCaseToSentenceCase(`${categoryId}`)}</h3>
      {playlists && (
        <TilesRenderer
          goToRouteOnImageClick={`/browse/categories/${categoryId}`}
          data={playlists.items}
        />
      )}
      {playlists.total === playlists.items.length ? (
        <p style={{ color: "white", textAlign: "center", marginTop: "1rem" }}>
          {" "}
          THAT'S ALL
        </p>
      ) : (
        <LoadMore />
      )}
    </div>
  );
};

export default CategoryIdPlaylists;
