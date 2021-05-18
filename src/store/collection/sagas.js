import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "./actions";

export function* initSetCategoriesSaga(action) {
  try {
    const categoriesResponse = yield axios(
      `https://api.spotify.com/v1/browse/categories?country=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setCategories(categoriesResponse.data.categories));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetFeaturedPlaylistsSaga(action) {
  try {
    const featuredPlaylistsResponse = yield axios(
      `https://api.spotify.com/v1/browse/featured-playlists?country=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setFeaturedPlaylists(featuredPlaylistsResponse.data.playlists)
    );
    // props.setSelectedTrack(tracksResponse.data.items[0]);  // optional
  } catch (err) {
    console.error(err);
  }
}

export function* initSetNewReleasesSaga(action) {
  try {
    const setNewReleasesResponse = yield axios(
      `https://api.spotify.com/v1/browse/new-releases?country=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setNewReleases(setNewReleasesResponse.data.albums));
    // props.setSelectedTrack(tracksResponse.data.items[0]);  // optional
  } catch (err) {
    console.error(err);
  }
}

export function* initSetPlaylistTracksSaga(action) {
  try {
    const tracksResponse = yield axios(
      `https://api.spotify.com/v1/playlists/${action.payload.playlistId}/tracks?country=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setTracks(
        action.payload.playlistId,
        tracksResponse.data.items
        // tracksResponse,
        // true
      )
    );

    // props.setSelectedTrack(tracksResponse.data.items[0]);  // optional
  } catch (err) {
    console.error(err);
  }
}

