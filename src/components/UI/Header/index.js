import React from "react";
import NavigationMenu from "../NavigationMenu";
import { Link } from "react-router-dom";

import GPLogo from "../../../images/GP_logo.png";
import background from "../../../images/background.png";
import "./style.css";

const Header = () => (
  <div className="main-header">
    <div
      className="vf-masthead vf-masthead--with-title-block vf-masthead--has-image vf-u-fullbleed"
      style={{
        "--vf-masthead__bg-image": `url(${background})`,
        "--vf-masthead__color--background-default": `dodgerblue`,
        backgroundImage: `linear-gradient(
            to right, 
            rgba(0, 85, 158, 0.9), 
            rgba(45, 174, 193, 0.5), 
            rgba(0, 85, 158, 0.9) 
          ), var(--vf-masthead__bg-image)`,
      }}
      data-vf-js-masthead=""
    >
      <div className="vf-masthead__title">
        <h1 className="vf-masthead__heading">
          <Link
            className="vf-masthead__heading__link"
            to={`/`}
            title="Back to Genome Properties homepage"
          >
            <img src={GPLogo} width=" 60px" alt="GP Logo" /> Genome Properties
          </Link>
        </h1>
      </div>
    </div>
    <NavigationMenu />
  </div>
);

export default Header;
