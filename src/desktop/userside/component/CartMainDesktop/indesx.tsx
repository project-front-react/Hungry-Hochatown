import { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./cartmaindesktop.module.scss";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import DEFAULT from "../../../../assets/images/default-img.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import {
  actionDecrementTocart,
  actionDeliveryTipData,
  actiongetCartDetailApiCall,
  actionIncrementTocart,
  actionpostCartDetailApiCall,
  actionRemoveTocart,
  actionTotalCartPrice,
} from "../../../../mobile/store/actions";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";
import { toast } from "react-toastify";

const CartMainDesktop = () => {
  const [save, setSave] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState<any | number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );

  const loader = useSelector((state: any) => state.CommonReducer.isLoader);

  const deliveryTip = useSelector(
    (state: RootState) => state.CommonReducer.saveDeliveryTip
  );
  useEffect(() => {
    dispatch(actionDeliveryTipData());
  }, []);

  useEffect(() => {
    let data = { userId: state.id };
    let body = { data: data, navigator: "" };
    dispatch(actiongetCartDetailApiCall(body));
  }, []);

  useEffect(() => {
    if (cartData.length <= 0) {
      setDeliveryCharge(0);
    } else if (Math.ceil(total / 50) < 3) {
      setDeliveryCharge(Number(state.c_setting[0].hc));
    } else {
      setDeliveryCharge(
        (
          Number((Math.ceil(total / 50) - 2) * Number(state.c_setting[1].mc)) +
          Number(state.c_setting[0].hc)
        ).toFixed(2)
      );
    }
  }, [total]);

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
      cartData.map((item: any, index: any) => {
        let price = item.price
          ? Number(item.price)
          : Number(item.product_price);
        totalquantity =
          Number(totalquantity) + Number(item.quantity) * Number(price);
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

  const onCLickOfProcessToCheckout = () => {
    if (save.length > 0 && cartData.length > 0) {
      navigate("/add-address");
    } else {
      toast.error("Add some items");
    }
  };
  return (
    <DesktopLayout>
      {loader === true ? (
        <LoadingAnimation />
      ) : (
        <div className={`${classes.CartMain} mb-xxl`}>
          <h1>My Cart ({save.length} Items)</h1>
          <div className={classes.CartSection}>
            <div className={classes.ItemPart}>
              <div className={classes.ItemWrap}>
                {save?.map((item) => (
                  <div className={classes.productList}>
                    <div className={classes.productWrap}>
                      <a>
                        <div className="list-imageWrapper">
                          <img
                            className={classes.RestocategoryImg}
                            src={
                              item.image
                                ? item.image
                                : item.product_logo.image || DEFAULT
                            }
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
                          <span>{`$ ${
                            item.price
                              ? Number(item.price).toFixed(2)
                              : Number(item.product_price).toFixed(2)
                          }`}</span>
                          {item?.addon_groups &&
                            item?.addon_groups.length > 0 && (
                              <div className={classes.addons}>
                                {item?.addon_groups.map((a: any) => {
                                  return a?.addon_group_options.map(
                                    (data: any) => {
                                      return (
                                        <p>
                                          {data.add_on_name}: $
                                          {Number(data.add_on_price).toFixed(2)}
                                        </p>
                                      );
                                    }
                                  );
                                })}
                              </div>
                            )}
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
                        </div>
                        <p></p>
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
                            readOnly={true}
                            value={item.quantity}
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
                          <b>Special Notes :</b>{" "}
                          {item?.attributes?.special_note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.orderDetail}>
                <ul>
                  <li>
                    <span>Bag Total</span>
                    <span>$ {total ? total.toFixed(2) : "0.00"}</span>
                  </li>
                  <div className={classes.deliveryContainer}>
                    <span>Delivery</span>
                    <span>
                      ${" "}
                      {deliveryCharge
                        ? Number(deliveryCharge).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  <div className={classes.deliveryContainer}>
                    <span>Gratuity</span>
                    <span>
                      ${" "}
                      {deliveryTip?.c_setting &&
                        Number(
                          (total / 100) * Number(deliveryTip?.c_setting[2]?.grp)
                        ).toFixed(2)}
                    </span>
                  </div>
                  <div className={classes.deliveryContainer}>
                    <span>Hochatown sales tax</span>
                    <span>
                      ${" "}
                      {deliveryTip?.c_setting &&
                        Number(
                          (total / 100) * Number(deliveryTip?.c_setting[3]?.ht)
                        ).toFixed(2)}
                    </span>
                  </div>
                  <div className={classes.deliveryContainer}>
                    <span>Oklahoma tax </span>
                    <span>
                      ${" "}
                      {deliveryTip?.c_setting &&
                        Number(
                          (total / 100) * Number(deliveryTip?.c_setting[4]?.ot)
                        ).toFixed(2)}
                    </span>
                  </div>
                  <li>
                    <span>Total Amount</span>
                    <span>
                      ${" "}
                      {deliveryTip?.c_setting &&
                        (
                          Number(
                            (total / 100) *
                              Number(deliveryTip?.c_setting[2].grp)
                          ) + Number(
                            (total / 100) * Number(deliveryTip?.c_setting[3]?.ht)
                          )+ Number(
                            (total / 100) * Number(deliveryTip?.c_setting[4]?.ot)
                          )+
                          Number(total ? total : 0) +
                          Number(deliveryCharge ? deliveryCharge : 0)
                        ).toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`${classes.ProceedToCheckoutBtn}`}
              onClick={onCLickOfProcessToCheckout}
            >
              <button>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
      
    </DesktopLayout>
  );
};

export default CartMainDesktop;
