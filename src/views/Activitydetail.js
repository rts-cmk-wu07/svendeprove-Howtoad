import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Activitydetail = () => {
  const [data, setData] = useState();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { token } = useContext(TokenContext);
  const errorToastId = "error-toast-id";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/activities/${id}`
        );
        setData(response.data);
        setLoading(false);
        if (token) {
          setJoined(
            response.data.users.some((user) => user.id === token.userId)
          );
        }
        console.log(response.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching activity data:", error);
        if (!toast.isActive(errorToastId)) {
          toast.error("Fejl på serveren, prøv igen senere", {
            toastId: errorToastId,
          });
        }
      }
    };
    fetchData();
  }, [id, token]);

  const userJoin = async () => {
    try {
      const userResponse = await axios.get(
        `http://localhost:4000/api/v1/users/${token.userId}`,
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      const userAge = userResponse.data.age;

      if (userAge >= data.minAge && userAge <= data.maxAge) {
        await axios.post(
          `http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token.token}` },
          }
        );
        setJoined(true);
        toast.success(`Vi ses på ${data.weekday}!`);
      } else {
        toast.error("Din alder er udenfor aldersgrænsen for denne aktivitet");
      }
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
      toast.warn("Du er nu afmeldt");
    } catch (error) {
      console.error("Error removing user from activity:", error);
    }
  };
  const getDayOfWeek = () => {
    const weekdays = [
      "søndag",
      "mandag",
      "tirsdag",
      "onsdag",
      "torsdag",
      "fredag",
      "lørdag",
    ];
    const today = new Date();
    return weekdays[today.getDay()];
  };
  const dayError = () => {
    toast.error(
      "Du kan ikke tilmelde dig en klasse på samme dag den tager sted"
    );
  };

  return (
    <div className="w-full bg-primaryBG h-screen">
      <ToastContainer />
      {!loading && data ? (
        <div>
          <div className="relative">
            <img
              src={data.asset.url}
              alt="of activity"
              className="w-[411px] h-[489px] object-cover object-center"
            ></img>
            {token && token.role === "default" && (
              <>
                {data.weekday && (
                  <button
                    className={`buttonStyle absolute right-7 bottom-5`}
                    onClick={
                      joined
                        ? userLeave
                        : data.weekday === getDayOfWeek()
                        ? dayError
                        : userJoin
                    }
                  >
                    {joined ? "Forlad" : "Tilmeld"}
                  </button>
                )}
              </>
            )}
          </div>
          <div className="text-secondaryText mx-7 mt-6">
            <h1 className="text-medium leading-6">{data.name}</h1>
            <h2 className="text-small">
              {data.minAge} - {data.maxAge} år
            </h2>
            <p className="text-small mb-3">
              {data.weekday} {data.time}
            </p>
            <p className="text-small">{data.description}</p>
          </div>
        </div>
      ) : loading ? (
        <p>loading data...</p>
      ) : (
        <p className="text-primaryHeading text-large">
          Der opstod en fejl på serveren, prøv igen senere
        </p>
      )}
    </div>
  );
};

export default Activitydetail;
