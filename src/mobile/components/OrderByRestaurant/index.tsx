import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionRestaurantDetailApiCall } from "../../store/actions";
import { RootState } from "../../store/reducers/rootReducers";
import classes from "./orderbyrestaurant.module.scss";
import DEFAULT from "../../../assets/images/default-img.png";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const OrderByRestaurant = () => {
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    setData(state?.saveOrderByRestorentData);
  }, [state]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );
  return (
    <div className={classes.categoryResto}>
      <div className={classes.topContent}>
        <div>
          <h4>Order by Restaurant</h4>
        </div>
        {data?.length > 0 ? (
          <Link to="/OrderByRestaurant">
            <div className={classes.brandColor}>See all</div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className={classes.RestocategoryParent}>
        {loader === true ? (
          <LoadingAnimation />
        ) : data?.length > 0 ? (
          data?.map((item: mapItem) => {
            return (
              <>
                <div
                  className={classes.RestocategoryWrap}
                  onClick={() => onDivClick(item.slug)}
                >
                  <div className={classes.RestobgShape}></div>
                  <img
                    className={classes.RestocategoryImg}
                    src={item.restaurant_logo || DEFAULT}
                    onError={({ currentTarget }) =>
                      (currentTarget.src = DEFAULT)
                    }
                    alt=""
                  />
                  <span>{item.restaurant_name}</span>
                </div>
              </>
            );
          })
        ) : (
          <h3>No Restaurant to Show</h3>
        )}
      </div>
    </div>
  );
};

export default OrderByRestaurant;
