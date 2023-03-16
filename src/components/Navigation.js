import { BsHouseDoor } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { GrCalendar, GrLogin } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { TokenContext } from "../context/TokenProvider";
import { useContext } from "react";

const Navigation = () => {
  const { token } = useContext(TokenContext);
  return (
    <>
      <nav className="z-10 flex fixed w-screen justify-between items-center px-7  bottom-0 bg-secondaryBG h-14">
        <div className="flex items-center justify-center rounded-full border border-black p-1 w-[41px] h-[41px]">
          <NavLink to="/aktiviteter">
            <BsHouseDoor size={24} />
          </NavLink>
        </div>
        <div className="flex items-center justify-center rounded-full border border-black p-1 w-[41px] h-[41px]">
          <NavLink to="/søg">
            <BiSearch size={24} />
          </NavLink>
        </div>
        <div className="flex items-center justify-center rounded-full border border-black p-1 w-[41px] h-[41px]">
          <NavLink to={token ? "/kalender" : "/login"}>
            {token ? <GrCalendar size={24} /> : <GrLogin size={24} />}
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
