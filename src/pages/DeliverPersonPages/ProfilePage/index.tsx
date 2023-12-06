import React from 'react'
import DeliveryFooter from '../../../mobile/DeliveryComponents/DelivertyFooter'
import ProfileMain from '../../../mobile/DeliveryComponents/ProfileMain'
import classes from "./profilepage.module.scss"

const DeliveryProfilePage = () => {
  return (
    <React.Fragment>
        <ProfileMain/>
        <DeliveryFooter/>
    </React.Fragment>
  )
}

export default DeliveryProfilePage