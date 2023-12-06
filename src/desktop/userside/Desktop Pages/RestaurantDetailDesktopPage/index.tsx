import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actiongetCartDetailApiCall } from "../../../../mobile/store/actions";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import DesktopNav from "../../component/common/DesktopNav";
import DesktopFooter from "../../component/common/DesktoppFooter";
import RestaurantDetailDesktop from "../../component/RestaurantDetailDesktop";
import { animateScroll as scroll } from "react-scroll";

const RestaurantDetailDesktopPage = () => {
  scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  React.useEffect(() => {
    let data = { userId: state.id };
    let body = { data: data, navigator: "" };
    dispatch(actiongetCartDetailApiCall(body));
  }, []);
  return (
    <React.Fragment>
      <DesktopNav search="true" path="restro"/>
      <RestaurantDetailDesktop />
      <DesktopFooter />
    </React.Fragment>
  );
};

export default RestaurantDetailDesktopPage;
