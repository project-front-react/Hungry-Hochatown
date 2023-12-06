import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RestaurantDetails from '../../mobile/components/BuyProductMain'
import { actiongetCartDetailApiCall } from '../../mobile/store/actions';
import { RootState } from '../../mobile/store/reducers/rootReducers';

const RestaurantDetailPage = () => {
  const dispatch=useDispatch()
  const state = useSelector(
    (state: RootState) => state.CommonReducer.saveLoginUserDetails
  );
  useEffect(()=>{
    let data={"userId":state.id}
    let body={data:data,navigator:''}
    dispatch(actiongetCartDetailApiCall(body))
  },[])
  return (
    <React.Fragment>
      <RestaurantDetails/>
    </React.Fragment>
  )
}

export default RestaurantDetailPage