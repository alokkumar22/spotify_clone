/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import classes from "./Login.module.css";
import SpotifyLogo from "../../ui/logo/spotifyLogo/SpotifyLogo";
import { loginURL } from "../../LoginDetails";
import { useEffect } from "react";
import { getTokenFromURL } from '../../helpers/HelperFcns';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as actions from "../../store/auth/actions";
import { Redirect } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const hashParams = getTokenFromURL();
    window.location.hash = "";

    if (hashParams.access_token) {
      dispatch(actions.setToken(hashParams.access_token));
    }
  }, []);

  if (token) {
    return <Redirect to="/home" />;
  }
  return (
    <div className={classes.Login}>
      <div>
        <SpotifyLogo type="loginScreen" />
        <p>Spotify</p>
      </div>
      <a href={loginURL}>LOGIN WITH SPOTIFY</a>
    </div>
  );
};

export default Login;
