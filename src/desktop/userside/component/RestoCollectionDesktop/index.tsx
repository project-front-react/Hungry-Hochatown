import { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./restocollectiondesktop.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DEFAULT from "../../../../assets/images/default-img.png";
import {
  actionGetAllRestroData,
  actionGetRestroForCategory,
  actionRestaurantDetailApiCall,
} from "../../../../mobile/store/actions";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";
const RestoCollectionDesktop = () => {
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [scrollState, setScrollState] = useState(true);
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

  const restroDetails = useSelector(
    (state: any) => state.CommonReducer.saveRestroForCategories
  );

  const allRestro = useSelector(
    (state: any) => state.CommonReducer.saveOrderByRestorentData
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
        setData([]);
      } else if (location.state.title === "category") {
        setSearchOfCategoryData(restroDetails.data);
        setSearchOfRestroDataData([]);
        setSearchData([]);
        setData([]);
      } else if (location.state.title === "restaurant") {
        setSearchOfRestroDataData(state.saveSearchOrderByRestorentData);
        setData([]);
        setSearchOfCategoryData([]);
      }
    }
    if (location.pathname == "/OrderByRestaurant") {
      setData(allRestroData);
    }
  }, [location.pathname, restroDetails,allRestroData]);

  const onDivClick = (data: string) => {
    const path = `restaurant_slug=${data}`;
    const title = data;
    const body = { path, navigate, title };
    dispatch(actionRestaurantDetailApiCall(body));
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
    <DesktopLayout>
      <div className={`${classes.RestoCollectionMain} mb-xxl`}>
        <h1>Collections</h1>
        <p>Explore curated lists of top restaurants, cafes, pubs, and bars</p>
        {loader == true ? (
          <LoadingAnimation />
        ) : (
          <div className={classes.RestoCollectionParent}>
            {data &&
              data.map((item: any) => (
                <div
                  className={classes.ItemMain}
                  onClick={() => onDivClick(item.slug)}
                >
                  <div className={classes.ImgWrap}>
                    <img src={item.restaurant_logo || DEFAULT} />
                  </div>
                  <h4>{item.restaurant_name}</h4>
                  <p>Hochatown</p>
                </div>
              ))}
            {searchData &&
              searchData
                .filter((item: any) => item.type !== "product")
                ?.map((item: any) => (
                  <span onClick={() => handleTypeCheck(item)}>
                    <div className={classes.ItemMain}>
                      <div className={classes.ImgWrap}>
                        <img src={item.logo || DEFAULT} />
                      </div>
                      <h4>{item.name}</h4>
                      <small>Hochatown</small>
                    </div>
                  </span>
                ))}
            {searchOfCategoryData &&
              searchOfCategoryData?.map((item: any) => (
                <span onClick={() => onDivClick(item.slug)}>
                  <div className={classes.ItemMain}>
                    <div className={classes.ImgWrap}>
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
              searchOfRestroData?.map((item: any) => (
                <span onClick={() => onDivClick(item.slug)}>
                  <div className={classes.ItemMain}>
                    <div className={classes.ImgWrap}>
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
    </DesktopLayout>
  );
};

export default RestoCollectionDesktop;
