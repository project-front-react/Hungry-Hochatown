import { call, put, takeEvery } from "redux-saga/effects";
import {
  ForgetPasswordApiCall,
  loginAPI,
  OrderByCategoryApiCall,
  OrderByRestaurantApiCall,
  RegisterApiCall,
  ResetPasswordApiCall,
  SearchApiCall,
  SearchForOrderByCategoryApiCall,
  SearchForOrderByRestaurantApiCall,
  SocialMediaApiCall,
  checkOtpApiCall,
  getRestroForCategory,
  getRestaurantDetailApiCall,
  getProductsApiCall,
  getCategoryProductShowApiCall,
  LogoutApiCall,
  EditProfileApiCall,
  ChangePasswordApiCall,
  SearchPerRestaurantCategoryApiCall,
  getSingleProductDetailApiCall,
  getCartDetailApiCall,
  postCartDetailApiCall,
  orderPlaceApiCall,
  orderDetailApiCall,
  orderHistoryApiCall,
  orderHistorySearchApiCall,
  recentOrderData,
  contactUsApiCall,
  notificationApiCall,
  deliveryPersonRegister,
  deliveryPersonLogin,
  deliveryCurrentOrder,
  deliveryProfileUpdate,
  ratingApiCall,
  deliveryOrderStatusList,
  deliveryChangePassword,
  deliveryAvailableStatus,
  deliveryOrderStatus,
  deliveryEarning,
  getrecentSearchCall,
  saverecentSearchCall,
  reOrderApi,
  allRestroDataApi,
  allCategoryData,
  getAboutUsApi,
  uploadFiles,
  getDeliveryTip,
  reOrderPaypalApi,
  orderPlacePaypalApiCall,
} from "../../services/API";
import * as actions from "../actions";
import { toast } from "react-toastify";
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
  msg: String;
}

//after token expire
const clearData = () => {
  localStorage.removeItem("authToken");
  let userType = localStorage.getItem("userType");
  if (!userType) {
    toast.error("Session time out, need to sign in again");
    setTimeout(() => {
      window.location.replace("/#/onboarding");
    }, 2000);
  } else {
    if (userType == "2") {
      toast.error("Session time out, need to sign in again");
      setTimeout(() => {
        window.location.replace("/#/login");
      }, 2000);
    } else if (userType == "3") {
      toast.error("Session time out, need to sign in again");
      setTimeout(() => {
        window.location.replace("/#/login-d");
      }, 2000);
    }
  }
};

const deactivateDeliveryPerson = () => {
  localStorage.removeItem("authToken");
  setTimeout(() => {
    localStorage.clear();
    window.location.replace("#/onboarding");
  }, 2000);
};

function* processLoginApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield loginAPI(body);
    if (response.status === 200) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userType", response.data.data.type);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      yield put(actions.actionSaveLoginUserData(response.data.data));
      navigate("/home");
      toast.success(response.data.msg);
    }
  } catch (error) {
    toast.error("Invalid Email ID or Password");
    yield put(actions.actionLoader(false));
  }
}
function* processContactUsApiCall(data: any) {
  let body = data.payload.data;
  try {
    const response: ResponseGenerator = yield contactUsApiCall(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      window.history.back();
    }
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
}
function* processNotificationApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield notificationApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionSaveNotificationData(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      clearData();
    }
  }
}
function* processRatingApiCall(data: any) {
  let rate = {
    page: 1,
    size: 100,
    userId: data.payload.data.userId,
  };

  let pass = { data: rate };

  let body = data.payload.data;
  try {
    const response: ResponseGenerator = yield ratingApiCall(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      yield put(actions.actionorderHistoryApiCall(pass));
    }
  } catch (error) {}
}
function* processSocialMediaApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield SocialMediaApiCall(body);
    if (response.status === 200) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userType", response.data.data.type);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      yield put(actions.actionSaveLoginUserData(response.data.data));
      toast.success(response.data.msg);
      navigate("/home");
    }
  } catch (error) {
    clearData();
  }
}
function* processRegisterApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield RegisterApiCall(body);
    if (response.status === 200) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userType", response.data.data.type);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      yield put(actions.actionSaveLoginUserData(response.data.data));

      navigate("/home");
      toast.success("Register Successfully");
    }
  } catch (error: any) {
    toast.dismiss();
    toast.error(error.response.data.msg);
  }
}
function* processForgetPasswordApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield ForgetPasswordApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionSaveForgetEmail(data.payload.data.email));
      navigate("/otppage");
      toast.success(response.data.msg);
    }
  } catch (error) {
    toast.error("Email is not registered");
  }
}

