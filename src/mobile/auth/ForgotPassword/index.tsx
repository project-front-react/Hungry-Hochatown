import AuthLayout from "../AuthLayout";
import AuthHeader from "../AuthLayout/AuthHeader";
import classes from "./forgotPassword.module.scss";
import logo from "../../../assets/images/logo/logoa.png";
import { IoIosAt } from "react-icons/io";
import { Link } from "react-router-dom";
const ForgotPassword = (props: any) => {
  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    onFocus,
    onBlur,
    handleOnClick,
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
            <h1>Forgot Password</h1>
            <div className={`${classes.inputBox}`}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={
                  errors.email ? `${classes.focus}` : `${classes.formControl}`
                }
                value={values.email}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <IoIosAt />
            </div>
            {errors.email && (
              <p className={`${classes.errorText}`}>{errors.email}</p>
            )}
            <button
              type="submit"
              className={`${classes.signINbtn}`}
              onClick={handleOnClick}
            >
              Send OTP
            </button>
            <span>
              <Link to="/login">
                Back to Sign In
              </Link>
            </span>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
