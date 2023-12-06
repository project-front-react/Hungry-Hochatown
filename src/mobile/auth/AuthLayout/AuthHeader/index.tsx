import React from "react";
import classes from "./authHeader.module.scss";
import PatternImage from "../../../../assets/images/banner/bg-pattern2.png";
const sectionStyle = {
  backgroundImage: "url(" + PatternImage + ")",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  display: "block",
};
const AuthHeader = () => {
  return (
    <div className={`${classes.bgPatternWrap} ${classes.ratio2_1}`}>
      <div
        className={`${classes.bgPattern} ${classes.bgSize}`}
        style={sectionStyle}
      >
        <img
          src={PatternImage}
          style={{ display: "none" }}
          alt="pattern-image"
        />
      </div>
    </div>
  );
};

export default AuthHeader;
