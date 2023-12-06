import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import OrderSuccessDesktop from "../../component/OrderSuccessMain";
import { animateScroll as scroll } from "react-scroll";
const OrderSuccessDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  return (
    <React.Fragment>
      <DesktopNav />
      <OrderSuccessDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default OrderSuccessDesktopPage;
