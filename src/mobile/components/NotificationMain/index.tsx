import React, { useEffect, useState } from "react";
import classes from "./notificationmain.module.scss";
import { VscHome } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { actionNotificationApiCall } from "../../store/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const NotificationMain = () => {
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );
  const statedata = useSelector((state: RootState) => state.CommonReducer);
  const dispatch = useDispatch();
  const [notificationData, setNotificationData] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    let data = {
      page: 1,
      size: 30,
      userId: state.id,
    };
    dispatch(actionNotificationApiCall(data));
  }, []);
  useEffect(() => {
    let allData = notificationData.concat(statedata.saveNotificationdata);
    setNotificationData(allData);
  }, [statedata.saveNotificationdata]);

  return (
    <React.Fragment>
      <div className={classes.Notificationheader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Notifications</h1>
        </div>
        <div className={classes.homeIcon}>
          <Link to="/home">
            <VscHome />
          </Link>
        </div>
      </div>
      {loader === true ? (
        <LoadingAnimation />
      ) : (
        <main className={`${classes.notificationMain} mb-xxl`}>
          <div className={classes.tabContent}>
            <div className={classes.tabWrap}>
              {notificationData.length > 0 ? (
                <>
                    {notificationData.map((item: any) => (
                      <div className={classes.orderBox}>
                        <h3>{item.message}</h3>
                        <span>{item.created_at}</span>
                      </div>
                    ))}
                </>
              ) : (
                <div className={classes.noOrder}>
                  <h1>No Notification yet</h1>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </React.Fragment>
  );
};

export default NotificationMain;
