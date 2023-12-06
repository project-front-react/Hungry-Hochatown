import React, { useState } from "react";
import classes from "./profilemain.module.scss";
import { VscHome } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbNotes } from "react-icons/tb";
import { AiOutlineFileExclamation } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { actionLogoutApiCall } from "../../store/actions";
import { AiOutlineLock } from "react-icons/ai";

const DeliveryProfileMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(
    (state: RootState) => state.DeliveryReducer.saveDeliveryData
  );
  const [visibility, setVisibility] = useState(false);
  return (
    <React.Fragment>
      <div className={classes.profileHeader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Profile</h1>
        </div>
        <div className={classes.homeIcon}>
          <Link to="/home-d">
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
                  <span className={classes.approved}>
                    Your Profile has been Approved
                  </span>
                </a>
              </div>
            </div>
          </div>
          <ul className={classes.navigation}>
            <Link to="/edit-profile-d">
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
            <Link to="/order-status">
              <li>
                <a className={classes.navlink}>
                  <i>
                    <IoPersonOutline />
                  </i>
                  <span>Order Status</span>
                </a>
                <a className={classes.arrow}>
                  <IoIosArrowForward />
                </a>
              </li>
            </Link>
            <Link to={"/change-your-password-d"}>
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
            <Link to="/contact-us-d">
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
            <Link to="/about-us-d">
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
            <Link to="/terms-and-conditions-d">
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
            className={classes.logOut}
            onClick={() => {
              let body = { navigate };
              dispatch(actionLogoutApiCall(body));
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

export default DeliveryProfileMain;
