import React from "react";
import SpotifyLogo from "../../../ui/logo/spotifyLogo/SpotifyLogo";
import classes from "./Sidebar.module.css";
import SidebarOption from "./sidebarOption/SidebarOption";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const followingPlaylists = useSelector(
    (state) => state.collection.following.playlists
  );

  const renderFollowingPlaylists = () =>
    followingPlaylists.items.map((item) => {
      return (
        <Link to={`/playlist/${item.id}`} key={item.id}>
          <SidebarOption title={item.name} />
        </Link>
      );
    });

  return (
    <div className={classes.Sidebar}>
      <div className={classes.logoName}>
        <SpotifyLogo type='sidebar' />
        <p>Spotify</p>
      </div>
      <div className={classes.navLinks}>
        <Link to='/home'>
          <SidebarOption title='Home'
           Icon={HomeOutlinedIcon}
           />
        </Link>

        <Link to='/search'>
          <SidebarOption title='Search' 
          Icon={SearchOutlinedIcon}
           />
        </Link>
        <Link to='/library/playlists'>
          <SidebarOption title='Library' 
          Icon={LibraryMusicOutlinedIcon}
           />
        </Link>
      </div>
      <div className={classes.otherPlaylists}>
        <SidebarOption title='Create Playlist' 
        Icon={AddBoxIcon}
         />
        <Link to='/collection/tracks'>
          <SidebarOption title='Liked Songs' 
          Icon={FavoriteOutlinedIcon}
           />
        </Link>
      </div>
      <div className={classes.followingPlaylists}>
        {followingPlaylists.items && renderFollowingPlaylists()}
      </div>
    </div>
  );
};

export default Sidebar;
