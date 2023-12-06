import { useState } from "react";
import classes from"./customrating.module.scss";
const CustomRating = () => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	return (
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
	);
};

export default CustomRating;
