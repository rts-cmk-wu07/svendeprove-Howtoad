import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";
const Activitydetail = () => {
  const [data, setData] = useState();
  const [joined, setJoined] = useState(false);
  const { id } = useParams();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/activities/${id}`
        );
        setData(response.data);
        if (token) {
          setJoined(
            response.data.users.some((user) => user.id === token.userId)
          );
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    fetchData();
  }, [id, token]);

  const userJoin = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      setJoined(true);
    } catch (error) {
      console.error("Error enrolling user:", error);
    }
  };

  const userLeave = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`,
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      setJoined(false);
    } catch (error) {
      console.error("Error removing user from activity:", error);
    }
  };

  return (
    <div className="w-full bg-primaryBG h-screen">
      {data ? (
        <div>
          <div className="relative">
            <img
              src={data.asset.url}
              alt="of activity"
              className="w-[411px] h-[489px] object-cover object-center"
            ></img>
            {token && (
              <button
                className="buttonStyle absolute right-7 bottom-5"
                onClick={joined ? userLeave : userJoin}
              >
                {joined ? "Afmeld" : "Tilmeld"}
              </button>
            )}
          </div>
          <div className="text-secondaryText mx-7 mt-6">
            <h1 className="text-medium leading-6">{data.name}</h1>
            <h2 className="text-small">
              {data.minAge} - {data.maxAge}
            </h2>
            <p className="text-small mb-3">
              {data.weekday} {data.time}
            </p>
            <p className="text-small">{data.description}</p>
          </div>
        </div>
      ) : (
        <p>loading data...</p>
      )}
    </div>
  );
};

export default Activitydetail;
