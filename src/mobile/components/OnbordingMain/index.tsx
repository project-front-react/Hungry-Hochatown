import React, { useDebugValue, useEffect } from "react";
import classes from "./onboardingmain.module.scss";
import BrandLogo from "../../../assets/images/logo/logo4.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { useDispatch } from "react-redux";
import { actionGetAboutUs } from "../../store/actions";

const OnbordingMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetAboutUs("landing-page"));
  }, []);

  const cmsData = useSelector(
    (state: RootState) => state.CommonReducer.saveCmsPageData
  );
  return (
    <React.Fragment>
      <div className={`${classes.loadingWrapper} ${classes.splashLogo}`}>
        <div className={classes.contentWrap}>
          <img src={BrandLogo} alt="brand-logo" className={classes.logo} />
          <div className={classes.onbordingscreen}>
            <h1>{cmsData.title}</h1> 
            <p
							dangerouslySetInnerHTML={{
								__html: cmsData?.description,
							}}
						></p>
            <button onClick={() => navigate("/register")}>Sign Up</button>
            <p>
              Already have an Account?
              <span onClick={() => navigate("/login")}> Sign In</span>
            </p>
          </div>
        </div>
        <div className={classes.delivery}>
          <p onClick={() => navigate("/register-d")}>
            Sign Up as Delivery Person
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OnbordingMain;
