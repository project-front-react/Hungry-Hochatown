import Authlayout from "../authlayout";
import classes from "./resetpassworddesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";

const ResetPasswordDesktop = (props: any) => {
  const {
    setConfirmIcon,
    confirmIcon,
    icon,
    setIcon,
    handleLoginPage,
    handleResetPassword,
    errors,
    values,
    handleChange,
    onFocus,
    onBlur,
  } = props;

  return (
    <Authlayout>
      <div className={classes.ForgotPassWordMain}>
        <div className={classes.ImgWrap}>
          <img src={logo} />
        </div>
        <h1>Reset Password</h1>
        <div className={classes.ForgotPassWordSection}>
          <form className={classes.customForm}>
            <div className={classes.inputbox}>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={values.password}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={50}
              />
            </div>
            {errors.password && (
              <p className={`${classes.errorText}`}>{errors.password}</p>
            )}
            <div className={classes.inputbox}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={50}
              />
            </div>
            {errors.confirmPassword && (
              <p className={`${classes.errorText}`}>{errors.confirmPassword}</p>
            )}
            <button
              className={classes.SigninBtn}
              disabled={
                errors.password || errors.confirmPassword ? true : false
              }
              onClick={handleResetPassword}
            >
              Submit
            </button>
            <p>
              Back to Sign In <span onClick={handleLoginPage}>Sign In</span>
            </p>
          </form>
        </div>
      </div>
    </Authlayout>
  );
};

export default ResetPasswordDesktop;
