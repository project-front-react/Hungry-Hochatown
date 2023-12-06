import React from "react";
import AppFooter from "../../mobile/components/common/AppFooter";
import AppMain from "../../mobile/components/common/AppMain";
import AppLayout from "../../mobile/layouts";

const HomePage = () => {
  return (
    <React.Fragment>
      <AppLayout>
        <AppMain />
        <AppFooter />
      </AppLayout>
    </React.Fragment>
  );
};

export default HomePage;
