import { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./restaurantdetaildesktop.module.scss";
import ExploreMenuDesktop from "./ExploreMenuDesktop";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";

const RestaurantDetailDesktop = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [total, setTotal] = useState(0);
  const [restroData, setRestroData] = useState({
    restaurant_name: "",
    address: "",
    category_list: [],
    restaurant_logo: "",
    restaurant_original_logo: "",
    ratings: [],
  });

  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  useEffect(() => {
    setRestroData(
      state.saveRestroDetail.Restaurants && state.saveRestroDetail.Restaurants
    );
  }, [state]);

  useEffect(() => {
    if (cartData?.length > 0) {
      let totalcount = 0;
      cartData.map((item: any) => {
        let price = item.price ? item.price : item.product_price;
        totalcount = Number(totalcount) + Number(item.quantity) * Number(price);
      });
      setTotal(totalcount);
    } else {
      setTotal(0);
    }
  }, [cartData]);

  const handleAddToCart = () => {
    if (cartData?.length > 0) {
      navigate("/addtocart");
    } else {
      toast.error("Add some items");
    }
  };
  return (
    <DesktopLayout>
      <div className={`${classes.RestaurantDetailMain} mb-xxl`}>
        <div className={classes.RestaurantSection}>
          <div className={classes.RestaurantPart}>
            <div className={classes.RestoImg}>
              <img src={restroData.restaurant_original_logo} />
            </div>
            <div className={classes.RestoContent}>
              <div className={classes.RestoName}>
                <h3>{restroData && restroData.restaurant_name}</h3>
                <h6>{restroData && restroData.address}</h6>
                {/* <p>A-1, Square Mall, Los Angeles</p> */}
              </div>
              <div className={classes.Rateing}>
                <Rating
                  allowHover={false}
                  readonly={true}
                  initialValue={
                    Math.round(
                      state?.saveRestroDetail.ratings.sum /
                        state?.saveRestroDetail.ratings.count
                    ) > 1
                      ? Math.round(
                          state?.saveRestroDetail.ratings.sum /
                            state?.saveRestroDetail.ratings.count
                        )
                      : 0
                  }
                />

                <p>
                  (
                  {restroData.ratings.length > 0
                    ? restroData.ratings.length
                    : 0}{" "}
                  Ratings)
                </p>
              </div>
            </div>
          </div>
          <div className={classes.MyCartPart}>
            <div className={classes.CartTitle}>
              <h4>My Cart ({cartData?.length} Items)</h4>
            </div>
            <div className={classes.CartItem}>
              <div className={classes.itemWrap}>
                {cartData?.map((item: any) => {
                  return (
                    <a className={classes.itemMedia}>
                      <div className={classes.mediaBody}>
                        <h4>{item.name ? item.name : item.product_name}</h4>
                      </div>
                      <div className={classes.count}>
                        <p>&nbsp;</p>
                        <div className={classes.quantity}>
                          <GrClose />
                          <p>{item.quantity}</p>
                        </div>
                        <span>
                          ${item.price ? item.price : item.product_price}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className={classes.Totle}>
              <h3>${total.toFixed(2)}</h3>
            </div>
            <div className={classes.ViewCartBtn}>
              <button onClick={handleAddToCart}>View Cart</button>
            </div>
          </div>
        </div>
        <ExploreMenuDesktop />
      </div>
    </DesktopLayout>
  );
};

export default RestaurantDetailDesktop;
