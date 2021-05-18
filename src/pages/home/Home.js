import classes from "./Home.module.css";
import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TilesRenderer from "../../components/tilesRenderer/TilesRenderer";

const Home = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const country = useSelector((state) => state.auth.country);
  const categories = useSelector((state) => state.collection.browse.categories);
  const featuredPlaylists = useSelector(
    (state) => state.collection.browse.featuredPlaylists
  );
  const newReleases = useSelector(
    (state) => state.collection.browse.newReleases
  );
  const followingPlaylists = useSelector(
    (state) => state.collection.following.playlists
  );
  const recentlyPlayed = useSelector(
    (state) => state.collection.recentlyPlayed
  );

  // const recommendationsTracks = useSelector(
  //   (state) => state.collection.recommendations.tracks
  // );

  // const getRandomDistinctIds = (ids, maxCount) => {
  //   const distinctIds = new Set();
  //   for (let i = 0; i < ids.length * 6 && distinctIds.size < maxCount; i++) {
  //     distinctIds.add(ids[Math.floor(Math.random() * ids.length)]);
  //   }
  //   return [...distinctIds];
  // };

  // const getRecommendationsSeed = (followingArtists) => {
  //   const followingArtistsIds = followingArtists.items.map((item) => item.id);
  //   const artistsSeeds = getRandomDistinctIds(
  //     followingArtistsIds,
  //     Math.min(followingArtistsIds.length, 6)
  //   ).join("%2C");
  //   return artistsSeeds;
  // };

  // const checkForInitSetRecomendations = () => {
  //   if (followingArtists.items) {
  //     const recommendationsSeed = getRecommendationsSeed(followingArtists);
  //     console.log(recommendationsSeed);
  //     dispatch(
  //       actions.initSetRecommendations(token, recommendationsSeed, country, 20)
  //     );
  //   }
  // };
  useEffect(() => {
    dispatch(actions.initSetUserProfile(token));
    if (!followingPlaylists.items)
    dispatch(actions.initSetFollowingPlaylists(token, 15, 0));
    // dispatch(actions.initSetFollowingArtists(token, 50));

    if (!featuredPlaylists.items)
      dispatch(actions.initSetFeaturedPlaylists(token, country, 16, 0));
    if (!newReleases.items)
      dispatch(actions.initSetNewReleases(token, country, 16, 0));
    if (!categories.items)
      dispatch(actions.initSetCategories(token, country, 16, 0));
      dispatch(actions.initSetRecentlyPlayed(token, 16));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className={classes.home}>
      {/* <div className={classes.title} style={{ paddingTop: "0" }}>
        <h3>Recommendations</h3>
        <Link to="/recommedations">
          <h4>SEE ALL</h4>
        </Link>
      </div>
      {recommendationsTracks && (
        <TilesRenderer
          data={recommendationsTracks.slice(0, 6)}
          goToRouteOnImageClick="/recommendations"
        />
      )} */}

      {categories.items && (
        <div className={classes.categoriesSection}>
          <div className={classes.title}>
            <h3>Categories</h3>
            <Link to="browse/categories">
              <h4>SEE ALL</h4>
            </Link>
          </div>
          <TilesRenderer data={categories.items.slice(0, 6)} goToRouteOnImageClick="browse/categories" />
        </div>)
      }

      {featuredPlaylists.items && (
        <div className={classes.featuredPlaylistsSection}>
          <div className={classes.title}>
            <h3>Featured Playlists</h3>
            <Link to="browse/featuredPlaylists">
              <h4>SEE ALL</h4>
            </Link>
          </div>
          <TilesRenderer data={featuredPlaylists.items.slice(0, 6)} goToRouteOnImageClick="browse/featuredPlaylists" />
        </div>)
      }

      {newReleases.items && (
        <div className={classes.newReleasesSection}>
          <div className={classes.title}>
            <h3>New releases</h3>
            <Link to="browse/newReleases">
              <h4>SEE ALL</h4>
            </Link>
          </div>
          <TilesRenderer data={newReleases.items.slice(0, 6)} goToRouteOnImageClick="browse/newReleases" />
        </div>)
      }

      {recentlyPlayed.items && (
        <div className={classes.recentlyPlayedSection}>
          <div className={classes.title}>
            <h3>Recently Played</h3>
            {/* <Link to="/recentlyPlayed">
              <h4>SEE ALL</h4>
            </Link> */}
          </div>
          <TilesRenderer data={recentlyPlayed.items.slice(0, 6)} goToRouteOnImageClick="/album"/>
        </div>)
      }

    </div>
  );
};

export default Home;
