import React from 'react'
import AboutUsDesktop from '../../component/AboutUsDesktop'
import DesktopNav from '../../component/common/DesktopNav'
import DesktopFooter from '../../component/common/DesktoppFooter'
import classes from "./aboutusdesktoppage.module.scss"
import { animateScroll as scroll } from "react-scroll";

const AboutUsDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  return (
    <React.Fragment>
        <DesktopNav/>
        <AboutUsDesktop/>
        <DesktopFooter/>
    </React.Fragment>
  )
}

export default AboutUsDesktopPage