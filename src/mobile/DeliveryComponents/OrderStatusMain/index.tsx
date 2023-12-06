import React, { useEffect, useState } from "react";
import classes from "./orderstatusmain.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  actionDeliveryOrderStatusApiCall,
  actionDeliveryOrderStatusList,
} from "../../store/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import CustomPopup from "../../components/popup";
import { BiDish } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const OrderStatusMain = () => {
  const [popUpData, setPopUpData] = useState<any>("");
  const [visibility, setVisibility] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [count, setCount] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");
  const popupCloseHandler = () => {
    setVisibility(false);
  };
  const dispatch = useDispatch();

  const deliveryData = useSelector(
    (state: RootState) => state.DeliveryReducer.saveDeliveryData
  );

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  useEffect(() => {
    let data = {
      userId: deliveryData?.id,
    };
    dispatch(actionDeliveryOrderStatusList(data));
  }, []);

  useEffect(() => {
    let data = {
      userId: deliveryData?.id,
    };
    dispatch(actionDeliveryOrderStatusList(data));
  }, [count]);

  const orderStatusList = useSelector(
    (state: RootState) => state.DeliveryReducer.saveDeliveryOrderStatusList
  );

  useEffect(() => {
    setSaveStatus(orderStatusList);
  }, [count]);

  const handlePop = (item: any) => {
    if (item?.status === "Accept") {
      setVisibility(true);
      setPopUpData(item);
    }
  };

  const handleDecline = () => {
    setOrderStatus("Decline");
    let data = {
      userId: deliveryData?.id,
      restaurantId: popUpData?.restaurant_id,
      orderId: popUpData?.order_id,
      cartOrderID: popUpData?.cart_order_id,
      status: "Decline",
    };
    dispatch(actionDeliveryOrderStatusApiCall(data));
    setVisibility(false);
    setCount(count + 1);
  };

  const handleDelivered = () => {
    setOrderStatus("Delivered");
    let data = {
      userId: deliveryData?.id,
      restaurantId: popUpData?.restaurant_id,
      orderId: popUpData?.order_id,
      cartOrderID: popUpData?.cart_order_id,
      status: "Delivered",
    };
    dispatch(actionDeliveryOrderStatusApiCall(data));
    setVisibility(false);
    setCount(count + 1);
  };

  return (
    <React.Fragment>
      <div className={classes.OredrStatusHeader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Order Status</h1>
        </div>
      </div>
      <section className={classes.OredrStatusMain}>
        {loader === true ? (
          <LoadingAnimation />
        ) : orderStatusList?.length > 0 ? (
          orderStatusList &&
          orderStatusList.map((item: any) => (
            <div className={classes.orderBox} onClick={() => handlePop(item)}>
              <div className={classes.media}>
                <span>
                  Order ID:
                  <span className={classes.IDNum}> {item.order_id}</span>
                </span>
                <span
                  className={
                    item.status == "Accept"
                      ? classes.accept
                      : item.status == "Reject"
                      ? classes.reject
                      : item.status == "Delivered"
                      ? classes.delivered
                      : classes.decline
                  }
                >
                  {item.status === "Accept"
                    ? "Accepted"
                    : item.status === "Reject"
                    ? "Rejected"
                    : item.status === "Decline"
                    ? "Declined"
                    : item.status}
                </span>
              </div>
              <p>Order From : {item.pickup_address}</p>
              <p>Deliver To : {item.delivery_address}</p>
              <div className={classes.buttomSection}>
                <p>
                  You earned ${" "}
                  {item.status === "Delivered" ? item.delivery_charge : "0"}{" "}
                  from this Order.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>No List for now</h1>
          </div>
        )}
      </section>
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title="Hello Jeetendra"
      >
        <div className={classes.popupSection}>
          <div className={classes.popupSection}>
            <div className={classes.IDwrap}>
              Order ID : <span>{popUpData?.order_id}</span>
            </div>
            <div className={classes.Orderfrom}>
              <p>Order From</p>
              <span>
                <BiDish />
                {popUpData?.restaurant_detail?.restaurant_name}
              </span>
              <p className={classes.address}>
                {popUpData?.restaurant_detail?.address}
              </p>
              <a
                href={popUpData?.restaurant_detail?.restaurant_address_url}
                target="_blank"
              >
                View restaurant location on Map
              </a>
            </div>
            <div className={classes.DeliverTo}>
              <p>Deliver to </p>
              <span>
                <IoPersonOutline />
                Mr. {popUpData?.first_name}
              </span>
              <p className={classes.address}>{popUpData?.delivery_address}</p>
              <p className={classes.address}>
                Instructions : {popUpData?.cart_order_detail?.instructions}
              </p>
              <a
                href={popUpData?.cart_order_detail?.delivery_address_url}
                target="_blank"
              >
                View delivery location on Map
              </a>
            </div>
            <div className={classes.btnContent}>
              <div className={classes.btnGroup}>
                <button className={classes.reject} onClick={handleDecline}>
                  Decline
                </button>
                <button onClick={handleDelivered}>Delivered</button>
              </div>
            </div>
          </div>
        </div>
      </CustomPopup>
    </React.Fragment>
  );
};

export default OrderStatusMain;
