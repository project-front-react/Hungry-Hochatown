import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import classes from "./searchInput.module.scss";
import { useDispatch } from "react-redux";
import {
  actionorderHistorySearchApiCall,
  actionPostRecentSearchApiCall,
  actionSearchByRestaurantApiCall,
  actionSearchOrderByCategoryApiCall,
  actionSearchOrderByRestaurantApiCall,
  actionSearchPerRestaurantCategoryApiCall,
} from "../../mobile/store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../mobile/store/reducers/rootReducers";
const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [search, setSearch] = useState<string>();
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const dataForSearch = useSelector(
    (state: RootState) => state.CommonReducer.saveDataForSearchProduct
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
      if (
        pathName === "/home" ||
        pathName === "/search" ||
        pathName === "/listing"
      ) {
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
  return (
    <div className={classes.searchBox}>
      <BsSearch
        onClick={() => {
          onSearch();
        }}
      />
      <input
        className="form-control"
        type="search"
        placeholder={pathName === "/order-history" ? "Search Order ID" : "Search here..."}
        onChange={handleChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default SearchInput;
