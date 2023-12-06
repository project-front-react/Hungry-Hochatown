import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionGetAboutUs } from "../../../../mobile/store/actions";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./termsandconditionsDesktop.module.scss";
import { animateScroll as scroll } from "react-scroll";

const TermsAndConditionsDesktop = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
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

  return (
    <DesktopLayout>
      <div className={classes.TermsAndConditionsMain}>
      <div className={classes.TitleWrap}>
					<h1>PRIVACY NOTICE</h1>
				</div>
        {loader === true ? (
          <LoadingAnimation />
        ) : (
          <div
            className={classes.TermsAndConditionsContentWrap}
            dangerouslySetInnerHTML={{
              __html: cmsData?.description,
            }}
          ></div>
        )}
      </div>
    </DesktopLayout>
  );
};

export default TermsAndConditionsDesktop;
