import axios from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const errorToastId = "error-toast-id";

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/activities")
      .then((response) => setActivities(response.data))
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (!toast.isActive(errorToastId)) {
          toast.error("Fejl på serveren, prøv igen senere.", {
            toastId: errorToastId,
          });
        }
      });
  }, []);
  return (
    <div className="px-7 bg-primaryBG w-screen pt-8 min-h-screen ">
      <ToastContainer />
      <h1 className="text-primaryHeading text-large mb-5 ml-2">Aktiviteter</h1>
      <div className=" max-h-[80vh] overflow-y-scroll scrollbar-hide">
        {!loading ? (
          activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Activities;
