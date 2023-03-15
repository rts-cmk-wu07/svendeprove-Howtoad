import CalendarList from "../template/CalendarList";

const Calendar = () => {
  return (
    <div className="w-full bg-primaryBG h-screen px-7 pt-8">
      <div>
        <h1 className="text-large text-primaryHeading mb-7">Kalender</h1>
      </div>
      <CalendarList />
    </div>
  );
};

export default Calendar;
