import React from "react";
import CartMainDesktop from "../../component/CartMainDesktop/indesx";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import { animateScroll as scroll } from "react-scroll";

const AddToCartDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  return (
    <React.Fragment>
      <DesktopNav />
      <CartMainDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default AddToCartDesktopPage;
