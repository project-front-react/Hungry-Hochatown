import React, { useEffect, useState } from "react";
import classes from "./productdetailspopup.module.scss";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import CustomPopup from "../popup";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import DEFAULT from "../../../assets/images/default-img.png";
import { useDispatch } from "react-redux";
import {
  actionAddTocart,
  actionIncrementTocart,
  actionpostCartDetailApiCall,
} from "../../store/actions";
import { toast } from "react-toastify";

const ProductDetailsPopup = (props: any) => {
  const dispatch = useDispatch();
  const addToCartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveProductData
  );

  const [saveProductData, setSaveProductData] = useState(state);
  const [total, setTotal] = useState(0);
  const [attributes, setAttributes] = useState({
    product_name: saveProductData?.product_name,
    price: "",
    product_variant_list: saveProductData?.product_variant_list,
    add_on_group_list: saveProductData?.add_on_group_list,
    special_note: "",
    productImages: saveProductData?.productImages,
  });

  const datastate = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  useEffect(() => {
    setAttributes({
      product_name: saveProductData?.product_name,
      price: "",
      product_variant_list: saveProductData?.product_variant_list,
      add_on_group_list: saveProductData?.add_on_group_list,
      special_note: "",
      productImages: saveProductData?.productImages,
    });
  }, []);
  useEffect(() => {
    if (addToCartData.length > 0) {
      let data = {
        userId: datastate.id,
        cartDetail: [{ userId: datastate.id, data: addToCartData }],
      };
      let body = { data, navigate: "" };
      dispatch(actionpostCartDetailApiCall(body));
    } else {
      dispatch(actionpostCartDetailApiCall([]));
    }
  }, [addToCartData, state]);

  useEffect(() => {
    if (addToCartData.length > 0) {
      addToCartData.map((item: any) => {
        if (item?.id == saveProductData?.id && item.attributes) {
          if (Object.values(item.attributes).length > 0) {
            setSaveProductData(item.attributes);
          } else {
            setSaveProductData({ ...state, quantity: 0 });
          }
        } else {
          setSaveProductData({ ...state, quantity: 0 });
        }
      });
    } else {
      setSaveProductData({ ...state, quantity: 0 });
    }
  }, [addToCartData, state]);

  useEffect(() => {
    setAttributes({
      product_name: saveProductData?.product_name,
      price: "",
      product_variant_list: saveProductData?.product_variant_list,
      add_on_group_list: saveProductData?.add_on_group_list,
      special_note: "",
      productImages: saveProductData?.productImages,
    });
  }, [saveProductData]);
  const popupCloseHandler = () => {
    props.close();
    setAttributes({
      product_name: saveProductData.product_name,
      price: "",
      product_variant_list: saveProductData.product_variant_list,
      add_on_group_list: saveProductData.add_on_group_list,
      special_note: "",
      productImages: saveProductData.productImages,
    });
  };
  const addItem = (saveProductData: any) => {
    let attribute;
    if (
      Number(saveProductData?.price).toFixed(2) == totalPrice() &&
      attributes.special_note.length <= 0
    ) {
      attribute = {};
    } else {
      attribute = { ...attributes, price: totalPrice() };
    }
    let data = {
      id: saveProductData.id,
      price: totalPrice(),
      name: saveProductData?.product_name,
      image: saveProductData?.productImages?.image || DEFAULT,
      quantity: 1,
      attributes: attribute,
    };
    let exist = 0;
    if (cartData.length > 0) {
      cartData.map((item: any) => {
        if (
          item.id == saveProductData.id &&
          JSON.stringify(item.attributes) === JSON.stringify(data.attributes)
        )
          exist = 1;
      });
    }
    let restaurentId = saveProductData.restaurant_id;
    let body = { data, restaurentId };
    if (exist == 1) {
      dispatch(actionIncrementTocart(data));
      props.close();
      toast.success("Cart data updated successfully");
    } else {
      dispatch(actionAddTocart(body));
      props.close();
      toast.success("Cart saved successfully");
    }
  };

  const variantChecked = (id: number) => {
    let data: any[] = [];
    attributes.product_variant_list.map((item: any) => {
      if (item.id === id) {
        if (item.selected == true) {
          data.push({ ...item, selected: false });
        } else {
          data.push({ ...item, selected: true });
        }
      } else {
        data.push({ ...item, selected: false });
      }
    });
    setAttributes({ ...attributes, product_variant_list: data });
  };

  const handleCheckedDataSave = (indexId: any, OptionIndex: any, e: any) => {
    attributes.add_on_group_list[0].add_ons_list[indexId].add_on_option_list[
      OptionIndex
    ].checked = e.target.checked ? 1 : 0;
    setAttributes({ ...attributes });
  };
  const handleSelectedDataSave = (indexId: any, OptionIndex: any, e: any) => {
    let data: any[] = [];
    attributes.add_on_group_list[0].add_ons_list[
      indexId
    ].add_on_option_list.map((item: any) => {
      if (item.id === OptionIndex) {
        data.push({ ...item, checked: 1 });
      } else {
        data.push({ ...item, checked: 0 });
      }
    });
    attributes.add_on_group_list[0].add_ons_list[indexId].add_on_option_list =
      data;
    setAttributes({ ...attributes });
  };

  const totalPrice = () => {
    let variantData = attributes?.product_variant_list?.filter(
      (item: any) => item.selected == true
    );
    if (attributes.add_on_group_list) {
      if (attributes.add_on_group_list[0]) {
        return Number(
          +(variantData.length > 0
            ? Number(variantData[0].variant_price) +
              Number(saveProductData?.price)
            : Number(saveProductData?.price)) +
            attributes.add_on_group_list[0].add_ons_list.reduce(
              (accumulator: any, item: any) => {
                const productSum = item.add_on_option_list
                  .filter((o: any) => o.checked)
                  .reduce((productAcc: any, product: any) => {
                    return productAcc + product.price;
                  }, 0);
                return accumulator + productSum;
              },
              0
            )
        ).toFixed(2);
      } else {
        return variantData && variantData.length > 0
          ? Number(
              Number(variantData[0].variant_price) +
                Number(saveProductData?.price)
            ).toFixed(2)
          : Number(saveProductData?.price).toFixed(2);
      }
    } else {
      return variantData && variantData.length > 0
        ? Number(
            Number(variantData[0].variant_price) +
              Number(saveProductData?.price)
          ).toFixed(2)
        : Number(saveProductData?.price).toFixed(2);
    }
  };
  return (
    <React.Fragment>
      <CustomPopup
        onClose={popupCloseHandler}
        show={props.visibility}
        title="Hello Jeetendra"
      >
        <div className={classes.PopupMain}>
          <div className={classes.PopupBody}>
            <div className={classes.productDetail}>
              <img
                className={classes.RestocategoryImg}
                src={saveProductData?.productImages?.image || DEFAULT}
                onError={({ currentTarget }) => (currentTarget.src = DEFAULT)}
                alt=""
              />
              <div className={classes.productlist}>
                <div>
                  <span className={classes.ProductName}>
                    {saveProductData?.product_name}
                  </span>
                </div>
                <div>
                  <h5>{saveProductData?.description}</h5>
                </div>
                <div>
                  <span className={classes.ProductPrice}>
                    $ {Number(saveProductData?.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.PackSize}>
              <div className={classes.packMain}>
                {saveProductData?.product_variant_list?.map((item: any) => (
                  <div
                    className={
                      attributes?.product_variant_list?.find(
                        (varient: any) =>
                          varient?.selected === true && item?.id === varient?.id
                      )
                        ? classes.sizeSelect
                        : classes.size
                    }
                    onClick={() => variantChecked(item.id)}
                  >
                    <div className={classes.sizeText}>{item.variant_name}</div>
                    <small>+ ${Number(item.variant_price).toFixed(2)}</small>
                  </div>
                ))}
              </div>
            </div>
            {saveProductData &&
              saveProductData?.add_on_group_list &&
              saveProductData?.add_on_group_list[0]?.add_ons_list?.map(
                (itemMain: any, index: any) => (
                  <>
                    <h1>{itemMain?.title}</h1>
                    {itemMain.type_id === 2 ? (
                      <div className={classes.addonsFirst}>
                        {itemMain?.add_on_option_list.map(
                          (item: any, optionIndex: any) => (
                            <div className={classes.addons}>
                              <p>{item.label}</p>
                              <div className={classes.price}>
                                <p>${Number(item.price).toFixed(2)}</p>
                                <input
                                  type="checkbox"
                                  id={`check-${item.id}`}
                                  onChange={(e) =>
                                    handleCheckedDataSave(index, optionIndex, e)
                                  }
                                  checked={item.checked == 1 ? true : false}
                                />
                                <label
                                  className={classes.check}
                                  htmlFor={`check-${item.id}`}
                                ></label>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className={classes.addonsSecond}>
                        {itemMain?.add_on_option_list.map(
                          (item: any, optionIndex: any) => (
                            <div className={classes.addons}>
                              <p>{item.label}</p>
                              <div className={classes.price}>
                                <p>${Number(item.price).toFixed(2)}</p>
                                <input
                                  type="radio"
                                  id={`radio-${item.id}`}
                                  name={`radio-group${itemMain.id}`}
                                  checked={item.checked}
                                  onChange={(e) =>
                                    handleSelectedDataSave(index, item.id, e)
                                  }
                                />
                                <label
                                  className={classes.radio}
                                  htmlFor={`radio-${item.id}`}
                                ></label>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </>
                )
              )}
            <h1>Special Notes</h1>
            <div className={classes.inputBox}>
              <textarea
                placeholder="Special notes"
                className={classes.Nots}
                onChange={(e: any) => {
                  setAttributes({
                    ...attributes,
                    special_note: e.target.value,
                  });
                }}
                value={attributes.special_note}
              ></textarea>
            </div>
            <div className={classes.offcanvasFooter}>
              <div className={classes.btnBox}>
                {saveProductData?.quantity > 1 && (
                  <div className={classes.pluMinus}>
                    s <AiOutlineMinus />
                    <input type="number" value={1} min="0" max="10" />
                    <AiOutlinePlus />
                  </div>
                )}
                <button
                  className={classes.btnSolid}
                  disabled={saveProductData?.quantity >= 1 ? true : false}
                  onClick={() => addItem(saveProductData)}
                >
                  Add Item - ${totalPrice()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </CustomPopup>
    </React.Fragment>
  );
};

export default ProductDetailsPopup;
