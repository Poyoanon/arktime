"use client";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface Stage {
  src: string;
  days: string[];
  name: string;
}

const DailyStages: React.FC = () => {
  const [currentStages, setCurrentStages] = useState<Stage[]>([]);

  useEffect(() => {
    const fetchCurrentStage = () => {
      const utcMinus7 = DateTime.now().setZone("America/Los_Angeles");
      const currentDay = utcMinus7.toFormat("cccc");
      const resetTime = utcMinus7.set({ hour: 4, minute: 0, second: 0 });

      const nextResetTime =
        utcMinus7.hour < 4 ? resetTime : resetTime.plus({ days: 1 });

      if (utcMinus7 < nextResetTime) {
        const dayStrings = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const images = [
          {
            src: "weekly_5.png",
            days: ["Monday", "Thursday", "Saturday", "Sunday"],
            name: "Tough Siege",
          },
          {
            src: "weekly_6.png",
            days: ["Tuesday", "Wednesday", "Friday", "Sunday"],
            name: "Aerial Threat",
          },
          {
            src: "weekly_8.png",
            days: ["Monday", "Wednesday", "Friday", "Saturday"],
            name: "Resource Search",
          },
          {
            src: "weekly_9.png",
            days: ["Tuesday", "Thursday", "Saturday", "Sunday"],
            name: "Cargo Escort",
          },
          {
            src: "weekly_7.png",
            days: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            name: "Tactical Drill",
          },
          {
            src: "weekly_1.png",
            days: ["Monday", "Thursday", "Friday", "Sunday"],
            name: "Solid Defense",
          },
          {
            src: "weekly_2.png",
            days: ["Monday", "Tuesday", "Friday", "Saturday"],
            name: "Fierce Attack",
          },
          {
            src: "weekly_3.png",
            days: ["Wednesday", "Thursday", "Saturday", "Sunday"],
            name: "Unstoppable Charge",
          },
          {
            src: "weekly_4.png",
            days: ["Tuesday", "Wednesday", "Saturday", "Sunday"],
            name: "Fearless Protection",
          },
        ];

        const matchingStages = images.filter((image) =>
          image.days.includes(currentDay)
        );

        setCurrentStages(matchingStages);
      }
    };

    fetchCurrentStage();

    const interval = setInterval(fetchCurrentStage, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="items-center justify-center pt-4">
      <div className="flex items-center justify-center">
        {currentStages.length > 0 ? (
          currentStages.map((currentStage, index) => (
            <div key={index} className="relative">
              <img
                src={currentStage.src}
                alt={currentStage.name}
                className="mb-1 drop-shadow-2xl"
              />
              <div className="absolute bottom-20 left-0 right-0 flex space-x-1 justify-center">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 ${
                      currentStage.days.includes(day)
                        ? "bg-white"
                        : "border border-slate-500"
                    }`}
                  >
                    {currentStage.days.includes(day) ? (
                      <div className="w-2 h-2 bg-white"></div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold absolute bottom-24 left-0 w-full text-center text-white">
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
