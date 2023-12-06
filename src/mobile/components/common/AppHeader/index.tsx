import React from "react";
import classes from "./appHeader.module.scss";
import BrandLogo from "../../../../assets/images/logo/logoa.png";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={classes.header}>
      <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
        <Link to={"/home"}>
          <img
            className={`${classes.logo} ${classes.logoW}`}
            src={BrandLogo}
            alt="logo"
          />
        </Link>
        <Link to={"/home"}>
          <img className={classes.logo} src={BrandLogo} alt="logo" />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
