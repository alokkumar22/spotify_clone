const getRandomDistinctIds = (ids, maxCount) => {
  const distinctIds = new Set();
  for (let i = 0; i < ids.length * 5 && distinctIds.length < maxCount; i++) {
    distinctIds.add(ids[Math.floor(Math.random() * ids.length)]);
  }
  return [...distinctIds];
};

export const getRecommendationsSeed = (state) => {
  if (
    state.collection.following.artists.items === undefined ||
    state.collection.following.playlists.items === undefined ||
    state.collection.tracks[
      state.collection.following.playlists.items[0].id
    ] === undefined ||
    state.collection.browse.categories === undefined
  ) {
    return undefined;
  } else {
    const followingArtistsIds = state.collection.following.artists.items.map(
      (item) => item.id
    );
    const artistsSeeds = getRandomDistinctIds(followingArtistsIds, 3).join(
      "%2C"
    );

    const tracksIds = state.collection.tracks[
      state.collection.following.playlists.items[0].id
    ].map((item) => item.track.id);
    const tracksSeeds = getRandomDistinctIds(tracksIds, 1).join("%2C");

    const categoriesIds = state.collection.browse.categories.map(
      (category) => category.id
    );
    const categoriesSeeds = getRandomDistinctIds(categoriesIds, 2).join("%2C");

    console.log(artistsSeeds, tracksSeeds, categoriesSeeds);
 
    return {
      artistsSeeds: artistsSeeds,
      categoriesSeeds: categoriesSeeds,
      tracksSeeds: tracksSeeds,
    };
  }
};
