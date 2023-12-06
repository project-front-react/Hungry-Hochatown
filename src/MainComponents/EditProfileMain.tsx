import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfileDesktop from "../desktop/userside/component/EditProfile";
import ProfileUpdateMain from "../mobile/components/ProfileUpdateMain";
import { actionEditProfileApiCall } from "../mobile/store/actions";
import { RootState } from "../mobile/store/reducers/rootReducers";

type Props = {
  [key: string]: any;
};
const EditProfileMain = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  const [editProfile, setEditProfile] = useState({
    email: "",
    first_name: "",
    mobile_no: "",
  });

  useEffect(() => {
    if (data) {
      setEditProfile(data);
    }
  }, [data]);

  const onUpdateButtonCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    let data = {
      full_name: editProfile.first_name,
      mobile_no: editProfile.mobile_no,
    };
    let body = { data, navigate };
    dispatch(actionEditProfileApiCall(body));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };

  return (
    <>
      {props.status ? (
        <EditProfileDesktop
          onUpdateButtonCLick={onUpdateButtonCLick}
          onChange={onChange}
          editProfile={editProfile}
        />
      ) : (
        <ProfileUpdateMain
          onUpdateButtonCLick={onUpdateButtonCLick}
          onChange={onChange}
          editProfile={editProfile}
        />
      )}
    </>
  );
};
export default EditProfileMain;
