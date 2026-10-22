import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "../../Loading";
import SubMenu from "../../SubMenu";

const AboutGenomeProperties = lazy(() => import("./Tabs/AboutGenomeProperties"));
const Calculating = lazy(() => import("./Tabs/Calculating"));
const Funding = lazy(() => import("./Tabs/Funding"));
const Contributing = lazy(() => import("./Tabs/Contributing"));
const Documentation = lazy(() => import("./Tabs/Documentation"));
const Contact = lazy(() => import("./Tabs/Contact"));
const ReleaseNotes = lazy(() => import("./Tabs/ReleaseNotes"));

const links = [
  { to: "/about/about", label: "About" },
  { to: "/about/calculating", label: "Calculating" },
  { to: "/about/funding", label: "Funding" },
  { to: "/about/contributing", label: "Contributing" },
  { to: "/about/documentation", label: "Help & Documentation" },
  { to: "/about/contact", label: "Contact" },
  { to: "/about/release_notes", label: "Release notes" },
];

const About = () => {
  const location = useLocation();
  if (location.pathname === "/about" || location.pathname === "/about/") {
    return <Navigate to="/about/about" replace />;
  }

  return (
    <>
      <SubMenu links={links} />
      <br />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="about" element={<AboutGenomeProperties />} />
          <Route path="calculating" element={<Calculating />} />
          <Route path="funding" element={<Funding />} />
          <Route path="contributing" element={<Contributing />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="release_notes" element={<ReleaseNotes />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default About;
