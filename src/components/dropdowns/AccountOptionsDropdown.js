import React from "react";
import DropdownItem from "./dropdownItem/DropdownItem";
import classes from "./style.module.css";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const AccountOptionsDropdown = () => {

  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.auth.token);

  const logoutHandler = () => {
    dispatch(actions.logout());
  };

  // useEffect(() => {
  //     if (token === null)
  //         return <Redirect to="/" />;
  // }, [token])

  if (!token) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.accountOptionsDropdown}>
      <ul className={classes.dropDownItems}>
        <DropdownItem title="Account" />
        <DropdownItem title="Profile" />
        <button
          onClick={logoutHandler}
          style={{background: "none", border: "none", width: "100%", textAlign: "left"}}>
          <DropdownItem title="Log out" />
        </button>
      </ul>
    </div>
  );
};

export default AccountOptionsDropdown;
