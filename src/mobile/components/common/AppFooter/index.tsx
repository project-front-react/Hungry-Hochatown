import React from "react";
import classes from "./appfooter.module.scss";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { BsHandbag } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const AppFooter = () => {
  const pathName = useLocation().pathname;

  return (
    <div className={`${classes.footerWrap}`}>
      <ul className={`${classes.footer}`}>
        <li className={`${classes.footerItem}`}>
          <Link to="/home">
            <a className={`${classes.footerLink}`}>
              {pathName === "/home" && (
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
          <Link to="/category">
            <a className={`${classes.footerLink}`}>
              {pathName === "/category" && (
                <div className={`${classes.footerLinkActive}`}></div>
              )}

              <i>
                <BiCategoryAlt />
              </i>
              <span>Category</span>
            </a>
          </Link>
        </li>
        <li className={`${classes.footerItem}`}>
          <Link to="/search">
            <a className={`${classes.footerLink}`}>
              {pathName === "/search" && (
                <div className={`${classes.footerLinkActive}`}></div>
              )}
              <i>
                <BsSearch />
              </i>
              <span>Search</span>
            </a>
          </Link>
        </li>
        <li className={`${classes.footerItem}`}>
          <Link to="/addtocart">
            <a className={`${classes.footerLink}`}>
              {pathName === "/addtocart" && (
                <div className={`${classes.footerLinkActive}`}></div>
              )}

              <i>
                <BsHandbag />
              </i>
              <span>Cart</span>
            </a>
          </Link>
        </li>
        <li className={`${classes.footerItem}`}>
          <Link to="/profilepage">
            <a className={`${classes.footerLink}`}>
              {pathName === "/profilepage" && (
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

export default AppFooter;
