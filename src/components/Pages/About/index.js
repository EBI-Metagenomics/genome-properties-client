import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import SubMenu from "components/SubMenu";
import Loading from "components/Loading";

const AboutGenomeProperties = lazy(() =>
  import("./Tabs/AboutGenomeProperties")
);
const Calculating = lazy(() => import("./Tabs/Calculating"));
const Funding = lazy(() => import("./Tabs/Funding"));
const Contributing = lazy(() => import("./Tabs/Contributing"));
const Documentation = lazy(() => import("./Tabs/Documentation"));
const Contact = lazy(() => import("./Tabs/Contact"));
const ReleaseNotes = lazy(() => import("./Tabs/ReleaseNotes"));

const About = ({ location }) => {
  if (location.pathname === "/about") return <Redirect to="/about/about" />;
  const links = [
    { to: "/about/about", label: "About" },
    { to: "/about/calculating", label: "Calculating" },
    { to: "/about/funding", label: "Funding" },
    { to: "/about/contributing", label: "Contributing" },
    { to: "/about/documentation", label: "Help & Documentation" },
    { to: "/about/contact", label: "Contact" },
    { to: "/about/release_notes", label: "Release notes" },
  ];
  return (
    <>
      <SubMenu links={links} />
      <br />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route
            path="/about/about"
            exact={true}
            component={AboutGenomeProperties}
          />
          <Route
            path="/about/calculating"
            exact={true}
            component={Calculating}
          />
          <Route path="/about/funding" exact={true} component={Funding} />
          <Route
            path="/about/contributing"
            exact={true}
            component={Contributing}
          />
          <Route
            path="/about/documentation"
            exact={true}
            component={Documentation}
          />
          <Route path="/about/contact" exact={true} component={Contact} />
          <Route
            path="/about/release_notes"
            exact={true}
            component={ReleaseNotes}
          />
        </Switch>
      </Suspense>
    </>
  );
};

export default withRouter(About);
