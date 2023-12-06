import { useState } from "react";
import DesktopCustomPopup from "../../common/DesktopPopup";
import classes from "./detailbutton.module.scss";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import MapContainer from "../../../../../mobile/components/AddAddressMain/MapComponent/MaoComponent";
import { useDispatch } from "react-redux";
import useForm from "../../../../../mobile/helpers/useForm";
import {
  actionSaveAddress,
  actionSaveCardData,
} from "../../../../../mobile/store/actions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../mobile/store/reducers/rootReducers";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "../../../../../mobile/components/PaymentMain/paypalIndex";

const DetailButtons = (props: any) => {
  const initialOptions = {
    "client-id":
      "AXrvHdL3vmac1_9w1JMNQU4hxNdY62wvI3EWJDZ0hr2XePZ9gvy7fE-j5y5xNImSHfVOxH_OnXloAF6g",
    currency: "USD",
    intent: "capture",
    "disable-funding": "credit,card",
  };

  const {
    visibility,
    addressVisibility,
    popupCloseHandler,
    setAddressVisibility,
    setVisibility,
  } = props;
  const dispatch = useDispatch();
  const [mapData, setMapData] = useState("");
  const [instruction, setInstruction] = useState("");
  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();
  const stripe = useStripe();
  const elements = useElements();
  const cardData = useSelector(
    (state: RootState) => state.CommonReducer.saveCardData
  );
  const addressData = useSelector(
    (state: RootState) => state.CartReducer.addressData
  );

  const saveReorderPaypalData = useSelector(
    (state: RootState) => state.CommonReducer.saveReorderPaypalData
  );

  const saveOrderPlacePaypalData = useSelector(
    (state: RootState) => state.CommonReducer.saveOrderPlacePaypalData
  );
  
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event) event.preventDefault();
    handleSubmit();
    if (values.area) {
      let addressData = {
        area: values.area.trim(),
        instruction: instruction.trim(),
        mapData: mapData,
      };
      dispatch(actionSaveAddress(addressData));
      toast.success("address added");
      popupCloseHandler();
    }
  };
  const onConfirmPaymnet = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardNumberElement = elements?.getElement(CardNumberElement);
    if (cardNumberElement) {
      stripe.createToken(cardNumberElement).then(function (result) {
        // Handle result.error or result.token
        if (result.error) {
        } else {
          if (result.token) {
            let data = {
              token: result.token.id,
              card_detail: result.token.card?.last4,
            };
            dispatch(actionSaveCardData(data));
            popupCloseHandler();
          }
        }
      });
    }
  };

  return (
    <div className={classes.BtnWrap}>
      {!addressData?.area ? (
        <button
          className={classes.AddAdderessBtn}
          onClick={() => {
            if (cartData.length > 0) {
              setAddressVisibility(true);
            } else {
              toast.error("Add some items");
            }
          }}
        >
          Add Address
        </button>
      ) : (
        <p>{addressData?.area}</p>
      )}
      {!cardData?.card_detail && !saveOrderPlacePaypalData?.data && !saveReorderPaypalData?.data ? (
        <button
          className={classes.AddPaymentBtn}
          onClick={() => {
            if (cartData.length > 0) {
              setVisibility(true);
            } else {
              toast.error("Add some items");
            }
          }}
        >
          Add Payment
        </button>
      ) : (<>
        {cardData?.card_detail && <span>**** **** **** {cardData?.card_detail}</span>}
        {saveOrderPlacePaypalData?.data && <span>Paypal</span>}
        {saveReorderPaypalData?.data && <span>Paypal</span>}
      </>
      )}
      <DesktopCustomPopup
        onClose={popupCloseHandler}
        show={addressVisibility}
        title="Hello Jeetendra"
      >
        <div className={classes.AddAdderessPopup}>
          <h1>Add Address</h1>
          <div className={classes.addressDetails}>
            <form className={classes.customForm}>
              <div className={classes.inputBox}>
                <input
                  type="text"
                  placeholder="Cabin name/Boatramp name"
                  name="area"
                  value={values.area}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              {errors.area && (
                <p className={`${classes.errorText}`}>{errors.area}</p>
              )}
              <div className={classes.inputBox}>
                <textarea
                  value={instruction}
                  placeholder="Delivery Instruction"
                  name="instruction"
                  onChange={(e: any) => setInstruction(e.target.value)}
                />
              </div>
              <div className={classes.inputBox}>
                <MapContainer mapData={setMapData} height="40vh" />
              </div>
              <div className={classes.PaymentBtn} onClick={handleOnClick}>
                <button>Add Address</button>
              </div>
            </form>
          </div>
        </div>
      </DesktopCustomPopup>
      <DesktopCustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title="Hello Jeetendra"
      >
        <div className={classes.AddPayment}>
          <h1>Add Payment Method</h1>
          <div className={classes.PaymentDetails}>
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
          <div className={classes.PaymentBtn} onClick={onConfirmPaymnet}>
            <button>Confirm Payment</button>
          </div>
        </div>

        <h1 className={classes.paypalstyle}>Or pay with</h1>

        <PayPalScriptProvider options={initialOptions}>
          <Checkout setVisibility={()=>setVisibility(false)}/>
        </PayPalScriptProvider>
      </DesktopCustomPopup>
    </div>
  );
};

export default DetailButtons;
