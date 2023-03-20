import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import { TokenContext } from "../context/TokenProvider";
import { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const { token, setToken, setTokenCookie } = useContext(TokenContext);
  const location = useLocation();

  const shouldHideNavigation = () => {
    const hideOnPaths = ["/", "/login"];
    return hideOnPaths.includes(location.pathname);
  };
  const handleLogout = () => {
    setToken(null);
    setTokenCookie("", { expires: -1 });
    navigate("/");
  };
  return (
    <>
      <header>
        {!shouldHideNavigation() && <Navigation />}
        {token && (
          <IoIosLogOut
            onClick={handleLogout}
            className="top-2 right-2 cursor-pointer absolute text-white"
            size={32}
          />
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
