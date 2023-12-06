import AuthLayout from "../AuthLayout";
import AuthHeader from "../AuthLayout/AuthHeader";
import classes from "./login.module.scss";
import logo from "../../../assets/images/logo/logoa.png";
import { IoIosAt } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";
import LoadingScreen from "../../../components/LoadingScreen";
const Login = (props: any) => {
  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    onFocus,
    onBlur,
    icon,
    navigate,
    loader,
    handleOnClick,
    CLIENT_ID,
    responseGoogle,
    setIcon,
  } = props;

  return (
    <AuthLayout>
      {loader == true ? (
        <LoadingScreen />
      ) : (
        <div>
          <AuthHeader />
          <div className={`${classes.loginPage}`}>
            <img className={`${classes.logoA}`} src={logo} />
            <p className={`${classes.brandText}`}>Craving something?</p>
            <p className={`${classes.contentText}`}>Let’s get you started</p>
            <div className={`${classes.loginSection}`}>
              <form className={`${classes.customForm}`} onSubmit={handleSubmit}>
                <h1>Login Account</h1>
                <div className={`${classes.inputBox}`}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className={
                      errors?.email
                        ? `${classes.Errorfocus}`
                        : `${classes.formControl}`
                    }
                    value={values.email}
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
                    value={values.password}
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
                  disabled={loader == true ? true : false}
                  type="submit"
                  className={`${classes.signINbtn}`}
                  onClick={handleOnClick}
                >
                  Sign in
                </button>
                <span>
                  If you are new, <Link to="/register">Create Now </Link>
                </span>
              </form>
              <div className={`${classes.socilaSection}`}>
                <div className={`${classes.orText}`}>
                  <span> Or login with </span>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
