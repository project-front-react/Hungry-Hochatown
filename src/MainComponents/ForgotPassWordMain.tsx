
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPassWordDesktop from "../desktop/userside/auth/ForgotPassword";
import ForgotPassword from "../mobile/auth/ForgotPassword";
import useForm from "../mobile/helpers/useForm";
import { actionForgetPasswordApiCall } from "../mobile/store/actions";
type Props = {
  [key: string]: any;
};const ForgotPassWordMain=(props:Props)=>{
    const { handleChange, values, errors, onFocus, onBlur,handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit();    
    if (event) event.preventDefault();
    if (
      errors.email=="" &&
      Object.keys(values).length !== 0
    ) {
      let data = { email: values.email };
      let body = { data, navigate };
      
      if (values.email) {
        dispatch(actionForgetPasswordApiCall(body));
      }
    }
  };
  return (
    <>
      {props.status ? (
        <ForgotPassWordDesktop
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          navigate={navigate}
          handleOnClick={handleOnClick}
        />
      ) : (
        <ForgotPassword
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          navigate={navigate}
          handleOnClick={handleOnClick}
        />
      )}
    </>
  );

}
export default ForgotPassWordMain;