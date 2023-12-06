import Authlayout from "../authlayout";
import classes from "./otpdesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import OtpInput from "react-otp-input";

const OTPDesktop = (props: any) => {
  const {
    resOtp,
    second,
    forgetEmail,
    handleOtpSend,
    handleResendOtp,
    handleChange,
  } = props;
  return (
    <Authlayout>
      <div className={classes.OtpMain}>
        <div className={classes.ImgWrap}>
          <img src={logo} />
        </div>
        <p>We have send the code verification to your email address</p>
        <span>{forgetEmail && forgetEmail}</span>
        <div className={classes.OtpSection}>
          <form className={classes.customForm}>
            <div className={classes.otpNumber}>
              <div className={classes.otyinput}>
                <OtpInput
                  isInputNum={true}
                  value={resOtp}
                  onChange={handleChange}
                  numInputs={6}
                  separator={<span></span>}
                  inputStyle={{ width: "100%", margin: "0 0.5rem" }}
                />
              </div>
            </div>
            <button onClick={handleOtpSend} className={classes.SubmitBtn}>
              Verify OTP
            </button>
            <div className={classes.resendTimer}>
              <button
                className={
                  second > 0 ? classes.resendOTPBtnPrev : classes.resendOTPBtn
                }
                disabled={second > 0 ? true : false}
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
              <h3 hidden={second == 0}>
                00:{second >= 10 ? second : `0${second}`}
              </h3>
            </div>
          </form>
        </div>
      </div>
    </Authlayout>
  );
};

export default OTPDesktop;
