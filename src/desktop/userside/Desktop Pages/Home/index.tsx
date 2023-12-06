import React, { useEffect } from "react";
import DesktopFooter from "../../component/common/DesktoppFooter";
import RecentOrderDesktop from "../../component/RecentOrder";
import OrderByCategoryDesktop from "../../component/OrderByCategory";
import OrderByRestaurantDesktop from "../../component/OrderByRestaurant";
import HomeMainWrapDesktop from "../../component/HomeMainWrap";
import { useDispatch } from "react-redux";
import { actionDeliveryTipData, actionOrderByCategoryApiCall, actionOrderByRestaurantApiCall } from "../../../../mobile/store/actions";
const HomeDesktop = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(actionDeliveryTipData());
  }, []);
  React.useEffect(() => {
    let test="page=1&size=10"
    let tst="page=1&size=8"
    dispatch(actionOrderByCategoryApiCall(test));
    dispatch(actionOrderByRestaurantApiCall(tst));
  }, []);  
  
  return (
    <React.Fragment>
      <HomeMainWrapDesktop />
      <RecentOrderDesktop />
      <OrderByCategoryDesktop />
      <OrderByRestaurantDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default HomeDesktop;
