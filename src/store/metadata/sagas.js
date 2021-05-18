import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "./actions";

export function* initSetSearchItemsSaga(action) {
  try {
    const searchItems = yield axios(
      `https://api.spotify.com/v1/search?q=${action.payload.searchTerm}&type=artist%2Calbum%2Cplaylist%2Ctrack&limit=${action.payload.limit}&offset=${action.payload.offset}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      }
    );
    yield put(actions.setSearchItems(searchItems.data));
    // props.setSelectedTrack(tracksResponse.data.items[0]);  // optional
  } catch (err) {
    console.error(err);
  }
}
