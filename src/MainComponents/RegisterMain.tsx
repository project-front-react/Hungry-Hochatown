import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../mobile/helpers/useForm";
import { useDispatch } from "react-redux";
import {
  actionRegisterApiCall,
  actionSocialMediaApiCall,
} from "../../src/mobile/store/actions";
import { gapi } from "gapi-script";
import RegisterDesktop from "../desktop/userside/auth/Register";
import Register from "../mobile/auth/Register";

type Props = {
  [key: string]: any;
};

const RegisterMain = (props: Props) => { 
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(true);
  const CLIENT_ID: any = process.env.REACT_APP_GOOGLE_ID;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: CLIENT_ID });
    });
  }, []);

  const responseGoogle = (response: any) => {
    let resData = response.profileObj;
    let data = {
      provider_id: resData.googleId,
      provider_name: "google",
      full_name: resData.name,
      email: resData.email,
      mobile_no: "",
    };
    let body = { data, navigate };
    dispatch(actionSocialMediaApiCall(body));
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit();
    if (event) event.preventDefault();
    if (
      values.email &&
      values.password &&
      values.username &&
      values.number &&
      values.TandC == true &&
      errors.email === "" &&
      errors.password === "" &&
      errors.username === "" &&
      errors.number === "" &&
      errors.TandC == ""
    ) {
      let data = {
        full_name: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
        mobile_no: values.number,
      };
      let body = { data, navigate };
      if (values.username && values.email && values.password && values.number) {
        dispatch(actionRegisterApiCall(body));
      }
    }
  };

  return (
    <>
      {props.status ? (
        <RegisterDesktop
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          icon={icon}
          navigate={navigate}
          setIcon={setIcon}
          handleOnClick={handleOnClick}
          CLIENT_ID={CLIENT_ID}
          responseGoogle={responseGoogle}
        />
      ) : (
        <Register
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          icon={icon}
          navigate={navigate}
          setIcon={setIcon}
          handleOnClick={handleOnClick}
          CLIENT_ID={CLIENT_ID}
          responseGoogle={responseGoogle}
        />
      )}
    </>
  );
};

export default RegisterMain;
