import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";
const CalendarList = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useContext(TokenContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/${token.userId}`,
          {
            headers: { Authorization: `Bearer ${token.token}` },
          }
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);
  return (
    <div>
      {userData ? (
        <div>
          {userData.activities.map((activity) => (
            <div className="max-w-[356px] h-[107px] w-full bg-primaryHeading px-8 rounded-[11px] pt-2">
              <h2 key={activity.id} className="text-large w-[300px] truncate">
                {activity.name}
              </h2>
              <p>
                {activity.weekday} {activity.time}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default CalendarList;
