import classes from "./UserPlaylists.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SidebarOption from "../sidebarOption/SidebarOption";

const UserPlaylists = () => {
  const userPlaylists = useSelector((state) => state.collection.userPlaylists);

  const renderFn = () =>
    userPlaylists.map((playlist) => (
      <Link to={`/playlists/${playlist.id}`}>
        <SidebarOption title={playlist.name} />
      </Link>
    ));

  return <div className={classes.userPlaylists}>{renderFn()}</div>;
};

export default UserPlaylists;
