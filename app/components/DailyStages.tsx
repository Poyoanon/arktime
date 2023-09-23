"use client";
import React, { useEffect, useState } from "react";

interface Stage {
  src: string;
  days: string[];
  name: string;
}

const DailyStages: React.FC = () => {
  const [currentStages, setCurrentStages] = useState<Stage[]>([]);

  useEffect(() => {
    const fetchCurrentStage = () => {
      const currentDate = new Date();
      const currentUtcMinus7Time = new Date(
        currentDate.getTime() - 7 * 60 * 60 * 1000
      );
      const currentDay = currentUtcMinus7Time.getUTCDay();

      const resetTime = new Date(currentUtcMinus7Time);
      resetTime.setUTCHours(4, 0, 0, 0);

      if (currentUtcMinus7Time >= resetTime) {
        const dayStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const images = [
          {
            src: "weekly_5.png",
            days: ["Mon", "Thu", "Sat", "Sun"],
            name: "Tough Siege",
          },
          {
            src: "weekly_6.png",
            days: ["Tue", "Wed", "Fri", "Sun"],
            name: "Aerial Threat",
          },
          {
            src: "weekly_8.png",
            days: ["Mon", "Wed", "Fri", "Sat"],
            name: "Resource Search",
          },
          {
            src: "weekly_9.png",
            days: ["Tue", "Thu", "Sat", "Sun"],
            name: "Cargo Escort",
          },
          {
            src: "weekly_7.png",
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            name: "Tactical Drill",
          },
          {
            src: "weekly_1.png",
            days: ["Mon", "Thu", "Fri", "Sun"],
            name: "Solid Defense",
          },
          {
            src: "weekly_2.png",
            days: ["Mon", "Tue", "Fri", "Sat"],
            name: "Fierce Attack",
          },
          {
            src: "weekly_3.png",
            days: ["Wed", "Thu", "Sat", "Sun"],
            name: "Unstoppable Charge",
          },
          {
            src: "weekly_4.png",
            days: ["Tue", "Wed", "Sat", "Sun"],
            name: "Fearless Protection",
          },
        ];

        const matchingStages = images.filter((image) =>
          image.days.includes(dayStrings[currentDay])
        );

        setCurrentStages(matchingStages);
      }
    };

    fetchCurrentStage();

    const interval = setInterval(fetchCurrentStage, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Current Daily Resource Stages
      </h1>
      <div className="flex space-x-0 items-center justify-center">
        {currentStages.length > 0 ? (
          currentStages.map((currentStage, index) => (
            <div key={index} className=" rounded-full relative text-white">
              <img
                src={currentStage.src}
                alt={currentStage.name}
                className="mb-1"
              />
              <div className="text-sm font-semibold absolute bottom-24 left-0 w-full text-center bg-black bg-opacity-50 text-white py-1">
                {currentStage.name}
              </div>
            </div>
          ))
        ) : (
          <p>No stages available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DailyStages;
