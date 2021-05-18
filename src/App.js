import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import classes from "./App.module.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import CommonLayout from './components/commonLayout/CommonLayout';
import Categories from "./pages/categories/Categories";
import FeaturedPlaylists from "./pages/featuredPlaylists/FeaturedPlaylists";
import NewReleases from "./pages/newReleases/NewReleases";
import CategoryIdPlaylists from "./pages/categoryIdPlaylists/CategoryIdPlaylists";
import PlaylistTracks from "./pages/playlistTracks/PlaylistTracks";
import AlbumTracks from './pages/albumTracks/AlbumTracks';
import ArtistTracks from "./pages/artistTracks/ArtistTracks";
import FollowingPlaylists from "./pages/following/FollowingPlaylists";
import FollowingArtists from "./pages/following/FollowingArtists";
import SearchPlaylists from "./pages/search/searchPlaylists/SearchPlaylists";
import SearchAlbums from "./pages/search/searchAlbums/SearchAlbums";
import SearchArtists from "./pages/search/searchArtists/SearchArtists";
import ArtistAlbums from "./pages/artistAlbums/ArtistAlbums";
import RelatedArtists from "./pages/relatedArtists/RelatedArtists";
import FollowingAlbums from "./pages/following/FollowingAlbums";
import LikedSongs from "./pages/likedSongs/LikedSongs";

const App = () => {
  console.log("app");
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact={true}>
            <Login />
          </Route>

          
          <Route path='/home'>
            <CommonLayout />
            <Home key='homepage' />
          </Route>

          
          <Route path='/browse/categories' exact={true}>
            <CommonLayout />
            <Categories /> {/*categories*/}
          </Route>
          <Route path='/browse/categories/:categoryId' exact={true}>
            <CommonLayout />
            <CategoryIdPlaylists /> {/*playlists in the particular categoryId*/}
          </Route>
          <Route path='/browse/categories/:categoryId/:playlistId' exact={true}>
            <CommonLayout />
            <PlaylistTracks /> {/*tracks in the particular playlistId*/}
          </Route>
          <Route path='/browse/featuredPlaylists' exact={true}>
            <CommonLayout />
            <FeaturedPlaylists />
          </Route>
          <Route path='/browse/featuredPlaylists/:playlistId' exact={true}>
            <CommonLayout />
            <PlaylistTracks /> {/*tracks in the particular playlistId*/}
          </Route>
          <Route path='/browse/newReleases' exact={true}>
            <CommonLayout />
            <NewReleases />
          </Route>
          <Route path='/browse/newReleases/:albumId' exact={true}>
            <CommonLayout />
            <AlbumTracks /> {/*tracks in the particular albumId*/}
          </Route>


          <Route path='/playlist/:playlistId' exact={true}>
            <CommonLayout />
            <PlaylistTracks /> {/*tracks in the particular playlistId*/}
          </Route>


          <Route path='/album/:albumId' exact={true}>
            <CommonLayout />
            <AlbumTracks /> {/*tracks in the particular albumId*/}
          </Route>


          <Route path='/artist/:artistId' exact={true}>
            <CommonLayout />
            <ArtistTracks /> {/*top-tracks for particular artist*/}
          </Route>
          <Route path='/artist/:artistId/albums' exact={true}>
            <CommonLayout />
            <ArtistAlbums /> {/*top-tracks for particular artist*/}
          </Route>
          <Route path='/artist/:artistId/related' exact={true}>
            <CommonLayout />
            <RelatedArtists /> {/*top-tracks for particular artist*/}
          </Route>


          <Route path='/library/playlists' exact={true}>
            <CommonLayout />
            <FollowingPlaylists />
          </Route>
          <Route path='/library/artists' exact={true}>
            <CommonLayout />
            <FollowingArtists />
          </Route>
          <Route path='/library/albums' exact={true}>
            <CommonLayout />
            <FollowingAlbums />
          </Route>


          <Route path='/search' exact={true}>
            <CommonLayout />
            <Search />
          </Route>
          <Route path='/search/albums' exact={true}>
            <CommonLayout />
            <SearchAlbums />
          </Route>
          <Route path='/search/playlists' exact={true}>
            <CommonLayout />
            <SearchPlaylists />
          </Route>
          <Route path='/search/artists' exact={true}>
            <CommonLayout />
            <SearchArtists />
          </Route>
          <Route path='/search/albums/:albumId' exact={true}>
            <CommonLayout />
            <AlbumTracks />
          </Route>
          <Route path='/search/playlists/:playlistId' exact={true}>
            <CommonLayout />
            <PlaylistTracks />
          </Route>
          <Route path='/search/artists/artistId' exact={true}>
            <CommonLayout />
            <ArtistTracks />
          </Route>


          <Route path='/collection/tracks' exact={true}>
            <CommonLayout />
            <LikedSongs />
          </Route>
          {/* <Route path="/recentlyPlayed" exact={true}>
            <CommonLayout />
            <RecentlyPlayed />
          </Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
