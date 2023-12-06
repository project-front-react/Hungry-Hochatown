import { useEffect, useState } from "react";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./reorderdesktop.module.scss";
import mastercard from "../../../../assets/icons/mastercard1.png";
import Paypal from "../../../../assets/icons/paypal.png";
import americanexpress from "../../../../assets/icons/american-express.png";
import discover from "../../../../assets/icons/discover.png";
import jcb from "../../../../assets/icons/jcb.png";
import visa from "../../../../assets/icons/visa.png";
import { FiBox } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import {
  actionpostCartDetailApiCall,
  actionSaveApiCartData,
  actionSetRestroID,
} from "../../../../mobile/store/actions";
import { Rating } from "react-simple-star-rating";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

const ReorderDesktop = () => {
  const [save, setSave] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSingleDetails = useSelector(
    (state: RootState) => state.CommonReducer.saveSingleOrderDetails
  );
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );
  useEffect(() => {
    setSave(userSingleDetails?.Order?.products);
  }, [userSingleDetails]);
  return (
    <DesktopLayout>
      {loader == true ? (
        <LoadingAnimation />
      ) : (
        <div className={`${classes.ReorderDesktop} mb-xxl`}>
          <div className={classes.restAddress}>
            <div className={classes.leftSide}>
              <h1>
                {userSingleDetails?.Order?.restaurant_detail?.restaurant_name}
              </h1>
              <small>
                {userSingleDetails?.Order?.restaurant_detail?.address}
              </small>
            </div>
            <div className={classes.rightSide}>
              <Rating
                allowHover={false}
                readonly={true}
                initialValue={
                  Number(
                    userSingleDetails?.Order?.restaurant_detail?.avg_rating
                  ) > 1
                    ? Number(
                        userSingleDetails?.Order?.restaurant_detail?.avg_rating
                      )
                    : 0
                }
              />
              <div className={classes.ratingText}>
                (
                {Math.round(
                  userSingleDetails?.Order?.restaurant_detail?.rating_count
                ) > 1
                  ? Math.round(
                      userSingleDetails?.Order?.restaurant_detail?.rating_count
                    )
                  : 0}{" "}
                Ratings)
              </div>
            </div>
          </div>
          <div className={classes.idSection}>
            <div className={classes.bannerBox}>
              <div className={classes.media}>
                <FiBox />
                <div className={classes.mediaBody}>
                  <span>Order ID: {userSingleDetails?.Order?.order_id}</span>
                  <h2>Order Confirmed</h2>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.DetailsSection}>
            <div className={classes.CartSection}>
              <div className={classes.CartItem}>
                {save &&
                  save?.map((item: any) => {
                    return (
                      <div className={classes.itemWrap}>
                        <a className={classes.itemMedia}>
                          <div className={classes.mediaBody}>
                            <h4>{item?.product_name}</h4>
                            {item.addon_groups.length > 0 && (
                              <div className={classes.Addons}>
                                {item.addon_groups.map((data: any) => {
                                  return (
                                    <>
                                      {data.addon_group_options.map(
                                        (temp: any) => {
                                          return (
                                            <p>
                                              {temp.add_on_name}:$
                                              {Number(
                                                temp.add_on_price
                                              ).toFixed(2)}
                                            </p>
                                          );
                                        }
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <div className={classes.count}>
                            <p>&nbsp;</p>
                            <div className={classes.quantity}>
                              <GrClose />
                              <p>{item?.quantity}</p>
                            </div>
                            <span>$ {Number(item?.price).toFixed(2)}</span>
                          </div>
                        </a>
                      </div>
                    );
                  })}
              </div>
              <div className={classes.orderSection}>
                <h3>Payment Details</h3>
                <ul>
                  <li>
                    <span>Bag total</span>
                    <span>
                      $ {Number(userSingleDetails?.Order?.sub_total).toFixed(2)}
                    </span>
                  </li>
                  <li>
                    <span>Delivery</span>
                    <span>
                      ${" "}
                      {Number(
                        userSingleDetails?.Order?.delivery_charge
                      ).toFixed(2)}
                    </span>
                  </li>
                  <li>
                    <span>Gratuity</span>
                    <span>
                      ${" "}
                      {Number(
                        userSingleDetails?.Order?.gratuity_charge
                      ).toFixed(2)}
                    </span>
                  </li>
                  <li>
                    <span>Hochatown sales tax</span>
                    <span>
                      ${" "}
                      {Number(
                        userSingleDetails?.Order?.hochatown_sales_tax
                      ).toFixed(2)}
                    </span>
                  </li>
                  <li>
                    <span>Oklahoma tax</span>
                    <span>
                      ${" "}
                      {Number(userSingleDetails?.Order?.oklahoma_tax).toFixed(
                        2
                      )}
                    </span>
                  </li>
                  <li>
                    <span>Total Amount</span>
                    <span>
                      $ {Number(userSingleDetails?.Order?.total).toFixed(2)}
                    </span>
                  </li>
                </ul>
              </div>
              {/* {userSingleDetails?.Order?.order_status == "Delivered" && ( */}
              <div
                className={classes.ReorderBtn}
                onClick={() => {
                  if (save.length > 0) {
                    let data1: any[] = [];
                    save.map((abc: any) => {
                      let item = {
                        id: abc.product_id,
                        price: abc.price,
                        name: abc.product_name,
                        image: abc.product_logo.image,
                        quantity: abc.quantity,
                        addon_groups: abc.addon_groups,
                        attributes: {
                          special_note: abc.special_note,
                          addon_groups: abc.addon_groups,
                          variant_name: abc.variant_name,
                          variant_price: abc.variant_price,
                          price: abc.price,
                        },
                      };
                      data1.push(item);
                    });
                    dispatch(actionSaveApiCartData(data1));
                    let data = {
                      userId: state.id,
                      cartDetail: [
                        {
                          userId: state.id,
                          data: data1,
                        },
                      ],
                    };
                    let body = { data, navigate: "" };
                    dispatch(actionpostCartDetailApiCall(body));
                    dispatch(
                      actionSetRestroID(userSingleDetails?.Order?.restaurant_id)
                    );
                  }
                  navigate("/addtocart");
                }}
              >
                <button>Reorder</button>
              </div>
              {/* )} */}
            </div>
            <div className={classes.AddressAndPaymentSection}>
              <div className={classes.AddressSection}>
                <h3>Address</h3>
                <p>{userSingleDetails?.Order?.delivery_address}</p>
              </div>
              <div className={classes.PaymentSection}>
                <h3>Payment Method</h3>
                <div className={classes.paymentBox}>
                  <img
                    src={
                      userSingleDetails?.Order?.payment?.card_type == "Visa"
                        ? visa
                        : userSingleDetails?.Order?.payment?.card_type ==
                          "Discover"
                        ? discover
                        : userSingleDetails?.Order?.payment?.card_type == "JCB"
                        ? jcb
                        : userSingleDetails?.Order?.payment?.card_type ==
                          "American Express"
                        ? americanexpress
                        : userSingleDetails?.Order?.payment?.card_type ==
                          "Mastercard"
                        ? mastercard
                        : userSingleDetails?.Order?.payment?.card_type == null
                        ? Paypal
                        : ""
                    }
                  />
                  {userSingleDetails?.Order?.payment?.card_type != null && (
                    <p>
                      {" "}
                      **** **** ****{" "}
                      {userSingleDetails?.Order?.payment?.card_last_digit}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DesktopLayout>
  );
};

export default ReorderDesktop;
