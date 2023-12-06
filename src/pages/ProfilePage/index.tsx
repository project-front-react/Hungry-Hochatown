import React from "react";
import AppFooter from "../../mobile/components/common/AppFooter";
import ProfileMain from "../../mobile/components/ProfileMain";
const ProfilePage = () => {
  return (
    <div>
      <React.Fragment>
        <ProfileMain />
        <AppFooter />
      </React.Fragment>
    </div>
  );
};

export default ProfilePage;
