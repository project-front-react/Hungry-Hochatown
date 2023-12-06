import { useState } from "react";
const useForm = () => {
  //Form values
  const [values, setValues] = useState<any>({
    username: "",
    question: "",
    message: "",
    email: "",
    password: "",
    number:"" ,
    confirmPassword: "",
    currentPassword: "",
    area: "",
    TandC: false,
  });
  //Errors
  const [errors, setErrors] = useState({
    username: "",
    question: "",
    email: "",
    password: "",
    number: "",
    confirmPassword: "",
    currentPassword: "",
    area: "",
    message: "",
    TandC: "",
  });
  const [check, setCheck] = useState(true);

  const validate = (name: string, value: any) => {
    //A function to validate each input values
    if (check) {
      setErrors((previousInputs) => ({
        ...previousInputs,
        [name]: "",
      }));
    } else {
      switch (name) {
        case "username":
          if (value.length > 0) {
            if (!value.trim()) {
              setErrors({
                ...errors,
                username: "Username atleast have 1 letters",
              });
            } else {
              setErrors({
                ...errors,
                username: "",
              });
            }
          } else {
            setErrors({
              ...errors,
              username: "Please enter your full name",
            });
          }
          break;

        case "email":
          if (value.length > 0) {
            if (
              !new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ).test(value)
            ) {
              setErrors({
                ...errors,
                email: "Please enter valid Email ID",
              });
            } else {
              setErrors({
                ...errors,
                email: "",
              });
            }
          } else {
            setErrors({
              ...errors,
              email: "Please enter your Email ID",
            });
          }
          break;
        case "TandC":
          if (value == false) {
            setErrors({
              ...errors,
              TandC: "Term & condition Required",
            });
          } else {
            setErrors({
              ...errors,
              TandC: "",
            });
          }
          break;

        case "password":
          if (value.length > 0) {
            if (
              !new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#~()-^$_!%*?&,.;:'"+={}[|\]\-])[A-Za-z\d@#~()-^$_!%*?&,.;:'"+={}[|\]\-]{8,}$/
              ).test(value)
            ) {
              setErrors({
                ...errors,
                password:
                  "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
              });
            } else {
              setErrors({
                ...errors,
                password: "",
              });
            }
          } else {
            setErrors({
              ...errors,
              password: "Please enter passowrd",
            });
          }
          break;
        case "confirmPassword":
          if (value.length > 0) {
            if (values.password != values.confirmPassword) {
              setErrors({
                ...errors,
                confirmPassword: "Password did not match",
              });
            } else {
              setErrors({
                ...errors,
                confirmPassword: "",
              });
            }
          } else {
            setErrors({
              ...errors,
              confirmPassword: "Please enter confirm passowrd",
            });
          }
          break;
        case "currentPassword":
          if (value.length <= 0) {
            setErrors({
              ...errors,
              currentPassword: "Please enter current passowrd",
            });
          } else {
            setErrors({
              ...errors,
              currentPassword: "",
            });
          }

          break;
        case "question":
          if (value.length <= 0) {
            setErrors({
              ...errors,
              question: "Please enter question",
            });
          } else {
            setErrors({
              ...errors,
              question: "",
            });
          }

          break;
        case "message":
          if (value.length <= 0) {
            setErrors({
              ...errors,
              message: "Please enter your message",
            });
          } else {
            setErrors({
              ...errors,
              message: "",
            });
          }

          break;
        case "number":
          if (value.length > 0) {
            if (!new RegExp(/^(\+\d{1,3}[- ]?)?\d{8,15}$/).test(value)) {
              setErrors({
                ...errors,
                number: "Mobile number must contain minimum 8 digit",
              });
            } else {
              setErrors({
                ...errors,
                number: "",
              });
            }
          } else {
            setErrors({
              ...errors,
              number: "Please enter your mobile number",
            });
          }
          break;

        case "area":
          if (value.length <= 0) {
            setErrors({
              ...errors,
              area: "Cabin name/Boatramp name Required",
            });
          } else {
            setErrors({
              ...errors,
              area: "",
            });
          }
          break;

        default:
          break;
      }
    }
  };
  const handleSubmit = () => {
    setErrors({
      username:
        values.username.length > 0
          ? !values.username.trim()
            ? "Username atleast have 1 letters"
            : ""
          : "Please enter your full name",
      email:
        values.email.length > 0
          ? !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(values.email)
            ? "Please enter valid Email ID"
            : ""
          : "Please enter your Email ID",
      password:
        values.password.length > 0
          ? !new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#~()-^$_!%*?&,.;:'"+={}[|\]\-])[A-Za-z\d@#~()-^$_!%*?&,.;:'"+={}[|\]\-]{8,}$/
            ).test(values.password)
            ? "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            : ""
          : "Please enter passowrd",
      number:
        values.number.length > 0
          ? !new RegExp(/^(\+\d{1,3}[- ]?)?\d{8,15}$/).test(values.number)
            ? "Mobile number must contain minimum 8 digit"
            : ""
          : "Please enter your mobile number",
      confirmPassword:
        values.confirmPassword.length > 0 ? values.password != values.confirmPassword?"Password did not match":"" : "Please enter new passowrd",
      currentPassword:
         values.currentPassword.length <= 0?"Please enter current passowrd" : "",
      area: values.area.length <= 0 ? "Cabin name/Boatramp name Required" : "",
      question: values.question.length <= 0 ? "Please enter question" : "",
      message: values.message.length <= 0 ? "Please enter your message" : "",
      TandC: values.TandC == false ? "Term & condition Required" : "",
    });
  };

  const handleChange = (event: any) => {
    event.persist();
    let { name, value, type, checked } = event.target;
    if (type == "checkbox") {
      setCheck(false);
      validate(name, checked);
      setValues({
        ...values,
        [name]: checked,
      });
    } else {
      if (check) validate(name, value);
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const onFocus = (event: any) => {
    let { name, value } = event.target;
    setCheck(false);
    validate(name, value);
  };

  const onBlur = (event: any) => {
    let { name, value } = event.target;
    setCheck(true);
    validate(name, value);
  };

  return {
    values,
    errors,
    handleChange,
    onFocus,
    onBlur,
    handleSubmit,
  };
};

export default useForm;
