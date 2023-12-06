import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionGetAboutUs } from "../../../../mobile/store/actions";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";
import DesktopLayout from "../common/DesktopLayout";
import classes from "./aboutusdesktop.module.scss";

const AboutUsDesktop = () => {
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

	return (
		<DesktopLayout>
			<div className={classes.AboutUsMain}>
				<div className={classes.TitleWrap}>
					<h1>ABOUT US</h1>
				</div>
				{loader === true ? (
					<LoadingAnimation />
				) : (
					<div className={classes.ContentWrap}>
						<p
							dangerouslySetInnerHTML={{
								__html: cmsData?.description,
							}}
						></p>
					</div>
				)}
			</div>
		</DesktopLayout>
	);
};

export default AboutUsDesktop;
