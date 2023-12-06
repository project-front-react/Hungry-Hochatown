import axios, { AxiosInstance } from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
class API {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: baseURL,
    });
  }
  APICALL(methods: String, url: String, body: Object | null, header: String) {
    const headerType =
      header == "header"
        ? {
            "Content-Type": "application/json",
          }
        : header == "formHeader"
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          };
    const config = {
      headers: headerType,
    };
    try {
      let response;
      if (methods == "post") {
        response = this.instance.post(`${baseURL}/${url}`, body, config);
      } else if (methods == "get") {
        response = this.instance.get(`${baseURL}/${url}`, config);
      }
      return response;
    } catch (error) {
      return error;
    }
  }
}
const apiInstance = new API();

export const loginAPI = async (body: Object) => {
  return await apiInstance.APICALL("post", "login", body, "header");
};
export const SocialMediaApiCall = async (body: Object) => {
  return await apiInstance.APICALL(
    "post",
    "social-register-login",
    body,
    "header"
  );
};
export const RegisterApiCall = async (body: Object) => {
  return await apiInstance.APICALL("post", "register", body, "header");
};
export const ForgetPasswordApiCall = async (body: Object) => {
  return await apiInstance.APICALL("post", "forgotPassword", body, "header");
};
export const ResetPasswordApiCall = async (body: Object) => {
  return await apiInstance.APICALL("post", "resetPassword", body, "header");
};
export const ChangePasswordApiCall = async (body: Object) => {
  return await apiInstance.APICALL(
    "post",
    "change-password",
    body,
    "authHeader"
  );
};
export const OrderByCategoryApiCall = async (body: string) => {
  return await apiInstance.APICALL(
    "get",
    `getCategories?${body}`,
    null,
    "authHeader"
  );
};
export const allCategoryData = async () => {
  return await apiInstance.APICALL("get", `getCategories`, null, "authHeader");
};
export const OrderByRestaurantApiCall = async (body: string) => {
  return await apiInstance.APICALL(
    "get",
    `getRestaurant?${body}`,
    null,
    "authHeader"
  );
};
export const allRestroDataApi = async () => {
  return await apiInstance.APICALL("get", `getRestaurant`, null, "authHeader");
};
export const SearchApiCall = async (data: Object) => {
  return await apiInstance.APICALL("post", `search`, data, "authHeader");
};
export const LogoutApiCall = async () => {
  return await apiInstance.APICALL("get", "logout", null, "authHeader");
};
export const EditProfileApiCall = async (body: Object) => {
  return await apiInstance.APICALL("post", "editProfile", body, "authHeader");
};
export const checkOtpApiCall = async (data: Object) => {
  return await apiInstance.APICALL("post", `checkOtp`, data, "header");
};
export const getProductsApiCall = async (data: Object) => {
  return await apiInstance.APICALL("post", `getProducts`, data, "authHeader");
};
export const SearchPerRestaurantCategoryApiCall = async (data: String) => {
  return await apiInstance.APICALL(
    "get",
    `getProducts?${data}`,
    null,
    "authHeader"
  );
};
export const SearchForOrderByCategoryApiCall = async (data: String) => {
  return await apiInstance.APICALL(
    "get",
    `getCategories?${data}`,
    null,
    "authHeader"
  );
};
export const SearchForOrderByRestaurantApiCall = async (data: String) => {
  return await apiInstance.APICALL(
    "get",
    `getRestaurant?${data}`,
    null,
    "authHeader"
  );
};
export const getRestroForCategory = async (data: number) => {
  return await apiInstance.APICALL(
    "get",
    `getRestaurant?category_id=${data}`,
    null,
    "authHeader"
  );
};
export const getRestaurantDetailApiCall = async (data: String) => {
  return await apiInstance.APICALL(
    "get",
    `getRestaurantDetail?${data}`,
    null,
    "authHeader"
  );
};
export const getCategoryProductShowApiCall = async (data: any) => {
  return await apiInstance.APICALL(
    "get",
    `getProducts?restaurant_id=${data?.restroId}&category_id=${data?.categoryId}`,
    null,
    "authHeader"
  );
};
export const getSingleProductDetailApiCall = async (data: any) => {
  return await apiInstance.APICALL(
    "get",
    `product-detail/${data}`,
    null,
    "authHeader"
  );
};
// remaining apis
export const getCartDetailApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `get-cart`, data, "authHeader");
};
export const postCartDetailApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `save-cart`, data, "authHeader");
};
export const orderPlaceApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `make-payment`, data, "authHeader");
};
export const orderPlacePaypalApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `paypal-make-payment`, data, "authHeader");
};
export const orderDetailApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `order-detail`, data, "authHeader");
};
export const orderHistoryApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `order-history`, data, "authHeader");
};
export const orderHistorySearchApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `order-history`, data, "authHeader");
};
export const contactUsApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `contact-us`, data, "authHeader");
};
export const recentOrderData = async (data: any) => {
  return await apiInstance.APICALL("post", `recent-orders`, data, "authHeader");
};
export const notificationApiCall = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `notification-list`,
    data,
    "authHeader"
  );
};
export const ratingApiCall = async (data: any) => {
  return await apiInstance.APICALL("post", `order-rating`, data, "authHeader");
};
export const getrecentSearchCall = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `get-keyword-list`,
    data,
    "authHeader"
  );
};
export const saverecentSearchCall = async (data: any) => {
  return await apiInstance.APICALL("post", `save-keyword`, data, "authHeader");
};
// DELIVERY PERSON APIS

export const deliveryPersonRegister = async (data: any) => {
  return await apiInstance.APICALL("post", `dp-register`, data, "authHeader");
};
export const deliveryPersonLogin = async (data: any) => {
  return await apiInstance.APICALL("post", `dp-login`, data, "authHeader");
};
export const deliveryCurrentOrder = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-current-orders`,
    data,
    "authHeader"
  );
};
export const deliveryProfileUpdate = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-edit-profile`,
    data,
    "authHeader"
  );
};
export const deliveryOrderStatusList = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-orders-status-list`,
    data,
    "authHeader"
  );
};
export const deliveryChangePassword = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-change-password`,
    data,
    "authHeader"
  );
};
export const deliveryAvailableStatus = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-available-status`,
    data,
    "authHeader"
  );
};
export const deliveryOrderStatus = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-order-status`,
    data,
    "authHeader"
  );
};
export const deliveryEarning = async (data: any) => {
  return await apiInstance.APICALL(
    "post",
    `dp-get-earning`,
    data,
    "authHeader"
  );
};
export const reOrderApi = async (data: any) => {
  return await apiInstance.APICALL("post", `re-order`, data, "authHeader");
};
export const reOrderPaypalApi = async (data: any) => {
  return await apiInstance.APICALL("post", `paypal-re-order`, data, "authHeader");
};
export const getAboutUsApi = async (data: any) => {
  return await apiInstance.APICALL(
    "get",
    `cms-page/${data}`,
    null,
    "authHeader"
  );
};
export const uploadFiles = async (data: any) => {
  return await apiInstance.APICALL("post", `upload-docs`, data, "formHeader");
};

export const getDeliveryTip = async () => {
  return await apiInstance.APICALL(
    "get",
    `dp-setting`,
    null,
    "authHeader"
  );
};

export default apiInstance;
