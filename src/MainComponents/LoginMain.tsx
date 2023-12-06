import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginDesktop from "../desktop/userside/auth/Login";
import Login from "../mobile/auth/Login";
import useForm from "../mobile/helpers/useForm";
import {
  actionLoginApiCall,
  actionSocialMediaApiCall,
} from "../mobile/store/actions";
import { RootState } from "../mobile/store/reducers/rootReducers";
type Props = {
  [key: string]: any;
};

const LoginMain = (props: Props) => {
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

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSubmit();
    if (event) event.preventDefault();
    if (
      values.email &&
      values.password &&
      errors.email === "" &&
      errors.password === ""
    ) {
      let data = { email: values.email, password: values.password };
      let body = { data, navigate };
      if (values.email && values.password) {
        dispatch(actionLoginApiCall(body));
      }
    }
  };
  return (
    <>
      {props.status ? (
        <LoginDesktop
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          icon={icon}
          navigate={navigate}
          loader={loader}
          setIcon={setIcon}
          handleOnClick={handleOnClick}
          CLIENT_ID={CLIENT_ID}
          responseGoogle={responseGoogle}
        />
      ) : (
        <Login
          handleSubmit={handleSubmit}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          icon={icon}
          navigate={navigate}
          loader={loader}
          setIcon={setIcon}
          handleOnClick={handleOnClick}
          CLIENT_ID={CLIENT_ID}
          responseGoogle={responseGoogle}
        />
      )}
    </>
  );
};
export default LoginMain;
