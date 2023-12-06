import React from "react";
import classes from "./onboarding.module.scss";
import BrandLogo from "../../../assets/images/logo/logo4.png";
const OnboardingScreen = () => {
  return (
    <React.Fragment>
      <div className={`${classes.contentWrapper} ${classes.onboardingPage}`}>
        <section>
          <div className={classes.contentWrap}>
            <img src={BrandLogo} alt="brand-logo" className={classes.logo} />
            <h1 className="font-lg title-color">
              Get freshly made food at your doorstep
            </h1>
            <p className="font-md content-color">
              Browse menu and order now to satisfy your cravings. we will
              provide fastest delivery at your location within a minutes.
            </p>
          </div>
        </section>
        <a href="/register" className={`btn-solid ${classes.signUpBtn}`}>
          Sign Up
        </a>
        <span
          className={`${classes.contentColor} font-sm d-block text-center fw-600`}
        >
          Already have an Account?{" "}
          <a href="/login" className={`underline ${classes.signIn}`}>
            Sign In{" "}
          </a>
        </span>
      </div>
    </React.Fragment>
  );
};

export default OnboardingScreen;
