"use client";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const ServerTime = () => {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [serverTime, setServerTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const utcMinus7 = moment().tz("America/Los_Angeles"); // UTC-7 timezone

      const currentDayIndex = (utcMinus7.day() + 6) % 7; // Start the week on Monday
      setCurrentDay(currentDayIndex);

      const formattedTime = utcMinus7.format("HH:mm:ss");
      setServerTime(formattedTime);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center mb-2">
        <p className="mr-2 text-sm font-semibold">SERVER TIME</p>
        <div className="rounded-md bg-slate-600 px-2 py-1">
          <p className="font-bold">{serverTime}</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={index}
            className={`w-5 h-5 relative ${
              currentDay === index ? "bg-white" : "border-4 border-slate-700"
            }`}
          >
            {currentDay === index && (
              <div className="highlight absolute inset-0 bg-white"></div>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={index}
            className={`w-4 h-4 text-xs text-center ${
              currentDay === index ? "text-white font-semibold" : ""
            }`}
          >
            {currentDay === index ? "TODAY" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerTime;
