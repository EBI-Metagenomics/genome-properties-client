import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "@/components/Loading";
import SubMenu from "@/components/SubMenu";

const Hierarchy = lazy(() => import("./Hierarchy"));
const ListByType = lazy(() => import("./ListByType"));

const links = [
  { to: "/browse/hierarchy", label: "Hierarchy" },
  { to: "/browse/pathways", label: "Pathways", type: "PATHWAY" },
  { to: "/browse/metapaths", label: "Metapaths", type: "METAPATH" },
  { to: "/browse/systems", label: "Systems", type: "SYSTEM" },
  { to: "/browse/guilds", label: "Guilds", type: "GUILD" },
  { to: "/browse/complexes", label: "Complexes", type: "COMPLEX" },
  { to: "/browse/categories", label: "Categories", type: "CATEGORY" },
];

const Browse = () => {
  const location = useLocation();
  if (location.pathname === "/browse" || location.pathname === "/browse/") {
    return <Navigate to="/browse/hierarchy" replace />;
  }

  return (
    <>
      <SubMenu links={links} />
      <br />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="hierarchy" element={<Hierarchy />} />
          {links
            .filter((link) => Boolean(link.type))
            .map(({ to, type }) => (
              <Route
                key={to}
                path={to.replace("/browse/", "")}
                element={<ListByType type={type as string} />}
              />
            ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default Browse;
