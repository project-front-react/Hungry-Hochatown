import React from "react";
import AppFooter from "../../mobile/components/common/AppFooter";
import RestoCollection from "../../mobile/components/RestoCollection";

const SeeAllRestaurant = () => {
  return (
    <div>
      <React.Fragment>
        <RestoCollection />
        <AppFooter />
      </React.Fragment>
    </div>
  );
};

export default SeeAllRestaurant;
