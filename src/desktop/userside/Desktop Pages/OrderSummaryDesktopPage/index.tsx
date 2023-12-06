import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import OrderSummaryDesktop from "../../component/OrderSummaryDesktop";
import { animateScroll as scroll } from "react-scroll";

const OrderSummaryDesktopPage = () => {
  scroll.scrollToTop({
    duration: 0,
    smooth: "easeInOutQuint",
  });
  return (
    <React.Fragment>
      <DesktopNav />
      <OrderSummaryDesktop />      
      <DesktopFooter />
    </React.Fragment>
  );
};

export default OrderSummaryDesktopPage;
