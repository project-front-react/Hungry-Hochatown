import React, { useEffect } from "react";
import classes from "./termandconditionsmain.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducers";
import { actionGetAboutUs } from "../../store/actions";
import LoadingAnimation from "../../../pages/AnimationLoader/LoadingAnimation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscHome } from "react-icons/vsc";
import { Link } from "react-router-dom";

const TermsAndConditionsMain = (props: any) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionGetAboutUs("privacy-policy"));
	}, []);

	const loader = useSelector(
		(state: RootState) => state.CommonReducer.isLoader
	);

	const cmsData = useSelector(
		(state: RootState) => state.CommonReducer.saveCmsPageData
	);
	const { pathName } = props;

	return (
		<>
			<div className={classes.TermsAndConditionsHeader}>
				<div className={classes.logoWrap}>
					<span onClick={() => window.history.back()}>
						<IoMdArrowRoundBack />
					</span>
					<h1>Privacy Notice</h1>
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
				<div className={classes.TermsAndConditionsContent}>
					<div className={classes.ContentWrap}>
						<div
							className={classes.TextWrap}
							dangerouslySetInnerHTML={{
								__html: cmsData?.description,
							}}
						></div>
					</div>
				</div>
			)}
		</>
	);
};

export default TermsAndConditionsMain;
