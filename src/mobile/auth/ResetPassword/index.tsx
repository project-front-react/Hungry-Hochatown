import AuthLayout from "../AuthLayout";
import AuthHeader from "../AuthLayout/AuthHeader";
import classes from "./resetPassword.module.scss";
import logo from "../../../assets/images/logo/logoa.png";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = (props: any) => {
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
    <AuthLayout>
      <AuthHeader />
      <div className={classes.resetPasswordpage}>
        <img className={`${classes.logoA}`} src={logo} />
        <p>
          Online Supermarket for all your daily needs. you are just One Click
          away from your all needs at your door step.
        </p>
        <div className={`${classes.resetSection}`}>
          <form className={`${classes.customForm}`}>
            <h1>Reset Password</h1>
            <div className={`${classes.inputBox}`}>
              <input
                type={icon ? "password" : "text"}
                name="password"
                placeholder="New Password"
                value={values.password}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={
                  errors.password
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
              />
              {!icon ? (
                <AiOutlineEye
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              )}
            </div>
            {errors.password && (
              <p className={`${classes.errorText}`}>{errors.password}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type={confirmIcon ? "password" : "text"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={
                  errors.password
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
              />
              {!confirmIcon ? (
                <AiOutlineEye
                  onClick={() => {
                    setConfirmIcon(!confirmIcon);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => {
                    setConfirmIcon(!confirmIcon);
                  }}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className={`${classes.errorText}`}>{errors.confirmPassword}</p>
            )}
            <button
              className={classes.submitBTN}
              disabled={
                errors.password || errors.confirmPassword ? true : false
              }
              onClick={handleResetPassword}
            >
              Submit
            </button>

            <span onClick={handleLoginPage}>
              <a>Back to Sign In</a>
            </span>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
