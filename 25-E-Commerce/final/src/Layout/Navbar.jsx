import React from "react";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../utils/constants";
import { CartButtons } from "../Components";
import { useProductContext } from "../utils/context/products_context";
import { useUserContext } from "../utils/context/user_context";

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Comfy Sloth" />
          </Link>
          <button className="nav-toggle" type="button">
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, url, text } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
        <CartButtons />
      </div>
    </nav>
  );
};

export default NavBar;
