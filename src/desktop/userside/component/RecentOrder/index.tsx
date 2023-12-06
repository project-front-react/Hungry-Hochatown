import React, { useEffect } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./recentorderdesktop.module.scss";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import {
  actionOrderDetailApiCall,
  actionRecentOrder,
} from "../../../../mobile/store/actions";
import DEFAULT from "../../../../assets/images/default-img.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

const RecentOrderDesktop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const recentOrderData = useSelector(
    (state: RootState) => state.CommonReducer.saveRecentOrder
  );

  
  const loader = useSelector((state: any) => state.CommonReducer.isLoader);

  useEffect(() => {
    let body = {
      page: 1,
      size: 5,
      userId: state.id,
    };
    dispatch(actionRecentOrder(body));
  }, []);

  const settings:any = {
    className: "recently-list-slider recently-list slick-initialized",
    dots: false,
    infinite: recentOrderData.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2565,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: recentOrderData.length > 3,
        },
      },
      {
        breakpoint: 1367,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleRecentOrder = (item: any) => {
    let body = {
      order_id: item.order_id,
      user_id: item.user_id,
    };
    dispatch(actionOrderDetailApiCall(body));
    navigate("/recentOrderAgain");
  };
  return (
    <div className={classes.RecentOrdersSection}>
      <DesktopLayout>
        <div className={classes.RecentOrdersMain}>
          <h3 className="font-md">Recent Orders</h3>
          {loader === true ? (
            <LoadingAnimation />
          ) : recentOrderData.length > 0 ? (
            <Slider {...settings}>
              {recentOrderData &&
                recentOrderData.map((item: any, index: any) => (
                  <div
                    className={classes.ItemMain}
                    key={index}
                    onClick={() => handleRecentOrder(item)}
                  >
                    <img
                      src={item?.restaurant_detail?.restaurant_logo || DEFAULT}
                      onError={({ currentTarget }) =>
                        (currentTarget.src = DEFAULT)
                      }
                      alt=""
                    />
                    <p>{item?.restaurant_detail?.restaurant_name}</p>
                  </div>
                ))}
            </Slider>
          ) : (
            <h2 className={classes.noRecent}>No Orders have been placed</h2>
          )}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default RecentOrderDesktop;
