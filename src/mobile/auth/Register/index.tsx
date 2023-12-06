import AuthLayout from "../AuthLayout";
import AuthHeader from "../AuthLayout/AuthHeader";
import logo from "../../../assets/images/logo/logoa.png";
import classes from "./register.module.scss";
import { IoIosAt } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import TermsConditionsPopUp from "./TermsAndConditions";

const Register = (props: any) => {
  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    onFocus,
    onBlur,
    icon,
    handleOnClick,
    CLIENT_ID,
    responseGoogle,
    setIcon,
  } = props;

  return (
    <AuthLayout>
      <AuthHeader />
      <div className={`${classes.loginPage}`}>
        <img className={`${classes.logoA}`} src={logo} />
        <p className={`${classes.brandText}`}>Craving something?</p>
        <p className={`${classes.contentText}`}>Let’s get you started</p>
        <div className={`${classes.loginSection}`}>
          <form className={`${classes.customForm}`} onSubmit={handleSubmit}>
            <h1>Register Account</h1>
            <div className={`${classes.inputBox}`}>
              <input
                type="text"
                placeholder="Full Name"
                name="username"
                className={`${classes.formControl}
						${errors.username && classes.Errorfocus}`}
                value={values.username}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={30}
              />
              <IoPersonOutline />
            </div>
            {errors && errors.username && (
              <p className={`${classes.errorText}`}>{errors.username}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type="tel"
                placeholder="Mobile Number"
                name="number"
                className={`${classes.formControl}
						${errors.number && classes.Errorfocus}`}
                value={values.number.trim()}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                //onKeyUp={values.number = values.number.replace(/[^0-9]/g,'')} 
                onKeyPress={(e) => {
                  if (values.number.length >= 15 || /[^0-9]/.test(e.key)) e.preventDefault();
                }}
              />
              <FiPhone />
            </div>
            {errors.number && (
              <p className={`${classes.errorText}`}>{errors.number}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={`${classes.formControl}
						${errors.email && classes.Errorfocus}`}
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
                className={`${classes.formControl}
						${errors.password && classes.Errorfocus}`}
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
            <div className={classes.TermsConditionsPopUpMain}>
              <TermsConditionsPopUp
                state={values.TandC}
                onchange={handleChange}
              />
            </div>
            {errors.TandC && (
              <p className={`${classes.errorText}`}>{errors.TandC}</p>
            )}

            <button
              type="submit"
              className={`${classes.signINbtn}`}
              onClick={handleOnClick}
            >
              Sign Up
            </button>
            <span className={classes.orText}>
              Already have an Account?<Link to="/login"> Sign In </Link>
            </span>
          </form>
          <div className={`${classes.socilaSection}`}>
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
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
