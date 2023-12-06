import React, { useState, useEffect } from "react";
import classes from "./ordethistorymain.module.scss";
import { VscHome } from "react-icons/vsc";
import SearchInput from "../../../components/SearchInput";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomPopup from "../popup";
import { MyComponent } from "../RatingStar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  actionCheckReOrder,
  actionOrderDetailApiCall,
  actionorderHistoryApiCall,
  actionRatingCount,
  actionSaveRating,
  actionSaveReOrderId,
} from "../../store/actions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { Rating } from "react-simple-star-rating";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const OrderHistoryMain = () => {  
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [count, setCount] = useState(1);
  const orderAPIData = useSelector(
    (state: RootState) => state.CommonReducer.saveOrderHistoryData
  );

  const orderSearchApiData = useSelector(
    (state: RootState) => state.CommonReducer.saveOrderHistorySearchData
  );
  const dispatch = useDispatch();
  const state1 = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const ratingCount = useSelector(
    (state: RootState) => state.CommonReducer.saveRatingCount
  );
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  useEffect(() => {
    if (orderAPIData) {
      setOrderData(orderAPIData);
    } else {
      setOrderData(orderSearchApiData);
    }
  }, [orderAPIData, orderSearchApiData]);

  const orderHistoryApiCall = () => {
    let data = {
      page: 1,
      size: 100,
      userId: state.id,
    };
    let body = { data: data, navigator: "" };
    dispatch(actionorderHistoryApiCall(body));
  };
  useEffect(() => {
    orderHistoryApiCall();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      orderHistoryApiCall();
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    orderHistoryApiCall();
  }, [count]);

  const popupCloseHandler = () => {
    setVisibility(false);
    dispatch(actionRatingCount(ratingCount + 1));
  };

  const handleOrderHistoryData = (item: any) => {
    let body = {
      order_id: item.order_id,
      user_id: item.user_id,
    };
    dispatch(actionOrderDetailApiCall(body));
    navigate(`/order-summary/${item.order_id.replace("#", "")}`);
  };

  const handleOrderAgain = (data: any) => {
    dispatch(actionSaveReOrderId(data));
    dispatch(actionCheckReOrder(true));
    navigate("/add-address");
  };

  const handleRating = (item: any) => {
    setVisibility(true);
    dispatch(actionSaveRating(item));
  };
  

  return (
    <React.Fragment>
      <div className={classes.orderhistoryheader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Order History</h1>
        </div>
        <div className={classes.homeIcon}>
          <Link to="/home">
            <a>
              <VscHome />
            </a>
          </Link>
        </div>
      </div>

      {loader === true ? (
        <LoadingAnimation />
      ) : orderData?.length > 0 ? (
        <main className={`${classes.orderhistorymain} mb-xxl`}>
          <SearchInput/>
          <div className={classes.tabContent}>
            <div className={classes.tabWrap}>
              {orderData &&
                orderData.map((item: any) => {
                  return (
                    <div className={classes.orderBox}>
                      <div
                        className={classes.media}
                        onClick={() => handleOrderHistoryData(item)}
                      >
                        <span className={classes.contentBox}>
                          <div className={classes.TopContent}>
                            <h2>
                              ID: {item.order_id} , Date: {item.created_at}
                            </h2>

                            <h2>
                              {item.order_status == "Delivered"
                                ? item.order_status
                                : item.order_status_restaurant == null
                                ? "Order Placed"
                                : item.order_status_restaurant}
                            </h2>
                          </div>
                          <p>{item.delivery_address}</p>
                          <span>
                            Paid: $ <span>{item.total}</span>, Items:{" "}
                            <span>{item.order_item_count}</span>
                          </span>
                          <span></span>
                        </span>
                      </div>
                      <div className={classes.bottomContent}>
                        <span
                          className={classes.orderBtn}
                          onClick={() => handleOrderAgain(item)}
                        >
                          Order Again
                        </span>
                        {item?.order_rating_detail === null ? (
                          <button
                            onClick={() => handleRating(item)}
                            className={classes.RateAndReview}
                          >
                            {" "}
                            Rate & Review Order
                          </button>
                        ) : (
                          <Rating
                            allowHover={false}
                            readonly={true}
                            initialValue={item?.order_rating_detail?.rating}
                          />
                        )}

                        <CustomPopup
                          onClose={popupCloseHandler}
                          show={visibility}
                          title="Hello Jeetendra"
                        >
                          <div className={classes.starContent}>
                            <MyComponent
                              setCount={() => setCount(count + 1)}
                              close={popupCloseHandler}
                              restaurantId={item.restaurant_id}
                              cartOrderId={item.id}
                            />
                          </div>
                        </CustomPopup>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      ) : (
        <div className={classes.noOrder}>
          <h1>No Order Have Been Placed</h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderHistoryMain;
