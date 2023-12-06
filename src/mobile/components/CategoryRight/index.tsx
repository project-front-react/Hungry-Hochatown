import classes from "./rightmenu.module.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  actionGetRestroForCategory,
  actionRestaurantDetailApiCall,
} from "../../store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import DEFAULT from "../../../assets/images/default-img.png";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const RightMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const rightSideCategory = useSelector(
    (state: any) => state.CommonReducer.saveRestroForCategories
  );
  const loader = useSelector((state: any) => state.CommonReducer.isLoader);

  useEffect(() => {
    if (location?.state?.id) {
      dispatch(actionGetRestroForCategory(location.state.id));
    } else {
      dispatch(actionGetRestroForCategory(1));
    }
  }, [location.state]);

  const onDivClick = (data: string) => {
    const path = `restaurant_slug=${data}`;
    const title = data;
    const body = { path, navigate, title };
    dispatch(actionRestaurantDetailApiCall(body));
  };
  return (
    <div className={classes.rightSection}>
      <div className={classes.rightMenu}>
        {loader == true ? (
          <LoadingAnimation />
        ) : rightSideCategory?.data?.length > 0 ? (
          <div className={classes.tabContent}>
            <div className={classes.tabWrap}>
              {rightSideCategory?.data?.map((item: any) => (
                <a
                  onClick={() => {
                    onDivClick(item.slug);
                  }}
                >
                  <div className={classes.staplesBox}>
                    <div>
                      <img
                        src={item.restaurant_logo || DEFAULT}
                        onError={({ currentTarget }) =>
                          (currentTarget.src = DEFAULT)
                        }
                        alt=""
                      />
                      <h4>{item.restaurant_name}</h4>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <h2>No Restaurant Found</h2>
        )}
      </div>
    </div>
  );
};

export default RightMenu;
