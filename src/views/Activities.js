import axios from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/activities")
      .then((response) => setActivities(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="px-7 bg-primaryBG w-screen pt-8 ">
      <h1 className="text-primaryHeading text-large mb-5 ml-2">Aktiviteter</h1>
      <div className="pb-10">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activities;
