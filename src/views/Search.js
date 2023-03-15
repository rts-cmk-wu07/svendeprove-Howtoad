import axios from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/activities")
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="w-full bg-primaryBG px-7">
      <div className="mb-14 pt-8">
        <h1 className="text-large text-primaryHeading mb-3">Søg</h1>
        <div className="relative">
          <input
            type="text"
            className="max-w-[356px] w-full h-12 opacity-30 pl-3"
          />
          <div className="absolute right-2 top-3 text-primaryHeading">
            <BiSearch size={24} />
          </div>
        </div>
      </div>
      <div className="pb-10">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Search;
