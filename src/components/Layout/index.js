import React, { Suspense, lazy } from "react";
import EBIHeader from "../UI/EBIHeader";
import EBIFooter from "../UI/EBIFooter";
import Header from "../UI/Header";
import { Route, Switch, withRouter } from "react-router-dom";

const Home = lazy(() => import("../Pages/Home"));
const Browse = lazy(() => import("../Pages/Browse"));
const Viewer = lazy(() => import("../Pages/Viewer"));
const About = lazy(() => import("../Pages/About"));
const GenomeProperty = lazy(() => import("../Pages/GenomeProperty"));

const Layout = () => {
  return (
    <>
      <EBIHeader />
      <Header />
      <section className="vf-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={`/`} exact={true} component={Home} />
            <Route path={`/viewer`} exact={true} component={Viewer} />
            <Route path={`/browse`} component={Browse} />
            <Route path={`/about`} exact={true} component={About} />
            <Route
              path={`/genome-property/:accession`}
              exact={true}
              component={GenomeProperty}
            />
          </Switch>
        </Suspense>
      </section>
      <EBIFooter />
    </>
  );
};

export default withRouter(Layout);
