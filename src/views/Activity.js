import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Activity = () => {
  const [activityData, setActivityData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/activities/${id}`
        );
        setActivityData(response.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full bg-primaryBG h-screen px-7">
      <div className="pt-8">
        {activityData ? (
          <div>
            <h1 className="text-large text-primaryHeading mb-4">
              {activityData.name}
            </h1>
            <ul>
              {activityData.users.map((user) => (
                <li key={user.id} className="text-small text-secondaryText">
                  {user.firstname} {user.lastname}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading activity data...</p>
        )}
      </div>
    </div>
  );
};

export default Activity;
