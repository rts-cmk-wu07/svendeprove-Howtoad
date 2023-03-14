const ActivityCard = ({ activity }) => {
  return (
    <div className="relative mb-8">
      <img
        src={activity.asset.url}
        className="max-w-[356px] rounded-[39px] rounded-br-none"
      ></img>
      <div className="pt-5 pl-6 text-small bg-cardBG rounded-bl-[39px] rounded-tr-[39px] h-[28%] absolute bottom-0 w-full">
        <p>{activity.name}</p>
        <p>
          {activity.minAge} - {activity.maxAge}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
