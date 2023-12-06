import React from 'react'
import DesktopNav from '../../component/common/DesktopNav';
import DesktopFooter from '../../component/common/DesktoppFooter';
import TermsAndConditionsDesktop from '../../component/TermsAndConditionsDesktop';
import classes from "./termsnndconditionsdesktoppage.module.scss";
const TermsAndConditionsDesktopPage = () => {
  return (
    <React.Fragment>
        <DesktopNav/>
        <TermsAndConditionsDesktop/>
        <DesktopFooter/>
    </React.Fragment>
  )
}

export default TermsAndConditionsDesktopPage;