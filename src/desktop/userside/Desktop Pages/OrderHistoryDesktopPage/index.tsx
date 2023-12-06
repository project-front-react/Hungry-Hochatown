import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import OrderHistoryDesktop from "../../component/OrderHistoryDesktop";
import { animateScroll as scroll } from "react-scroll";

const OrderHistoryDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  return (
    <React.Fragment>
      <DesktopNav search="true" />
      <OrderHistoryDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default OrderHistoryDesktopPage;
