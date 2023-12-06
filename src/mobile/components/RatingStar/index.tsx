import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import { actionRatingApiCall, actionRatingCount } from "../../store/actions";
import { RootState } from "../../store/reducers/rootReducers";
import CustomRating from "../common/CustomRating";
import classes from "./rating.module.scss";

export function MyComponent(props: any) {
	const [ratingCount, setRatingCount] = useState(1);
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const dispatch = useDispatch();
	const state = useSelector(
		(state: RootState) => state.CommonReducer.saveLoginUserDetails
	);
	const ratingData = useSelector(
		(state: RootState) => state.CommonReducer.saveRating
	);
	const handleRating = (rate: number) => {
		setRating(rate);
	};
	const onPointerMove = (value: number) => setRating(value);
	const handleReset = () => {
		setRating(0);
		props.close();
		props.setCount();
	};
	const handleAdd = () => {
		if(rating > 0) {
			if (rating > 0) {
				let data = {
					rating: rating,
					userId: state.id,
					restaurantId: ratingData?.restaurant_id,
					cartOrderId: ratingData?.id,
				};
				let page = { pageNo: props.page };
				let body = { data, page };
				dispatch(actionRatingApiCall(body));
				props.close();
				setRatingCount(ratingCount + 1);
			}
			dispatch(actionRatingCount(ratingCount));
			props.setCount();
		}else{
			toast.error("Please provide rating for your order")
		}
		
	};

	return (
		<div className={classes.RtingMain}>
			<div className={classes.headerContent}>
				<h5>Add Rating</h5>
			</div>
			{/* <Rating
				onClick={handleRating}
				onPointerMove={onPointerMove}
				initialValue={rating}
			/> */}
			{/* <CustomRating/> */}

			<div className={classes.starrating}>
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={index <= (hover || rating) ? classes.on : classes.off}
						onClick={() => setRating(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>

			<div className={classes.btnContent}>
				<div className={classes.btnGroup}>
					<button onClick={handleReset}>Close</button>
					<button onClick={handleAdd}>Add</button>
				</div>
			</div>
		</div>
	);
}
