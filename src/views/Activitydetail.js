import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Activitydetail = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/activities/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };
    fetchData();
  }, [id]);

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
            <button className="buttonStyle absolute right-7 bottom-5">
              Tilmeld
            </button>
          </div>
          <div className="text-secondaryText mx-7 mt-6">
            <h1 className="text-medium leading-6">{data.name}</h1>
            <h2 className="mb-3 text-small">
              {data.minAge} - {data.maxAge}
            </h2>
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
