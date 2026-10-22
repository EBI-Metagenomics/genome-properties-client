import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import CookieBanner from "../CookieBanner";
import Loading from "../Loading";
import EBIFooter from "../UI/EBIFooter";
import EBIHeader from "../UI/EBIHeader";
import Header from "../UI/Header";
import "./style.css";

const Home = lazy(() => import("../Pages/Home"));
const Browse = lazy(() => import("../Pages/Browse"));
const Viewer = lazy(() => import("../Pages/Viewer"));
const About = lazy(() => import("../Pages/About"));
const GenomeProperty = lazy(() => import("../Pages/GenomeProperty"));

const Layout = () => (
  <>
    <div>
      <EBIHeader />
      <Header />
      <section className="vf-content main-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewer/*" element={<Viewer />} />
            <Route path="/browse/*" element={<Browse />} />
            <Route path="/about/*" element={<About />} />
            <Route path="/genome-property/:accession" element={<GenomeProperty />} />
          </Routes>
        </Suspense>
      </section>
      <EBIFooter />
    </div>
    <CookieBanner />
  </>
);

export default Layout;
