import React from "react";
import NavigationMenu from "../NavigationMenu";
import { Link } from "react-router-dom";

import GPLogo from "../../../images/GP_logo.png";
import "./style.css";

const Header = () => (
  <div id="masthead" className="masthead">
    <div className="masthead-inner row">
      <div className="columns medium-12" id="local-title">
        <h1 className="main-title">
          <img src={GPLogo} width=" 60px" alt="GP Logo" />{" "}
          <Link
            className="link"
            to={`${process.env.PUBLIC_URL}/`}
            title="Back to Genome Properties homepage"
          >
            Genome Properties
          </Link>
        </h1>
      </div>
      <NavigationMenu />
    </div>
  </div>
);

export default Header;
