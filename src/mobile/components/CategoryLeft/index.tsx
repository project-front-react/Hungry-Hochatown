import  { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./leftmenu.module.scss";
import { RootState } from "../../store/reducers/rootReducers";
import { actionGetAllCategory, actionGetRestroForCategory } from "../../../mobile/store/actions";
import DEFAULT from "../../../assets/images/default-img.png";
type mapItem = {
  image: any;
  category_name: string;
  id: number;
};
const LeftMenu = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(actionGetAllCategory())
  },[])

  const Category = useSelector( 
    (state: RootState) => state.CommonReducer
  );
  const allCategoryData = useSelector(
    (state: RootState) => state.CommonReducer.saveAllCategoryData
  );
  

  const [active, setActive] = useState(
    allCategoryData && allCategoryData[0]?.id
  );
  
  const handleCategoryId = (item: number) => {
    setActive(item);
    dispatch(actionGetRestroForCategory(item));
  };

  return (
    <div className={classes.leftSection}>
      <div className={classes.leftMenu}>
        <div className={classes.Nav}>
          {allCategoryData?.map((item: mapItem) => (
            <div
              className={
                item.id === active ? classes.navLinkSelect : classes.navLink
              }
            >
              <div
                className={classes.content}
                onClick={() => handleCategoryId(item.id)}
              >
                <img
                  className={classes.RestocategoryImg}
                  src={item.image || DEFAULT}
                  onError={({ currentTarget }) => (currentTarget.src = DEFAULT)}
                  alt=""
                />
                <span>{item.category_name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
