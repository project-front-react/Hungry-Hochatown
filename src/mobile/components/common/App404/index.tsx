import React from "react";
import classes from "./pagenotfound.module.scss";
import BannerImg from "../../../../assets/images/banner/404.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducers";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const deliverystate = useSelector(
    (state: RootState) => state.DeliveryReducer.saveDeliveryData
  );
  const goHome = () => {
    let userType = localStorage.getItem("userType");
    if (!userType) {
      window.location.replace("/#/onboarding");
    } else {
      if (userType == "2") {
        window.location.replace("/#/login");
      } else if (userType == "3") {
        window.location.replace("/#/login-d");
      }
    }
  };
  return (
    <React.Fragment>
      <div className={classes.ErrorWrp}>
        <div className={classes.BannerBox}>
          <img src={BannerImg} />
        </div>
        <div className={classes.BannerSection}>
          <h2>PAGE NOT FOUND</h2>
          <p>
            We are sorry but the page you are looking for doesn't exist or has
            been removed. Please check back later or search again.
          </p>
          <button onClick={goHome}>Back To Home</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
