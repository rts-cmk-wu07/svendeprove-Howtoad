import { BsHouseDoor } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { GrCalendar } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav className="flex w-screen justify-between items-center px-7 absolute bottom-0 bg-secondaryBG h-14">
        <div className="flex items-center justify-center rounded-full border border-black p-1 w-[41px] h-[41px]">
          <NavLink to="/">
            <BsHouseDoor size={24} />
          </NavLink>
        </div>
        <div className="flex items-center justify-center rounded-full border border-black p-1 w-[41px] h-[41px]">
          <NavLink to="/search">
            <BiSearch size={24} />
          </NavLink>
        </div>
        <div className="flex items-center justify-center rounded-full border border-black p-1 w-[41px] h-[41px]">
          <NavLink to="/calendar">
            <GrCalendar size={24} />
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
