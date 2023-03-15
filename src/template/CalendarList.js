import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";
import { Link } from "react-router-dom";
const CalendarList = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(TokenContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token.role === "instructor") {
          const response = await axios.get(
            "http://localhost:4000/api/v1/activities",
            {
              headers: { Authorization: `Bearer ${token.token}` },
            }
          );

          const instructorActivities = response.data.filter(
            (activity) => activity.instructorId === token.userId
          );

          setUserData({ ...userData, activities: instructorActivities });
        } else {
          const response = await axios.get(
            `http://localhost:4000/api/v1/users/${token.userId}`,
            {
              headers: { Authorization: `Bearer ${token.token}` },
            }
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, userData]);
  return (
    <div>
      {userData ? (
        <div>
          {userData.activities.map((activity) => (
            <Link
              to={
                token.role === "default"
                  ? `/activitydetail/${activity.id}`
                  : `/activity/${activity.id}`
              }
            >
              <div className="max-w-[356px] h-[107px] w-full bg-primaryHeading px-8 rounded-[11px] pt-2 mb-7">
                <h2 key={activity.id} className="text-large w-[300px] truncate">
                  {activity.name}
                </h2>
                <p>
                  {activity.weekday} {activity.time}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-medium text-primaryHeading">Kalender tom</p>
      )}
    </div>
  );
};

export default CalendarList;
