import Authlayout from "../authlayout";
import classes from "./logindesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import GoogleLogin from "react-google-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function LoginDesktop(props: any) {
  const {
    handleSubmit,
    errors,
    values,
    icon,
    handleChange,
    onFocus,
    onBlur,
    navigate,
    loader,
    handleOnClick,
    CLIENT_ID,
    responseGoogle,
    setIcon,
  } = props;
  return (
    <Authlayout
      imageOverText="Do not have an Account?"
      imageOverLink="Sign Up"
      navigate={() => navigate("/register")}
    >
      <div className={classes.LoginMain}>
        <div className={classes.ImgWrap}>
          <img src={logo} />
        </div>
        <h1>Craving something?</h1>
        <p>Let’s get you started</p>
        <div className={classes.LoginSection}>
          <form className={classes.customForm} onSubmit={handleSubmit}>
            <div className={classes.inputbox}>
              <input
                type="email"
                name="email"
                placeholder="Email Address or Mobile number"
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
            <div className={classes.inputbox}>
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
                <div>
                  <AiOutlineEye
                    className={`${classes.passwordIcon}`}
                    onClick={() => {
                      setIcon(!icon);
                    }}
                  />
                </div>
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
            <div
              className={classes.forgotbtn}
              onClick={() => navigate("/forgotpassword")}
            >
              <button type="button" className={`${classes.forGot}`}>
                Forgot Password ?
              </button>
            </div>
            <button
              disabled={loader == true ? true : false}
              className={classes.SigninBtn}
              onClick={handleOnClick}
            >
              Sign In
            </button>
            <p>Or login with</p>
            <div className={classes.socialWrap}>
              <GoogleLogin
                clientId={CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                className={classes.googleLogin}
              >
                <span>Continue with Google</span>
              </GoogleLogin>
            </div>
          </form>
        </div>
      </div>
    </Authlayout>
  );
}

export default LoginDesktop;