function* processSendOtp(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield checkOtpApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionSaveOtp(body.otp));
      navigate("/resetpassword");
    }
  } catch (error) {
    toast.error("Invalid OTP");
  }
}
function* processSearchPerRestaurantCategoryApiCall(data: any) {
  let body = data.payload.path;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator =
      yield SearchPerRestaurantCategoryApiCall(body);
    if (response.status === 200) {
      yield put(actions.saveSearchedProduct(response.data.data));
    }
  } catch (error) {}
}

function* processResetPasswordApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield ResetPasswordApiCall(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      if (response.data.data.type == 2) {
        navigate("/login");
      } else {
        navigate("/login-d");
      }
    }
  } catch (error) {
    toast.error("Invalid OTP");
    navigate("/forgotpassword");
  }
}

function* processChangePasswordApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  let screen = data.payload.screen;
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield ChangePasswordApiCall(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      !screen ? navigate("/profilepage") : navigate("/home");
      yield put(actions.actionLoader(false));
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      yield put(actions.actionLoader(false));
      clearData();
    } else {
      toast.error(error.response.data.msg);
      yield put(actions.actionLoader(false));
    }
  }
}

function* processSearchByResApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield SearchApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionStoreSerchData(response.data.data));
      navigate("/listing", { state: { title: "both" } });
    }
  } catch (error) {}
}
function* processRestaurantDetailApiCall(data: any) {
  let body = data.payload.path;
  let title = data.payload.title;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield getRestaurantDetailApiCall(body);
    if (response.status === 200) {
      navigate(`/restaurant-detail/${title}`);
      yield put(actions.actionSaveRestroDetail(response.data.data));
    }
  } catch (error) {}
}
function* processSearchStoreOrderByCategoryData(data: any) {
  let body = data.payload.path;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield SearchForOrderByCategoryApiCall(
      body
    );
    if (response.status === 200) {
      yield put(
        actions.actionStoreSearchOrderByCategoryData(response.data.data)
      );
      navigate("/listing", { state: { title: "category" } });
    }
  } catch (error) {}
}

function* processStoreOrderByCategoryData(data: any) {
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield OrderByCategoryApiCall(
      data.payload
    );
    if (response.status === 200) {
      yield put(actions.actionStoreOrderByCategoryData(response.data.data));
      yield put(actions.actionLoader(false));
    }
  } catch (error) {}
}

function* processGetAllCategoryData() {
  try {
    const response: ResponseGenerator = yield allCategoryData();
    if (response.status === 200) {
      yield put(actions.actionSaveAllCategoryData(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      clearData();
    }
  }
}

function* processStoreOrderByRestaurantData(data: any) {
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield OrderByRestaurantApiCall(
      data.payload
    );
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionStoreOrderByRestaurantData(response.data.data));
    }
  } catch (error) {}
}

function* processGetAllRestroData() {
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield allRestroDataApi();
    if (response.status === 200) {
      yield put(actions.actionSaveAllRestroData(response.data.data));
      yield put(actions.actionLoader(false));
    }
  } catch (error) {}
}

