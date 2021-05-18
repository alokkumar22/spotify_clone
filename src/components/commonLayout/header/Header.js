import React, { useRef } from "react";
import classes from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchBox from "./searchBox/SearchBox";
import * as actions from "../../../store/actions/index";
import AccountOptionsNavItem from "./accountOptionsNavItem/AccountOptionsNavItem";

const Header = () => {
  const headerRef = useRef();
  const params = useParams();
  const linksOnLibraryPageRef = useRef();

  const dispatch = useDispatch();

  const bgColor = useSelector((state) => state.metadata.bgColor);
  const history = useHistory();

  const pathname = window.location.pathname.split("/");

  useEffect(() => {
    if (pathname.includes("library")) {
      linksOnLibraryPageRef.current.style.display = "flex";
    } else {
      linksOnLibraryPageRef.current.style.display = "none";
    }
    if (
      !(
        Object.keys(params).includes("playlistId") ||
        Object.keys(params).includes("albumId") ||
        Object.keys(params).includes("artistId")
      )
    )
      dispatch(actions.setPrimaryColor(`rgb(20,20,20)`));
  });

  return (
    <div
      className={classes.header}
      style={{ backgroundColor: bgColor }}
      ref={headerRef}
    >
      <div className={classes.historyBtnsLinks}>
        <div className={classes.historyButtons}>
          <button title="Go back" onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </button>
          <button title="Go forward" onClick={() => history.goForward()}>
            <ArrowForwardIosIcon />
          </button>
        </div>
        <div className={classes.linksOnLibraryPage} ref={linksOnLibraryPageRef}>
          <Link to="/library/playlists">
            <p
              style={{
                backgroundColor: pathname.includes("playlists")
                  ? "#282828"
                  : "rgb(20, 20, 20)",
              }}
            >
              Playlists
            </p>
          </Link>
          <Link to="/library/artists">
            <p
              style={{
                backgroundColor: pathname.includes("artists")
                  ? "#282828"
                  : "rgb(20, 20, 20)",
              }}
            >
              Artists
            </p>
          </Link>
          <Link to="/library/albums">
            <p
              style={{
                backgroundColor: pathname.includes("albums")
                  ? "#282828"
                  : "rgb(20, 20, 20)",
              }}
            >
              Albums
            </p>
          </Link>

          {/* if SidebarOption component is used for rendering these links
          <Link to="/library/playlists" style={{ textDecoration: "none", }} >
            <SidebarOption title="Playlists" type="linksOnLibraryPage" />
          </Link>
          <Link to="/library/artists" style={{ textDecoration: "none", }} >
            <SidebarOption title="Artists" type="linksOnLibraryPage" />
          </Link> */}
        </div>
        <SearchBox />
      </div>
      <AccountOptionsNavItem />
    </div>
  );
};

export default Header;
