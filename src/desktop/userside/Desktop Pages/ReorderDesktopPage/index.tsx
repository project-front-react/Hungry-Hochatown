import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import ReorderDesktop from "../../component/ReorderDesktop";
import { animateScroll as scroll } from "react-scroll";

const ReorderDesktopPage = () => {
  scroll.scrollToTop({
    duration: 0,
    smooth: "easeInOutQuint",
  });
  return (
    <React.Fragment>
      <DesktopNav />
      <ReorderDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default ReorderDesktopPage;
