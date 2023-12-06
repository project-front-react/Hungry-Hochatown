import Authlayout from "../../auth/authlayout";
import classes from "./changepassworddesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import DesktopNav from "../common/DesktopNav";
function ChangePasswordDesktop(props: any) {
  const { handleOnClick, errors, values, handleChange, onFocus, onBlur } =
    props;
  return (
    <div>
      <DesktopNav path="change-your-password" />
      <Authlayout imageOverText="">
        <div className={classes.ChangePasswordMain}>
          <div className={classes.ImgWrap}>
            <img src={logo} />
          </div>
          <h1>Change Password</h1>
          <div className={classes.ChangePasswordSection}>
            <form className={classes.customForm}>
              <div className={classes.inputbox}>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              {errors.currentPassword && (
                <p className={`${classes.errorText}`}>
                  {errors.currentPassword}
                </p>
              )}
              <div className={classes.inputbox}>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  value={values.password}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
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
                />
              </div>
              {errors.confirmPassword && (
                <p className={`${classes.errorText}`}>
                  {errors.confirmPassword}
                </p>
              )}
              <button className={classes.SubmitBtn} onClick={handleOnClick}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </Authlayout>
    </div>
  );
}

export default ChangePasswordDesktop;
