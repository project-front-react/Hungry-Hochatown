import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";
import { actionGetAboutUs } from "../../store/actions";
import { RootState } from "../../store/reducers/rootReducers";
import classes from "./aboutusmain.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";

const DeliveryAboutUsMain = (props: any) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionGetAboutUs("about-us"));
	}, []);

	const loader = useSelector(
		(state: RootState) => state.CommonReducer.isLoader
	);

	const cmsData = useSelector(
		(state: RootState) => state.CommonReducer.saveCmsPageData
	);

	const { pathName } = props;

	return (
		<div>
			<div className={classes.AboutUsHeader}>
				<div className={classes.logoWrap}>
					<span onClick={() => window.history.back()}>
						<IoMdArrowRoundBack />
					</span>
					<h1>About Us</h1>
				</div>
				<div className={classes.homeIcon}>
					<Link to={pathName == "/contact-us-d" ? "/home-d" : "/home"}>
						<VscHome />
					</Link>
				</div>
			</div>
			{loader === true ? (
				<LoadingAnimation />
			) : (
				<div className={classes.AboutUsContent}>
					<div className={classes.ContentWrap}>
						<p
							dangerouslySetInnerHTML={{
								__html: cmsData?.description,
							}}
						></p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DeliveryAboutUsMain;
