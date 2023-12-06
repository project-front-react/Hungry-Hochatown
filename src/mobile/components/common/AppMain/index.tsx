import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchInput from "../../../../components/SearchInput";
import { actionOrderByCategoryApiCall, actionOrderByRestaurantApiCall, actionSaveCategoryProductShowApiCall, actionAddTocart, actionDeliveryTipData } from "../../../store/actions";
import OrderByCategory from "../../OrderByCategory";
import OrderByRestaurant from "../../OrderByRestaurant";
import RecentOrder from "../../RecentOrders";
import classes from "./appMain.module.scss";

const AppMain = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionDeliveryTipData());
  }, []);
  React.useEffect(() => { 
    let test="page=1&size=9"
    let tst="page=1&size=8"
    dispatch(actionOrderByCategoryApiCall(test));
    dispatch(actionOrderByRestaurantApiCall(tst));
  }, []);
  return (
    <React.Fragment>
      <main className={`${classes.appMain} mb-xxl`}>
        <SearchInput />
        <RecentOrder />
        <OrderByCategory />
        <OrderByRestaurant />
      </main>
    </React.Fragment>
  );
};

export default AppMain;
