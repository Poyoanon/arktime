"use client";
import { useState, useEffect } from "react";

const MAX_SANITY = 135;

const SanityReminder: React.FC = () => {
  const [currentSanity, setCurrentSanity] = useState<number>(0);
  const [timeToMaxSanity, setTimeToMaxSanity] = useState<string>("");
  const [maxSanityTime, setMaxSanityTime] = useState<string>("");

  useEffect(() => {
    const calculateTimeToMaxSanity = () => {
      const sanityDifference = MAX_SANITY - currentSanity;
      const timeInMinutes = sanityDifference * 6;
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;

      const currentTime = new Date();
      currentTime.setMinutes(currentTime.getMinutes() + timeInMinutes);

      const formatter = new Intl.DateTimeFormat("default", {
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      });

      setTimeToMaxSanity(`${hours} hours and ${minutes} minutes`);
      setMaxSanityTime(formatter.format(currentTime));
    };

    calculateTimeToMaxSanity();
  }, [currentSanity]);

  const handleSanityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSanity = parseInt(event.target.value, 10);
    newSanity = isNaN(newSanity)
      ? 0
      : newSanity < 0
      ? 0
      : newSanity > MAX_SANITY
      ? MAX_SANITY
      : newSanity;
    setCurrentSanity(newSanity);
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Sanity Reminder
        </h1>
        <label>
          Current Sanity:
          <input
            className="text-black ml-2"
            type="number"
            value={currentSanity}
            onChange={handleSanityChange}
            min={0}
            max={MAX_SANITY}
          />
        </label>
        <p>Time to Max Sanity: {timeToMaxSanity}</p>
        <p>Estimated Time: {maxSanityTime}</p>
      </div>
    </div>
  );
};

export default SanityReminder;
