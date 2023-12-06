import React, { useEffect } from "react";
import Slider from "react-slick";
import classes from "./recentOrder.module.scss";
import { useNavigate } from "react-router-dom";
import DEFAULT from "../../../assets/images/default-img.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import {
	actionOrderDetailApiCall,
	actionRecentOrder,
} from "../../store/actions";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";

const RecentOrder = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const state = useSelector(
		(state: RootState) => state.CommonReducer.saveLoginUserDetails
	);
	const recentOrderData = useSelector(
		(state: RootState) => state.CommonReducer.saveRecentOrder
	);

	const loader = useSelector((state: any) => state.CommonReducer.isLoader);

	useEffect(() => {
		let body = {
			page: 1,
			size: 5,
			userId: state.id,
		};
		dispatch(actionRecentOrder(body));
	}, []);
	const settings: any = {
		className: "recently-list-slider recently-list slick-initialized",
		dots: false,
		infinite: recentOrderData.length > 3,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 2565,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: recentOrderData.length > 3,
				},
			},
			{
				breakpoint: 1367,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 375,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	const handleRecentOrder = (item: any) => {
		let body = {
			order_id: item.order_id,
			user_id: item.user_id,
		};
		dispatch(actionOrderDetailApiCall(body));
		navigate("/recentOrderAgain");
	};

	return (
		<div className={classes.recentOrders}>
			<div className={classes.recentWrap}>
				<h3 className="font-md">Recent Orders</h3>
				{loader === true ? (
					<LoadingAnimation />
				) : recentOrderData.length > 0 ? (
					<Slider {...settings}>
						{recentOrderData &&
							recentOrderData.map((item: any, index: any) => (
								<div
									className={classes.Item}
									key={index}
									onClick={() => handleRecentOrder(item)}
								>
									<img
										src={item?.restaurant_detail?.restaurant_logo || DEFAULT}
										onError={({ currentTarget }) =>
											(currentTarget.src = DEFAULT)
										}
										alt=""
									/>
									<p>{item?.restaurant_detail?.restaurant_name}</p>
								</div>
							))}
					</Slider>
				) : (
					<h2>No Orders have been placed</h2>
				)}
			</div>
		</div>
	);
};

export default RecentOrder;
