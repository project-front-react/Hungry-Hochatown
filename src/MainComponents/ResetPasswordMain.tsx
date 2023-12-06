import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResetPasswordDesktop from "../desktop/userside/auth/ResetPassword";
import ResetPassword from "../mobile/auth/ResetPassword";
import useForm from "../mobile/helpers/useForm";
import {
  actionForgetPasswordApiCall,
  actionResetPasswordApiCall,
} from "../mobile/store/actions";
import { RootState } from "../mobile/store/reducers/rootReducers";

type Props = {
  [key: string]: any;
};
const ResetPassWordMain = (props: Props) => {
  const dispatch = useDispatch();
  const { handleChange, values, errors, onFocus, onBlur } = useForm();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const [icon, setIcon] = React.useState(true);
  const [confirmIcon, setConfirmIcon] = React.useState(true);

  React.useEffect(() => {
    setPasswordData(values);
  }, [values]);

  const forgetEmail = useSelector(
    (state: RootState) => state.CommonReducer.saveForgetEmail
  );

  const saveOtp = useSelector(
    (state: RootState) => state.CommonReducer.saveOtp
  );

  const handleResetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (passwordData?.password === passwordData?.confirmPassword) {
      let data = {
        otp: saveOtp,
        email: forgetEmail,
        password: passwordData?.password,
        password_confirmation: passwordData?.confirmPassword,
      };
      let body = { data, navigate };
      dispatch(actionResetPasswordApiCall(body));
    }
  };

  const handleLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      {props.status ? (
        <ResetPasswordDesktop
          handleLoginPage={handleLoginPage}
          handleResetPassword={handleResetPassword}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          navigate={navigate}
        />
      ) : (
        <ResetPassword
          setConfirmIcon={() => setConfirmIcon(!confirmIcon)}
          confirmIcon={confirmIcon}
          icon={icon}
          setIcon={() => setIcon(!icon)}
          handleLoginPage={handleLoginPage}
          handleResetPassword={handleResetPassword}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          navigate={navigate}
        />
      )}
    </>
  );
};
export default ResetPassWordMain;
