import React from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./orderbycategorydesktop.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { actionGetRestroForCategory } from "../../../../mobile/store/actions";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

const OrderByCategoryDesktop = () => {
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [data, setData] = React.useState<any>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    setData(state.saveOrderByCategoryData);
  }, [state]);

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  type mapItem = {
    image: any;
    category_name: string;
  };

  const handleRestroDetails = (item: any) => {
    navigate("/listing", { state: { title: "category" } });
    dispatch(actionGetRestroForCategory(item?.id));
  };
  scroll.scrollToTop({
    duration: 0,
    smooth: "easeInOutQuint",
  });
  return (
    <DesktopLayout>
      <div className={classes.OrderByCategorySection}>
        <div className={classes.OrderByCategoryMain}>
          <div className={classes.TitleWrap}>
            <h3>Order by Category</h3>
            {data?.length > 0 ? (
              <Link to="/category">
                <span>See all</span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className={classes.Nav}>
            {loader === true ? (
              <LoadingAnimation />
            ) : data?.length > 0 ? (
              data.map((item: mapItem) => (
                <div
                  className={classes.ItemMain}
                  onClick={() => handleRestroDetails(item)}
                >
                  <div className={classes.content}>
                    <div className={classes.ImgWrap}>
                      <img src={item.image} />
                    </div>
                    <p>{item.category_name}</p>
                  </div>
                </div>
              ))
            ) : (
              <h3>No Category to Show</h3>
            )}
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default OrderByCategoryDesktop;
