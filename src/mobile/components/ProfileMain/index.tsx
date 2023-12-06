import React, { useState } from "react";
import classes from "./profilemian.module.scss";
import { VscHome } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { AiOutlineFileExclamation } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  actiongetCartDetailApiCall,
  actionLogoutApiCall,
  actionpostCartDetailApiCall,
} from "../../store/actions";
import { AiOutlineLock } from "react-icons/ai";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const ProfileMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  return (
    <React.Fragment>
      <div className={classes.profileHeader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Account</h1>
        </div>
        <div className={classes.homeIcon}>
          <Link to="/home">
            <VscHome />
          </Link>
        </div>
      </div>
      <main className={`${classes.ProfileMain} mb-xxl`}>
        <div className={classes.accountWrap}>
          <div className={classes.userPanel}>
            <div className={classes.media}>
              <div className={classes.mediaBody}>
                <a>
                  {data &&
                    data.first_name.charAt(0).toUpperCase() +
                      data.first_name.slice(1)}
                  <span>{data && data.email}</span>
                </a>
              </div>
            </div>
          </div>
          <ul className={classes.navigation}>
            <Link to="/edit-profile">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <IoPersonOutline />
                  </i>
                  <span>Your Profile</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to="/change-your-password">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <AiOutlineLock />
                  </i>
                  <span>Change Your Password</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to="/order-history">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <BsHandbag />
                  </i>
                  <span>Your Orders</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to="/notification">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <IoNotificationsOutline />
                  </i>
                  <span>Notifications</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to="/contact-us">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <FiPhone />
                  </i>
                  <span>Help Desk</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to="/about-us">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <TbNotes />
                  </i>
                  <span>About Us</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to="/terms-and-conditions">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <AiOutlineFileExclamation />
                  </i>
                  <span>Terms & Conditions</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
          </ul>
          <button
            disabled={loader === true ? true : false}
            className={classes.logOut}
            onClick={() => {
              let data = {
                userId: state.id,
                cartDetail: [{ userId: state.id, data: [] }],
              };
              let data1 = { data, navigate: "" };
              let body = { navigate, data: data1, dispatch };
              // dispatch(actionpostCartDetailApiCall(data))
              dispatch(actionLogoutApiCall(body));
              dispatch(actiongetCartDetailApiCall(state.id));
            }}
          >
            <MdLogout />
            Sign Out
          </button>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ProfileMain;
