import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  const location = useLocation();

  const shouldHideNavigation = () => {
    const hideOnPaths = ["/", "/login"];
    return hideOnPaths.includes(location.pathname);
  };

  return (
    <>
      <header>{!shouldHideNavigation() && <Navigation />}</header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
