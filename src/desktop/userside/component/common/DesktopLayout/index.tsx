import React from "react";
import classes from "./desktoplayout.module.scss";

const DesktopLayout = ({ children}: any) => {
	return (
		<React.Fragment>
			<div className={classes.DesktopLayout}>{children}</div>
		</React.Fragment>
	);
};

export default DesktopLayout;
