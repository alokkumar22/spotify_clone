import React, { useState } from "react";
import classes from "./AccountOptionsNavItem.module.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { useSelector } from "react-redux";
import AccountOptionsDropDown from '../../../dropdowns/AccountOptionsDropdown';
import Backdrop from "../../../../ui/backdrop/Backdrop";

const AccountOptionsNavItem = () => {
  const [open, setOpen] = useState();

  const userProfile = useSelector((state) => state.auth.userProfile);

  const closeAccountOptionsDropdownHandler = () => {
    setOpen(false);
  };

  return (
    <div className={classes.accountOptionsNavItem}>
      <button
        onClick={() => {
          setOpen(!open);
        }}>
        <span>
          <PersonOutlineIcon />
        </span>
        <span>{userProfile && userProfile.display_name}</span>
      </button>
      {open && (
        <Backdrop
          closeAccountOptionsDropdownHandler={
            closeAccountOptionsDropdownHandler
          }
        />
      )}
      {open && <AccountOptionsDropDown />}
    </div>
  );
};

export default AccountOptionsNavItem;
