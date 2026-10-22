import { Link, useLocation } from "react-router-dom";
import "./style.css";

type SubMenuLink = {
  to: string;
  label: string;
  type?: string;
};

const SubMenu = ({ links = [] }: { links?: SubMenuLink[] }) => {
  const location = useLocation();
  return (
    <nav className="vf-navigation vf-navigation--global vf-cluster">
      <ul className="vf-navigation__list | vf-list--inline | vf-cluster__inner">
        {links.map(({ to, label }) => {
          const activeProp =
            location.pathname === to ? { "aria-current": "page" as const } : {};
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

export default SubMenu;
