import React, { useEffect, useState } from "react";
import classes from "./buyproductmain.module.scss";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import SearchInput from "../../../components/SearchInput";
import ExploreMenu from "./ExploreMenu";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RootState } from "../../store/reducers/rootReducers";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  const state1 = useSelector((state: RootState) => state.CommonReducer);
  const [total, setTotal] = useState(0);
  const [restroData, setRestroData] = useState({
    restaurant_name: "",
    address: "",
    category_list: [],
    ratings: [],
  });

  const cartData = useSelector(
    (state: RootState) => state.CartReducer.cartData
  );
  useEffect(() => {
    setRestroData(
      state1.saveRestroDetail.Restaurants && state1.saveRestroDetail.Restaurants
    );
  }, [state1]);

  useEffect(() => {
    if (cartData?.length > 0) {
      let totalcount = 0;
      cartData.map((item: any) => {
        totalcount = totalcount + item.quantity * item.price;
      });
      setTotal(totalcount);
    } else {
      setTotal(0);
    }
  }, [cartData]);

  const handleAddToCart = () => {
    if (cartData?.length > 0) {
      navigate("/addtocart");
    } else {
      toast.error("Add some items");
    }
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <Link to={"/home"}>
            <img
              className={`${classes.logo} ${classes.logoW}`}
              src={BrandLogo}
              alt="logo"
            />
          </Link>
          <Link to={"/home"}>
            <img className={classes.logo} src={BrandLogo} alt="logo" />
          </Link>
        </div>
      </header>
      <main className={`${classes.buyProductMain} mb-xxl`}>
        <SearchInput />
        <div className={classes.restAddress}>
          <div className={classes.leftSide}>
            <h1>{restroData && restroData.restaurant_name}</h1>
            <p>{restroData && restroData.address}</p>
            {/* <small>Los Angeles</small> */}
          </div>
          <div className={classes.rightSide}>
            <div>
              {state1?.saveRestroDetail.ratings && (
                <Rating
                  allowHover={false}
                  readonly={true}
                  initialValue={
                    Math.round(
                      state1?.saveRestroDetail.ratings.sum /
                        state1?.saveRestroDetail.ratings.count
                    ) > 1
                      ? Math.round(
                        state1?.saveRestroDetail.ratings.sum /
                          state1?.saveRestroDetail.ratings.count
                      )
                      : 0
                  }
                />
              )}
            </div>
            <div className={classes.ratingText}>
              (
              {state1?.saveRestroDetail.ratings
                ? state1?.saveRestroDetail.ratings.count
                : 0}{" "}
              Ratings)
            </div>
          </div>
        </div>
        <ExploreMenu />
      </main>
      <div className={classes.footerBtn}>
        <ul>
          <li>
            <span>{cartData?.length} Items</span>
            <span className={classes.price}>${total.toFixed(2)}</span>
          </li>
          <li>
            <span className={classes.viewCart} onClick={handleAddToCart}>
              View Cart
              <MdOutlineNavigateNext />{" "}
            </span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default RestaurantDetails;
