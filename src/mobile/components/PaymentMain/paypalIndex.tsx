import React, { useEffect, useState } from "react";
// import './Checkout.css';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { useNavigate } from "react-router-dom";
import {
  orderPlacePaypalApiCall,
  orderPlacePaypalDataSave,
  reOrderPaypalApiCall,
  reOrderPaypalDataSave,
} from "../../store/actions";

const Checkout = (props: any) => {
  const dispatch = useDispatch();
  // const [{ options, isPending }] = usePayPalScriptReducer();
  // const [currency, setCurrency] = useState(options.currency);

  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 766 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  const saveTotalCartPrice = useSelector(
    (state: RootState) => state.CommonReducer.saveTotalCartPrice
  );

  const deliveryTip = useSelector(
    (state: RootState) => state.CommonReducer.saveDeliveryTip
  );

  const dataForSearch = useSelector(
    (state: RootState) => state.CartReducer.restaurentId
  );

  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );

  const addressData = useSelector(
    (state: RootState) => state.CartReducer.addressData
  );

  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );

  const checkReOrder = useSelector(
    (state: RootState) => state.CommonReducer.checkReOrder
  );

  const reOrderId = useSelector(
    (state: RootState) => state.CommonReducer.saveReOrderId
  );

  const navigate = useNavigate();

  // const onCurrencyChange = ({ target: { value } }:any) => {
  //     setCurrency(value);
  //     dispatch({
  //         type: "resetOptions",
  //         value: {
  //             ...options,
  //             currency: value,
  //         },
  //     });
  // }

  const onCreateOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount:
            checkReOrder === true
              ? { value: reOrderId.total }
              : {
                  value: (
                    Number(saveTotalCartPrice.totalquantity) +
                    Number(saveTotalCartPrice.deliveryCharge) +
                    Number(
                      (saveTotalCartPrice.totalquantity / 100) *
                        deliveryTip?.c_setting[2].grp
                    )
                  ).toFixed(2),
                },
        },
      ],
    });
  };

  const onApproveOrder = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      const name = details.payer.name.given_name;
      // alert(`Transaction completed by ${name}`);
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
        charge_res: details,
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
              addons:
                item.attributes?.add_on_group_list?.map((gl: any) => {
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
                }) || [],
            },
          };
        }),
      };
      if (checkReOrder === true) {
        let reOrderData = {
          orderID: reOrderId.order_id,
          charge_res: details,
          delivery_address: data.delivery_address,
          instructions: data.instructions,
          latitude: data.latitude,
          longitude: data.longitude,
        };
        let reOrderBody = { reOrderData, navigate };
        dispatch(reOrderPaypalApiCall(reOrderBody));
      } else {
        let body = { data, navigate };
        dispatch(orderPlacePaypalApiCall(body));
      }
    });
  };

  return (
    <>
      {/* {isPending ? <p>LOADING...</p> : ( */}
      {/* <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select> */}
      <div
        className="main_buttons"
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="paypal_button_container"
          style={mQuery.matches ? { width: "570px" } : { width: "95%" }}
        >
          <PayPalButtons
            className="paypal_button"
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => onCreateOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </div>
      </div>
    </>
  );
};
export default Checkout;
