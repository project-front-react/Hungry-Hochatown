import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import CategoryDesktop from "../../component/CategoryDesktop";
import { animateScroll as scroll } from "react-scroll";

const CategoryDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  return (
    <React.Fragment>
      <DesktopNav search="true"/>
      <CategoryDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default CategoryDesktopPage;