function* processGetRestroForCategory(data: any) {
  let category_id = data.payload;
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield getRestroForCategory(category_id);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.saveRestroForCategory(response.data));
    }
  } catch (error) {
    yield put(actions.actionLoader(false));
  }
}
function* processSearchStoreOrderByRestaurantData(data: any) {
  let body = data.payload.path;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield SearchForOrderByRestaurantApiCall(
      body
    );
    if (response.status === 200) {
      yield put(
        actions.actionStoreSearchOrderByRestaurantData(response.data.data)
      );
      navigate("/listing", { state: { title: "restaurant" } });
    }
  } catch (error) {}
}
function* processProductDetailApiCall(data: any) {
  let category_id = data.payload;
  try {
    const response: ResponseGenerator = yield getProductsApiCall(category_id);
    if (response.status === 200) {
      yield put(actions.actionSaveProductDetail(response.data));
    }
  } catch (error) {}
}
function* processSingleProductDetailApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload.data;
  try {
    const response: ResponseGenerator = yield getSingleProductDetailApiCall(
      body
    );
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionSaveSingleProductData(response.data.data));
    }
  } catch (error) {}
}
function* processCategoryProductShowApiCall(data: any) {
  yield put(actions.actionSaveDataForSearchProductRestro(data));
  try {
    yield put(actions.actionLoader(true));
    const response: ResponseGenerator = yield getCategoryProductShowApiCall(
      data.payload
    );
    if (response.status === 200) {
      yield put(actions.actionSaveCategoryProductShowApiCall(response.data));
      yield put(actions.actionLoader(false));
    }
  } catch (error) {
    yield put(actions.actionLoader(false));
  }
}
function* processLogoutApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let navigate = data.payload.navigate;

  let dispatch = data.payload.dispatch;
  try {
    const response: ResponseGenerator = yield LogoutApiCall();
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionCheckReOrder(false));
      yield put(actions.actionSaveAvailability(false));
      localStorage.removeItem("authToken");
      localStorage.clear();
      toast.success(response.data.msg);
      navigate("/onboarding");
    }
  } catch (error) {
    clearData();
    yield put(actions.actionLoader(false));
  }
}
function* processEditProfileApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield EditProfileApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionSaveLoginUserData(response.data.data));
      toast.success(response.data.msg);
      window.history.back();
    } else {
      toast.error("err");
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      clearData();
    } else {
      toast.error(error.response.data.msg);
    }
  }
}

function* processSaveProductCount(data: any) {
  yield put(actions.actionSaveCategoryProductShowApiCall(data.payload));
}

function* processClearData() {
  yield put(actions.actionSaveCategoryProductShowApiCall([]));
}

//remaining apis

function* processgetCartDetailApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield getCartDetailApiCall(body);
    if (response.status === 200) {
      if (response.data.data.cart_detail) {
        yield put(
          actions.actionSaveApiCartData(response.data.data.cart_detail[0].data)
        );
      } else {
        yield put(actions.actionSaveApiCartData([]));
      }
    } else {
      yield put(actions.actionSaveApiCartData([]));
    }
  } catch (error) {
    yield put(actions.actionSaveApiCartData([]));
  }
}
function* processpostCartDetailApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield postCartDetailApiCall(body);

    if (response.status === 200) {
    }
  } catch (error) {}
}
function* processorderPlaceApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield orderPlaceApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      navigate("/order-success");
      yield put(actions.actionSaveAddress(""));
      yield put(actions.actionSaveCardData(""));
      yield put(actions.orderPlacePaypalDataSave(""));
      yield put(actions.actionSaveOrderDetails(response.data));
    }
  } catch (error: any) {
    yield put(actions.actionLoader(false));
    toast.error(error.response.data.msg);
  }
}
function* processorderPlacePaypalApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield orderPlacePaypalApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      navigate("/order-success");
      yield put(actions.actionSaveAddress(""));
      yield put(actions.actionSaveCardData(""));
      yield put(actions.orderPlacePaypalDataSave(""));
      yield put(actions.actionSaveOrderDetails(response.data));
    }
  } catch (error) {
    yield put(actions.actionLoader(false));
  }
}
function* processReOrderApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload.reOrderData;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield reOrderApi(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      navigate("/order-success");
      yield put(actions.actionSaveAddress(""));
      yield put(actions.actionSaveCardData(""));
      yield put(actions.actionSaveOrderDetails(response.data));
      yield put(actions.actionCheckReOrder(false));
    }
  } catch (error) {
    yield put(actions.actionLoader(false));
  }
}
function* processReOrderPaypalApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload.reOrderData;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield reOrderPaypalApi(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      navigate("/order-success");
      yield put(actions.actionSaveAddress(""));
      yield put(actions.actionSaveCardData(""));
      yield put(actions.actionSaveOrderDetails(response.data));
      yield put(actions.actionCheckReOrder(false));
    }
  } catch (error) {
    yield put(actions.actionLoader(false));
  }
}

function* processorderDetailApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield orderDetailApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionSaveSingleOrderDetails(response.data));
    }
  } catch (error) {}
}

function* processorderHistoryApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield orderHistoryApiCall(body);
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionSaveOrderHistoryData(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      clearData();
    }
  }
}
function* processorderHistorySearchApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield orderHistorySearchApiCall(body);

    if (response.status === 200) {
      yield put(actions.actionSaveOrderHistoryData(response.data.data));
    }
  } catch (error) {}
}
function* processRecentOrderApiCall(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload;

  try {
    const response: ResponseGenerator = yield recentOrderData(body);

    if (response.status === 200) {
      yield put(actions.actionSaveRecentOrder(response.data.data));
      yield put(actions.actionLoader(false));
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      yield put(actions.actionLoader(false));
      clearData();
    }
  }
}
function* processGetRecentSearchApiCall(data: any) {
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield getrecentSearchCall(body);
    if (response.status === 200) {
      yield put(actions.actionSaveRecentSearchData(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      clearData();
    }
  }
}
function* processPostRecentSearchApiCall(data: any) {
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield saverecentSearchCall(body);
    if (response.status === 200) {
    }
  } catch (error) {}
}

// DELIVERY PARTNER GENERATOR FUNCTION CALL

function* processDeliveryRegisterApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  let uploadData = data.payload.uploadingData;

  try {
    const response: ResponseGenerator = yield deliveryPersonRegister(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      navigate("/login-d");
      let uploadingData = new FormData();
      uploadingData.append("userId", response.data.data.id);
      uploadingData.append("type", "dp_docs");
      uploadingData.append("doc_uploads[0]", uploadData?.license);
      uploadingData.append("doc_uploads[1]", uploadData?.insurance);
      yield uploadFiles(uploadingData);
    }
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
}

function* processDeliveryLoginApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;

  try {
    const response: ResponseGenerator = yield deliveryPersonLogin(body);
    if (response.status === 200) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userType", response.data.data.type);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      yield put(actions.actionSaveDeliveryData(response.data.data));
      toast.success(response.data.msg);
      navigate("/home-d");
    }
  } catch (error: any) {
    toast.error(error.response.data.msg);
  }
}

function* processCurrentOrderApiCall(data: any) {
  try {
    const response: ResponseGenerator = yield deliveryCurrentOrder(
      data.payload
    );
    if (response.status === 200) {
      yield put(actions.actionSaveCurrentOrder(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 567) {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
      deactivateDeliveryPerson();
    } else if (error.response.status === 401) {
      yield put(actions.actionSaveAvailability(false));
      clearData();
    }
  }
}

function* processDeliveryOrderStatusListApiCall(data: any) {
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield deliveryOrderStatusList(
      data.payload
    );
    if (response.status === 200) {
      yield put(actions.actionLoader(false));
      yield put(actions.actionSaveDeliveryOrderStatusList(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 567) {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
      deactivateDeliveryPerson();
    } else if (error.response.status === 401) {
      yield put(actions.actionSaveAvailability(false));
      clearData();
    }
  }
}

function* processEditDeliveryProfileApiCall(data: any) {
  let body = data.payload.editData;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield deliveryProfileUpdate(body);
    if (response.status === 200) {
      yield put(actions.actionSaveDeliveryData(response.data.data));
      toast.success(response.data.msg);
      navigate("/profile-d");
    }
  } catch (error: any) {
    if (error.response.status === 567) {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
      deactivateDeliveryPerson();
    } else if (error.response.status === 401) {
      yield put(actions.actionSaveAvailability(false));
      clearData();
    } else {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
    }
  }
}

function* processDeliveryChangePasswordApiCall(data: any) {
  let body = data.payload.data;
  let navigate = data.payload.navigate;
  try {
    const response: ResponseGenerator = yield deliveryChangePassword(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      navigate("/profile-d");
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      yield put(actions.actionSaveAvailability(false));
      clearData();
    } else {
      toast.error(error.response.data.msg);
    }
  }
}

function* processDeliveryAvailableStatusApiCall(data: any) {
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield deliveryAvailableStatus(body);
    if (response.status === 200) {
      if (response.data.data.is_available === "1") {
        toast.success("You're now Online");
      }
    }
  } catch (error: any) {
    if (error.response.status === 567) {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
      deactivateDeliveryPerson();
    } else {
      toast.error(error.response.data.msg);
    }
  }
}

function* processDeliveryOrderStatusApiCall(data: any) {
  let body = data.payload;
  let list = {
    userId: body?.userId,
  };
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield deliveryOrderStatus(body);
    if (response.status === 200) {
      toast.success(response.data.msg);
      yield put(actions.actionDeliveryOrderStatusList(list));
      yield put(actions.actionCurrentOrderApiCall({}));
    }
  } catch (error: any) {
    if (error.response.status === 567) {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
      deactivateDeliveryPerson();
    } else {
      toast.error(error.response.data.msg);
    }
  }
}

