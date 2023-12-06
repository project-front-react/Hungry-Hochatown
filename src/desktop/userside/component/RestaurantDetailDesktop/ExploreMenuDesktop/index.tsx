import { useEffect, useState } from "react";
import classes from "./exploremenudesktop.module.scss";
import DEFAULT from "../../../../../assets/images/default-img.png";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../mobile/store/reducers/rootReducers";
import {
  actionAddTocart,
  actionCatergoryProductShowApiCall,
  actionDecrementTocart,
  actionIncrementTocart,
  actionpostCartDetailApiCall,
  actionRemoveTocart,
  actionSingleProductDetailApiCall,
} from "../../../../../mobile/store/actions";
import LoadingAnimation from "../../../../../pages/AnimationLoader/LoadingAnimation";
import ProductDetailsPopup from "../../../../../mobile/components/ProductDetailsPopup";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const ExploreMenuDesktop = () => {
  const [save, setSave] = useState([]);
  const [show, setshow] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [direction, setDirection] = useState(false);
  const [singleData, setSingleData] = useState(false);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const dataForSearch = useSelector(
    (state: RootState) => state.CommonReducer.saveDataForSearchProduct
  );

  const data = useSelector(
    (state: RootState) => state.CommonReducer.saveRestroDetail.Restaurants
  );

  const [active, setActive] = useState(
    data?.category_list[0]?.restaurant_category?.category_id
  );

  const searchedData = useSelector(
    (state: RootState) => state.CommonReducer.saveSearchedProduct
  );

  const addToCartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );

  const productDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveCategoryProductShow.data
  );

  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  useEffect(() => {
    if (addToCartData.length > 0) {
      let data = {
        userId: state.id,
        cartDetail: [{ userId: state.id, data: addToCartData }],
      };
      let body = { data, navigate: "" };
      dispatch(actionpostCartDetailApiCall(body));
    } else {
      let data = {
        userId: state.id,
        cartDetail: [],
      };
      let body = { data, navigate: "" };
      dispatch(actionpostCartDetailApiCall(body));
    }
  }, [addToCartData, state]);

  useEffect(() => {
    if (addToCartData && productDetails) {
      const cartDatacompare = productDetails.map((productDetailsItem: any) => {
        let temp: any[] = addToCartData.filter(
          (element: any) => element.id === productDetailsItem.id && element
        );
        if (temp.length == 1) {
          if (temp[0]) {
            setSingleData(temp[0]);
            if (productDetailsItem.price != temp[0].price) {
              setDirection(true);
            } else {
              setDirection(false);
            }
            return { ...productDetailsItem, quantity: temp[0].quantity };
          }
        } else if (temp.length > 1) {
          setDirection(true);
          let quantity = 0;
          temp.map((item: any) => (quantity = quantity + item.quantity));
          return { ...productDetailsItem, quantity: quantity };
        } else {
          setDirection(false);
          return { ...productDetailsItem, quantity: 0 };
        }
      });
      setSave(cartDatacompare);
    } else {
      setSave(productDetails);
    }
  }, [addToCartData, productDetails]);

  useEffect(() => {
    if (searchedData) {
      setSave(searchedData);
    }
  }, [searchedData]);

  useEffect(() => {
    let restroId = data?.category_list[0]?.restaurant_category.restaurant_id;
    let categoryId = data?.category_list[0]?.restaurant_category.category_id;
    let body = { restroId, categoryId };
    dispatch(actionCatergoryProductShowApiCall(body));
  }, []);
  const popupCloseHandler = () => {
    setVisibility(false);
  };
  const productApiCall = (slug: any) => {
    setshow(true);
    let data = slug;
    let navigate = "";
    let body = { data, navigate };
    dispatch(actionSingleProductDetailApiCall(body));
  };

  const handleCategoryProductShow = (data: any, item: any) => {
    let restroId = data.id;
    let categoryId = item.id;
    setActive(categoryId);
    let body = { restroId, categoryId };
    dispatch(actionCatergoryProductShowApiCall(body));
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (show == true) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className={classes.ExploreMenuSection}>
      <h1>Explore Menu</h1>
      <div className={classes.ExploreMenuTab}>
        <Carousel responsive={responsive} draggable={false}>
          {data &&
            data?.category_list?.map((item: any) => (
              <div
                className={
                  item?.id == active ? classes.tabList : classes.tabListInactive
                }
                onClick={() => handleCategoryProductShow(data, item)}
              >
                <div className={classes.ImageWrap}>
                  <img src={item.image || DEFAULT} />
                </div>
                <div className={classes.navLink}>{item.category_name}</div>
              </div>
            ))}
        </Carousel>
      </div>
      <div className={classes.MenuItem}>
        <div className={classes.Itemparent}>
          {loader == true ? (
            <LoadingAnimation />
          ) : save?.length > 0 ? (
            save &&
            save?.map((item: any) => (
              <div className={classes.ItemWrap}>
                <div onClick={() => productApiCall(item.slug)}>
                  <div className={classes.ItemImg}>
                    <img src={item?.productImages?.image || DEFAULT} />
                  </div>
                  <h4>{item?.product_name}</h4>
                  <h5>{item?.description}</h5>
                </div>
                <div className={classes.PriceSection}>
                  <p>${item.price}</p>
                  {item.quantity == 0 ? (
                    <div className={classes.pluMinus}>
                      <button
                        onClick={() => {
                          if (item.quantity <= 0) {
                            let data = {
                              id: item.id,
                              price: item.price,
                              name: item?.product_name,
                              image: item.productImages.image,
                              quantity: 1,
                              attributes: {},
                            };
                            let restaurentId = dataForSearch.restroId;
                            let body = { data, restaurentId };
                            dispatch(actionAddTocart(body));
                          }
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <div className={classes.pluMinus}>
                      <button
                        onClick={() => {
                          if (direction == true) {
                            navigator("/addtocart");
                          } else {
                            if (item.quantity == 1) {
                              dispatch(actionRemoveTocart(item));
                            } else {
                              let data = {
                                id: item.id,
                                price: item.price,
                                name: item?.product_name,
                                image: item?.productImages?.image || DEFAULT,
                                quantity: 1,
                                attributes: item.attributes
                                  ? item.attributes
                                  : {},
                              };
                              dispatch(actionDecrementTocart(data));
                            }
                          }
                        }}
                        disabled={item.quantity === 0}
                      >
                        <AiOutlineMinus />
                      </button>
                      <input
                        type="number"
                        readOnly={true}
                        value={item.quantity}
                      />
                      <button
                        onClick={() => {
                          if (direction == true) {
                            navigator("/addtocart");
                          } else {
                            if (item.quantity <= 0) {
                              let data = { ...item, quantity: 1 };
                              let restaurentId = dataForSearch.restroId;
                              let body = { data, restaurentId };
                              dispatch(actionAddTocart(body));
                            }
                            if (item.quantity >= 1) {
                              let data = {
                                id: item.id,
                                price: item.price,
                                name: item?.product_name,
                                image: item?.productImages?.image || DEFAULT,
                                quantity: 1,
                                attributes: {},
                              };
                              dispatch(actionIncrementTocart(data));
                            }
                          }
                        }}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h1 className={classes.noData}>No products available</h1>
          )}
        </div>
      </div>
      <ProductDetailsPopup visibility={show} close={() => setshow(false)} />
    </div>
  );
};
export default ExploreMenuDesktop;
