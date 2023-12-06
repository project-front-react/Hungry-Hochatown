import React, { useEffect, useState } from "react";
import AuthLayout from "../../auth/AuthLayout";
import AuthHeader from "../../auth/AuthLayout/AuthHeader";
import classes from "./login.module.scss";
import logo from "../../../assets/images/logo/logoa.png";
import { IoIosAt } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import useForm from "../../helpers/useForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  actionDeliveryLoginApiCall,
  actionSocialMediaApiCall,
} from "../../store/actions";
const DeliveryLogin = () => {
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(true);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit();
    if (event) event.preventDefault();
    if (
      values.email &&
      values.password &&
      errors.email === "" &&
      errors.password === "" 
    ) {
      let data = { email: values.email, password: values.password };
      let body = { data, navigate };
      if (values.email && values.password) {
        dispatch(actionDeliveryLoginApiCall(body));
      }
    }
  };
  return (
    <AuthLayout>
      <AuthHeader />
      <div className={`${classes.loginPage}`}>
        <img className={`${classes.logoA}`} src={logo} />
        <p className={`${classes.brandText}`}>Login Delivery Person</p>
        <p className={`${classes.contentText}`}>Let’s get you started</p>
        <div className={`${classes.loginSection}`}>
          <form className={`${classes.customForm}`} onSubmit={handleSubmit}>
            <h1>Login Account</h1>
            <div className={`${classes.inputBox}`}>
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                className={
                  errors.email
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.email.trim()}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={50}
              />
              <IoIosAt />
            </div>
            {errors.email && (
              <p className={`${classes.errorText}`}>{errors.email}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type={icon ? "password" : "text"}
                placeholder="Password"
                name="password"
                className={
                  errors.password
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.password.trim()}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={20}
              />
              {!icon ? (
                <AiOutlineEye
                  className={`${classes.passwordIcon}`}
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={`${classes.passwordIcon}`}
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              )}
            </div>
            {errors.password && (
              <p className={`${classes.errorText}`}>{errors.password}</p>
            )}
            <div className={classes.forgotbtn}>
              <button
                type="button"
                className={`${classes.forGot}`}
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password ?
              </button>
            </div>
            <button
              type="submit"
              className={`${classes.signINbtn}`}
              onClick={handleOnClick}
            >
              Sign in
            </button>
            <span>
              If you are new, <Link to="/register-d">Create Now </Link>
            </span>
          </form>
          {/* <div className={`${classes.socilaSection}`}>
            <div className={`${classes.orText}`}>
              <span> Or login with </span>
            </div>
            <div className={`${classes.socialWrap}`}>
              <GoogleLogin
                clientId={CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className={classes.googleLogin}
              >
                <span>Continue with Google</span>
              </GoogleLogin>
            </div>
          </div> */}
        </div>
      </div>
    </AuthLayout>
  );
};

export default DeliveryLogin;
