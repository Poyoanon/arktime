"use client";
import React, { useEffect, useState } from "react";
import { DateTime, Duration } from "luxon";

const CountdownTimer: React.FC<{
  startDate: string;
  endDate: string;
  eventName: string;
}> = ({ startDate, endDate, eventName }) => {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    const startDateTime = DateTime.fromFormat(
      startDate,
      "MMMM d, yyyy, HH:mm",
      {
        zone: "America/Los_Angeles",
      }
    );
    const endDateTime = DateTime.fromFormat(endDate, "MMMM d, yyyy, HH:mm", {
      zone: "America/Los_Angeles",
    });

    if (startDateTime.isValid && endDateTime.isValid) {
      const currentTime = DateTime.now().setZone("America/Los_Angeles");
      const timeRemaining: Duration = endDateTime.diff(currentTime);

      if (timeRemaining.as("seconds") > 0) {
        const intervalId = setInterval(() => {
          const currentTime = DateTime.now().setZone("America/Los_Angeles");
          const timeRemaining: Duration = endDateTime.diff(currentTime);

          if (timeRemaining.as("seconds") > 0) {
            const days = Math.floor(timeRemaining.as("days"));
            const hours = Math.floor(timeRemaining.as("hours") % 24);
            const minutes = Math.floor(timeRemaining.as("minutes") % 60);
            const seconds = Math.floor(timeRemaining.as("seconds") % 60);

            const formattedCountdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
            setCountdown(`${formattedCountdown}`);
          } else {
            clearInterval(intervalId);
            setCountdown("Event has ended.");
          }
        }, 1000);
      } else {
        setCountdown("Event has ended.");
      }
    } else {
      setCountdown("Invalid date format.");
    }
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/event_banner.png" alt="Event Banner" />
      <p className="font-bold">{countdown}</p>
      <p>
        until <strong>{eventName}</strong> ends
      </p>
    </div>
  );
};

export default CountdownTimer;
