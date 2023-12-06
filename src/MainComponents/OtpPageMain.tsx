import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OTPDesktop from "../desktop/userside/auth/OTPDesktop";
import OtpPage from "../mobile/auth/OtpPage";
import {
  actionForgetPasswordApiCall,
  actionSendOTP,
} from "../mobile/store/actions";
import { RootState } from "../mobile/store/reducers/rootReducers";

type Props = {
  [key: string]: any;
};
const OtpPageMain = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgetEmail = useSelector(
    (state: RootState) => state.CommonReducer.saveForgetEmail
  );
  const [resOtp, setResOtp] = React.useState<any>("");
  const [second, setSecond] = React.useState(30);
  const timeOutCallback = React.useCallback(
    () => setSecond((currTimer) => currTimer - 1),
    []
  );

  React.useEffect(() => {
    second > 0 && setTimeout(timeOutCallback, 1000);
  }, [second, timeOutCallback]);

  const handleChange = (resOtp: React.FormEvent<HTMLInputElement>) => {
    setResOtp(resOtp);
  };

  const handleOtpSend = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (resOtp.length == 6) {
      let data = {
        email: forgetEmail,
        otp: resOtp,
      };
      let body = { data, navigate };
      dispatch(actionSendOTP(body));
    } else {
      alert("Please write valid otp");
    }
  };

  const handleResendOtp = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let data = {
      email: forgetEmail,
    };
    let body = { data, navigate };
    dispatch(actionForgetPasswordApiCall(body));
  };

  return (
    <>
      {props.status ? (
        <OTPDesktop
          resOtp={resOtp}
          second={second}
          forgetEmail={forgetEmail}
          handleOtpSend={handleOtpSend}
          handleResendOtp={handleResendOtp}
          handleChange={handleChange}
        />
      ) : (
        <OtpPage
          resOtp={resOtp}
          second={second}
          forgetEmail={forgetEmail}
          handleOtpSend={handleOtpSend}
          handleResendOtp={handleResendOtp}
          handleChange={handleChange}
        />
      )}
    </>
  );
};
export default OtpPageMain;
