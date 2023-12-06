import { gapi } from "gapi-script";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChangePasswordDesktop from "../desktop/userside/component/ChangePassword";
import ChangeYourPasswordMain from "../mobile/components/ChangeYourPasswordMain";
import useForm from "../mobile/helpers/useForm";
import { actionChangePasswordApiCall } from "../mobile/store/actions";
import { RootState } from "../mobile/store/reducers/rootReducers";
type Props = {
  [key: string]: any;
};

const ChangeYourPasswordPageMain = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  const [icon, setIcon] = useState(true);
  const [confirmIcon, setConfirmIcon] = useState(true);
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    handleSubmit();
    if (
      values.currentPassword &&
      values.password &&
      values.confirmPassword &&
      errors.currentPassword == "" &&
      errors.confirmPassword == "" &&
      errors.password == ""
    ) {
      let data = {
        userId: state?.id,
        currentPassword: values.currentPassword,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      };
      let screen = props.status;
      let body = { data, navigate, screen };
      dispatch(actionChangePasswordApiCall(body));
    }
  };
  return (
    <>
      {props.status ? (
        <ChangePasswordDesktop
          handleOnClick={handleOnClick}
          errors={errors}
          values={values}
          handleChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          navigate={navigate}
        />
      ) : (
        <ChangeYourPasswordMain
          setConfirmIcon={() => setConfirmIcon(!confirmIcon)}
          confirmIcon={confirmIcon}
          icon={icon}
          handleOnClick={handleOnClick}
          setIcon={() => setIcon(!icon)}
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
export default ChangeYourPasswordPageMain;
