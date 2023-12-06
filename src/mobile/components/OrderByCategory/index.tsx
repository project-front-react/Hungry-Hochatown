import classes from "./orderbycategory.module.scss";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "../../store/reducers/rootReducers";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { actionGetRestroForCategory } from "../../store/actions";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const OrderByCategory = () => {
  const state = useSelector((state: RootState) => state.CommonReducer);
  const [data, setData] = React.useState<any>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    setData(state.saveOrderByCategoryData);
  }, [state]);

  type mapItem = {
    image: any;
    category_name: string;
  };

  const handleRestroDetails = (item: any) => {
    navigate("/listing", { state: { title: "category" } });
    dispatch(actionGetRestroForCategory(item?.id));
  };

  const loader = useSelector(
    (state: RootState) => state.CommonReducer.isLoader
  );

  return (
    <div className={classes.category}>
      <div className={classes.topContent}>
        <div>
          <h4>Order by Category</h4>
        </div>
        {data?.length > 0 ? (
          <Link to="/category">
            <div className={classes.brandColor}>See all</div>
          </Link>
        ) : (
          ""
        )}
      </div>
      {/* <div className={classes.categorParent}>
				{data &&
					data.map((item: mapItem, index: number) => {
						return (
							<>
								<div
									className={classes.categoryWrap}
									onClick={() => handleRestroDetails(item)}
								>
									<div className={classes.bgShape}>
										<div
											className={classes.imageWrapper}
											style={{ backgroundImage: `url(${item.image})` }}
										></div>
									</div>
									<p style={{ textTransform: "capitalize" }}>
										{item.category_name.length > 15 ? item.category_name.slice(0,10) + "..." : item.category_name}
									</p>
								</div>
							</>
						);
					})}
			</div> */}

      <div className={classes.GrdParent}>
        {loader === true ? (
          <LoadingAnimation />
        ) : data?.length > 0 ? (
          data.map((item: mapItem, index: number) => {
            return (
              <div
                onClick={() => handleRestroDetails(item)}
                className={classes.Grd}
              >
                <div className={classes.ImgWarp}>
                  <img className={classes.GrdImg} src={item.image} />
                </div>
                <p>
                  {/* {item.category_name.length > 15
										? item.category_name.slice(0, 10) + "..."
										: item.category_name} */}
                  {item.category_name}
                </p>
              </div>
            );
          })
        ) : (
          <h3>No Category to Show</h3>
        )}
      </div>
    </div>
  );
};

export default OrderByCategory;
