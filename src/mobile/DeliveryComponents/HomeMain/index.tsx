import React, { useEffect, useState } from "react";
import classes from "./homemain.module.scss";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { MdOutlineNavigateNext } from "react-icons/md";
import CustomPopup from "../../components/popup";
import { BiDish } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  actionCurrentOrderApiCall,
  actionDeliveryAvailableStatusApiCall,
  actionDeliveryEarningApiCall,
  actionDeliveryOrderStatusApiCall,
  actionSaveAvailability,
} from "../../store/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import Moment from "react-moment";

const HomeMain = () => {
  // Access the ENV variable From Frontend
  const [visibility, setVisibility] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [count, setCount] = useState(1);
  const [popUpData, setPopUpData] = useState<any>("");
  const popupCloseHandler = () => {
    setVisibility(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};
    dispatch(actionCurrentOrderApiCall(data));
  }, [orderStatus, count]);

  const currentOrder = useSelector(
    (state: RootState) => state.DeliveryReducer.currentOrderData
  );

  const deliveryData = useSelector(
    (state: RootState) => state.DeliveryReducer.saveDeliveryData
  );

  useEffect(() => {
    let data = {
      userId: deliveryData.id,
    };
    dispatch(actionDeliveryEarningApiCall(data));
  }, [orderStatus]);

  const saveEarning = useSelector(
    (state: RootState) => state.DeliveryReducer.saveEarning
  );

  const saveAvailability = useSelector(
    (state: RootState) => state.DeliveryReducer.saveAvailability
  );

  const handlePop = (item: any) => {
    setVisibility(true);
    setPopUpData(item);
  };

  const handleAvailability = (event: any) => {
    if (event.target.checked === true) {
      dispatch(actionSaveAvailability(true));
      let data = {
        isAvailable: 1,
        userId: deliveryData?.id,
      };
      dispatch(actionDeliveryAvailableStatusApiCall(data));
    } else {
      dispatch(actionSaveAvailability(false));
      let data = {
        isAvailable: 0,
        userId: deliveryData?.id,
      };
      dispatch(actionDeliveryAvailableStatusApiCall(data));
    }
  };

  const handleReject = () => {
    setOrderStatus("Reject");
    let data = {
      userId: deliveryData?.id,
      restaurantId: popUpData?.restaurant_id,
      orderId: popUpData?.order_id,
      cartOrderID: popUpData?.id,
      status: "Reject",
    };
    dispatch(actionDeliveryOrderStatusApiCall(data));
    setVisibility(false);
    setCount(count + 1);
  };

  const handleAccept = () => {
    setOrderStatus("Accept");
    let data = {
      userId: deliveryData?.id,
      restaurantId: popUpData?.restaurant_id,
      orderId: popUpData?.order_id,
      cartOrderID: popUpData?.id,
      status: "Accept",
    };
    dispatch(actionDeliveryOrderStatusApiCall(data));
    setVisibility(false);
    setCount(count + 1);
  };

  const handleDecline = () => {
    setOrderStatus("Decline");
    let data = {
      userId: deliveryData?.id,
      restaurantId: popUpData?.restaurant_id,
      orderId: popUpData?.order_id,
      cartOrderID: popUpData?.id,
      status: "Decline",
    };
    dispatch(actionDeliveryOrderStatusApiCall(data));
    setVisibility(false);
  };

  const handleDelivered = () => {
    setOrderStatus("Delivered");
    let data = {
      userId: deliveryData?.id,
      restaurantId: popUpData?.restaurant_id,
      orderId: popUpData?.order_id,
      cartOrderID: popUpData?.id,
      status: "Delivered",
    };
    dispatch(actionDeliveryOrderStatusApiCall(data));
    setVisibility(false);
  };

  return (
    <React.Fragment>
      <header className={classes.HomeMainHeader}>
        <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
          <Link to={"/home-d"}>
            <img className={classes.logo} src={BrandLogo} alt="logo" />
          </Link>
        </div>
        <div className={classes.earning}>
          <span>
            Total Earnings:
            <span className={classes.earningNum}>$ {saveEarning?.earning}</span>
          </span>
        </div>
      </header>
      <section className={`${classes.HomeMain} mb-xxl`}>
        <div className={classes.AvailableSection}>
          <div className={classes.Avalible}>
            <span>Available</span>
            <label className={classes.Switch}>
              <input
                type="checkbox"
                defaultChecked={saveAvailability === true ? true : false}
                onClick={(event) => handleAvailability(event)}
              />
              <span className={classes.Slider} />
            </label>
          </div>
        </div>
        <div className={classes.RestoSection}>
          <h3>Current Orders</h3>
          {saveAvailability === true ? (
            <div className={classes.colletionWrap}>
              {currentOrder.length > 0 ? (
                currentOrder?.map((item: any) => (
                  <div
                    className={classes.staplesBox}
                    onClick={() => handlePop(item)}
                  >
                    <div className={classes.imgWrap}>
                      <img src={item?.restaurant_detail?.restaurant_logo} />
                    </div>
                    <p>Order from</p>
                    <div className={classes.RestoSection}>
                      <h3>{item?.restaurant_detail?.restaurant_name}</h3>
                      <span>
                        {<Moment fromNow>{item.created_at}</Moment>}
                        <MdOutlineNavigateNext />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No order available</h1>
              )}
            </div>
          ) : (
            <div>
              <h1>You're now Offline</h1>
            </div>
          )}
          
        </div>
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
                {popUpData?.first_name}
              </span>
              <p className={classes.address}>{popUpData?.delivery_address}</p>
              <p className={classes.address}>
                Instructions : {popUpData?.instructions}
              </p>
              <a href={popUpData?.delivery_address_url} target="_blank">
                View delivery location on Map
              </a>
            </div>

            <div className={classes.btnContent}>
              <div className={classes.btnGroup}>
                <button className={classes.reject} onClick={handleReject}>
                  Reject
                </button>
                <button onClick={handleAccept}>Accept</button>
              </div>
            </div>
          </div>
        </div>
      </CustomPopup>
    </React.Fragment>
  );
};

export default HomeMain;
