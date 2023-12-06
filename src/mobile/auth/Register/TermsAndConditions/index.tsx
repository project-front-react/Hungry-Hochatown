import React, { useState, useEffect } from "react";
import CustomPopup from "../../../components/popup";
import classes from "./termsconditionspopup.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/rootReducers";
import { actionGetAboutUs } from "../../../store/actions";

const TermsConditionsPopUp = (props: any) => {
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const popupCloseHandler = (e: any) => {
    setVisibility(e);
  };
  const cmsData = useSelector(
    (state: RootState) => state.CommonReducer.saveCmsPageData
  );
  useEffect(() => {
    dispatch(actionGetAboutUs("privacy-policy"));
  }, []);

  return (
    <div className={classes.TermsConditionsPopUpMain}>
      <div className={classes.TermsConditions}>
        <input
          type="checkbox"
          id="T&C"
          name="TandC"
          onChange={props.onchange}
          checked={props.state}
        />
        <label className={classes.check} htmlFor="T&C"></label>
        <span
          onClick={(e) => setVisibility(!visibility)}
          className={classes.TandCText}
        >
          Accept Terms & Conditions{" "}
        </span>
        <CustomPopup
          onClose={popupCloseHandler}
          show={visibility}
          title="Hello Jeetendra"
        >
          <div className={classes.TermsAndConditionsContent}>
            <div className={classes.TitleSection}>
              <h2>Privacy Policy</h2>
            </div>
            <div className={classes.ContentWrap}>
              <div
                className={classes.TextWrap}
                dangerouslySetInnerHTML={{
                  __html: cmsData?.description,
                }}
              ></div>
            </div>
          </div>
        </CustomPopup>
      </div>
    </div>
  );
};

export default TermsConditionsPopUp;
