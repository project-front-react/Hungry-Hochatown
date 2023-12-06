import classes from "./desktopfooter.module.scss";
import LogoImg from "../../../../../assets/images/logo/logo5.svg";
import { useNavigate } from "react-router-dom";

const DesktopFooter = () => {
  const navigate = useNavigate();
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className={classes.FooterSection}>
      <div className={classes.FooterWrap}>
        <div className={classes.FooterImg}>
          <img src={LogoImg} />
        </div>
        <div className={classes.FooterContent}>
          <h1>Hungry in Hochatown </h1>
          <h3>Hochatown, Oklahoma </h3>
          <ul className={classes.FooterLink}>
            <li onClick={() => navigate("/home")}>Home</li>
            <li onClick={() => navigate("/category")}>Category</li>
            <li onClick={() => navigate("/order-history")}>Your Orders</li>
            <li onClick={() => navigate("/contact-us")}>Help Desk </li>
            <li onClick={() => navigate("/about-us")}>About Us </li>
            <li onClick={() => navigate("/terms-and-conditions")}>Terms & Conditions </li>
          </ul>
          <p>@{year}, All right reserved</p>
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
