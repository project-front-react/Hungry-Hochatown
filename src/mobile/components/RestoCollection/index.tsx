import React, { useEffect, useState } from "react";
import SearchInput from "../../../components/SearchInput";
import classes from "./restocollection.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import AppFooter from "../common/AppFooter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  actionGetRestroForCategory,
  actionRestaurantDetailApiCall,
  actionGetAllRestroData,
} from "../../store/actions";
import DEFAULT from "../../../assets/images/default-img.png";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";
import { animateScroll as scroll } from "react-scroll";

const RestoCollection = () => { 
  scroll.scrollToTop({
    duration: 0,
    smooth: "easeInOutQuint",
  });
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchOfCategoryData, setSearchOfCategoryData] = useState([]);
  const [searchOfRestroData, setSearchOfRestroDataData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetAllRestroData());
  }, []);

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  const restroDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveRestroForCategories
  );

  const allRestroData = useSelector(
    (state: RootState) => state.CommonReducer.saveAllRestroData
  );

  useEffect(() => {
    if (location.pathname === "/listing") {
      if (location.state.title === "both") {
        setSearchData(state.saveSearchData);
        setSearchOfCategoryData([]);
        setSearchOfRestroDataData([]);
      } else if (location.state.title === "category") {
        setSearchOfCategoryData(restroDetails.data);
        setSearchOfRestroDataData([]);
        setSearchData([]);
      } else if (location.state.title === "restaurant") {
        setSearchOfRestroDataData(state.saveSearchOrderByRestorentData);
        setData([]);
        setSearchOfCategoryData([]);
      }
    } else if (location.pathname === "/OrderByRestaurant") {
      setData(allRestroData);
    }
  }, [location, restroDetails, allRestroData]);

  const onDivClick = (data: string) => {
    const path = `restaurant_slug=${data}`;
    const title = data;
    const body = { path, navigate, title };
    dispatch(actionRestaurantDetailApiCall(body));
  };
  type mapItem = {
    restaurant_logo: any;
    image: any;
    name: string;
    slug: string;
    restaurant_name: string;
    category_name: string;
    logo: any;
  };

  const handleTypeCheck = (item: any) => {
    if (item.type === "category") {
      dispatch(actionGetRestroForCategory(item.id));
      navigate("/category", { state: { id: item.id } });
    } else if (item.type === "restaurant") {
      const path = `restaurant_slug=${item.slug}`;
      const title = item.slug;
      const body = { path, navigate, title };
      dispatch(actionRestaurantDetailApiCall(body));
    }
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <Link to={"/home"}>
            <img
              className={`${classes.logo} ${classes.logoW}`}
              src={BrandLogo}
              alt="logo"
            />
            <img className={classes.logo} src={BrandLogo} alt="logo" />
          </Link>
        </div>
      </header>
      <main className={`${classes.collectionMain} mb-xxl`}>
        <SearchInput />
        <div className={classes.RestoSection}>
          <h3>Collection</h3>
          <small>
            Explore curated lists of top restaurants, cafes, pubs, and bars
          </small>
          {loader === true ? (
            <LoadingAnimation />
          ) : (
            <div className={classes.colletionWrap}>
              {data &&
                data?.map((item: mapItem) => (
                  <span onClick={() => onDivClick(item.slug)}>
                    <div className={classes.staplesBox}>
                      <div>
                        <img
                          className={classes.RestocategoryImg}
                          src={item.restaurant_logo || DEFAULT}
                          onError={({ currentTarget }) =>
                            (currentTarget.src = DEFAULT)
                          }
                          alt=""
                        />
                      </div>
                      <h4>{item.restaurant_name}</h4> <small>Hochatown</small>
                    </div>
                  </span>
                ))}

              {searchData &&
                searchData
                  .filter((item: any) => item.type !== "product")
                  ?.map((item: mapItem) => (
                    <span onClick={() => handleTypeCheck(item)}>
                      <div className={classes.staplesBox}>
                        <div>
                          <img src={item.logo} />
                        </div>
                        <h4>{item.name}</h4>
                        <small>Hochatown</small>
                      </div>
                    </span>
                  ))}
              {searchOfCategoryData &&
                searchOfCategoryData?.map((item: mapItem) => (
                  <span onClick={() => onDivClick(item.slug)}>
                    <div className={classes.staplesBox}>
                      <div>
                        <img
                          className={classes.RestocategoryImg}
                          src={item.restaurant_logo || DEFAULT}
                          onError={({ currentTarget }) =>
                            (currentTarget.src = DEFAULT)
                          }
                          alt=""
                        />
                      </div>
                      <h4>{item.restaurant_name}</h4>
                      <small>Hochatown</small>
                    </div>
                  </span>
                ))}
              {searchOfRestroData &&
                searchOfRestroData?.map((item: mapItem) => (
                  <span onClick={() => onDivClick(item.slug)}>
                    <div className={classes.staplesBox}>
                      <div>
                        <img
                          className={classes.RestocategoryImg}
                          src={item.restaurant_logo || DEFAULT}
                          onError={({ currentTarget }) =>
                            (currentTarget.src = DEFAULT)
                          }
                          alt=""
                        />
                      </div>
                      <h4>{item.restaurant_name}</h4>
                      <small>Hochatown</small>
                    </div>
                  </span>
                ))}
              {data?.length <= 0 &&
                searchData?.length <= 0 &&
                searchOfCategoryData?.length <= 0 &&
                searchOfRestroData?.length <= 0 && <h2>No data Found</h2>}
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </React.Fragment>
  );
};

export default RestoCollection;
