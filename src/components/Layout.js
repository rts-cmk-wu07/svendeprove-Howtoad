import { NavLink, Outlet } from "react-router-dom";
import { BsHouseDoor } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { GrCalendar } from "react-icons/gr";

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">
            <BsHouseDoor />
          </NavLink>
          <NavLink to="/search">
            <BiSearch />
          </NavLink>
          <NavLink to="/calendar">
            <GrCalendar />
          </NavLink>
          <NavLink to="/activity">activity</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
