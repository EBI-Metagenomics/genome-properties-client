import React from "react";
import { Link, withRouter } from "react-router-dom";

const NavigationMenu = ({ location }) => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/browse", label: "Browse" },
    { to: "/viewer", label: "Viewer" },
    { to: "/about", label: "About" },
  ];
  return (
    <nav className="vf-navigation vf-navigation--main vf-cluster">
      <ul className="vf-navigation__list | vf-list--inline | vf-cluster__inner">
        {links.map(({ to, label }) => {
          const activeProp =
            location.pathname === to ? { "aria-current": "page" } : {};
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
};

export default withRouter(NavigationMenu);
