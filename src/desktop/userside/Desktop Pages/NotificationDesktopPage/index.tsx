import React from "react";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import NotificatioDesktop from "../../component/NotificationDesktop";
import classes from "./notficaytiondesktoppage.module.scss";
import { animateScroll as scroll } from "react-scroll";

const NotificationDesktopPage = () => {
  scroll.scrollToTop({
    duration: 0,
    smooth: "easeInOutQuint",
  });
  return (
    <React.Fragment>
      <DesktopNav path="notification" />
      <NotificatioDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default NotificationDesktopPage;
