import React, { useEffect, useState } from "react";
import DesktopLayout from "../../component/common/DesktopLayout";
import classes from "./categorydesktop.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import {
	actionGetAllCategory,
	actionGetRestroForCategory,
	actionRestaurantDetailApiCall,
} from "../../../../mobile/store/actions";
import DEFAULT from "../../../../assets/images/default-img.png";
import { useLocation, useNavigate } from "react-router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { animateScroll as scroll } from "react-scroll";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

type mapItem = {
	image: any;
	category_name: string;
	id: number;
};
const CategoryDesktop = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [leftSideCategory, setleftSideCategory] = useState<any>([]);

	useEffect(() => {
		dispatch(actionGetAllCategory());
	}, []);

	const allCategoryData = useSelector(
		(state: RootState) => state.CommonReducer.saveAllCategoryData
	);

	const loader = useSelector((state: any) => state.CommonReducer.isLoader);

	const [active, setActive] = useState(
		allCategoryData && allCategoryData[0]?.id
	);

	useEffect(() => {
		setleftSideCategory(allCategoryData);
	}, [allCategoryData]);

	const handleCategoryId = (item: number) => {
		setActive(item);
		dispatch(actionGetRestroForCategory(item));
	};

	const rightSideCategory = useSelector(
		(state: any) => state.CommonReducer.saveRestroForCategories
	);

	useEffect(() => {
		if (location?.state?.id) {
			dispatch(actionGetRestroForCategory(location.state.id));
		} else {
			dispatch(actionGetRestroForCategory(1));
		}
	}, [location.state]);

	const onDivClick = (data: string) => {
		const path = `restaurant_slug=${data}`;
		const title = data;
		const body = { path, navigate, title };
		dispatch(actionRestaurantDetailApiCall(body));
	};
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};
	scroll.scrollToTop({
		duration: 0,
		smooth: "easeInOutQuint",
	});


	return (
		<DesktopLayout>
			<div className={`${classes.CategorySection} mb-xxl`}>
				<h1>Eat what makes you happy</h1>
				<div className={classes.TabSpart}>
					<Carousel responsive={responsive} draggable={false}>
						{leftSideCategory?.map((item: mapItem) => (
							<div
								className={
									item?.id == active ? classes.tabList : classes.tabListInactive
								}
								onClick={() => handleCategoryId(item.id)}
							>
								<div className={classes.ImageWrap}>
									<img src={item.image || DEFAULT} />
								</div>
								<div className={classes.navLink}>{item.category_name}</div>
							</div>
						))}
					</Carousel>
				</div>
				{loader === true ? (
					<LoadingAnimation />
				) : rightSideCategory?.data?.length > 0 ? (
					<div className={classes.RestocategoryParent}>
						{rightSideCategory?.data?.map((item: any) => (
							<div
								className={classes.ItemMain}
								onClick={() => onDivClick(item.slug)}
							>
								<div className={classes.ImgWrap}>
									<img src={item.restaurant_logo || DEFAULT} />
								</div>
								<h4>{item.restaurant_name}</h4>
							</div>
						))}
					</div>
				) : (
					<h2>No Restaurant Found</h2>
				)}
			</div>			
		</DesktopLayout>
	);
};

export default CategoryDesktop;