export function* initSetPlaylistDetailSaga(action) {
  try {
    const playlistDetail = yield axios(
      `https://api.spotify.com/v1/playlists/${action.payload.playlistId}?market=${action.payload.country}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setPlaylistDetail(action.payload.playlistId, playlistDetail.data)
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initSetAlbumDetailSaga(action) {
  try {
    const albumDetail = yield axios(
      `https://api.spotify.com/v1/albums/${action.payload.albumId}?market=${action.payload.country}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setAlbumDetail(action.payload.albumId, albumDetail.data));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetArtistDetailSaga(action) {
  try {
    const artistDetail = yield axios(
      `https://api.spotify.com/v1/artists/${action.payload.artistId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setArtistDetail(action.payload.artistId, artistDetail.data)
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initSetAlbumTracksSaga(action) {
  try {
    const tracksResponse = yield axios(
      `https://api.spotify.com/v1/albums/${action.payload.albumId}/tracks?market=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setTracks(
        action.payload.albumId,
        tracksResponse.data.items
        // tracksResponse,
        // true
      )
    );
    // props.setSelectedTrack(tracksResponse.data.items[0]);  // optional
  } catch (err) {
    console.error(err);
  }
}

export function* initSetArtistTopTracksSaga(action) {
  try {
    const tracksResponse = yield axios(
      `https://api.spotify.com/v1/artists/${action.payload.artistId}/top-tracks?market=IN`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setArtistTopTracks(
        action.payload.artistId,
        tracksResponse.data.tracks
        // tracksResponse,
        // true
      )
    );
    // props.setSelectedTrack(tracksResponse.data.items[0]);  // optional
  } catch (err) {
    console.error(err);
  }
}
// export function* initSetCategoryIdPlaylistsSaga(action) {
//   try {
//     const playlistResponse = yield axios(
//       `https://api.spotify.com/v1/browse/categories/${action.payload.categoryId}/playlists?country=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${action.payload.token}`,
//         },
//       }
//     );
//     yield put(
//       actions.setCategoryIdPlaylists(
//         action.payload.categoryId,
//         playlistResponse.data.playlists.items
//       )
//     );
//   } catch (err) {
//     console.error(err);
//   }
// }
export function* initSetCategoryIdPlaylistsSaga(action) {
  try {
    const playlistResponse = yield axios(
      `https://api.spotify.com/v1/browse/categories/${action.payload.categoryId}/playlists?country=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setCategoryIdPlaylists(
        action.payload.categoryId,
        playlistResponse.data.playlists
      )
    );
  } catch (err) {
    console.error(err);
  }
}

// export function* initSetUserPlaylistsSaga(action) {
//   try {
//     const userPlaylists = yield axios(
//       `https://api.spotify.com/v1/me/playlists`,

//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${action.payload.token}`,
//         },
//       }
//     );
//     yield put(actions.setUserPlaylists(userPlaylists.data));
//   } catch (err) {
//     console.error(err);
//   }
// }

export function* initSetFollowingPlaylistsSaga(action) {
  console.log("initSetFollowingPlaylistsSaga");

  try {
    const followingPlaylists = yield axios(
      `https://api.spotify.com/v1/me/playlists?limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setFollowingPlaylists(followingPlaylists.data));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetFollowingAlbumsSaga(action) {
  try {
    const followingAlbums = yield axios(
      `https://api.spotify.com/v1/me/albums?limit=${action.payload.limit}&offset=${action.payload.offset}&market=${action.payload.country}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setFollowingAlbums(followingAlbums.data));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetFollowingArtistsSaga(action) {
  // console.log("initSetFollowingArtistsSaga");

  const url = action.payload.after
    ? `https://api.spotify.com/v1/me/following?type=artist&after=${action.payload.after}&limit=${action.payload.limit}`
    : `https://api.spotify.com/v1/me/following?type=artist&limit=${action.payload.limit}`;

  try {
    const followingArtists = yield axios(
      url,
      // `https://api.spotify.com/v1/me/following?type=artist&limit=${action.payload.limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setFollowingArtists(followingArtists.data.artists));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetArtistAlbumsSaga(action) {
  try {
    const artistAlbums = yield axios(
      `https://api.spotify.com/v1/artists/${action.payload.artistId}/albums?offset=${action.payload.offset}&limit=${action.payload.limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setArtistAlbums(action.payload.artistId, artistAlbums.data)
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initSetRelatedArtistsSaga(action) {
  try {
    const relatedArtists = yield axios(
      `https://api.spotify.com/v1/artists/${action.payload.artistId}/related-artists`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setRelatedArtists(
        action.payload.artistId,
        relatedArtists.data.artists
      )
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initFollowArtistSaga(action) {
  try {
    yield axios(
      `https://api.spotify.com/v1/me/following?type=${action.payload.type}&ids=${action.payload.artistId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    // yield put(actions.runCheckFollowing());
    yield put(actions.setIsFollowing([action.payload.artistId], [true]));
    // yield put(actions.initSetFollowingArtists(action.payload.token, 50));
    yield put(actions.clearFollowingArtists());
  } catch (err) {
    console.error(err);
  }
}

export function* initUnfollowArtistSaga(action) {
  try {
    yield axios(
      `https://api.spotify.com/v1/me/following?type=${action.payload.type}&ids=${action.payload.artistId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    // yield put(actions.runCheckFollowing());
    yield put(actions.setIsFollowing([action.payload.artistId], [false]));
    yield put(actions.clearFollowingArtists());
  } catch (err) {
    console.error(err);
  }
}

export function* initFollowPlaylistSaga(action) {
  try {
    yield axios(
      `https://api.spotify.com/v1/playlists/${action.payload.playlistId}/followers`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    // yield put(actions.runCheckFollowing());
    yield put(actions.setIsFollowing([action.payload.playlistId], [true]));
    yield put(actions.clearFollowingPlaylists());
    yield put(actions.initSetFollowingPlaylists(action.payload.token, 15, 0)); // to show updated following playlists in sidebar
  } catch (err) {
    console.error(err);
  }
}

export function* initUnfollowPlaylistSaga(action) {
  try {
    yield axios(
      `https://api.spotify.com/v1/playlists/${action.payload.playlistId}/followers`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    // yield put(actions.runCheckFollowing());
    yield put(actions.setIsFollowing([action.payload.playlistId], [false]));
    yield put(actions.clearFollowingPlaylists());
    yield put(actions.initSetFollowingPlaylists(action.payload.token, 15, 0));
  } catch (err) {
    console.error(err);
  }
}

export function* initFollowAlbumSaga(action) {
  try {
    yield axios(
      `https://api.spotify.com/v1/me/albums?ids=${action.payload.albumId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );

    // yield put(actions.runCheckFollowing());
    yield put(actions.setIsFollowing([action.payload.albumId], [true]));
    yield put(actions.clearFollowingAlbums());
  } catch (err) {
    console.error(err);
  }
}

export function* initUnfollowAlbumSaga(action) {
  try {
    yield axios(
      `https://api.spotify.com/v1/me/albums?ids=${action.payload.albumId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    // yield put(actions.runCheckFollowing());
    yield put(actions.setIsFollowing([action.payload.albumId], [false]));
    yield put(actions.clearFollowingAlbums());
  } catch (err) {
    console.error(err);
  }
}

export function* initSetLikedSongsSaga(action) {
  try {
    const likedSongs = yield axios(
      `https://api.spotify.com/v1/me/tracks?market=${action.payload.country}&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setlikedSongs(likedSongs.data));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetRecommendationsSaga(action) {
  try {
    const recommendationsResponse = yield axios(
      `https://api.spotify.com/v1/recommendations?market=${action.payload.country}&seed_artists=${action.payload.recommendationsSeed}}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setRecommendations(recommendationsResponse));
  } catch (err) {
    console.error(err);
  }
}
export function* initSetRecentlyPlayedSaga(action) {
  const url = action.payload.after
    ? `https://api.spotify.com/v1/me/player/recently-played?limit=${action.payload.limit}&after=${action.payload.after}`
    : `https://api.spotify.com/v1/me/player/recently-played?limit=${action.payload.limit}`;

  try {
    const recentlyPlayed = yield axios(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${action.payload.token}`,
      },
    });
    yield put(actions.setRecentlyPlayed(recentlyPlayed.data));
  } catch (err) {
    console.error(err);
  }
}

export function* initSetIsFollowingSaga(action) {
  try {
    const isFollowingResponse = yield axios(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${action.payload.tracksIds.join(
        "%2C"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setIsFollowing(action.payload.tracksIds, isFollowingResponse.data)
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initSetIsFollowingPlaylistSaga(action) {
  try {
    const isFollowingResponse = yield axios(
      `https://api.spotify.com/v1/playlists/${action.payload.playlistId}/followers/contains?ids=${action.payload.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setIsFollowing(
        [action.payload.playlistId],
        isFollowingResponse.data
      )
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initSetIsFollowingAlbumSaga(action) {
  try {
    const isFollowingResponse = yield axios(
      `https://api.spotify.com/v1/me/albums/contains?ids=${action.payload.albumId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setIsFollowing(
        [action.payload.playlistId],
        isFollowingResponse.data
      )
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initSetIsFollowingArtistSaga(action) {
  try {
    const isFollowingResponse = yield axios(
      `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${action.payload.artistId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(
      actions.setIsFollowing(
        [action.payload.artistId],
        isFollowingResponse.data
      )
    );
  } catch (err) {
    console.error(err);
  }
}

export function* initFollowTrackSaga(action) {
  try {
    const followTrackResponse = yield axios(
      `https://api.spotify.com/v1/me/tracks?ids=${action.payload.trackId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    console.log(followTrackResponse.data)
    yield put(actions.setIsFollowing([action.payload.trackId], [true]));
  } catch (err) {
    console.error(err);
  }
}
export function* initUnfollowTrackSaga(action) {
  try {
    const UnfollowTrackResponse = yield axios(
      `https://api.spotify.com/v1/me/tracks?ids=${action.payload.trackId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setIsFollowing([action.payload.trackId], [false]));
  } catch (err) {
    console.error(err);
  }
}
