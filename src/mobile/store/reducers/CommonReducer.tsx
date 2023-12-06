const initialState = {
  saveLoginUserDetails: "",
  isLoggedIn: "",
  saveForgetEmail: "",
  saveOtp: "",
  saveSearchData: "",
  saveSearchOrderByCategoryData: "",
  saveSearchOrderByRestorentData: "",
  saveOrderByCategoryData: [],
  saveOrderByRestorentData: [],
  saveRestroForCategories: [],
  saveRestroDetail: "",
  saveProductDetail: "",
  saveCategoryProductShow: "",
  saveProductCountData: "",
  saveRestoCategorySearchData: "",
  saveProductData: "",
  saveDataForSearchProduct: "",
  saveSearchedProduct: "",
  saveTotalCartPrice: "",
  saveOrderDetails: "",
  saveSingleOrderDetails: "",
  saveOrderHistoryData: "",
  saveOrderHistorySearchData: "",
  saveRecentOrder: [],
  isLoader: false,
  saveNotificationdata: [],
  saveRecentSearchdata: [],
  saveReOrderId: "",
  checkReOrder: false,
  saveRating: "",
  saveRatingCount: 1,
  saveCardData: "",
  saveAllRestroData: [],
  saveAllCategoryData: [],
  saveCmsPageData: "",
  saveDeliveryTip: "",
  saveReorderPaypalData: "",
  saveOrderPlacePaypalData: ""
};

const CommonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };
    case "SAVE_LOGIN_USER_DATA":
      return { ...state, saveLoginUserDetails: action.payload };
    case "ACTION_SAVE_FORGET_EMAIL":
      return { ...state, saveForgetEmail: action.payload };
    case "ACTION_SAVE_OTP":
      return { ...state, saveOtp: action.payload };
    case "ACTION_SAVE_ORDER_BY_CATEGORY_DATA":
      return { ...state, saveOrderByCategoryData: action.payload };
    case "ACTION_SAVE_ORDER_BY_RESTARANT_DATA":
      return { ...state, saveOrderByRestorentData: action.payload };
    case "ACTION_SEARCH_DATA":
      return { ...state, saveSearchData: action.payload };
    case "ACTION_SAVE_SEARCH_ORDER_BY_CATEGORY_DATA":
      return { ...state, saveSearchOrderByCategoryData: action.payload };
    case "ACTION_SAVE_SEARCH_ORDER_BY_RESTARANT_DATA":
      return { ...state, saveSearchOrderByRestorentData: action.payload };
    case "ACTION_SAVE_RESTRO_FOR_CATEGORY":
      return { ...state, saveRestroForCategories: action.payload };
    case "ACTION_SAVE_RESTARANT_DETAIL":
      return { ...state, saveRestroDetail: action.payload };
    case "ACTION_SAVE_PRODUCT_DETAIL":
      return { ...state, saveProductDetail: action.payload };
    case "ACTION_SAVE_CATEGORY_PRODUCT_SHOW_API_CALL":
      return { ...state, saveCategoryProductShow: action.payload };
    case "ACTION_SAVE_PRODUCT_COUNT_DATA":
      return { ...state, saveProductCountData: action.payload };
    case "ACTION_SAVE_RESTAURANT_CATEGORY_SEARCH_DATA":
      return { ...state, saveRestoCategorySearchData: action.payload };
    case "ACTION_SAVE_PRODUCT_DATA":
      return { ...state, saveProductData: action.payload };
    case "ACTION_SAVE_DATA_FOR_SEARCH_PRODUCT_RESTRO":
      return { ...state, saveDataForSearchProduct: action.payload.payload };
    case "SAVE_SEARCHED_PRODUCT":
      return { ...state, saveSearchedProduct: action.payload };
    case "ACTION_TOTAL_CART_PRICE":
      return { ...state, saveTotalCartPrice: action.payload };
    case "ACTION_SAVE_ORDER_DETAILS":
      return { ...state, saveOrderDetails: action.payload };
    case "ACTION_SAVE_SINGLE_ORDER_DETAILS":
      return { ...state, saveSingleOrderDetails: action.payload };
    case "ACTION_SAVE_PRODUCT_DATA":
      return { ...state, saveProductData: action.payload };
    case "ACTION_SAVE_DATA_FOR_SEARCH_PRODUCT_RESTRO":
      return { ...state, saveDataForSearchProduct: action.payload.payload };
    case "SAVE_SEARCHED_PRODUCT":
      return { ...state, saveSearchedProduct: action.payload };
    case "ACTION_SAVE_ORDER_HISTORY_DATA":
      return { ...state, saveOrderHistoryData: action.payload };
    case "ACTION_SAVE_ORDER_HISTORY_SEARCH_DATA":
      return { ...state, saveOrderHistorySearchData: action.payload };
    case "ACTION_SAVE_RECENT_ORDER":
      return { ...state, saveRecentOrder: action.payload };
    case "ACTION_SAVE_NOTIFICATION_DATA":
      return { ...state, saveNotificationdata: action.payload };
    case "ACTION_SAVE_RECENT_SEARCH_DATA":
      return { ...state, saveRecentSearchdata: action.payload };
    case "ACTION_LOADER":
      return { ...state, isLoader: action.payload };
    case "ACTION_SAVE_REORDER_ID":
      return { ...state, saveReOrderId: action.payload };
    case "ACTION_CHECK_REORDER":
      return { ...state, checkReOrder: action.payload };
    case "ACTION_SAVE_RATING":
      return { ...state, saveRating: action.payload };
    case "ACTION_RATING_COUNT":
      return { ...state, saveRatingCount: action.payload };
    case "ACTION_CARD_DATA":
      return { ...state, saveCardData: action.payload };
    case "ACTION_SAVE_ALL_RESTRO_DATA":
      return { ...state, saveAllRestroData: action.payload };
    case "ACTION_SAVE_ALL_CATEGORY_DATA":
      return { ...state, saveAllCategoryData: action.payload };
    case "ACTION_SAVE_CMS_PAGE_DATA":
      return { ...state, saveCmsPageData: action.payload };
    case "ACTION_SAVE_DELIVERY_TIP":
      return { ...state, saveDeliveryTip: action.payload };
    case "ACTION_REORDER_PAYPAL_DATA_SAVE":
      return { ...state, saveReorderPaypalData: action.payload };
    case "ACTION_ORDER_PLACE_PAYPAL_DATA_SAVE":
      return { ...state, saveOrderPlacePaypalData: action.payload };
    default:
      return state;
  }
};
export default CommonReducer;