function* processDeliveryEarningApiCall(data: any) {
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield deliveryEarning(body);
    if (response.status === 200) {
      yield put(actions.actionSaveDeliveryEarning(response.data.data));
    }
  } catch (error: any) {
    if (error.response.status === 567) {
      yield put(actions.actionSaveAvailability(false));
      toast.error(error.response.data.msg);
      deactivateDeliveryPerson();
    } else if (error.response.status === 401) {
      yield put(actions.actionSaveAvailability(false));
      clearData();
    }
  }
}

function* processGetAboutUs(data: any) {
  yield put(actions.actionLoader(true));
  let body = data.payload;
  try {
    const response: ResponseGenerator = yield getAboutUsApi(body);
    if (response.status === 200) {
      yield put(actions.actionSaveCmsPageData(response.data.data));
      yield put(actions.actionLoader(false));
    }
  } catch (error: any) {}
}

function* processDeliveryTipData() {
  yield put(actions.actionLoader(true));
  try {
    const response: ResponseGenerator = yield getDeliveryTip();
    if (response.status === 200) {
      yield put(actions.actionSaveDeliveryTip(response.data.data));
      yield put(actions.actionLoader(false));
    }
  } catch (error: any) {}
}

function* commonSaga() {
  yield takeEvery(actions.LOGIN_API_CALL, processLoginApiCall);
  yield takeEvery(actions.REGISTER_API_CALL, processRegisterApiCall);
  yield takeEvery(
    actions.FORGETPASSWORD_API_CALL,
    processForgetPasswordApiCall
  );
  yield takeEvery(actions.RESETPASSWORD_API_CALL, processResetPasswordApiCall);
  yield takeEvery(actions.ACTION_GET_ABOUT_US, processGetAboutUs);
  yield takeEvery(actions.SOCIALMEDIA_API_CALL, processSocialMediaApiCall);
  yield takeEvery(actions.SEARCH_API_CALL, processSearchByResApiCall);
  yield takeEvery(actions.PRODUCT_DETAIL_API_CALL, processProductDetailApiCall);
  yield takeEvery(actions.PRODUCT_API_CALL, processSingleProductDetailApiCall);
  yield takeEvery(actions.CONTACT_US_API_CALL, processContactUsApiCall);
  yield takeEvery(actions.NOTIFICATION_API_CALL, processNotificationApiCall);
  yield takeEvery(actions.RATING_API_CALL, processRatingApiCall);
  yield takeEvery(
    actions.GET_RECENT_SEARCH_API_CALL,
    processGetRecentSearchApiCall
  );
  yield takeEvery(
    actions.POST_RECENT_SEARCH_API_CALL,
    processPostRecentSearchApiCall
  );

  yield takeEvery(
    actions.RESTARANT_DETAIL_API_CALL,
    processRestaurantDetailApiCall
  );
  yield takeEvery(
    actions.SEARCH_PER_RESTAURANT_CATEGORY_API_CALL,
    processSearchPerRestaurantCategoryApiCall
  );
  yield takeEvery(
    actions.CHANGEPASSWORD_API_CALL,
    processChangePasswordApiCall
  );
  yield takeEvery(
    actions.ORDER_BY_CATEGORY_API_CALL,
    processStoreOrderByCategoryData
  );
  yield takeEvery(
    actions.ORDER_BY_RESTARANT_API_CALL,
    processStoreOrderByRestaurantData
  );
  yield takeEvery(
    actions.SEARCH_ORDER_BY_CATEGORY_API_CALL,
    processSearchStoreOrderByCategoryData
  );
  yield takeEvery(
    actions.SEARCH_ORDER_BY_RESTARANT_API_CALL,
    processSearchStoreOrderByRestaurantData
  );
  yield takeEvery(actions.ACTION_SEND_OTP, processSendOtp);
  yield takeEvery(
    actions.ACTION_GET_RESTRO_FOR_CATEGORY,
    processGetRestroForCategory
  );
  yield takeEvery(
    actions.ACTION_CATEGORY_PRODUCT_SHOW_API_CALL,
    processCategoryProductShowApiCall
  );
  yield takeEvery(actions.ACTION_CLEAR_DATA, processClearData);
  yield takeEvery(actions.ACTION_SAVE_PRODUCT_COUNT, processSaveProductCount);
  yield takeEvery(actions.ACTION_CLEAR_DATA, processClearData);
  yield takeEvery(actions.LOGOUT_API_CALL, processLogoutApiCall);
  yield takeEvery(actions.EDIT_PROFILE_API_CALL, processEditProfileApiCall);
  yield takeEvery(actions.ACTION_SAVE_PRODUCT_COUNT, processSaveProductCount);
  //remaing apis
  yield takeEvery(
    actions.GET_CART_DETAIL_API_CALL,
    processgetCartDetailApiCall
  );
  yield takeEvery(
    actions.POST_CART_DETAIL_API_CALL,
    processpostCartDetailApiCall
  );
  yield takeEvery(actions.ORDER_PLACE_API_CALL, processorderPlaceApiCall);
  yield takeEvery(
    actions.ORDER_PLACE_PAYPAL_API_CALL,
    processorderPlacePaypalApiCall
  );
  yield takeEvery(actions.ACTION_REORDER_API_CALL, processReOrderApiCall);
  yield takeEvery(
    actions.ACTION_REORDER_PAYPAL_API_CALL,
    processReOrderPaypalApiCall
  );
  yield takeEvery(
    actions.ACTION_ORDER_DETAIL_API_CALL,
    processorderDetailApiCall
  );
  yield takeEvery(actions.ORDER_HISTORY_API_CALL, processorderHistoryApiCall);
  yield takeEvery(
    actions.ORDER_HISTORY_SEARCH_API_CALL,
    processorderHistorySearchApiCall
  );

  yield takeEvery(actions.ACTION_RECENT_ORDER, processRecentOrderApiCall);

  yield takeEvery(actions.ACTION_GET_ALL_RESTRO_DATA, processGetAllRestroData);

  yield takeEvery(
    actions.ACTION_GET_ALL_CATEGORY_DATA,
    processGetAllCategoryData
  );

  // DELIVERY GENERATOR FUNCTION

  yield takeEvery(
    actions.ACTION_DELIVERY_REGISTER_API_CALL,
    processDeliveryRegisterApiCall
  );
  yield takeEvery(
    actions.ACTION_DELIVERY_LOGIN_API_CALL,
    processDeliveryLoginApiCall
  );
  yield takeEvery(
    actions.ACTION_CURRENT_ORDER_API_CALL,
    processCurrentOrderApiCall
  );
  yield takeEvery(
    actions.ACTION_EDIT_DELIVERY_PROFILE_API_CALL,
    processEditDeliveryProfileApiCall
  );
  yield takeEvery(
    actions.ACTION_DELIVERY_ORDER_STATUS_LIST_API_CALL,
    processDeliveryOrderStatusListApiCall
  );
  yield takeEvery(
    actions.ACTION_DELIVERY_CHANGE_PASSWORD_API_CALL,
    processDeliveryChangePasswordApiCall
  );
  yield takeEvery(
    actions.ACTION_DELIVERY_AVAILABLE_STATUS_API_CALL,
    processDeliveryAvailableStatusApiCall
  );
  yield takeEvery(
    actions.ACTION_DELIVERY_ORDER_STATUS_API_CALL,
    processDeliveryOrderStatusApiCall
  );
  yield takeEvery(
    actions.ACTION_DELIVERY_EARNING_API_CALL,
    processDeliveryEarningApiCall
  );
  yield takeEvery(actions.ACTION_GET_ABOUT_US, processGetAboutUs);
  yield takeEvery(actions.ACTION_DELIVERY_TIP_DATA, processDeliveryTipData);
}
export default commonSaga;
