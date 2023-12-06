import React, { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./ordersummarydesktop.module.scss";
import mastercard from "../../../../assets/icons/mastercard1.png";
import Paypal from "../../../../assets/icons/paypal.png";
import americanexpress from "../../../../assets/icons/american-express.png";
import discover from "../../../../assets/icons/discover.png";
import jcb from "../../../../assets/icons/jcb.png";
import visa from "../../../../assets/icons/visa.png";
import { FiBox } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useDispatch } from "react-redux";
import { actionOrderDetailApiCall } from "../../../../mobile/store/actions";

const OrderSummaryDesktop = () => {
  const [save, setSave] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizeToken = localStorage.getItem("authToken");
  let pathname = useLocation().pathname.split("order-summary/")[1];
  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  useEffect(() => {
    if (!authorizeToken) {
      navigate("login");
    }
  }, []);

  useEffect(() => {
    setSave(userSingleDetails?.Order?.products);
  }, [userSingleDetails]);

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
    <DesktopLayout>
      <div className={`${classes.OrderSummaryDesktop} mb-xxl`}>
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
        <div className={classes.DetailsSection}>
          <div className={classes.CartSection}>
            {save &&
              save.map((item: any) => {
                return (
                  <div className={classes.CartItem}>
                    <div className={classes.itemWrap}>
                      <a className={classes.itemMedia}>
                        <div className={classes.mediaBody}>
                          <h4>{item?.product_name}</h4>
                          {item?.addon_groups.length>0 &&item?.addon_groups[0]["addon_group_options"].length >
                          0 && (
                            <div className={classes.Addons}>
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
                        <div className={classes.count}>
                          <div className={classes.quantity}>
                            <GrClose />
                            <p>{item?.quantity}</p>
                          </div>
                          <span>$ {Number(item?.price).toFixed(2)}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
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
                    ${" "}
                    {Number(userSingleDetails?.Order?.delivery_charge).toFixed(
                      2
                    )}
                  </span>
                </li>
                <li>
                  <span>Gratuity</span>
                  <span>
                    ${" "}
                    {Number(userSingleDetails?.Order?.gratuity_charge).toFixed(
                      2
                    )}
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
                    ${" "}
                    {Number(userSingleDetails?.Order?.oklahoma_tax).toFixed(
                      2
                    )}
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
          </div>
          <div className={classes.AddressAndPaymentSection}>
            <div className={classes.AddressSection}>
              <h3>Address</h3>
              <p>{userSingleDetails?.Order?.delivery_address}</p>
            </div>
            <div className={classes.AddressSection}>
              <h3>Order Status</h3>
              <p>
                {userSingleDetails?.Order?.order_status == "Delivered"
                  ? userSingleDetails?.Order?.order_status
                  : userSingleDetails?.Order?.order_status_restaurant == null
                  ? "Order Placed"
                  : userSingleDetails?.Order?.order_status_restaurant}
              </p>
            </div>
            <div className={classes.PaymentSection}>
              <h3>Payment Method</h3>
              <div className={classes.paymentBox}>
                <img
                  src={
                    userSingleDetails?.Order?.payment?.card_type == "Visa"
                      ? visa
                      : userSingleDetails?.Order?.payment?.card_type ==
                        "Discover"
                      ? discover
                      : userSingleDetails?.Order?.payment?.card_type == "JCB"
                      ? jcb
                      : userSingleDetails?.Order?.payment?.card_type ==
                        "American Express"
                      ? americanexpress
                      : userSingleDetails?.Order?.payment?.card_type ==
                        "Mastercard"
                      ? mastercard
                      : userSingleDetails?.Order?.payment?.card_type == null
                      ? Paypal
                      : ""
                  }
                />
                {userSingleDetails?.Order?.payment?.card_type != null && (
                  <p>
                    {" "}
                    **** **** ****{" "}
                    {userSingleDetails?.Order?.payment?.card_last_digit}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default OrderSummaryDesktop;
