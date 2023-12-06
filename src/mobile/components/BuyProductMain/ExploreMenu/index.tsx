import { useEffect, useState } from "react";
import classes from "./exploremenu.module.scss";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddTocart,
  actionCatergoryProductShowApiCall,
  actionDecrementTocart,
  actionIncrementTocart,
  actionpostCartDetailApiCall,
  actionRemoveTocart,
  actionSingleProductDetailApiCall,
} from "../../../store/actions";
import { RootState } from "../../../store/reducers/rootReducers";
import ProductDetailsPopup from "../../ProductDetailsPopup";
import DEFAULT from "../../../../../src/assets/images/default-img.png";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";
import { useNavigate } from "react-router";

type mapItem = {
  image: any;
  category_name: string;
  id: number;
  restaurant_category: Object;
};

const ExploreMenu = () => {
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

  const [active, setActive] = useState(data?.category_list[0]?.restaurant_category?.category_id)

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
        let temp:any[] = addToCartData.filter(
          (element: any) => element.id === productDetailsItem.id && element
        );
        if (temp.length == 1) {
          if(temp[0]){
            setSingleData(temp[0])
            if (productDetailsItem.price!= temp[0].price) {
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

  if(show == true){
    document.body.style.overflow = "hidden";
  }else{
    document.body.style.overflow = "auto";
  }
  

  return (
    <div>
      <div className={classes.exploreMenu}>
        <h1>Explore Menu</h1>
        <div className={classes.tabsItem}>
          {data &&
            data?.category_list?.map((item: mapItem) => (
              <div
                className={classes.tabList}
                onClick={() => handleCategoryProductShow(data, item)}
              >
                <div
                  className={
                    active == item.id ? classes.navLinkSelect : classes.navLink
                  }
                >
                    {item.category_name}
                </div>
              </div>
            ))}
        </div>
        {loader == true ? <LoadingAnimation/> :
        
        productDetails?.length > 0 ? (
          <div className={classes.cartwrep}>
            {save &&
              save?.map((item: any) => (
                <div className={classes.swipeToshow}>
                  <div className={classes.productList}>
                    <a onClick={() => productApiCall(item.slug)}>
                      <div className="list-imageWrapper">
                        <img
                          src={item.productImages.image || DEFAULT}
                          onError={({ currentTarget }) =>
                            (currentTarget.src = DEFAULT)
                          }
                          alt=""
                        />
                      </div>
                    </a>
                    <div className={classes.mediaBody}>
                      <div onClick={() => productApiCall(item.slug)}>
                        <h5 className="product-title">{item?.product_name}</h5>
                        <h5 className="product-title">{item?.description}</h5>
                        <span>$ {item.price}</span>
                      </div>
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
                            value={item.quantity}
                            readOnly={true}
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
                  <div
                    className={classes.deletBtn}
                    onClick={() => {
                      dispatch(actionRemoveTocart(item));
                    }}
                  >
                    <AiOutlineDelete />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <h1 className={classes.noData}>No products available</h1>
        )} 
        
      </div>
      <ProductDetailsPopup visibility={show} close={() => setshow(false)} />
    </div>
  );
};

export default ExploreMenu;
