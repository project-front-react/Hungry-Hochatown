import React, { useEffect, useState } from "react";
import classes from "./ordersummarymain.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscHome } from "react-icons/vsc";
import { FiBox } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import mastercard from "../../../assets/icons/mastercard1.png";
import Paypal from "../../../assets/icons/paypal.png";
import americanexpress from "../../../assets/icons/american-express.png";
import discover from "../../../assets/icons/discover.png";
import jcb from "../../../assets/icons/jcb.png";
import visa from "../../../assets/icons/visa.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionOrderDetailApiCall } from "../../store/actions";

const OrderSummaryMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [save, setSave] = useState([]);
  let pathname = useLocation().pathname;

  const authorizeToken = localStorage.getItem("authToken");
  useEffect(() => {
    if (!authorizeToken) {
      navigate("login");
    }
  }, []);

  const userDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );

  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  useEffect(() => {
    setSave(userSingleDetails?.Order?.products);
  }, [userSingleDetails]);

  pathname = pathname.split("order-summary/")[1];
  const orderDetailApiCall = () => {
    let body = {
      order_id: `#${pathname}`,
      user_id: state.id,
    };
    dispatch(actionOrderDetailApiCall(body));
  };
  useEffect(() => {
    if (userSingleDetails?.Order?.order_id != pathname) {
      orderDetailApiCall();
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      orderDetailApiCall();
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <React.Fragment>
      <div className={classes.OrderSummaryHeader}>
        <div className={classes.logoWrap}>
          <i onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </i>
          <h1>Order Summary</h1>
        </div>
        <div className={classes.homeIcon}>
          <a onClick={() => navigate("/home")}>
            <VscHome />
          </a>
        </div>
      </div>
      <main className={`${classes.OrderSummaryMain} mb-xxl`}>
        <div className={classes.idSection}>
          <div className={classes.bannerBox}>
            <div className={classes.media}>
              <FiBox />
              <div className={classes.mediaBody}>
                <span>Order ID: {userSingleDetails?.Order?.order_id}</span>
                <h2>Order Confirmed</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.itemSection}>
          <>
            <h3>Items:</h3>
            {save &&
              save.map((item: any) => {
                return (
                  <div className={classes.itemWrap}>
                    <a className={classes.itemMedia}>
                      <div className={classes.count}>
                        <span>{item?.quantity}</span>
                        <GrClose />
                      </div>
                      <div className={classes.mediaBody}>
                        <h4>{item?.product_name}</h4>
                        {item?.addon_groups.length > 0 &&
                          item?.addon_groups[0]["addon_group_options"].length >
                            0 && (
                            <div className={classes.Addons}>
                              {" "}
                              {item.addon_groups.map((data: any) => {
                                return (
                                  <>
                                    {data.addon_group_options.map(
                                      (temp: any) => {
                                        return (
                                          <p>
                                            {temp.add_on_name}:$
                                            {Number(temp.add_on_price).toFixed(
                                              2
                                            )}
                                          </p>
                                        );
                                      }
                                    )}
                                  </>
                                );
                              })}
                            </div>
                          )}
                      </div>
                      <span>${Number(item?.price).toFixed(2)}</span>
                    </a>
                  </div>
                );
              })}
          </>
        </div>
        <div className={classes.orderSection}>
          <h3>Payment Details</h3>
          <ul>
            <li>
              <span>Bag total</span>
              <span>
                $ {Number(userSingleDetails?.Order?.sub_total).toFixed(2)}
              </span>
            </li>
            <li>
              <span>Delivery</span>
              <span>
                $ {Number(userSingleDetails?.Order?.delivery_charge).toFixed(2)}
              </span>
            </li>
            <li>
              <span>Gratuity</span>
              <span>
                $ {Number(userSingleDetails?.Order?.gratuity_charge).toFixed(2)}
              </span>
            </li>
            <li>
              <span>Hochatown sales tax</span>
              <span>
                ${" "}
                {Number(userSingleDetails?.Order?.hochatown_sales_tax).toFixed(
                  2
                )}
              </span>
            </li>
            <li>
              <span>Oklahoma tax</span>
              <span>
                $ {Number(userSingleDetails?.Order?.oklahoma_tax).toFixed(2)}
              </span>
            </li>
            <li>
              <span>Total Amount</span>
              <span>
                $ {Number(userSingleDetails?.Order?.total).toFixed(2)}
              </span>
            </li>
          </ul>
        </div>
        <div className={classes.addressSection}>
          <h3>Address</h3>
          <div className={classes.address}>
            <h4>{userDetails?.first_name}</h4>
            <p>{userSingleDetails?.Order?.delivery_address}</p>
          </div>
        </div>
        <div className={classes.addressSection}>
          <h3> Order Status</h3>
          <div className={classes.address}>
            <p>
              {" "}
              {userSingleDetails?.Order?.order_status == "Delivered"
                ? userSingleDetails?.Order?.order_status
                : userSingleDetails?.Order?.order_status_restaurant == null
                ? "Order Placed"
                : userSingleDetails?.Order?.order_status_restaurant}
            </p>
          </div>
        </div>
        <div className={classes.paymentSection}>
          <h3>Payment Method</h3>
          <div className={classes.paymentBox}>
            <img
              src={
                userSingleDetails?.Order?.payment?.card_type == "Visa"
                  ? visa
                  : userSingleDetails?.Order?.payment?.card_type == "Discover"
                  ? discover
                  : userSingleDetails?.Order?.payment?.card_type == "JCB"
                  ? jcb
                  : userSingleDetails?.Order?.payment?.card_type ==
                    "American Express"
                  ? americanexpress
                  : userSingleDetails?.Order?.payment?.card_type == "Mastercard"
                  ? mastercard
                  : userSingleDetails?.Order?.payment?.card_type == null
                  ? Paypal
                  : ""
              }
            />
            {userSingleDetails?.Order?.payment?.card_type != null && (
              <span>
                {" "}
                **** **** ****{" "}
                {userSingleDetails?.Order?.payment?.card_last_digit}
              </span>
            )}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default OrderSummaryMain;
