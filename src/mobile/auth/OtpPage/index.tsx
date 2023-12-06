import AuthLayout from "../AuthLayout";
import AuthHeader from "../AuthLayout/AuthHeader";
import logo from "../../../assets/images/logo/logoa.png";
import classes from "./otp.module.scss";
import OtpInput from "react-otp-input";

const OtpPage = (props: any) => {
  const {
    resOtp,
    second,
    forgetEmail,
    handleOtpSend,
    handleResendOtp,
    handleChange,
  } = props;
  return (
    <div>
      <AuthLayout>
        <AuthHeader />
        <div className={`${classes.otpPage}`}>
          <img className={`${classes.logoA}`} src={logo} alt="" />
          <p>We have send the code verification to your email address</p>
          <span>{forgetEmail && forgetEmail}</span>
          <div className={classes.otpSection}>
            <form className={classes.customForm}>
              <h1>Verification Code</h1>
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
              <button
                className={classes.submitBTN}
                type="submit"
                onClick={handleOtpSend}
              >
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
      </AuthLayout>
    </div>
  );
};

export default OtpPage;
