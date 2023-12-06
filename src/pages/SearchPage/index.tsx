import React from "react";
import AppFooter from "../../mobile/components/common/AppFooter";
import SearchMain from "../../mobile/components/SearchMain";
import AppLayout from "../../mobile/layouts";

const SeacrchPage = () => {
  return (
    <div>
      <React.Fragment>
        <AppLayout>
          <SearchMain />
          <AppFooter />
        </AppLayout>
      </React.Fragment>
    </div>
  );
};

export default SeacrchPage;
