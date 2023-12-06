import React from 'react'
import classes from "./authlayout.module.scss"
import LeftImg from "../../../../assets/images/banner/o4.png"
import DesktopFooter from '../../component/common/DesktoppFooter'
import DesktopNav from '../../component/common/DesktopNav'

const Authlayout = ({children,imageOverText,navigate,imageOverLink}:any) => {
  return (
    <React.Fragment>
       <div className={classes.layoutmain}>
            <div className={classes.CardSection}>
                <div className={classes.CardMain}>
                    <div className={classes.LeftSide}>
                        {imageOverText && <p>{imageOverText} <span onClick={()=>navigate()}>{imageOverLink}</span></p>}
                        <img src={LeftImg}/>
                    </div>
                    <div className={classes.RigthSide}>
                        {children}
                    </div>
                </div>
            </div>
       </div>
    </React.Fragment>
  )
}

export default Authlayout