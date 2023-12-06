import React, { useEffect } from "react";
import Authlayout from "../authlayout";
import classes from "./onboardingdesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionGetAboutUs } from "../../../../mobile/store/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";

const OnboardingDesktop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetAboutUs("landing-page"));
  }, []);

  const cmsData = useSelector(
    (state: RootState) => state.CommonReducer.saveCmsPageData
  );
  return (
    <Authlayout
      imageOverText="Already have an Account?"
      imageOverLink="Sign In"
      navigate={() => navigate("/login")}
    >
      <div className={classes.OnboardingMain}>
        <div className={classes.ImgWrap}>
          <img src={logo} />
        </div>
        <h1>{cmsData.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: cmsData?.description,
          }}
        ></p>
        <button
          className={classes.SignupBtn}
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
        <div
          className={classes.delivery}
          onClick={() => navigate("/register-d")}
        >
          <p>Sign Up as Delivery Person</p>
        </div>
      </div>
    </Authlayout>
  );
};

export default OnboardingDesktop;
