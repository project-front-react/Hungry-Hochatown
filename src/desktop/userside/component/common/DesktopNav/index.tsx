import DesktopLayout from "../DesktopLayout";
import classes from "./desktopnav.module.scss";
import { useState } from "react";
import Logo from "../../../../../assets/images/logo/logo4.png";
import { BsSearch } from "react-icons/bs";
import { BsHandbag, BsHandbagFill } from "react-icons/bs";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../mobile/store/reducers/rootReducers";
import {
  actiongetCartDetailApiCall,
  actionLogoutApiCall,
  actionorderHistorySearchApiCall,
  actionPostRecentSearchApiCall,
  actionSearchByRestaurantApiCall,
  actionSearchOrderByCategoryApiCall,
  actionSearchOrderByRestaurantApiCall,
  actionSearchPerRestaurantCategoryApiCall,
} from "../../../../../mobile/store/actions";
interface type {
  search: string;
  lastName: string;
}
const DesktopNav = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [search, setSearch] = useState<string>();
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const dataForSearch = useSelector(
    (state: RootState) => state.CommonReducer.saveDataForSearchProduct
  );

  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (search && event.key === "Enter") {
      onSearch();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearch(newValue);
  };
  const onSearch = () => {
    let searchData = {
      userId: state.id,
      keyword: search,
    };
    if (search) {
      if (pathName === "/listing") {
        let data = {
          search: search,
        };
        let body = { data, navigate };
        dispatch(actionSearchByRestaurantApiCall(body));
        dispatch(actionPostRecentSearchApiCall(searchData));
      } else if (pathName === "/category") {
        let path = `category_name=${search}`;
        let body = { path, navigate };
        dispatch(actionSearchOrderByCategoryApiCall(body));
        dispatch(actionPostRecentSearchApiCall(searchData));
      } else if (pathName === "/OrderByRestaurant") {
        let path = `size=8&restaurant_name=${search}`;
        let body = { path, navigate };
        dispatch(actionSearchOrderByRestaurantApiCall(body));
        dispatch(actionPostRecentSearchApiCall(searchData));
      } else if (pathName.includes("/restaurant-detail")) {
        let path = `restaurant_id=${dataForSearch.restroId}&category_id=${dataForSearch.categoryId}&product_name=${search}`;
        let body = { path, navigate };
        setSearch("");
        dispatch(actionSearchPerRestaurantCategoryApiCall(body));
        dispatch(actionPostRecentSearchApiCall(searchData));
      } else if (pathName === "/order-history") {
        let data = {
          page: 1,
          size: 10,
          userId: state.id,
          orderId: `#${parseInt(search).toString().padStart(10, "0")}`,
        };
        let body = { data: data, navigator: "" };
        dispatch(actionorderHistorySearchApiCall(body));
      }
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
    setShow(false);
  };
  return (
    <DesktopLayout>
      <div
        className={classes.NavMain}
        style={props.path ? { marginBottom: "0px" } : { marginBottom: "50px" }}
      >
        <div className={classes.LogoWrap} onClick={() => navigate("/home")}>
          <img src={Logo} />
        </div>
        {props.search && (
          <div className={classes.SearchBox}>
            <BsSearch
              onClick={() => {
                onSearch();
              }}
            />
            <input
              className="form-control"
              type="search"
              placeholder={
                pathName == "/order-history"
                  ? "Search Order ID"
                  : props.path
                  ? "Search here restaurant food"
                  : "Search here for food"
              }
              onChange={handleChange}
              onKeyPress={onKeyPress}
            />
          </div>
        )}
        <nav className={classes.NavLinks}>
          <ul
            className={
              clicked
                ? `${classes.menu_list}`
                : `${classes.menu_list} ${classes.close}`
            }
          >
            <li
              className={pathName == "/home" ? classes.active : ""}
              onClick={() => navigate("/home")}
            >
              Home
            </li>
            <li
              className={pathName == "/category" ? classes.active : ""}
              onClick={() => navigate("/category")}
            >
              Category
            </li>
            <li
              className={pathName == "/order-history" ? classes.active : ""}
              onClick={() => navigate("/order-history")}
            >
              Your Orders
            </li>
          </ul>
          <ul className={classes.MenuIcon}>
            <li>
              <div className={classes.ToggleWrapper}>
                {show == false ? (
                  <IoPersonOutline
                    onClick={() => {
                      setShow(!show);
                      setClicked(false);
                    }}
                  />
                ) : (
                  <IoPerson
                    onClick={() => {
                      setShow(!show);
                      setClicked(false);
                    }}
                  />
                )}
                {show && (
                  <div className={classes.ToggleList}>
                    <div
                      className={classes.ListItem}
                      onClick={() => navigate("/edit-profile")}
                    >
                      Edit Profile
                    </div>
                    <div
                      className={classes.ListItem}
                      onClick={() => navigate("/notification")}
                    >
                      Notification
                    </div>
                    <div
                      className={classes.ListItem}
                      onClick={() => navigate("/change-your-password")}
                    >
                      Change Password
                    </div>
                    <div
                      className={classes.ListItem}
                      onClick={() => navigate("/contact-us")}
                    >
                      Help Desk
                    </div>
                    <div
                      className={classes.ListItem}
                      onClick={() => {
                        let data = {
                          userId: state.id,
                          cartDetail: [{ userId: state.id, data: [] }],
                        };
                        let data1 = { data, navigate: "" };
                        let body = { navigate, data: data1, dispatch };
                        dispatch(actionLogoutApiCall(body));
                        dispatch(actiongetCartDetailApiCall(state.id));
                      }}
                    >
                      Sign Out
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li onClick={() => navigate("/addtocart")}>
              {pathName == "/addtocart" ? <BsHandbagFill /> : <BsHandbag />}
              {cartData.length > 0 && (
                <div className={classes.CartItemNumber}>{cartData.length}</div>
              )}
            </li>
            <li className={classes.menu_icon} onClick={handleClick}>
              {clicked ? <GrClose /> : <GiHamburgerMenu />}
            </li>
          </ul>
        </nav>
      </div>
    </DesktopLayout>
  );
};

export default DesktopNav;
