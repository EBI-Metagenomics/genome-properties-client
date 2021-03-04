import React, { Suspense, lazy } from "react";
import { Link, withRouter, Route, Switch, Redirect } from "react-router-dom";

const Hierarchy = lazy(() => import("./Hierarchy"));
const ListByType = lazy(() => import("./ListByType"));

const Browse = ({ location }) => {
  if (location.pathname === "/browse")
    return <Redirect to="/browse/hierarchy" />;
  const links = [
    { to: "/browse/hierarchy", label: "Hierarchy" },
    { to: "/browse/pathways", label: "Pathways", type: "PATHWAY" },
    { to: "/browse/metapaths", label: "Metapaths", type: "METAPATH" },
    { to: "/browse/systems", label: "Systems", type: "SYSTEM" },
    { to: "/browse/guilds", label: "Guilds", type: "GUILD" },
    { to: "/browse/complexes", label: "Complexes", type: "COMPLEX" },
    { to: "/browse/categories", label: "Categories", type: "CATEGORY" },
  ];
  return (
    <>
      <nav className="vf-navigation vf-navigation--global vf-cluster">
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
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/browse/hierarchy" exact={true} component={Hierarchy} />
          {links
            .filter(({ type }) => !!type)
            .map(({ to, type }) => (
              <Route
                key={to}
                path={to}
                exact={true}
                component={() => <ListByType type={type} />}
              />
            ))}
        </Switch>
      </Suspense>
      {/* <div className="tabs-content" data-tabs-content="browse-tabs">
        <div className="tabs-panel is-active" id="hierarchy">
          <Hierarchy />
        </div>
        <div className="tabs-panel" id="pathways">
          <ListByType type="PATHWAY" />
        </div>
        <div className="tabs-panel" id="metapaths">
          <ListByType type="METAPATH" />
        </div>
        <div className="tabs-panel" id="systems">
          <ListByType type="SYSTEM" />
        </div>
        <div className="tabs-panel" id="guilds">
          <ListByType type="GUILD" />
        </div>
        <div className="tabs-panel" id="complexes">
          <ListByType type="COMPLEX" />
        </div>
        <div className="tabs-panel" id="categories">
          <ListByType type="CATEGORY" />
        </div>
      </div> */}
    </>
  );
};

export default withRouter(Browse);
