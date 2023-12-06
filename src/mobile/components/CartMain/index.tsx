import React, { useEffect, useRef, useState } from "react";
import classes from "./cartmain.module.scss";
import { VscHome } from "react-icons/vsc";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import {
  actionDecrementTocart,
  actiongetCartDetailApiCall,
  actionIncrementTocart,
  actionpostCartDetailApiCall,
  actionRemoveTocart,
  actionTotalCartPrice,
  actionDeliveryTipData,
} from "../../store/actions";
import { useNavigate } from "react-router-dom";
import DEFAULT from "../../../assets/images/default-img.png";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";
import { toast } from "react-toastify";

const CartMain = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState<any[]>([]);
  const [swipe, setSwipe] = useState(false);
  const [total, setTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState<any | number>(0);

  const dispatch = useDispatch();
  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );

  useEffect(() => {
    dispatch(actionDeliveryTipData());
  }, []);

  const loader = useSelector((state: any) => state.CommonReducer.isLoader);

  const deliveryTip = useSelector(
    (state: RootState) => state.CommonReducer.saveDeliveryTip
  );

  useEffect(() => {
    let data = { userId: state.id };
    let body = { data: data, navigator: "" };
    dispatch(actiongetCartDetailApiCall(body));
  }, []);

  useEffect(() => {
    if (cartData.length <= 0) {
      setDeliveryCharge(0);
    } else if (Math.ceil(total / 50) < 3) {
      setDeliveryCharge(
        deliveryTip?.c_setting && Number(deliveryTip?.c_setting[0].hc)
      );
    } else {
      setDeliveryCharge(
        deliveryTip?.c_setting &&
          (
            Number(
              (Math.ceil(total / 50) - 2) * Number(deliveryTip?.c_setting[1].mc)
            ) + Number(deliveryTip?.c_setting[0].hc)
          ).toFixed(2)
      );
    }
  }, [total]);
  const handleSwipe = (idx: number, item: any) => {
    const getSelected = document.getElementById(`cart-${idx}`);
    if (swipe === false) {
      setSwipe(true);
      getSelected?.classList.add(`${classes.active}`);
      //   swipeRef.current?.classList.add(`${classes.active}`);
    } else {
      setSwipe(false);
      getSelected?.classList.remove(`${classes.active}`);
      //   swipeRef.current?.classList.remove(`${classes.active}`);
    }
  };
  useEffect(() => {
    if (cartData.length > 0) {
      let data = {
        userId: state.id,
        cartDetail: [{ userId: state.id, data: cartData }],
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
  }, [cartData, state, deliveryTip]);

  useEffect(() => {
    if (cartData.length > 0) {
      setSave(cartData);
    }

    if (cartData.length > 0) {
      let totalquantity = 0;
      cartData.map((item: any) => {
        totalquantity =
          Number(totalquantity) + Number(item.quantity) * Number(item.price);
      });
      setTotal(
        typeof totalquantity == "string" ? Number(totalquantity) : totalquantity
      );
      let body = { totalquantity, deliveryCharge };
      dispatch(actionTotalCartPrice(body));
    } else {
      setTotal(0);
      setSave([]);
    }
  }, [cartData, deliveryCharge]);

  const handleNavAddress = () => {
    if (cartData.length > 0) {
      navigate("/add-address");
    } else {
      toast.error("Add some items");
    }
  };
  return (
    <React.Fragment>
      {loader === true ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className={classes.cartHeader}>
            <div className={classes.logoWrap}>
              <i onClick={() => window.history.back()}>
                <IoMdArrowRoundBack />
              </i>
              <h1>
                My Cart <span>({cartData?.length} Items)</span>
              </h1>
            </div>
            <div className={classes.homeIcon}>
              <a onClick={() => navigate("/home")}>
                <VscHome />
              </a>
            </div>
          </div>
          <div className={`${classes.cartMain} mb-xxl`}>
            {save.length > 0 ? (
              <div className={classes.cartwrep}>
                {save.map((item: any, idx: number) => (
                  <div className={classes.swipeToshow}>
                    <div className={classes.productList}>
                      <div className={classes.ItemWrap}>
                        <a>
                          <div className="list-imageWrapper">
                            <img
                              className={classes.RestocategoryImg}
                              src={
                                item?.image ||
                                item?.product_logo.image ||
                                DEFAULT
                              }
                              onError={({ currentTarget }) =>
                                (currentTarget.src = DEFAULT)
                              }
                              alt=""
                            />
                          </div>
                        </a>
                        <div className={classes.mediaBody}>
                          <div className={classes.deleteBtn}>
                            <AiOutlineDelete
                              onClick={() => dispatch(actionRemoveTocart(item))}
                            />
                          </div>
                          <div>
                            <h5 className="product-title">
                              {item.name ? item.name : item.product_name}
                            </h5>
                            <span>$ {Number(item.price).toFixed(2)}</span>
                          </div>
                          {item?.attributes?.add_on_group_list &&
                            item?.attributes?.add_on_group_list.length > 0 &&
                            item?.attributes?.add_on_group_list[0].add_ons_list
                              .length > 0 && (
                              <div className={classes.addons}>
                                {item?.attributes?.add_on_group_list[0].add_ons_list.map(
                                  (item: any) => {
                                    return item.add_on_option_list.map(
                                      (data: any) => {
                                        return (
                                          <>
                                            {data.checked == 1 && (
                                              <p>
                                                {data.label}: $
                                                {Number(data.price).toFixed(2)}
                                              </p>
                                            )}
                                          </>
                                        );
                                      }
                                    );
                                  }
                                )}
                              </div>
                            )}
                          <div className={classes.pluMinus}>
                            <button
                              onClick={() => {
                                if (item.quantity == 1) {
                                  dispatch(actionRemoveTocart(item));
                                } else {
                                  dispatch(actionDecrementTocart(item));
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
                                dispatch(actionIncrementTocart(item));
                              }}
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={classes.NoteSection}>
                        {item?.attributes?.special_note && (
                          <p>
                            <b>Special notes :</b>{" "}
                            {item?.attributes?.special_note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1>No Item in Cart</h1>
            )}
            <div className={classes.orderDetail}>
              <h3>Order Details</h3>
              <ul>
                <li>
                  <span>Bag Total</span>
                  <span>$ {total ? total.toFixed(2) : "0.00"}</span>
                </li>
                <li>
                  <span>Delivery</span>
                  <span>
                    ${" "}
                    {deliveryCharge
                      ? Number(deliveryCharge).toFixed(2)
                      : "0.00"}
                  </span>
                </li>
                <li>
                  <span>Gratuity</span>
                  <span>
                    ${" "}
                    {deliveryTip?.c_setting &&
                      Number(
                        (total / 100) * Number(deliveryTip?.c_setting[2].grp)
                      ).toFixed(2)}
                  </span>
                </li>
                <li>
                  <span>Hochatown sales tax</span>
                  <span>
                    ${" "}
                    {deliveryTip?.c_setting &&
                      Number(
                        (total / 100) * Number(deliveryTip?.c_setting[3]?.ht)
                      ).toFixed(2)}
                  </span>
                </li>
                <li>
                  <span>Oklahoma tax</span>
                  <span>
                    ${" "}
                    {deliveryTip?.c_setting &&
                      Number(
                        (total / 100) * Number(deliveryTip?.c_setting[4]?.ot)
                      ).toFixed(2)}
                  </span>
                </li>
                <li>
                  <span>Total Amount</span>
                  <span>
                    ${" "}
                    {deliveryTip?.c_setting &&
                      (
                        Number(
                          (total / 100) * Number(deliveryTip?.c_setting[2].grp)
                        ) +
                        Number(
                          (total / 100) * Number(deliveryTip?.c_setting[3]?.ht)
                        ) +
                        Number(
                          (total / 100) * Number(deliveryTip?.c_setting[4]?.ot)
                        ) +
                        Number(total ? total : 0) +
                        Number(deliveryCharge ? deliveryCharge : 0)
                      ).toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={
              save.length > 0 ? classes.footerBtn : classes.footerBtnDisable
            }
          >
            <span onClick={() => handleNavAddress()}>Proceed to Checkout</span>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default CartMain;
