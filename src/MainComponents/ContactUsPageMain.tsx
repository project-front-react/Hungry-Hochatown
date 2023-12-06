import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import LoginDesktop from "../desktop/userside/auth/Login";
import ContactUsDesktop from "../desktop/userside/component/ContactUs";
import Login from "../mobile/auth/Login";
import ContactUsMain from "../mobile/components/ContactUsMain";
import useForm from "../mobile/helpers/useForm";
import { actionContactUsApiCall } from "../mobile/store/actions";
type Props = {
  [key: string]: any;
};

const ContactUsPageMain = (props: Props) => {
  const pathName = useLocation().pathname;
  const dispatch = useDispatch();
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    handleSubmit();
    if (
      values.question &&
      values.username &&
      values.email &&
      values.message &&
      errors.question == "" &&
      errors.username == "" &&
      errors.email == "" &&
      errors.message == ""
    ) {
      let data = {
        question: values.question,
        full_name: values.username,
        email: values.email,
        message: values.message,
      };
      let body = { data, navigate: "" };
      dispatch(actionContactUsApiCall(body));
    }
  };

  return (
    <>
      {props.status ? (
        <ContactUsDesktop
          pathName={pathName}
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          handleOnClick={handleOnClick}
        />
      ) : (
        <ContactUsMain
          pathName={pathName}
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          handleOnClick={handleOnClick}
        />
      )}
    </>
  );
};
export default ContactUsPageMain;
