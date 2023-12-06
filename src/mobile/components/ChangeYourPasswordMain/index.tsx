import React from "react";
import classes from "./changeyourpasswordmain.module.scss";
import { VscHome } from "react-icons/vsc";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";

const ChangeYourPasswordMain = (props: any) => {
  const {
    setConfirmIcon,
    confirmIcon,
    icon,
    handleOnClick,
    setIcon,
    errors,
    values,
    handleChange,
    onFocus,
    onBlur,
  } = props;
  return (
    <React.Fragment>
      <React.Fragment>
        <div className={classes.contacheader}>
          <div className={classes.logoWrap}>
            <span onClick={() => window.history.back()}>
              <IoMdArrowRoundBack />
            </span>
            <h1>Accounts</h1>
          </div>
          <div className={classes.homeIcon}>
            <Link to="/home">
              <VscHome />
            </Link>
          </div>
        </div>
        <main className={`${classes.editProfilemain} mb-xxl`}>
          <header className={classes.header}>
            <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
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

          <form className={classes.customFrom}>
            <h1>Change Your Password</h1>
            <div className={`${classes.inputBox}`}>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <AiOutlineLock />
            </div>
            {errors.currentPassword && (
              <p className={`${classes.errorText}`}>{errors.currentPassword}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type={icon ? "password" : "text"}
                name="password"
                placeholder="New Password"
                value={values.password}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {!icon ? (
                <AiOutlineEye
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              )}
            </div>
            {errors.password && (
              <p className={`${classes.errorText}`}>{errors.password}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type={confirmIcon ? "password" : "text"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              {!confirmIcon ? (
                <AiOutlineEye
                  onClick={() => {
                    setConfirmIcon(!confirmIcon);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setConfirmIcon(!confirmIcon);
                  }}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className={`${classes.errorText}`}>{errors.confirmPassword}</p>
            )}
            <button
              type="submit"
              className={`${classes.signINbtn}`}
              onClick={handleOnClick}
            >
              Submit
            </button>
          </form>
        </main>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ChangeYourPasswordMain;
