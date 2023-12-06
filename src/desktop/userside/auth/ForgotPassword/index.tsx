import Authlayout from "../authlayout";
import classes from "./forgotpassworkdesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";

const ForgotPassWordDesktop = (props: any) => {
  const {
    handleSubmit,
    errors,
    values,
    navigate,
    handleChange,
    onFocus,
    onBlur,
    handleOnClick,
  } = props;
  return (
    <Authlayout>
      <div className={classes.ForgotPassWordMain}>
        <div className={classes.ImgWrap}>
          <img src={logo} />
        </div>
        <h1>Forgot Password</h1>
        <div className={classes.ForgotPassWordSection}>
          <form className={classes.customForm} onSubmit={handleSubmit}>
            <div className={classes.inputbox}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={values.email}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={50}
              />
            </div>
            {errors.email && (
              <p className={`${classes.errorText}`}>{errors.email}</p>
            )}
            <button className={classes.SigninBtn} onClick={handleOnClick}>
              Send OTP
            </button>
            <p>
              Back to Sign In <span onClick={() => navigate("/login")}>Sign In</span>
            </p>
          </form>
        </div>
      </div>
    </Authlayout>
  );
};

export default ForgotPassWordDesktop;
