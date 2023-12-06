import React from "react";
import classes from "./deliveryfooter.module.scss"
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const DeliveryFooter = () => {
  const pathName = useLocation().pathname;

  return (
    <div className={`${classes.footerWrap}`}>
      <ul className={`${classes.footer}`}>
        <li className={`${classes.footerItem}`}>
          <Link to="/home-d">
            <a className={`${classes.footerLink}`}>
              {pathName === "/home-d" && (
                <div className={`${classes.footerLinkActive}`}></div>
              )}
              <i>
                <IoHomeOutline />
              </i>
              <span>Home</span>
            </a>
          </Link>
        </li>    
        <li className={`${classes.footerItem}`}>
          <Link to="/profile-d">
            <a className={`${classes.footerLink}`}>
              {pathName === "/profile-d" && (
                <div className={`${classes.footerLinkActive}`}></div>
              )}
              <i>
                <IoPersonOutline />
              </i>
              <span>Profile</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryFooter;
