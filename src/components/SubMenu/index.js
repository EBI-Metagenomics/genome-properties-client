import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./style.css";

const SubMenu = ({ links = [], location }) => (
  <nav className="vf-navigation vf-navigation--global vf-cluster">
    <ul className="vf-navigation__list | vf-list--inline | vf-cluster__inner">
      {links.map(({ to, label }) => {
        const activeProp =
          location.pathname === to ? { "aria-current": "suppage" } : {};
        return (
          <li className="vf-navigation__item" key={to}>
            <Link className="vf-navigation__link" to={to} {...activeProp}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default withRouter(SubMenu);
