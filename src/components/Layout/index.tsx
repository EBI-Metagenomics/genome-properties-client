import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import CookieBanner from "@/components/CookieBanner";
import Loading from "@/components/Loading";
import EBIFooter from "@/components/UI/EBIFooter";
import EBIHeader from "@/components/UI/EBIHeader";
import Header from "@/components/UI/Header";
import "./style.css";

const Home = lazy(() => import("@/pages/Home"));
const Browse = lazy(() => import("@/pages/Browse"));
const Viewer = lazy(() => import("@/pages/Viewer"));
const About = lazy(() => import("@/pages/About"));
const GenomeProperty = lazy(() => import("@/pages/GenomeProperty"));

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
