import classes from "./homemainwrapdesktop.module.scss";
import Logo from "../../../../assets/images/logo/logo4.png";
import { BsSearch } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import HomeImg from "../../../../assets/images/product/m2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	actiongetCartDetailApiCall,
	actionLogoutApiCall,
	actionPostRecentSearchApiCall,
	actionSearchByRestaurantApiCall,
} from "../../../../mobile/store/actions";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../mobile/store/reducers/rootReducers";
import DesktopLayout from "../common/DesktopLayout";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const HomeMainWrapDesktop = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const pathName = useLocation().pathname;
	const [search, setSearch] = useState<string>();
	const state = useSelector(
		(state: RootState) => state.CommonReducer.saveLoginUserDetails
	);

	const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (search && event.key === "Enter") {
			onSearch();
		}
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSearch(newValue);
	};
	const onSearch = () => {
		let searchData = {
			userId: state.id,
			keyword: search,
		};
		if (search) {
			let data = {
				search: search,
			};
			let body = { data, navigate };
			dispatch(actionSearchByRestaurantApiCall(body));
			dispatch(actionPostRecentSearchApiCall(searchData));
		}
	};
	const [show, setShow] = useState(false);
	const cartData = useSelector(
		(state: RootState) => state.CartReducer.cartData
	);
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked(!clicked);
		setShow(false);
	};
	return (
		<div className={classes.HomeMainWrap}>
			<div className={classes.NavWrap}>
				<div className={classes.LeftSide}>
					<div className={classes.LogoWrap} onClick={() => navigate("/home")}>
						<img src={Logo} />
					</div>
				</div>
				<div className={classes.RightSide}>
					<nav className={classes.NavLinks}>
						<ul
							className={
								clicked
									? `${classes.menu_list}`
									: `${classes.menu_list} ${classes.close}`
							}
						>
							<li
								className={pathName == "/home" ? classes.active : ""}
								onClick={() => navigate("/home")}
							>
								Home
							</li>
							<li
								className={pathName == "/category" ? classes.active : ""}
								onClick={() => navigate("/category")}
							>
								Category
							</li>
							<li
								className={pathName == "/order-history" ? classes.active : ""}
								onClick={() => navigate("/order-history")}
							>
								Your Orders
							</li>
						</ul>
						<ul className={classes.MenuIcon}>
							<li>
								<div className={classes.ToggleWrapper}>
								{show == false ? (
									<IoPersonOutline
										onClick={() => {
											setShow(!show);
											setClicked(false);
										}}
									/>
								) : (
									<IoPerson
										onClick={() => {
											setShow(!show);
											setClicked(false);
										}}
									/>
								)}									 
									{show && (
										<div className={classes.ToggleList}>
											<div
												className={classes.ListItem}
												onClick={() => navigate("/edit-profile")}
											>
												Edit Profile
											</div>
											<div
												className={classes.ListItem}
												onClick={() => navigate("/notification")}
											>
												Notification
											</div>
											<div
												className={classes.ListItem}
												onClick={() => navigate("/change-your-password")}
											>
												Change Password
											</div>
											<div
												className={classes.ListItem}
												onClick={() => navigate("/contact-us")}
											>
												Help Desk
											</div>
											<div
												className={classes.ListItem}
												onClick={() => {
													let data = {
														userId: state.id,
														cartDetail: [{ userId: state.id, data: [] }],
													};
													let data1 = { data, navigate: "" };
													let body = { navigate, data: data1, dispatch };
													// dispatch(actionpostCartDetailApiCall(data))
													dispatch(actionLogoutApiCall(body));
													dispatch(actiongetCartDetailApiCall(state.id));
												}}
											>
												Sign Out
											</div>
										</div>
									)}
								</div>
							</li>
							<li onClick={() => navigate("/addtocart")}>
								<BsHandbag />
								{cartData.length > 0 && (
									<div className={classes.CartItemNumber}>
										{cartData.length}
									</div>
								)}
							</li>
							<li className={classes.menu_icon} onClick={handleClick}>
								{clicked ? <GrClose /> : <GiHamburgerMenu />}
							</li>
						</ul>
					</nav>
				</div>
			</div>

			<div className={classes.HomeWrap}>
				<div className={classes.TitleSide}>
					<h1>
						Discover the best food & <br />
						drinks in <span>Hochatown</span>
					</h1>
					<div className={classes.SearchBox}>
						<BsSearch
							onClick={() => {
								onSearch();
							}}
						/>
						<input
							className="form-control"
							type="search"
							placeholder=" Search For Restaurant or Category..."
							onChange={handleChange}
							onKeyPress={onKeyPress}
						/>
					</div>
				</div>
				<div className={classes.ImageSide}>
					<div className={classes.HomeImgWrap}>
						<img src={HomeImg} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeMainWrapDesktop;
