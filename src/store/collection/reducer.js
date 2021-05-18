import * as actionTypes from "../actionTypes";

const initialState = {
  recommendations: {},
  following: {
    artists: {},
    playlists: {},
    albums: {},
  },
  browse: {
    featuredPlaylists: {},
    newReleases: {},
    categories: {},
  },
  categoryIdPlaylists: {}, // {categoryId1 : playlists(array of objects), categoryId2 : playlists(array of objects), ..}
  tracks: {}, // {playlistId1/albumId1/artistId1 : tracks, playlistId2/albumId2/artistId2 : tracks, ..}
  userPlaylists: [],
  artists: {}, // {artistId1: artistId1Detail, artistId2: artistId2Detail, }
  playlists: {}, // {playlistId1:playlistId1Detail, playlistId2:playlistId2Detail}
  albums: {}, // {albumId1:albumId1Detail, albumId2:albumId2Detail}
  artistAlbums: {}, // {artistId1:array of albums, artistId2:array of albums ... }
  artistRelatedArtists: {},
  recentlyPlayed: {},
  currentPlayingTrackIndex: null,
  currentPlayingId: null,
  likedSongs: {},
  runCheckFollowing: false,
  isFollowing: {},  // {trackId/albumId/playlistId,artistId:true/false, ...} 
};

