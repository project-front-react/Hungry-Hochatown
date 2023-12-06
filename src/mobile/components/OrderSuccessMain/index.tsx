import React, { useEffect } from "react";
import classes from "./ordersuccessmain.module.scss";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { VscHome } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import MainImg from "../../../assets/svg/order-success.svg";
import { BiCalendar } from "react-icons/bi";
import { VscPreview } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import {
  actiongetCartDetailApiCall,
  actionOrderDetailApiCall,
} from "../../store/actions";

const OrderSuccessMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveOrderDetails
  );

  const userDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );
  useEffect(() => {
    let body = {
      userId: userDetails.id,
    };
    dispatch(actiongetCartDetailApiCall(body));
  }, []);

  useEffect(() => {
    let data = {
      order_id: orderDetails.data.order_id,
      user_id: userDetails.id,
    };
    dispatch(actionOrderDetailApiCall(data));
  }, [orderDetails]);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
          <Link to={"/home"}>
            <img
              className={`${classes.logo} ${classes.logoW}`}
              src={BrandLogo}
              alt="logo"
            />
          </Link>
          <Link to={"/home"}>
            <img className={classes.logo} src={BrandLogo} alt="logo" />
          </Link>
        </div>
        <div className={classes.homeIcon}>
          <span onClick={() => navigate("/home")}>
            <VscHome />
          </span>
        </div>
      </header>
      <div className={`${classes.orderSuccessmain} mb-xxl`}>
        <div className={classes.bannerSection}>
          <div className={classes.bannerWrap}>
            <img src={MainImg} />
          </div>
          <div className={classes.contentWreap}>
            <h1>Thank you for your order!</h1>
            <p>
              your order has been placed successfully. your order ID is
              {userSingleDetails?.Order?.order_id}
            </p>
          </div>
        </div>
        <div className={classes.orderIDsection}>
          <div className={classes.media}>
            <i>
              <BiCalendar />
            </i>
            <div className={classes.mediaBody}>
              <h2>Order Date</h2>
              <span>{orderDetails.data.created_at}</span>
            </div>
          </div>
          <div className={classes.media}>
            <i>
              <VscPreview />
            </i>
            <div className={classes.mediaBody}>
              <h2>Order ID</h2>
              <span>{orderDetails.data.order_id}</span>
            </div>
          </div>
        </div>
        <div className={classes.orderDetail}>
          <h3>Order Details</h3>
          <ul>
            <li>
              <span>Bag total</span>
              <span>$ {Number(orderDetails.data.sub_total).toFixed(2)}</span>
            </li>
            <li>
              <span>Delivery</span>
              <span>$ {Number(orderDetails.data.delivery_charge).toFixed(2)}</span>
            </li>
            <li>
              <span>Gratuity</span>
              <span>$ {Number(orderDetails.data.gratuity_charge).toFixed(2)}</span>              
            </li>
            <li>
              <span>Hochatown sales tax</span>
              <span>
                $ {Number(orderDetails.data.hochatown_sales_tax).toFixed(2)}
              </span>
            </li>
            <li>
              <span>Oklahoma tax</span>
              <span>
                $ {Number(orderDetails.data.oklahoma_tax).toFixed(2)}
              </span>
            </li>
            <li>
              <span>Total Amount</span>
              <span>${orderDetails.data.total}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.footerBtn}>
        <Link
          to={`/order-summary/${userSingleDetails?.Order?.order_id.replace(
            "#",
            ""
          )}`}
        >
          Order Details
        </Link>
      </div>
    </React.Fragment>
  );
};

export default OrderSuccessMain;
