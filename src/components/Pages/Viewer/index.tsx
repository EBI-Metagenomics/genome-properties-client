import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "../../Loading";
import SubMenu from "../../SubMenu";

const Instructions = lazy(() => import("./Instructions"));
const Species = lazy(() => import("./Species"));
const GenPropViewer = lazy(() => import("./GenPropViewer"));

const links = [
  { to: "/viewer/use", label: "Use" },
  { to: "/viewer/instructions", label: "Instructions" },
  { to: "/viewer/species", label: "Species" },
];

const Viewer = () => {
  const location = useLocation();
  if (location.pathname === "/viewer" || location.pathname === "/viewer/") {
    return <Navigate to="/viewer/use" replace />;
  }

  return (
    <>
      <SubMenu links={links} />
      <br />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="use" element={<GenPropViewer />} />
          <Route path="instructions" element={<Instructions />} />
          <Route path="species" element={<Species />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Viewer;
