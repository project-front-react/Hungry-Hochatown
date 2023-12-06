import Authlayout from "../../auth/authlayout";
import classes from "./editprofiledesktop.module.scss";
import logo from "../../../../assets/images/logo/logo4.png";
import DesktopNav from "../common/DesktopNav";
function EditProfileDesktop(props: any) {
  const { onUpdateButtonCLick, onChange, editProfile } = props;

  return (
    <div>
      <DesktopNav path="edit-profile" />
      <Authlayout imageOverText="">
        <div className={classes.EditProfileMain}>
          <div className={classes.ImgWrap}>
            <img src={logo} />
          </div>
          <h1>Edit Profile</h1>
          <div className={classes.EditProfileSection}>
            <form className={classes.customForm}>
              <div className={classes.inputbox}>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="first_name"
                  value={editProfile.first_name}
                  onChange={onChange}
                  maxLength={30}
                />
              </div>
              <div className={classes.inputbox}>
                <input
                  type="number"
                  name="mobile_no"
                  placeholder="Number"
                  value={editProfile.mobile_no}
                  onChange={onChange}
                  onKeyPress={(e) => {
                    if (editProfile.mobile_no.length >= 15 || /[^0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </div>
              <div className={classes.inputbox}>
                <input type="email" value={editProfile.email} disabled />
              </div>
              <button
                className={classes.SubmitBtn}
                type="submit"
                onClick={onUpdateButtonCLick}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </Authlayout>
    </div>
  );
}

export default EditProfileDesktop;
