import Authlayout from "../authlayout";
import classes from "./registerdesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import GoogleLogin from "react-google-login";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import TermsAndConditionsDesktopPopup from "./TermsAndConditionsDesktopPopUp";
function RegisterDesktop(props: any) {
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
    navigate,
  } = props;
  return (
    <Authlayout
      imageOverText="Already have an Account? "
      imageOverLink="Sign In"
      navigate={() => navigate("/login")}
    >
      <div className={classes.RegisterMain}>
        <div className={classes.ImgWrap}>
          <img src={logo} />
        </div>
        <h1>Craving something?</h1>
        <p>Let’s get you started</p>
        <div className={classes.RegisterSection}>
          <form className={classes.customForm} onSubmit={handleSubmit}>
            <div className={classes.inputbox}>
              <input
                type="text"
                placeholder="Full Name"
                name="username"
                className={
                  errors.username
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.username}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={30}
              />
            </div>
            {errors.username && (
              <p className={`${classes.errorText}`}>{errors.username}</p>
            )}
            <div className={classes.inputbox}>
              <input
                type="tel"
                placeholder="Mobile Number"
                name="number"
                className={
                  errors.number
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.number.trim()}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                // onKeyUp={values.number = values.number.replace(/[^0-9]/g,'')}
                onKeyPress={(e) => {
                  if (values.number.length >= 15 || /[^0-9]/.test(e.key)) e.preventDefault();
                }}
              />
            </div>
            {errors.number && (
              <p className={`${classes.errorText}`}>{errors.number}</p>
            )}
            <div className={classes.inputbox}>
              <input
                type="email"
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
            </div>
            {errors.email && (
              <p className={`${classes.errorText}`}>{errors.email}</p>
            )}
            <div className={classes.inputbox} >
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
            <div className={classes.TermsConditions}>
              <TermsAndConditionsDesktopPopup
                state={values.TandC}
                onchange={handleChange}
              />
            </div>
            {errors.TandC && (
              <p className={`${classes.errorText}`}>{errors.TandC}</p>
            )}
            <button className={classes.SignupBtn} onClick={handleOnClick}>
              Sign Up
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

export default RegisterDesktop;
