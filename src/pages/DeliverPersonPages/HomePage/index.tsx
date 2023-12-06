import React from 'react'
import DeliveryFooter from '../../../mobile/DeliveryComponents/DelivertyFooter';
import HomeMain from '../../../mobile/DeliveryComponents/HomeMain';
import classes from "./home.module.scss";

const Home = () => {
  return (
    <React.Fragment>
      <HomeMain/>
      <DeliveryFooter/>
    </React.Fragment>
  )
}

export default Home