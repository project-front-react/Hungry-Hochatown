import Authlayout from "../../auth/authlayout";
import classes from "./contactusdesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import DesktopNav from "../common/DesktopNav";
function ContactUsDesktop(props: any) {
  const { pathName, errors, handleChange, onFocus, onBlur, handleOnClick } =
    props;
  return (
    <div>
      <DesktopNav path="contact-us"/>  
      <Authlayout imageOverText="">
        <div className={classes.ContactUsMain}>
          <div className={classes.ImgWrap}>
            <img src={logo} />
          </div>
          <h1>We'd love to hear from you!</h1>
          <div className={classes.ContactUsSection}>
            <form className={classes.customForm}>
              <div className={classes.inputbox}>
                <input
                  type="text"
                  placeholder="How can I help you?"
                  name="question"
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              {errors.question && (
                <p className={`${classes.errorText}`}>{errors.question}</p>
              )}
              <div className={classes.inputbox}>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="username"
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              {errors.username && (
                <p className={`${classes.errorText}`}>{errors.username}</p>
              )}
              <div className={classes.inputbox}>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>

              {errors.email && (
                <p className={`${classes.errorText}`}>{errors.email}</p>
              )}
              <div className={classes.inputbox}>
                <textarea
                  placeholder="Message"
                  name="message"
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              {errors.message && (
                <p className={`${classes.errorText}`}>{errors.message}</p>
              )}

              <button className={classes.SubmitBtn} onClick={handleOnClick}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </Authlayout>
    </div>
  );
}

export default ContactUsDesktop;
