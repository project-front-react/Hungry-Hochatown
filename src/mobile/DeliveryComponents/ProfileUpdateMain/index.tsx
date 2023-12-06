import React, { useState, useEffect } from "react";
import classes from "./profileupdatemain.module.scss";
import { VscHome } from "react-icons/vsc";
import BrandLogo from "../../../assets/images/logo/logoa.png";
import { IoIosAt, IoMdArrowRoundBack } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { actionEditDeliveryProfileApiCall, actionEditProfileApiCall } from "../../store/actions";
import { useDispatch } from "react-redux";

const ProfileUpdateMainDelivery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(
    (state: RootState) => state.DeliveryReducer.saveDeliveryData
  );
  const [editProfile, setEditProfile] = useState({
    email: "",
    first_name: "",
    mobile_no: "",
  });

  useEffect(() => {
    if (data) {
      setEditProfile(data);
    }
  }, [data]);

  const onUpdateButtonCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    let editData = {
      full_name: editProfile.first_name,
      mobile_no: editProfile.mobile_no,
      user_id: data.id
    };
    let body = { editData, navigate };
    dispatch(actionEditDeliveryProfileApiCall(body));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };
  return (
    <React.Fragment>
      <div className={classes.contacheader}>
        <div className={classes.logoWrap}>
          <span onClick={() => window.history.back()}>
            <IoMdArrowRoundBack />
          </span>
          <h1>Accounts</h1>
        </div>
        <div className={classes.homeIcon}>
          <Link to="/home-d">
            <VscHome />
          </Link>
        </div>
      </div>
      <main className={`${classes.editProfilemain} mb-xxl`}>
        <header className={classes.header}>
          <div className={`${classes.logoWrap} ${classes.logoWrapHeader}`}>
            <Link to={"/home-d"}>
              <img
                className={`${classes.logo} ${classes.logoW}`}
                src={BrandLogo}
                alt="logo"
              />
            </Link>
            <Link to={"/home-d"}>
              <img className={classes.logo} src={BrandLogo} alt="logo" />
            </Link>
          </div>
        </header>
        <form className={classes.customFrom}>
          <h1>Edit Profile</h1>
          <div className={`${classes.inputBox}`}>
            <input
              type="text"
              placeholder="Full Name"
              name="first_name"
              value={editProfile.first_name}
              onChange={onChange}
              maxLength={30}
            />
            <IoPersonOutline />
          </div>
          <div className={`${classes.inputBox}`}>
            <input
              type="number"
              name="mobile_no"
              placeholder="Number"
              value={editProfile.mobile_no}
              onChange={onChange}
              onKeyPress={(e) => {
                if (editProfile.mobile_no.length >= 15 || /[^0-9]/.test(e.key)) e.preventDefault();
              }}
            />
            <FiPhone />
          </div>
          <div className={`${classes.disableInput}`}>
            <input type="email" value={editProfile.email} disabled />
            <IoIosAt />
          </div>
          <button
            type="submit"
            className={`${classes.signINbtn}`}
            onClick={onUpdateButtonCLick}
          >
            Update Profile
          </button>
        </form>
      </main>
    </React.Fragment>
  );
};

export default ProfileUpdateMainDelivery;
