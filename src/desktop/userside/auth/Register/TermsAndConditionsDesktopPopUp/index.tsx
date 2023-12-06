import React, { useState, useEffect } from "react";
import classes from "./termsnndconditionsdesktoppopup.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../mobile/store/reducers/rootReducers";
import { actionGetAboutUs } from "../../../../../mobile/store/actions";
import DesktopCustomPopup from "../../../component/common/DesktopPopup";

const TermsAndConditionsDesktopPopup = (props: any) => {
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = (e: any) => {
    setVisibility(e);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAboutUs("privacy-policy"));
  }, []);

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  const cmsData = useSelector(
    (state: RootState) => state.CommonReducer.saveCmsPageData
  );
  const { pathName } = props;

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
        <DesktopCustomPopup
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
        </DesktopCustomPopup>
      </div>
    </div>
  );
};

export default TermsAndConditionsDesktopPopup;
