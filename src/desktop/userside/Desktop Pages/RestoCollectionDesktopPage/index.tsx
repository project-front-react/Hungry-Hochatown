import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import RestoCollectionDesktop from "../../component/RestoCollectionDesktop";
import { animateScroll as scroll } from "react-scroll";

const RestoCollectionDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  return (
    <React.Fragment>
       <DesktopNav search="true"/>
      <RestoCollectionDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default RestoCollectionDesktopPage;
