import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";

import {
  initSetAlbumTracksSaga,
  initSetPlaylistTracksSaga,
  initSetCategoryIdPlaylistsSaga,
  initSetCategoriesSaga,
  // initSetUserPlaylistsSaga,
  initSetFeaturedPlaylistsSaga,
  initSetArtistDetailSaga,
  initSetPlaylistDetailSaga,
  initSetArtistTopTracksSaga,
  initSetNewReleasesSaga,
  initSetAlbumDetailSaga,
  initSetFollowingArtistsSaga,
  initSetFollowingPlaylistsSaga,
  initFollowArtistSaga,
  initUnfollowArtistSaga,
  initSetRecommendationsSaga,
  initSetArtistAlbumsSaga,
  initFollowPlaylistSaga,
  initUnfollowPlaylistSaga,
  initFollowAlbumSaga,
  initUnfollowAlbumSaga,
  initSetRelatedArtistsSaga,
  initSetFollowingAlbumsSaga,
  initSetLikedSongsSaga,
  initSetRecentlyPlayedSaga,
  initSetIsFollowingSaga,
  initSetIsFollowingPlaylistSaga,
  initSetIsFollowingArtistSaga,
  initSetIsFollowingAlbumSaga,
  initFollowTrackSaga,
  initUnfollowTrackSaga,
} from "./collection/sagas";

import { initSetUserProfileSaga } from "./auth/sagas";

import { initSetSearchItemsSaga } from "./metadata/sagas";

export function* watchCollectionSaga() {
  yield takeEvery(actionTypes.INIT_SET_ALBUM_TRACKS, initSetAlbumTracksSaga);
  yield takeEvery(
    actionTypes.INIT_SET_PLAYLIST_TRACKS,
    initSetPlaylistTracksSaga
  );
  yield takeEvery(actionTypes.INIT_SET_CATEGORIES, initSetCategoriesSaga);
  yield takeEvery(
    actionTypes.INIT_SET_FEATURED_PLAYLISTS,
    initSetFeaturedPlaylistsSaga
  );
  yield takeEvery(actionTypes.INIT_SET_NEW_RELEASES, initSetNewReleasesSaga);
  yield takeEvery(
    actionTypes.INIT_SET_CATEGORY_ID_PLAYLISTS,
    initSetCategoryIdPlaylistsSaga
  );
  // yield takeEvery(
  //   actionTypes.INIT_SET_USER_PLAYLISTS,
  //   initSetUserPlaylistsSaga
  // );
  yield takeEvery(
    actionTypes.INIT_SET_PLAYLIST_DETAIL,
    initSetPlaylistDetailSaga
  );
  yield takeEvery(actionTypes.INIT_SET_ALBUM_DETAIL, initSetAlbumDetailSaga);
  yield takeEvery(
    actionTypes.INIT_SET_ARTIST_TOP_TRACKS,
    initSetArtistTopTracksSaga
  );
  yield takeEvery(actionTypes.INIT_SET_ARTIST_DETAIL, initSetArtistDetailSaga);
  yield takeEvery(
    actionTypes.INIT_SET_FOLLOWING_PLAYLISTS,
    initSetFollowingPlaylistsSaga
  );
  yield takeEvery(
    actionTypes.INIT_SET_FOLLOWING_ALBUMS,
    initSetFollowingAlbumsSaga
  );
  yield takeEvery(
    actionTypes.INIT_SET_FOLLOWING_ARTISTS,
    initSetFollowingArtistsSaga
  );
  yield takeEvery(actionTypes.INIT_FOLLOW_ARTIST, initFollowArtistSaga);
  yield takeEvery(actionTypes.INIT_UNFOLLOW_ARTIST, initUnfollowArtistSaga);
  yield takeEvery(actionTypes.INIT_FOLLOW_PLAYLIST, initFollowPlaylistSaga);
  yield takeEvery(actionTypes.INIT_UNFOLLOW_PLAYLIST, initUnfollowPlaylistSaga);
  yield takeEvery(actionTypes.INIT_FOLLOW_ALBUM, initFollowAlbumSaga);
  yield takeEvery(actionTypes.INIT_UNFOLLOW_ALBUM, initUnfollowAlbumSaga);
  yield takeEvery(
    actionTypes.INIT_SET_RECOMMENDATIONS,
    initSetRecommendationsSaga
  );
  yield takeEvery(actionTypes.INIT_SET_ARTIST_ALBUMS, initSetArtistAlbumsSaga);
  yield takeEvery(
    actionTypes.INIT_SET_RELATED_ARTISTS,
    initSetRelatedArtistsSaga
  );
  yield takeEvery(actionTypes.INIT_SET_LIKED_TRACKS, initSetLikedSongsSaga);
  yield takeEvery(
    actionTypes.INIT_SET_RECENTLY_PLAYED,
    initSetRecentlyPlayedSaga
  );
  yield takeEvery(actionTypes.INIT_SET_IS_FOLLOWING, initSetIsFollowingSaga);
  yield takeEvery(
    actionTypes.INIT_SET_IS_FOLLOWING_PLAYLIST,
    initSetIsFollowingPlaylistSaga
  );
  yield takeEvery(
    actionTypes.INIT_SET_IS_FOLLOWING_ARTIST,
    initSetIsFollowingArtistSaga
  );
  yield takeEvery(
    actionTypes.INIT_SET_IS_FOLLOWING_ALBUM,
    initSetIsFollowingAlbumSaga
  );

  yield takeEvery(actionTypes.INIT_FOLLOW_TRACK, initFollowTrackSaga);
  yield takeEvery(actionTypes.INIT_UNFOLLOW_TRACK, initUnfollowTrackSaga);
}

export function* watchAuthSaga() {
  yield takeEvery(actionTypes.INIT_SET_USER_PROFILE, initSetUserProfileSaga);
}
export function* watchMetadataSaga() {
  yield takeEvery(actionTypes.INIT_SET_SEARCH_ITEMS, initSetSearchItemsSaga);
}
