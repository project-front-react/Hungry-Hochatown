import React from "react";
import classes from "./contactssmain.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscHome } from "react-icons/vsc";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { Link } from "react-router-dom";
const ContactUsMain = (props: any) => {
  const { pathName, errors, handleChange, onFocus, onBlur, handleOnClick } =
    props;
  return (
    <React.Fragment>
      <div className={classes.contactUsheader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Account</h1>
        </div>
        <div className={classes.homeIcon}>
          <Link to={pathName == "/contact-us-d" ? "/home-d" : "/home"}>
            <VscHome />
          </Link>
        </div>
      </div>
      <main className={`${classes.contactUsmain} mb-xxl`}>
        <header className={classes.header}>
          <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
            <Link to={pathName == "/contact-us-d" ? "/home-d" : "/home"}>
              <img
                className={`${classes.logo} ${classes.logoW}`}
                src={BrandLogo}
                alt="logo"
              />
            </Link>
            <Link to={pathName == "/contact-us-d" ? "/home-d" : "/home"}>
              <img className={classes.logo} src={BrandLogo} alt="logo" />
            </Link>
          </div>
        </header>
        <form className={classes.customFrom}>
          <h1>We'd love to hear from you!</h1>
          <div className={`${classes.inputBox}`}>
            <input
              type="text"
              placeholder="How can we help you?"
              name="question"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          {errors.question && (
            <p className={`${classes.errorText}`}>{errors.question}</p>
          )}
          <div className={`${classes.inputBox}`}>
            <input
              type="text"
              placeholder="Full Name"
              name="username"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          {errors.username && (
            <p className={`${classes.errorText}`}>{errors.username}</p>
          )}
          <div className={`${classes.inputBox}`}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {errors.email && (
            <p className={`${classes.errorText}`}>{errors.email}</p>
          )}
          <div className={`${classes.inputBox}`}>
            <textarea
              placeholder="Message"
              name="message"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          {errors.message && (
            <p className={`${classes.errorText}`}>{errors.message}</p>
          )}
          <button
            type="submit"
            className={`${classes.submitbtn}`}
            onClick={handleOnClick}
          >
            Submit
          </button>
        </form>
      </main>
    </React.Fragment>
  );
};

export default ContactUsMain;