export const collectionReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          tracks: action.payload.recommendationsResponse.tracks,
          seeds: action.payload.recommendationsResponse.seeds,
        },
      };

    case actionTypes.SET_CATEGORIES:
      if (state.browse.categories.items) {
        action.payload.categories.items = [
          ...state.browse.categories.items,
          ...action.payload.categories.items,
        ];
      }
      return {
        ...state,
        browse: {
          ...state.browse,
          categories: {
            ...state.browse.categories,
            ...action.payload.categories,
          },
        },
      };

    // case actionTypes.SET_FOLLOWING_ARTISTS:
    //   if (state.following.artists.items) {
    //     action.payload.followingArtists.items = [
    //       ...state.following.artists.items,
    //       ...action.payload.followingArtists.items,
    //     ];
    //   }

    //   return {
    //     ...state,
    //     following: {
    //       ...state.following,
    //       artists: {
    //         ...state.following.artists,
    //         ...action.payload.followingArtists,
    //       },
    //     },
    //   };

    case actionTypes.SET_FOLLOWING_ARTISTS:
      return {
        ...state,
        following: {
          ...state.following,
          artists: action.payload.followingArtists,
        },
      };

    case actionTypes.CLEAR_FOLLOWING_ARTISTS:
      return {
        ...state,
        following: {
          ...state.following,
          artists: {},
        },
      };
    case actionTypes.CLEAR_FOLLOWING_PLAYLISTS:
      return {
        ...state,
        following: {
          ...state.following,
          playlists: {},
        },
      };
    case actionTypes.CLEAR_FOLLOWING_ALBUMS:
      return {
        ...state,
        following: {
          ...state.following,
          albums: {},
        },
      };

    case actionTypes.RUN_CHECK_FOLLOWING:
      return {
        ...state,
        runCheckFollowing: !state.runCheckFollowing,
      };

    case actionTypes.SET_FOLLOWING_PLAYLISTS:
      if (state.following.playlists.items) {
        action.payload.followingPlaylists.items = [
          ...state.following.playlists.items,
          ...action.payload.followingPlaylists.items,
        ];
      }
      return {
        ...state,
        following: {
          ...state.following,
          playlists: {
            ...action.payload.followingPlaylists,
          },
        },
      };

    case actionTypes.SET_FOLLOWING_ALBUMS:
      if (state.following.albums.items) {
        action.payload.followingAlbums.items = [
          ...state.following.albums.items,
          ...action.payload.followingAlbums.items,
        ];
      }
      return {
        ...state,
        following: {
          ...state.following,
          albums: {
            ...state.following.albums,
            ...action.payload.followingAlbums,
          },
        },
      };

    case actionTypes.SET_FEATURED_PLAYLISTS:
      if (state.browse.featuredPlaylists.items) {
        action.payload.featuredPlaylists.items = [
          ...state.browse.featuredPlaylists.items,
          ...action.payload.featuredPlaylists.items,
        ];
      }
      return {
        ...state,
        browse: {
          ...state.browse,
          featuredPlaylists: {
            ...state.browse.featuredPlaylists,
            ...action.payload.featuredPlaylists,
          },
        },
      };

    case actionTypes.SET_NEW_RELEASES:
      if (state.browse.newReleases.items) {
        action.payload.newReleases.items = [
          ...state.browse.newReleases.items,
          ...action.payload.newReleases.items,
        ];
      }
      // else {
      //   action.payload.newReleases.items = [...action.payload.newReleases.items];
      // }
      return {
        ...state,
        browse: {
          ...state.browse,
          newReleases: {
            ...state.browse.newReleases,
            ...action.payload.newReleases,
          },
        },
      };

    case actionTypes.SET_SELECTED_GENRE_ID:
      return {
        ...state,
        selectedGenreId: action.payload.selectedGenreId,
      };

    case actionTypes.SET_USER_PLAYLISTS:
      return {
        ...state,
        userPlaylists: action.payload.userPlaylists,
      };

    case actionTypes.SET_PLAYLIST_DETAIL:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          [action.payload.playlistId]: action.payload.playlistDetail,
        },
      };

    case actionTypes.SET_ALBUM_DETAIL:
      return {
        ...state,
        albums: {
          ...state.albums,
          [action.payload.albumId]: action.payload.albumDetail,
        },
      };

    case actionTypes.SET_ARTIST_DETAIL:
      return {
        ...state,
        artists: {
          ...state.artists,
          [action.payload.artistId]: action.payload.artistDetail,
        },
      };

    // case actionTypes.SET_CATEGORY_ID_PLAYLISTS:
    //   let updatedcategoryIdPlaylists = [];
    //   if (
    //     !Object.keys(state.categoryIdPlaylists).includes(
    //       action.payload.categoryId
    //     )
    //   ) {
    //     updatedcategoryIdPlaylists = action.payload.categoryIdPlaylists;
    //   } else {
    //     updatedcategoryIdPlaylists = [
    //       ...state.categoryIdPlaylists[action.payload.categoryId],
    //       ...action.payload.categoryIdPlaylists,
    //     ];
    //   }
    //   return {
    //     ...state,
    //     categoryIdPlaylists: {
    //       ...state.categoryIdPlaylists,
    //       [action.payload.categoryId]: updatedcategoryIdPlaylists,
    //     },
    //   };
    case actionTypes.SET_CATEGORY_ID_PLAYLISTS:
      if (
        Object.keys(state.categoryIdPlaylists).includes(
          action.payload.categoryId
        )
      ) {
        console.log("already present");
        action.payload.categoryIdPlaylists.items = [
          ...state.categoryIdPlaylists[action.payload.categoryId].items,
          ...action.payload.categoryIdPlaylists.items,
        ];
      } else {
        action.payload.categoryIdPlaylists.items = [
          ...action.payload.categoryIdPlaylists.items,
        ];
      }
      return {
        ...state,
        categoryIdPlaylists: {
          ...state.categoryIdPlaylists,
          [action.payload.categoryId]: action.payload.categoryIdPlaylists,
        },
      };

    case actionTypes.SET_ARTIST_ALBUMS:
      if (Object.keys(state.artistAlbums).includes(action.payload.artistId)) {
        action.payload.artistAlbums.items = [
          ...state.artistAlbums[action.payload.artistId].items,
          ...action.payload.artistAlbums.items,
        ];
      }
      // else {
      //   action.payload.categoryIdPlaylists.items = [...action.payload.categoryIdPlaylists.items];
      // }
      return {
        ...state,
        artistAlbums: {
          ...state.artistAlbums,
          [action.payload.artistId]: action.payload.artistAlbums,
        },
      };

    case actionTypes.SET_RELATED_ARTISTS:
      // if (Object.keys(state.artistAlbums).includes(action.payload.artistId)) {
      //   action.payload.artistAlbums.items = [...state.artistAlbums[action.payload.artistId].items, ...action.payload.artistAlbums.items];
      // }
      // else {
      //   action.payload.categoryIdPlaylists.items = [...action.payload.categoryIdPlaylists.items];
      // }
      return {
        ...state,
        artistRelatedArtists: {
          ...state.artistRelatedArtists,
          [action.payload.artistId]: action.payload.relatedArtists,
        },
      };

    case actionTypes.SET_TRACKS:
      let updatedTracks = [];
      if (!Object.keys(state.tracks).includes(action.payload.id)) {
        updatedTracks = action.payload.tracks;
      } else {
        updatedTracks = [
          ...state.tracks[action.payload.id],
          ...action.payload.tracks,
        ];
      }
      return {
        ...state,
        tracks: {
          ...state.tracks,
          [action.payload.id]: updatedTracks,
        },

        // ...state,
        // tracks: {
        //   ...state.tracks,
        //   [action.payload.playlistId]: {
        //     ...state.tracks[action.payload.playlistId],
        //     total: action.payload.data.total,
        //     tracksList: action.payload.data.items.map((_track) => {
        //       return {
        //         id: _track.track.id,
        //         name: _track.track.name,
        //         artists: _track.track.artists.map((artist) => {
        //           return artist.name;
        //         }),
        //         duration_ms: _track.track.duration_ms,
        //       };
        //     }),
        //   },

        // [action.payload.playlistId]: action.payload.tracks.map((_track) => {
        //   return {
        //     id: _track.track.id,
        //     name: _track.track.name,
        //     artists: _track.track.artists.map((artist) => {
        //       return artist.name;
        //     }),
        //     duration_ms: _track.track.duration_ms,
        //   };
        // }),
        // },
      };

    case actionTypes.SET_LIKED_TRACKS:
      if (state.likedSongs.items) {
        action.payload.likedSongs.items = [
          ...state.likedSongs.items,
          action.payload.likedSongs.items,
        ];
      }
      return {
        ...state,
        likedSongs: {
          ...state.likedSongs,
          ...action.payload.likedSongs,
        },
      };

    case actionTypes.CLEAR_LIKED_TRACKS:
      return {
        ...state,
        likedSongs: {},
      };

    case actionTypes.SET_ARTIST_TOP_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          [action.payload.id]: action.payload.tracks,
        },
      };
    case actionTypes.SET_CURRENT_PLAYING_TRACK_INDEX:
      return {
        ...state,
        currentPlayingTrackIndex: action.payload.index,
      };

    case actionTypes.SET_CURRENT_PLAYING_ID:
      return {
        ...state,
        currentPlayingId: action.payload.id,
      };

    case actionTypes.SET_RECENTLY_PLAYED:
      return {
        ...state,
        recentlyPlayed: action.payload.recentlyPlayed,
      };

    case actionTypes.SET_IS_FOLLOWING:
      var newData = {};
      action.payload.tracksIds.forEach((key, i) => newData[key] = action.payload.isFollowingResponse[i]);      
      return {
        ...state,
        isFollowing:{...state.isFollowing, ...newData},
      };

    default:
      return state;
  }
};
