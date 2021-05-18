export const authEndPoint = `https://accounts.spotify.com/authorize`;
const redirectURI = `https://spotify-clone-two.vercel.app/`; // %2F
// const redirectURI = `http://localhost:3000/`; // %2F
const clientId = `cee731fa988943e6a3683f5a1b3ada85`;

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-follow-read",
  "user-library-read",
  "user-library-modify",
  "user-follow-modify",
  "streaming",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-recently-played",
];

export const loginURL = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

// 1. Loader on each component on initial loadingAnimations
// 2. loader on scroll down + pop up if no data found
// 3. Logout login feature
// 4. search Bar icon + place holder
// 5. follow artist
// 6. hover add play button
