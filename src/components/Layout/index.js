import React, { Suspense, lazy } from "react";
import EBIHeader from "../UI/EBIHeader";
import EBIFooter from "../UI/EBIFooter";
import Header from "../UI/Header";
import { Route, Switch, withRouter } from "react-router-dom";
import Loading from "components/Loading";
import CookieBanner from "components/CookieBanner";

import "./style.css";
const Home = lazy(() => import("../Pages/Home"));
const Browse = lazy(() => import("../Pages/Browse"));
const Viewer = lazy(() => import("../Pages/Viewer"));
const About = lazy(() => import("../Pages/About"));
const GenomeProperty = lazy(() => import("../Pages/GenomeProperty"));

const Layout = () => {
  return (
    <>
      <div>
        <EBIHeader />
        <Header />
        <section className="vf-content main-content">
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path={`/`} exact={true} component={Home} />
              <Route path={`/viewer`} component={Viewer} />
              <Route path={`/browse`} component={Browse} />
              <Route path={`/about`} component={About} />
              <Route
                path={`/genome-property/:accession`}
                exact={true}
                component={GenomeProperty}
              />
            </Switch>
          </Suspense>
        </section>
        <EBIFooter />
      </div>
      <CookieBanner />
    </>
  );
};

export default withRouter(Layout);
