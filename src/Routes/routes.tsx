import "../app.scss";
import "../assets/scss/common.scss";
import "../../src/mobile/mobile-common.scss";
import React, { Suspense, useEffect, useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import "react-toastify/dist/ReactToastify.css";

import LoadingScreen from "../components/LoadingScreen";
import OnboardingScreen from "../mobile/auth/OnboardingScreen";
import HomePage from "../pages/HomePage";
import CategoryPage from "../pages/CategoryPage";
import SeacrchPage from "../pages/SearchPage";
import OtpPage from "../mobile/auth/OtpPage";
import ProfilePage from "../pages/ProfilePage";
import AddToCart from "../pages/AddToCartPage";
import SeeAllRestaurant from "../pages/OrdeByRestaurantPage";
import RestoCollection from "../mobile/components/RestoCollection";
import OrderProduct from "../pages/OrderProductPage";
import OrderHistory from "../pages/OrderHistoryPage/index";
import NotificationPage from "../pages/NotificationPage/indesx";
import AddAddressPage from "../pages/AddAddressPage";
import PaymentPage from "../pages/PaymentPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import RestaurantDetailPage from "../pages/RestaurantDetails";
import RatingPage from "../pages/RatingPage";
import OrderSummaryPage from "../pages/OrderSummaryPage";
import OnbordingMain from "../mobile/components/OnbordingMain";
import DeliveryLogin from "../mobile/DeliveryAuth/Login";
import DeliveryRegister from "../mobile/DeliveryAuth/Register";
import Home from "../pages/DeliverPersonPages/HomePage";
import OredrStatusPage from "../pages/DeliverPersonPages/OredrStatusPage";
import UpdateProfilePageDelivery from "../pages/DeliverPersonPages/UpdateProfilePage";
import DeliveryProfilePage from "../pages/DeliverPersonPages/ProfilePage";
import DeliveryChangeYourPasswordPage from "../pages/DeliverPersonPages/ChangeYourPasswordPage";
import PageNotFound from "../mobile/components/common/App404";
import HomeDesktop from "../desktop/userside/Desktop Pages/Home";
import LoginMain from "../MainComponents/LoginMain";
import RegisterMain from "../MainComponents/RegisterMain";
import ForgotPassWordMain from "../MainComponents/ForgotPassWordMain";
import ResetPassWordMain from "../MainComponents/ResetPasswordMain";
import OtpPageMain from "../MainComponents/OtpPageMain";
import RestoCollectionDesktopPage from "../desktop/userside/Desktop Pages/RestoCollectionDesktopPage";
import OrderProductMain from "../mobile/components/OrderProductMain";
import EditProfileMain from "../MainComponents/EditProfileMain";
import ChangeYourPasswordPageMain from "../MainComponents/ChangeYourPasswordPageMain";
import ContactUsPageMain from "../MainComponents/ContactUsPageMain";
import RestaurantDetailDesktopPage from "../desktop/userside/Desktop Pages/RestaurantDetailDesktopPage";
import OnboardingDesktop from "../desktop/userside/auth/Onboarding";
import CategoryDesktopPage from "../desktop/userside/Desktop Pages/CategoryDesktopPage";
import AddToCartDesktopPage from "../desktop/userside/Desktop Pages/AddToCartDesktopPage";
import OrderHistoryDesktopPage from "../desktop/userside/Desktop Pages/OrderHistoryDesktopPage";
import NotificationDesktopPage from "../desktop/userside/Desktop Pages/NotificationDesktopPage";
import OrderSummaryDesktopPage from "../desktop/userside/Desktop Pages/OrderSummaryDesktopPage";
import ReorderDesktopPage from "../desktop/userside/Desktop Pages/ReorderDesktopPage";
import AboutUsDesktopPage from "../desktop/userside/Desktop Pages/AboutUsDesktopPage";
import AboutUsPage from "../pages/AboutUsPage";
import TermsAndConditionsDesktopPage from "../desktop/userside/Desktop Pages/TermsAndConditionsDesktopPage";
import TermsAndConditionsPage from "../pages/TermsAndConditionsPage";
import DeliveryAboutUsPage from "../pages/DeliverPersonPages/AboutUsPage";
import DeliveryTermsAndConditionsPage from "../pages/DeliverPersonPages/TermsAndConditionsPage";
import OrderSuccessDesktopPage from "../desktop/userside/Desktop Pages/OrderSuccessdesktopPage";


function UserRoutes() {
  interface Props {
    Component: any;
  }
  const stripKey: any = process.env.REACT_APP_STRIP_KEY;
  const authorizeToken = localStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();
  const [routeChange, setRouteChange] = useState<boolean>();
  let a = location.pathname?.split("/");
  useEffect(() => {
    if (a.includes("order-summary")) {
      if (!authorizeToken) {
        navigate("login");
      }
    }
    if (a.includes("home-d")) {
      if (!authorizeToken) {
        navigate("login-d");
      }
    }
  }, []);
  useEffect(() => {
    if (routeChange === true) {
      navigate(-1);
    } else if (routeChange === false) {
      navigate("/#/onboarding");
    }
  }, [routeChange]);
  const handleNavigate = (data: boolean) => {
    setRouteChange(data);
  };
  
  const Private = (props: Props) => {
    const authorizeToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType") || 2;
    const auth =
      authorizeToken && authorizeToken !== "" && userType == 2 ? true : false;
    const data1: boolean =
      authorizeToken && authorizeToken !== "" ? true : false;
    return auth ? (
      <Suspense fallback={<LoadingScreen />}>
        <props.Component status={mQuery.matches} />
      </Suspense>
    ) : (
      <>{handleNavigate(data1)}</>
    );
  };
  const Public = (props: Props) => {
    const authorizeToken = localStorage.getItem("authToken");
    const auth = !authorizeToken || authorizeToken == "" ? true : false;
    return auth ? (
      <Suspense fallback={<LoadingScreen />}>
        <props.Component status={mQuery.matches} />
      </Suspense>
    ) : (
      <Navigate to="/home" />
    );
  };
  const DeliveryPersonPublic = (props: Props) => {
    const authorizeToken = localStorage.getItem("authToken");
    const auth = !authorizeToken || authorizeToken == "" ? true : false;
    return auth ? (
      <Suspense fallback={<LoadingScreen />}>
        <props.Component />
      </Suspense>
    ) : (
      <Navigate to="/home-d" />
    );
  };
  const DeliveryPersonPrivate = (props: Props) => {
    const authorizeToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    const auth =
      authorizeToken && authorizeToken !== "" && userType == "3" ? true : false;
    const data1: boolean =
      authorizeToken && authorizeToken !== "" ? true : false;
    return auth ? (
      <Suspense fallback={<LoadingScreen />}>
        <props.Component />
      </Suspense>
    ) : (
      <>{handleNavigate(data1)}</>
    );
  };

  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 766 ? true : false,
  });
  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);
    return () => mediaQuery.removeListener(setMQuery);
  }, []);
  const stripePromise = loadStripe(stripKey);

  return (
    <React.Fragment>
      <Elements stripe={stripePromise}>
        <Suspense fallback={<LoadingScreen />}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            icon={false}
          />
          <Routes>
            <Route path="/" element={<Navigate to="onboarding" replace />} />
            <Route
              path="register"
              element={<Public Component={RegisterMain} />}
            />
            <Route path="login" element={<Public Component={LoginMain} />} />
            <Route
              path="forgotpassword"
              element={<Public Component={ForgotPassWordMain} />}
            />
            <Route
              path="resetpassword"
              element={<Public Component={ResetPassWordMain} />}
            />
            <Route
              path="otppage"
              element={<Public Component={OtpPageMain} />}
            />
            <Route
              path="home"
              element={
                <Private Component={mQuery.matches ? HomeDesktop : HomePage} />
              }
            />
            <Route
              path="category"
              element={
                <Private
                  Component={
                    mQuery.matches ? CategoryDesktopPage : CategoryPage
                  }
                />
              }
            />
            <Route
              path="onboarding"
              element={
                <Public
                  Component={mQuery.matches ? OnboardingDesktop : OnbordingMain}
                />
              }
            />
            <Route
              path="search"
              element={<Private Component={SeacrchPage} />}
            />
            <Route
              path="recentOrderAgain"
              element={
                <Private
                  Component={
                    mQuery.matches ? ReorderDesktopPage : OrderProductMain
                  }
                />
              }
            />
            <Route
              path="onboarding"
              element={
                <Public
                  Component={mQuery.matches ? OnboardingDesktop : OnbordingMain}
                />
              }
            />
            <Route
              path="search"
              element={<Private Component={SeacrchPage} />}
            />
            <Route
              path="orderbyrestaurant"
              element={
                <Private
                  Component={
                    mQuery.matches
                      ? RestoCollectionDesktopPage
                      : SeeAllRestaurant
                  }
                />
              }
            />
            <Route
              path="orderproduct"
              element={<Private Component={OrderProduct} />}
            />
            <Route path="otppage" element={<Private Component={OtpPage} />} />
            <Route
              path="listing"
              element={
                <Private
                  Component={
                    mQuery.matches
                      ? RestoCollectionDesktopPage
                      : RestoCollection
                  }
                />
              }
            />
            <Route
              path="addtocart"
              element={
                <Private
                  Component={mQuery.matches ? AddToCartDesktopPage : AddToCart}
                />
              }
            />
            <Route
              path="profilepage"
              element={<Private Component={ProfilePage} />}
            />
            <Route
              path="edit-profile"
              element={<Private Component={EditProfileMain} />}
            />
            <Route
              path="order-history"
              element={
                <Private
                  Component={
                    mQuery.matches ? OrderHistoryDesktopPage : OrderHistory
                  }
                />
              }
            />
            <Route
              path="notification"
              element={
                <Private
                  Component={
                    mQuery.matches ? NotificationDesktopPage : NotificationPage
                  }
                />
              }
            />
            <Route
              path="contact-us"
              element={<Private Component={ContactUsPageMain} />}
            />

            <Route
              path="restaurant-detail/:id"
              element={
                <Private
                  Component={
                    mQuery.matches
                      ? RestaurantDetailDesktopPage
                      : RestaurantDetailPage
                  }
                />
              }
            />
            <Route
              path="about-us"
              element={
                <Private
                  Component={mQuery.matches ? AboutUsDesktopPage : AboutUsPage}
                />
              }
            />
            <Route
              path="terms-and-conditions"
              element={
                <Private
                  Component={
                    mQuery.matches
                      ? TermsAndConditionsDesktopPage
                      : TermsAndConditionsPage
                  }
                />
              }
            />
            <Route
              path="add-address"
              element={<Private Component={AddAddressPage} />}
            />
            <Route
              path="payment"
              element={<Private Component={PaymentPage} />}
            />
            <Route
              path="order-success"
              element={
                <Private
                  Component={
                    mQuery.matches ? OrderSuccessDesktopPage : OrderSuccessPage
                  }
                />
              }
            />
            {/* <Route
              path="ratings"
              element={<Private Component={RatingPage} />}
            /> */}
            <Route
              path="change-your-password"
              element={<Private Component={ChangeYourPasswordPageMain} />}
            />
            <Route
              path="order-summary/:id"
              element={
                <Private
                  Component={
                    mQuery.matches ? OrderSummaryDesktopPage : OrderSummaryPage
                  }
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
            {/* DELIVERY PERSON ROUTES */}
            <Route
              path="home-d"
              element={<DeliveryPersonPrivate Component={Home} />}
            />
            <Route
              path="profile-d"
              element={
                <DeliveryPersonPrivate Component={DeliveryProfilePage} />
              }
            />
            <Route
              path="register-d"
              element={<DeliveryPersonPublic Component={DeliveryRegister} />}
            />
            <Route
              path="login-d"
              element={<DeliveryPersonPublic Component={DeliveryLogin} />}
            />
            <Route
              path="order-status"
              element={<DeliveryPersonPrivate Component={OredrStatusPage} />}
            />
            <Route
              path="edit-profile-d"
              element={
                <DeliveryPersonPrivate Component={UpdateProfilePageDelivery} />
              }
            />
            <Route
              path="contact-us-d"
              element={<DeliveryPersonPrivate Component={ContactUsPageMain} />}
            />
            <Route
              path="change-your-password-d"
              element={
                <DeliveryPersonPrivate
                  Component={DeliveryChangeYourPasswordPage}
                />
              }
            />
            <Route
              path="about-us-d"
              element={
                <DeliveryPersonPrivate Component={DeliveryAboutUsPage} />
              }
            />
            <Route
              path="terms-and-conditions-d"
              element={
                <DeliveryPersonPrivate
                  Component={DeliveryTermsAndConditionsPage}
                />
              }
            />
          </Routes>
        </Suspense>
      </Elements>
    </React.Fragment>
  );
}

export default UserRoutes;
