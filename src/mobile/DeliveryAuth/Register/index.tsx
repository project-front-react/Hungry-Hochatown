import { useEffect, useState } from "react";
import AuthLayout from "../../auth/AuthLayout";
import AuthHeader from "../../auth/AuthLayout/AuthHeader";
import logo from "../../../assets/images/logo/logoa.png";
import classes from "./register.module.scss";
import { IoIosAt } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { TbNotes } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../helpers/useForm";
import { useDispatch } from "react-redux";
import {
  actionDeliveryRegisterApiCall,
  actionSocialMediaApiCall,
} from "../../store/actions";
import { gapi } from "gapi-script";
import TermsConditionsDeliveryPopUp from "./TermsAndConditions";
import GoogleLogin from "react-google-login";

const DeliveryRegister = () => {
  const { handleChange, values, errors, onFocus, onBlur, handleSubmit } =
    useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(true);
  const [license, setLicense] = useState("");
  const [insurance, setInsurance] = useState("");
  const [validFile, setValidFile] = useState(false);

  const CLIENT_ID: any = process.env.REACT_APP_GOOGLE_ID;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: CLIENT_ID });
    });
  }, []);

  const handleOnClick = (event: any) => {
    handleSubmit();

    if (license === "" && insurance === "") {
      setValidFile(true);
    } else {
      setValidFile(false);
    }

    let uploadingData = {
      license: license,
      insurance: insurance,
    };

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
      errors.TandC === "" &&
      (license !== "" || insurance !== "")
    ) {
      let data = {
        full_name: values.username.trim(),
        email: values.email,
        password: values.password,
        mobile_no: values.number,
      };
      let body = { data, navigate, uploadingData };
      if (
        values.username &&
        values.email &&
        values.password &&
        values.number &&
        values.TandC
      ) {
        dispatch(actionDeliveryRegisterApiCall(body));
      }
    }
  };

  return (
    <AuthLayout>
      <AuthHeader />
      <div className={`${classes.loginPage}`}>
        <img className={`${classes.logoA}`} src={logo} />
        <p className={`${classes.brandText}`}>Become a Delivery Person</p>
        <p className={`${classes.contentText}`}>Let’s get you started</p>
        <div className={`${classes.loginSection}`}>
          <form className={`${classes.customForm}`} onSubmit={handleSubmit}>
            <h1>Register Account</h1>
            <div className={`${classes.inputBox}`}>
              <input
                type="text"
                placeholder="Full Name"
                name="username"
                className={
                  errors.username
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.username}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={30}
              />
              <IoPersonOutline />
            </div>
            {errors && errors.username && (
              <p className={`${classes.errorText}`}>{errors.username}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type="tel"
                placeholder="Mobile Number"
                name="number"
                className={
                  errors.number
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.number}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                // onKeyUp={values.number = values.number.replace(/[^0-9]/g,'')}
                onKeyPress={(e) => {
                  if (values.number.length >= 15 || /[^0-9]/.test(e.key)) e.preventDefault();
                }}
              />
              <FiPhone />
            </div>
            {errors.number && (
              <p className={`${classes.errorText}`}>{errors.number}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                className={
                  errors.email
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.email.trim()}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={50}
              />
              <IoIosAt />
            </div>
            {errors.email && (
              <p className={`${classes.errorText}`}>{errors.email}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <input
                type={icon ? "password" : "text"}
                placeholder="Password"
                name="password"
                className={
                  errors.password
                    ? `${classes.Errorfocus}`
                    : `${classes.formControl}`
                }
                value={values.password.trim()}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={20}
              />
              {!icon ? (
                <AiOutlineEye
                  className={`${classes.passwordIcon}`}
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={`${classes.passwordIcon}`}
                  onClick={() => {
                    setIcon(!icon);
                  }}
                />
              )}
            </div>
            {errors.password && (
              <p className={`${classes.errorText}`}>{errors.password}</p>
            )}
            <div className={`${classes.inputBox}`}>
              <p>Upload your Driver's License</p>
              <div className={classes.FileUpload}>
                <input
                  type="file"
                  accept="image/png, image/jpeg, application/pdf"
                  className={classes.InputFile}
                  onChange={(e: any) => setLicense(e.target.files[0])}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <FaRegAddressCard />
              </div>
            </div>
            {validFile === true ? (
              <p className={`${classes.errorText}`}>Upload driving license</p>
            ) : (
              ""
            )}
            <div className={`${classes.inputBox}`}>
              <p>Upload your Proof of Auto Insurance</p>
              <div className={classes.FileUpload}>
                <input
                  type="file"
                  accept="image/png, image/jpeg, application/pdf"
                  className={classes.InputFile}
                  onChange={(e: any) => setInsurance(e.target.files[0])}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <TbNotes />
              </div>
            </div>
            {validFile === true ? (
              <p className={`${classes.errorText}`}>Upload driving insurance</p>
            ) : (
              ""
            )}
            <div>
              <TermsConditionsDeliveryPopUp
                state={values.TandC}
                onchange={handleChange}
              />
            </div>
            {errors.TandC && (
              <p className={`${classes.errorText}`}>{errors.TandC}</p>
            )}
            <button
              type="submit"
              className={`${classes.signINbtn}`}
              onClick={handleOnClick}
            >
              Sign Up
            </button>
            <span className={classes.accountText}>
              Already have an Account?<Link to="/login-d"> Sign In </Link>
            </span>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default DeliveryRegister;
