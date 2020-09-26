import React, { useEffect, useState } from "react";
import {
  getTimeDifference,
  getFormattedDate,
  getFormattedTime,
} from "../helpers/time";
import { Pin } from "../types/interfaces";

interface LiveTimeProps {
  pin: Pin;
}

const LiveTime = ({ pin }: LiveTimeProps) => {
  const [remainingTime, setRemainingTime] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      let res = "Event has ended.";
      if (now < pin.startDate)
        res = `Time before event start : ${getTimeDifference(
          now,
          pin.startDate
        )}`;
      else if (now > pin.startDate && now < pin.endDate)
        res = `Time before event end : ${getTimeDifference(now, pin.endDate)}`;
      setRemainingTime(res);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <p>
        Starts at :
        {" " +
          getFormattedDate(pin.startDate) +
          " " +
          getFormattedTime(pin.startDate)}
      </p>
      <p>
        Ends at :
        {" " +
          getFormattedDate(pin.endDate) +
          " " +
          getFormattedTime(pin.endDate)}
      </p>
      <p>
        Now :
        {" " +
          getFormattedDate(new Date().toISOString()) +
          " " +
          getFormattedTime(new Date().toISOString())}
      </p>
      <p>{remainingTime}</p>
    </>
  );
};

export default LiveTime;
