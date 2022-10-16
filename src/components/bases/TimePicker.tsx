import padNumberLeft from "../../utils/padNumberLeft";

interface TimePickerProps {
  time: { minutes: number; hours: number };
  setTime: (minutes: number, hours: number) => void;
}

const TimePicker = ({ time, setTime }: TimePickerProps) => {
  const onMinutesChange = (m: string) => {
    const parsedMinutes = parseInt(m);

    if (isNaN(parsedMinutes)) return;

    if (parsedMinutes >= 0 && parsedMinutes <= 59) {
      setTime(parsedMinutes, time["hours"]);
    }
  };

  const onHoursChange = (h: string) => {
    const parsedHours = parseInt(h);

    if (isNaN(parsedHours)) return;

    if (parsedHours >= 0 && parsedHours <= 23) {
      setTime(time["minutes"], parsedHours);
    }
  };

  return (
    <div className="flex h-min flex-shrink items-center rounded-md border border-gray-300 p-2 shadow-sm">
      <input
        aria-label="hours"
        className="w-[18px] focus:outline-none"
        value={padNumberLeft(time["hours"])}
        onClick={(e) => e.currentTarget.select()}
        onChange={(e) => onHoursChange(e.target.value)}
      />
      <p>:</p>
      <input
        aria-label="minutes"
        value={padNumberLeft(time["minutes"])}
        className="w-[18px] focus:outline-none"
        onClick={(e) => e.currentTarget.select()}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
    </div>
  );
};

export default TimePicker;
