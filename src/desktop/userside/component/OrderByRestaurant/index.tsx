import React from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./orderbyrestaurantdesktop.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { actionRestaurantDetailApiCall } from "../../../../mobile/store/actions";
import DEFAULT from "../../../../assets/images/default-img.png";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

const OrderByRestaurantDesktop = () => {
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    setData(state?.saveOrderByRestorentData);
  }, [state]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  type mapItem = {
    restaurant_logo: any;
    restaurant_name: string;
    slug: string;
  };

  const onDivClick = (data: string) => {
    const path = `restaurant_slug=${data}`;
    const title = data;
    const body = { path, navigate, title };
    dispatch(actionRestaurantDetailApiCall(body));
  };
  return (
    <DesktopLayout>
      <div className={classes.OrderByRestaurantSection}>
        <div className={classes.OrderByRestaurantMain}>
          <div className={classes.TitleWrap}>
            <h3>Order by Restaurant</h3>
            {data?.length > 0 ? (
              <Link to="/OrderByRestaurant">
                <span>See all</span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className={classes.RestocategoryParent}>
            {loader === true ? (
              <LoadingAnimation />
            ) : data?.length > 0 ? (
              data.map((item: mapItem) => (
                <div
                  className={classes.ItemMain}
                  onClick={() => onDivClick(item.slug)}
                >
                  <div className={classes.ImgWrap}>
                    <img src={item.restaurant_logo || DEFAULT} />
                  </div>
                  <h4>{item.restaurant_name}</h4>
                </div>
              ))
            ) : (
              <h3>No Restaurant to Show</h3>
            )}
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default OrderByRestaurantDesktop;
