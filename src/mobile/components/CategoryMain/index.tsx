import React from "react";
import SearchInput from "../../../components/SearchInput";
import LeftMenu from "../CategoryLeft";
import RightMenu from "../CategoryRight";
import classes from "./categorymain.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import BrandLogo from "../../../assets/images/logo/logoa.png";

const CatrgoryMain = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <Link to={"/home"}>
            <img
              className={`${classes.logo} ${classes.logoW}`}
              src={BrandLogo}
              alt="logo"
            />
            <img className={classes.logo} src={BrandLogo} alt="logo" />
          </Link>
        </div>
      </header>
      <div className={`${classes.searchHeader}`}>
        <SearchInput />
        <h3>Eat what makes you happy</h3>
      </div>
      <main className={`${classes.catergoryMain} mb-xxl`}>
        <div className={classes.catergoryComponent}>
          <LeftMenu />
          <RightMenu />
        </div>
      </main>
    </React.Fragment>
  );
};

export default CatrgoryMain;
