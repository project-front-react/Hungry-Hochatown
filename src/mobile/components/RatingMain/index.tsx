import React from "react";
import classes from "./ratingmain.module.scss";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import DEFAULT from "../../../assets/images/default-img.png";

const RatingMain = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <a href="/">
            <img className={classes.logo} src={BrandLogo} alt="logo" />
          </a>
        </div>
      </header>
      <div className={classes.ratingmain}>
        <div className={classes.restBody}>
          <div className={classes.leftSide}>
            <h1>The Blue Oven</h1>
            <p>Pizza, Beverages, Thai</p>
            <small>Los Angeles</small>
          </div>
          <div className={classes.rightSide}>
            <div className={classes.ratingText}>(150 Ratings)</div>
          </div>
        </div>
        <div className={classes.productReview}>
          <div className={classes.topContent}>
            <h3>Review(15)</h3>
            <div className={classes.reviewWrap}>
              {/* {ReviewData.map((item) => (
                <div className={classes.reviewBox}>
                  <div className={classes.media}>
                    <img
                      className={classes.RestocategoryImg}
                      src={item.person_img || DEFAULT}
                      onError={({ currentTarget }) =>
                        (currentTarget.src = DEFAULT)
                      }
                      alt=""
                    />
                    <div className={classes.mediaBody}>
                      <h4>{item.name}</h4>
                    </div>
                  </div>
                  <p>{item.review}</p>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RatingMain;
