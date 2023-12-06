import React, { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./notificationmain.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useDispatch } from "react-redux";
import { actionNotificationApiCall } from "../../../../mobile/store/actions";
import InfiniteScroll from "react-infinite-scroller";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

const NotificatioDesktop = () => {
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
    <DesktopLayout>
      <div className={`${classes.NotificationDesktop} mb-xxl`}>
        <h1>Notifications</h1>
        {loader === true ? (
          <LoadingAnimation />
        ) : (
          <div className={classes.TabContent}>
            {notificationData?.length > 0 ? (
              <>
                  {notificationData?.map((item: any) => (
                    <div className={classes.tabWrap}>
                      <div className={classes.orderBox}>
                        <h3>{item.message}</h3>
                        <span>{item.created_at}</span>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className={classes.noOrder}>
                <h1>No Notification yet</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </DesktopLayout>
  );
};

export default NotificatioDesktop;
