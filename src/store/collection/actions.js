import * as actionTypes from "../actionTypes";

export const initSetCategories = (
  token,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  return {
    type: actionTypes.INIT_SET_CATEGORIES,
    payload: {
      token: token,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};
export const setCategories = (categories) => {
  return {
    type: actionTypes.SET_CATEGORIES,
    payload: {
      categories: categories,
    },
  };
};

export const initSetFeaturedPlaylists = (
  token,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  return {
    type: actionTypes.INIT_SET_FEATURED_PLAYLISTS,
    payload: {
      token: token,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const initSetLikedSongs = (
  token,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  return {
    type: actionTypes.INIT_SET_LIKED_TRACKS,
    payload: {
      token: token,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const setlikedSongs = (likedSongs) => {
  return {
    type: actionTypes.SET_LIKED_TRACKS,
    payload: {
      likedSongs: likedSongs,
    },
  };
};




export const setFeaturedPlaylists = (featuredPlaylists) => {
  return {
    type: actionTypes.SET_FEATURED_PLAYLISTS,
    payload: {
      featuredPlaylists: featuredPlaylists,
    },
  };
};

export const initFollowArtist = (token, type, artistId) => {
  return {
    type: actionTypes.INIT_FOLLOW_ARTIST,
    payload: {
      token: token,
      type: type,
      artistId: artistId,
    },
  };
};

export const initUnfollowArtist = (token, type, artistId) => {
  return {
    type: actionTypes.INIT_UNFOLLOW_ARTIST,
    payload: {
      token: token,
      type: type,
      artistId: artistId,
    },
  };
};

export const clearFollowingArtists = () => {
  return {
    type: actionTypes.CLEAR_FOLLOWING_ARTISTS,
    payload: {},
  };
};
export const clearFollowingPlaylists = () => {
  return {
    type: actionTypes.CLEAR_FOLLOWING_PLAYLISTS,
    payload: {},
  };
};
export const clearFollowingAlbums = () => {
  return {
    type: actionTypes.CLEAR_FOLLOWING_ALBUMS,
    payload: {},
  };
};

export const clearLikedTracks = () => {
  return {
    type: actionTypes.CLEAR_LIKED_TRACKS,
    payload: {},
  };
};



export const initFollowPlaylist = (token, playlistId) => {
  return {
    type: actionTypes.INIT_FOLLOW_PLAYLIST,
    payload: {
      token: token,
      playlistId: playlistId,
    },
  };
};

export const initUnfollowPlaylist = (token, playlistId) => {
  return {
    type: actionTypes.INIT_UNFOLLOW_PLAYLIST,
    payload: {
      token: token,
      playlistId: playlistId,
    },
  };
};

export const initFollowAlbum = (token, albumId) => {
  return {
    type: actionTypes.INIT_FOLLOW_ALBUM,
    payload: {
      token: token,
      albumId: albumId,
    },
  };
};

export const initUnfollowAlbum = (token, albumId) => {
  return {
    type: actionTypes.INIT_UNFOLLOW_ALBUM,
    payload: {
      token: token,
      albumId: albumId,
    },
  };
};

export const initSetNewReleases = (
  token,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  return {
    type: actionTypes.INIT_SET_NEW_RELEASES,
    payload: {
      token: token,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};
export const setNewReleases = (newReleases) => {
  return {
    type: actionTypes.SET_NEW_RELEASES,
    payload: {
      newReleases: newReleases,
    },
  };
};

export const setSelectedGenreId = (selectedGenreId) => {
  return {
    type: actionTypes.SET_SELECTED_GENRE_ID,
    payload: {
      selectedGenreId: selectedGenreId,
    },
  };
};

export const initSetCategoryIdPlaylists = (
  token,
  categoryId,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  // set playlists for given genreId
  return {
    type: actionTypes.INIT_SET_CATEGORY_ID_PLAYLISTS,
    payload: {
      token: token,
      categoryId: categoryId,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};
export const setCategoryIdPlaylists = (categoryId, categoryIdPlaylists) => {
  // set playlists for given genreId
  return {
    type: actionTypes.SET_CATEGORY_ID_PLAYLISTS,
    payload: {
      categoryId: categoryId,
      categoryIdPlaylists: categoryIdPlaylists,
    },
  };
};

// export const initSetUserPlaylists = (token) => {
//   return {
//     type: actionTypes.INIT_SET_USER_PLAYLISTS,
//     payload: {
//       token: token,
//     },
//   };
// };

// export const setUserPlaylists = (userPlaylists) => {
//   return {
//     type: actionTypes.SET_USER_PLAYLISTS,
//     payload: {
//       userPlaylists: userPlaylists,
//     },
//   };
// };

export const initSetFollowingPlaylists = (token, limit, offset) => {
  console.log("initSetFollowingPlaylists");
  return {
    type: actionTypes.INIT_SET_FOLLOWING_PLAYLISTS,
    payload: {
      token: token,
      limit: limit,
      offset: offset,
    },
  };
};

export const setFollowingPlaylists = (followingPlaylists) => {
  return {
    type: actionTypes.SET_FOLLOWING_PLAYLISTS,
    payload: {
      followingPlaylists: followingPlaylists,
    },
  };
};

export const initSetFollowingAlbums = (token, country, limit, offset) => {
  return {
    type: actionTypes.INIT_SET_FOLLOWING_ALBUMS,
    payload: {
      token: token,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const setFollowingAlbums = (followingAlbums) => {
  return {
    type: actionTypes.SET_FOLLOWING_ALBUMS,
    payload: {
      followingAlbums: followingAlbums,
    },
  };
};

export const initSetFollowingArtists = (token, after, limit = 10) => {
  console.log("initSetFollowingArtists");
  return {
    type: actionTypes.INIT_SET_FOLLOWING_ARTISTS,
    payload: {
      token: token,
      after: after,
      limit: limit,
    },
  };
};

export const setFollowingArtists = (followingArtists) => {
  return {
    type: actionTypes.SET_FOLLOWING_ARTISTS,
    payload: {
      followingArtists: followingArtists,
    },
  };
};

export const runCheckFollowing = () => {
  return {
    type: actionTypes.RUN_CHECK_FOLLOWING,
    payload: {},
  };
};

export const initSetPlaylistDetail = (token, playlistId, country) => {
  // set playlists for given genreId
  return {
    type: actionTypes.INIT_SET_PLAYLIST_DETAIL,
    payload: {
      token: token,
      playlistId: playlistId,
      country: country,
    },
  };
};
export const setPlaylistDetail = (playlistId, playlistDetail) => {
  // set playlists for given genreId
  return {
    type: actionTypes.SET_PLAYLIST_DETAIL,
    payload: {
      playlistId: playlistId,
      playlistDetail: playlistDetail,
    },
  };
};

export const initSetAlbumDetail = (token, albumId, country) => {
  // set playlists for given genreId
  return {
    type: actionTypes.INIT_SET_ALBUM_DETAIL,
    payload: {
      token: token,
      albumId: albumId,
      country: country,
    },
  };
};
export const setAlbumDetail = (albumId, albumDetail) => {
  // set playlists for given genreId
  return {
    type: actionTypes.SET_ALBUM_DETAIL,
    payload: {
      albumId: albumId,
      albumDetail: albumDetail,
    },
  };
};

export const initSetArtistDetail = (token, artistId, country) => {
  // set playlists for given genreId
  return {
    type: actionTypes.INIT_SET_ARTIST_DETAIL,
    payload: {
      token: token,
      artistId: artistId,
      country: country,
    },
  };
};
export const setArtistDetail = (artistId, artistDetail) => {
  // set playlists for given genreId
  return {
    type: actionTypes.SET_ARTIST_DETAIL,
    payload: {
      artistId: artistId,
      artistDetail: artistDetail,
    },
  };
};

export const initSetArtistAlbums = (
  token,
  artistId,
  country,
  limit = 20,
  offset = 0
) => {
  // set playlists for given genreId
  console.log("initSetArtistAlbums");
  return {
    type: actionTypes.INIT_SET_ARTIST_ALBUMS,
    payload: {
      token: token,
      artistId: artistId,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const setArtistAlbums = (artistId, artistAlbums) => {
  // set playlists for given genreId
  return {
    type: actionTypes.SET_ARTIST_ALBUMS,
    payload: {
      artistId: artistId,
      artistAlbums: artistAlbums,
    },
  };
};

export const initSetRelatedArtists = (token, artistId) => {
  // set playlists for given genreId
  return {
    type: actionTypes.INIT_SET_RELATED_ARTISTS,
    payload: {
      token: token,
      artistId: artistId,
    },
  };
};

export const setRelatedArtists = (artistId, relatedArtists) => {
  // set playlists for given genreId
  return {
    type: actionTypes.SET_RELATED_ARTISTS,
    payload: {
      artistId: artistId,
      relatedArtists: relatedArtists,
    },
  };
};

export const setSelectedPlaylistId = (selectedPlaylistId) => {
  return {
    type: actionTypes.SET_SELECTED_PLAYLIST_ID,
    payload: {
      selectedPlaylistId: selectedPlaylistId,
    },
  };
};

export const initSetAlbumTracks = (
  token,
  albumId,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  // set tracks for given playlistId

  return {
    type: actionTypes.INIT_SET_ALBUM_TRACKS,
    payload: {
      token: token,
      albumId: albumId,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const initSetPlaylistTracks = (
  token,
  playlistId,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  // set tracks for given playlistId

  return {
    type: actionTypes.INIT_SET_PLAYLIST_TRACKS,
    payload: {
      token: token,
      playlistId: playlistId,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const initSetArtistTopTracks = (
  token,
  artistId,
  country = "IN",
  limit = 10,
  offset = 0
) => {
  return {
    type: actionTypes.INIT_SET_ARTIST_TOP_TRACKS,
    payload: {
      token: token,
      artistId: artistId,
      country: country,
      limit: limit,
      offset: offset,
    },
  };
};

export const setTracks = (id, tracks) => {
  // set tracks for given playlistId
  return {
    type: actionTypes.SET_TRACKS,
    payload: {
      id: id,
      tracks: tracks,
    },
  };
};
export const setArtistTopTracks = (id, tracks) => {
  // set tracks for given playlistId
  return {
    type: actionTypes.SET_ARTIST_TOP_TRACKS,
    payload: {
      id: id,
      tracks: tracks,
    },
  };
};

export const setSelectedTrackId = (selectedTrackId) => {
  return {
    type: actionTypes.SET_SELECTED_TRACK_ID,
    payload: {
      selectedTrackId: selectedTrackId,
    },
  };
};

// export const initSetRecommendations = (
//   token,
//   seed_artists,
//   seed_genres,
//   seed_tracks,
//   country = "IN",
//   limit = 10
// ) => {
//   return {
//     type: actionTypes.INIT_SET_RECOMMENDATIONS,
//     payload: {
//       token: token,
//       seed_artists: seed_artists,
//       seed_genres: seed_genres,
//       seed_tracks: seed_tracks,
//       country: country,
//       limit: limit,
//     },
//   };
// };

export const initSetRecommendations = (
  token,
  recommendationsSeed,
  country = "IN",
  limit = 10
) => {
  return {
    type: actionTypes.INIT_SET_RECOMMENDATIONS,
    payload: {
      token: token,
      recommendationsSeed: recommendationsSeed,
      country: country,
      limit: limit,
    },
  };
};
export const setRecommendations = (recommendationsResponse) => {
  return {
    type: actionTypes.SET_RECOMMENDATIONS,
    payload: {
      recommendationsResponse: recommendationsResponse,
    },
  };
};

export const setCurrentPlayingTrackIndex = (index) => {
  return {
    type: actionTypes.SET_CURRENT_PLAYING_TRACK_INDEX,
    payload: {
      index: index,
    },
  };
};

export const setCurrentPlayingId = (id) => {
  return {
    type: actionTypes.SET_CURRENT_PLAYING_ID,
    payload: {
      id: id,
    },
  };
};
export const initSetRecentlyPlayed = (token, limit, after) => {
  return {
    type: actionTypes.INIT_SET_RECENTLY_PLAYED,
    payload: {
      token: token,
      limit: limit,
      after: after,
    },
  };
};
export const setRecentlyPlayed = (recentlyPlayed) => {
  return {
    type: actionTypes.SET_RECENTLY_PLAYED,
    payload: {
      recentlyPlayed: recentlyPlayed,
    },
  };
};
export const initSetIsFollowing = (token, tracksIds) => {
  return {
    type: actionTypes.INIT_SET_IS_FOLLOWING,
    payload: {
      token: token,
      tracksIds: tracksIds,
    },
  };
};
export const setIsFollowing = (tracksIds, isFollowingResponse) => {
  return {
    type: actionTypes.SET_IS_FOLLOWING,
    payload: {
      tracksIds: tracksIds,
      isFollowingResponse: isFollowingResponse,
    },
  };
};
export const initSetIsFollowingPlaylist = (token, playlistId, userId) => {
  return {
    type: actionTypes.INIT_SET_IS_FOLLOWING_PLAYLIST,
    payload: {
      token: token,
      playlistId: playlistId,
      userId: userId,
    },
  };
};
export const initSetIsFollowingAlbum = (token, albumId) => {
  return {
    type: actionTypes.INIT_SET_IS_FOLLOWING_ALBUM,
    payload: {
      token: token,
      albumId: albumId,
    },
  };
};
export const initSetIsFollowingArtist = (token, artistId) => {
  return {
    type: actionTypes.INIT_SET_IS_FOLLOWING_ARTIST,
    payload: {
      token: token,
      artistId: artistId,
    },
  };
};

export const initFollowTrack = (token, trackId) => {
  return {
    type: actionTypes.INIT_FOLLOW_TRACK,
    payload: {
      token: token,
      trackId: trackId
    },
  };
};
export const initUnfollowTrack = (token, trackId) => {
  return {
    type: actionTypes.INIT_UNFOLLOW_TRACK,
    payload: {
      token: token,
      trackId: trackId
    },
  };
};
