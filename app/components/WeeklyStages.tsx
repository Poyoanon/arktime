import React from "react";

const DailyImages: React.FC = () => {
  const currentDate = new Date();
  const currentUtcMinus7Time = new Date(
    currentDate.getTime() - 7 * 60 * 60 * 1000
  );

  const isNewDay = currentUtcMinus7Time.getUTCHours() >= 4;
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

  return (
    <div className="items-center justify-center">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Current Daily Resource Stages
      </h1>
      <div className="flex space-x-4 items-center justify-center">
        {images
          .filter(
            (image) =>
              isNewDay &&
              image.days.includes(dayStrings[currentUtcMinus7Time.getUTCDay()])
          )
          .map((image, index) => (
            <div
              key={index}
              className={`p-4 rounded-full relative ${
                isNewDay ? "text-white" : ""
              }`}
            >
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="mb-1"
              />
              <div className="text-sm font-semibold absolute bottom-24 left-0 w-full text-center bg-black bg-opacity-50 text-white py-1">
                {image.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DailyImages;
