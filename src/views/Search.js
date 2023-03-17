import axios from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import { BiSearch } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const errorToastId = "error-toast-id";
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/activities")
      .then((response) => setActivities(response.data))
      .catch((error) => {
        console.log(error);
        if (!toast.isActive(errorToastId)) {
          toast.error("Fejl på serveren, prøv igen senere.", {
            toastId: errorToastId,
          });
        }
      });
  }, []);
  const filteredActivities = activities.filter(
    (activity) =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.weekday.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full bg-primaryBG px-7 min-h-screen">
      <ToastContainer />
      <div className="mb-14 pt-8">
        <h1 className="text-large text-primaryHeading mb-3">Søg</h1>
        <div className="relative">
          <input
            type="text"
            className="max-w-[356px] w-full h-12 opacity-30 pl-3"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute right-2 top-3 text-primaryHeading">
            <BiSearch size={24} />
          </div>
        </div>
      </div>
      <div className="pb-10">
        {searchTerm === "" ? null : filteredActivities.length === 0 ? (
          <p className="text-medium text-primaryHeading">
            Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget
            andet.
          </p>
        ) : (
          filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
