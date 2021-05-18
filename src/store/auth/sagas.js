import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "./actions";

export function* initSetUserProfileSaga(action) {
  try {
    const userProfile = yield axios(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${action.payload.token}`,
      },
    });
    yield put(actions.setUserProfile(userProfile.data));
  } catch (err) {
    console.error(err);
  }
}
