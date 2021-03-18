import React, { Suspense, lazy } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Loading from "components/Loading";
import SubMenu from "components/SubMenu";

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
      <SubMenu links={links} />
      <br />
      <Suspense fallback={<Loading />}>
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
    </>
  );
};

export default withRouter(Browse);
