import React, { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./orderhistorydesktop.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useDispatch } from "react-redux";
import {
  actionCheckReOrder,
  actionOrderDetailApiCall,
  actionorderHistoryApiCall,
  actionRatingCount,
  actionSaveApiCartData,
  actionSaveRating,
  actionSaveReOrderId,
} from "../../../../mobile/store/actions";
import { Rating } from "react-simple-star-rating";
import { MyComponent } from "../../../../mobile/components/RatingStar";
import DesktopCustomPopup from "../common/DesktopPopup";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";
 
const OrderHistoryDesktop = () => {
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
    <DesktopLayout>
      <div className={classes.OrderHistoryDesktop}>
        <h1>Order History</h1>
        <DesktopCustomPopup
          onClose={popupCloseHandler}
          show={visibility}
          title="Hello Jeetendra"
        >
          <div className={classes.starContent}>
            <MyComponent
              setCount={() => setCount(count + 1)}
              close={popupCloseHandler}
              // restaurantId={item.restaurant_id}
              // cartOrderId={item.id}
            />
          </div>
        </DesktopCustomPopup>
        {loader === true ? (
          <LoadingAnimation />
        ) : orderData.length > 0 ? (
          <div className={classes.tabWrap}>
            {orderData &&
              orderData?.map((item: any) => (
                <div className={classes.orderBox}>
                  <div
                    className={classes.media}
                    onClick={() => handleOrderHistoryData(item)}
                  >
                    <span className={classes.contentBox}>
                      <div className={classes.TopContent}>
                        <h2>
                          Order ID: {item?.order_id} , Date: {item?.created_at}
                        </h2>
                        <h2>
                          {item?.order_status == "Delivered"
                            ? item?.order_status
                            : item?.order_status_restaurant == null
                            ? "Order Placed"
                            : item?.order_status_restaurant}
                        </h2>
                      </div>
                      <p>{item.address}</p>
                      <span>
                        Paid: $ <span>{item?.total}</span>, Items:{" "}
                        <span>{item?.order_item_count}</span>
                      </span>
                    </span>
                  </div>
                  <div className={classes.bottomContent}>
                    <span
                      className={classes.orderBtn}
                      onClick={() => {
                        handleOrderAgain(item);
                      }}
                    >
                      Order Again
                    </span>

                    {item?.order_rating_detail === null ? (
                      <button onClick={() => handleRating(item)}>
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
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className={classes.noOrder}>
            <h1>No Order Have Been Placed</h1>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
};

export default OrderHistoryDesktop;
