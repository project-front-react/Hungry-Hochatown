import React, { useEffect } from "react";
import SearchInput from "../../../components/SearchInput";
import classes from "./searchmain.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { actionGetRecentSearchhApiCall, actionSearchByRestaurantApiCall } from "../../store/actions";
import { useNavigate } from "react-router-dom";

const SearchMain = () => {
	const dispatch=useDispatch();
	const navigate=useNavigate();
	const state = useSelector(
		(state: RootState) => state.CommonReducer.saveLoginUserDetails
	  );
	const RecentSearchData = useSelector(
		(state: RootState) => state.CommonReducer.saveRecentSearchdata
	  );	

	useEffect(()=>{
		dispatch(actionGetRecentSearchhApiCall({userId:state.id}))
	},[])
	const search=(searchData:any)=>{
		let data={search:searchData}
		let body = { data, navigate };
        dispatch(actionSearchByRestaurantApiCall(body));
	}
  return (
    <div>
      <React.Fragment>
        <div className={classes.searchMain}>
          <SearchInput />
          <div className={classes.recentSearch}>
            <h1>Recently Searched</h1>
            <ul>
              {RecentSearchData && RecentSearchData.map((item:any) => (
                <li onClick={()=>search(item.search_keyword)}>
                  <a>{item.search_keyword}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default SearchMain;
