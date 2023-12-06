import React, { useEffect, useState } from "react";
import classes from "./orderproductmain.module.scss";
import { FiBox } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import mastercard from "../../../assets/icons/mastercard1.png";
import americanexpress from "../../../assets/icons/american-express.png";
import discover from "../../../assets/icons/discover.png";
import jcb from "../../../assets/icons/jcb.png";
import visa from "../../../assets/icons/visa.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { useDispatch } from "react-redux";
import {
  actionSaveApiCartData,
  actionSetRestroID,
  actionpostCartDetailApiCall,
} from "../../store/actions";
import { Rating } from "react-simple-star-rating";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const OrderProductMain = () => {
  const [save, setSave] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );

  const userDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );

  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  useEffect(() => {
    setSave(userSingleDetails?.Order?.products);
  }, [userSingleDetails]);
  return (
    <div>
      <React.Fragment>
        <header className={classes.header}>
          <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
            <span onClick={() => window.history.back()}>
              <IoMdArrowRoundBack />
            </span>
            <Link to={"/home"}>
              <img
                className={`${classes.logo} ${classes.logoW}`}
                src={BrandLogo}
                alt="logo"
              />
              <img className={classes.logo} src={BrandLogo} alt="logo" />
            </Link>
          </div>
        </header>
        {loader === true ? (
          <LoadingAnimation />
        ) : (
          <main className={`${classes.orderProductMain} mb-xxl`}>
            <div className={classes.restAddress}>
              <div className={classes.leftSide}>
                <h1>
                  {userSingleDetails?.Order?.restaurant_detail?.restaurant_name}
                </h1>
                <small>
                  {userSingleDetails?.Order?.restaurant_detail?.address}
                </small>
              </div>
              <div className={classes.rightSide}>
                <div className={classes.ratingText}>
                  <Rating
                    allowHover={false}
                    readonly={true}
                    initialValue={
                      Math.round(
                        userSingleDetails?.Order?.restaurant_detail?.avg_rating
                      ) > 1
                        ? Math.round(
                            userSingleDetails?.Order?.restaurant_detail
                              ?.avg_rating
                          )
                        : 0
                    }
                  />
                </div>
                <div className={classes.ratingCnt}>
                  (
                  {Math.round(
                    userSingleDetails?.Order?.restaurant_detail?.rating_count
                  ) > 1
                    ? Math.round(
                        userSingleDetails?.Order?.restaurant_detail
                          ?.rating_count
                      )
                    : 0}{" "}
                  Ratings)
                </div>
              </div>
            </div>
            <div className={classes.idSection}>
              <div className={classes.bannerBox}>
                <div className={classes.media}>
                  <FiBox />
                  <div className={classes.mediaBody}>
                    <span>Order ID: {userSingleDetails?.Order?.order_id}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.itemSection}>
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
                          {item.addon_groups.length > 0 && (
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
                        <span>${Number(item?.price).toFixed(2)}</span>
                      </a>
                    </div>
                  );
                })}
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
                    {Number(
                      userSingleDetails?.Order?.hochatown_sales_tax
                    ).toFixed(2)}
                  </span>
                </li>
                <li>
                  <span>Oklahoma tax</span>
                  <span>
                    ${" "}
                    {Number(userSingleDetails?.Order?.oklahoma_tax).toFixed(2)}
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
            <div className={classes.paymentSection}>
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
                      : mastercard
                  }
                />
                <span>
                  {" "}
                  **** **** ****{" "}
                  {userSingleDetails?.Order?.payment?.card_last_digit}
                </span>
              </div>
            </div>
            {userSingleDetails?.Order?.order_status == "Delivered" && (
              <div
                className={classes.footerSection}
                onClick={() => {
                  dispatch(
                    actionSaveApiCartData(userSingleDetails?.Order.products)
                  );
                  let data = {
                    userId: state.id,
                    cartDetail: [
                      {
                        userId: state.id,
                        data: userSingleDetails?.Order.products,
                      },
                    ],
                  };
                  let body = { data, navigate: "" };
                  dispatch(actionpostCartDetailApiCall(body));
                  dispatch(
                    actionSetRestroID(userSingleDetails?.Order?.restaurant_id)
                  );
                  navigate("/addtocart");
                }}
              >
                <a>Reorder</a>
              </div>
            )}
          </main>
        )}
      </React.Fragment>
    </div>
  );
};

export default OrderProductMain;
