import React, { useState } from "react";
import classes from "./paymentmani.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useStripe,
  useElements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { RootState } from "../../store/reducers/rootReducers";
import { orderPlaceApiCall, reOrderApiCall } from "../../store/actions";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";
import { toast } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./paypalIndex";

const PaymentMain = () => {
  const initialOptions = {
    "client-id":
      "AXrvHdL3vmac1_9w1JMNQU4hxNdY62wvI3EWJDZ0hr2XePZ9gvy7fE-j5y5xNImSHfVOxH_OnXloAF6g",
    currency: "USD",
    intent: "capture",
    "disable-funding": "credit,card,applepay",
  };

  const navigate = useNavigate();

  const addressData = useSelector(
    (state: RootState) => state.CartReducer.addressData
  );

  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );

  const dataForSearch = useSelector(
    (state: RootState) => state.CartReducer.restaurentId
  );
  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );

  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );

  const saveTotalCartPrice = useSelector(
    (state: RootState) => state.CommonReducer.saveTotalCartPrice
  );

  const deliveryTip = useSelector(
    (state: RootState) => state.CommonReducer.saveDeliveryTip
  );

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  const reOrderId = useSelector(
    (state: RootState) => state.CommonReducer.saveReOrderId
  );

  const checkReOrder = useSelector(
    (state: RootState) => state.CommonReducer.checkReOrder
  );
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements?.getElement(CardNumberElement);
    if (cardNumberElement) {
      stripe.createToken(cardNumberElement).then(function (result) {
        // Handle result.error or result.token
        if (result.error) {
          toast.warning(result.error.message);
        } else {
          if (result.token) {
            let data = {
              subTotal: saveTotalCartPrice.totalquantity,
              total: (
                Number(saveTotalCartPrice.totalquantity) +
                Number(saveTotalCartPrice.deliveryCharge) +
                Number(
                  (saveTotalCartPrice.totalquantity / 100) *
                    deliveryTip?.c_setting[2].grp
                ) +
                Number(
                  (saveTotalCartPrice.totalquantity / 100) *
                    deliveryTip?.c_setting[3]?.ht
                ) +
                Number(
                  (saveTotalCartPrice.totalquantity / 100) *
                    deliveryTip?.c_setting[4]?.ot
                )
              ).toFixed(2),
              deliveryCharge: saveTotalCartPrice.deliveryCharge,
              gratuityCharge:
                (saveTotalCartPrice.totalquantity / 100) *
                deliveryTip?.c_setting[2].grp,
              hochatownTax:
                (saveTotalCartPrice.totalquantity / 100) *
                deliveryTip?.c_setting[3]?.ht,
              oklahomaTax:
                (saveTotalCartPrice.totalquantity / 100) *
                deliveryTip?.c_setting[4]?.ot,
              clientToken: result.token.id,
              restaurant_id:
                dataForSearch != 0
                  ? dataForSearch
                  : userSingleDetails?.Order.restaurant_id,
              delivery_address: `${addressData.area}`,
              instructions: addressData?.instruction,
              latitude: addressData.mapData.lat,
              longitude: addressData.mapData.lng,
              products: cartData.map((item: any) => {
                const pv = item.attributes?.product_variant_list?.find(
                  (pv: any) => pv.selected
                );
                return {
                  id: item.id ? item.id : item.product_id,
                  name: item.name ? item.name : item.product_name,
                  quantity: item.quantity,
                  price: item.price ? item.price : Number(item.product_price),
                  attributes: {
                    variant_id: pv ? pv.id : 0,
                    special_note: item.attributes?.special_note || "",
                    addons: item.attributes?.add_on_group_list
                      ? item.attributes?.add_on_group_list?.map((gl: any) => {
                          return {
                            add_ons_group_id: gl.id,
                            add_ons_option: Array.prototype.concat.apply(
                              [],
                              gl.add_ons_list.map((al: any) => {
                                return al.add_on_option_list
                                  .filter((ol: any) => ol.checked)
                                  .map((ol: any) => {
                                    return {
                                      add_ons_id: ol.add_on_id,
                                      add_ons_option_id: ol.id,
                                      add_on_price: ol.price,
                                      add_on_name: ol.label,
                                    };
                                  });
                              })
                            ),
                          };
                        })
                      : item.attributes?.addon_groups &&
                        item.attributes?.addon_groups.length > 0
                      ? item.attributes?.addon_groups
                          .filter((item1: any) => {
                            return (
                              item1.addon_group_options.length > 0 && item1
                            );
                          })
                          .map((item1: any) => {
                            return {
                              add_ons_group_id: item1.id,
                              add_ons_option:
                                item1.addon_group_options.length > 0 &&
                                item1.addon_group_options.filter(
                                  (addon: any) => {
                                    return addon;
                                  }
                                ),
                            };
                          })
                      : [],
                  },
                };
              }),
            };
            if (checkReOrder === true) {
              let reOrderData = {
                orderID: reOrderId.order_id,
                clientToken: data.clientToken,
                delivery_address: data.delivery_address,
                instructions: data.instructions,
                latitude: data.latitude,
                longitude: data.longitude,
              };
              let reOrderBody = { reOrderData, navigate };
              dispatch(reOrderApiCall(reOrderBody));
            } else {
              let body = { data, navigate };
              dispatch(orderPlaceApiCall(body));
            }
          }
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.paymentheader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Add Payment Method</h1>
        </div>
      </div>
      <main className={`${classes.paymentmain} mb-xxl`}>
        <div className={classes.addressDetails}>
          <form className={classes.customForm}>
            <div className={classes.inputBox}>
              <input type="text" placeholder="Card Holder Name" />
            </div>
            <div className={classes.inputBox}>
              <div className={classes.PaymentElement}>
                <CardNumberElement />
              </div>
            </div>
            <div className={classes.dateCV}>
              <div className={classes.inputBox}>
                <div className={classes.PaymentElement}>
                  <CardExpiryElement />
                </div>
              </div>
              <div className={classes.inputBox}>
                <div className={classes.PaymentElement}>
                  <CardCvcElement />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      {loader == true ? (
        <LoadingAnimation />
      ) : (
        <div className={classes.footerBtn} onClick={handleSubmit}>
          Confirm Payment
        </div>
      )}

      <h1 className={classes.paypalstyle}>Or pay with</h1>

      <PayPalScriptProvider options={initialOptions}>
        <Checkout />
      </PayPalScriptProvider>
    </React.Fragment>
  );
};

export default PaymentMain;
