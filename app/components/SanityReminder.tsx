"use client";
import React, { useState, useEffect } from "react";
import { DateTime, Duration } from "luxon";

const defaultMaxSanity = 135;

const SanityReminder: React.FC = () => {
  const [currentSanity, setCurrentSanity] = useState<number>(0);
  const [maxSanity, setMaxSanity] = useState<number>(defaultMaxSanity);
  const [estimatedTime, setEstimatedTime] = useState<string>("Calculating...");
  const [countdown, setCountdown] = useState<string>(
    "0 hours, 0 minutes, 0 seconds"
  );
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [sanityIncreaseTimer, setSanityIncreaseTimer] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeToMaxSanity = () => {
      if (
        isNaN(currentSanity) ||
        currentSanity < 0 ||
        currentSanity > maxSanity
      ) {
        setEstimatedTime("Calculating...");
        return;
      }

      const sanityDifference = maxSanity - currentSanity;
      const timeInMinutes = sanityDifference * 6;
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;
      const currentTime = DateTime.now().plus({ hours, minutes });
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      setEstimatedTime(
        currentTime.setZone(userTimezone).toLocaleString(DateTime.TIME_SIMPLE)
      );
    };

    calculateTimeToMaxSanity();
  }, [currentSanity, maxSanity]);

  const enableNotifications = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    setNotificationsEnabled(true);
    setCountdown("0 hours, 0 minutes, 0 seconds");

    if (currentSanity === null || isNaN(currentSanity)) {
      setEstimatedTime("Calculating...");
      return;
    }

    const sanityDifference = maxSanity - currentSanity;
    const timeInMinutes = sanityDifference * 6;
    let countdownInterval = Duration.fromObject({
      minutes: timeInMinutes,
    });

    const newTimer = setInterval(() => {
      if (countdownInterval.as("seconds") <= 0) {
        setCountdown("Sanity is full!");
        clearInterval(newTimer);
        if (Notification.permission === "granted") {
          new Notification("Sanity is full!", {
            body: "Your sanity has been fully restored.",
            icon: "/Arknights_icon.png",
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
              new Notification("Sanity is full!", {
                body: "Your sanity has been fully restored.",
                icon: "/Arknights_icon.png",
              });
            }
          });
        }
      } else {
        const remainingMinutes = Math.floor(countdownInterval.as("minutes"));
        const remainingSeconds = countdownInterval.as("seconds") % 60;
        const remainingHours = Math.floor(remainingMinutes / 60);

        setCountdown(
          `${remainingHours} hours, ${
            remainingMinutes % 60
          } minutes, ${remainingSeconds} seconds`
        );
        countdownInterval = countdownInterval.minus({ seconds: 1 });
      }
    }, 1000);

    const increaseSanityTimer = setInterval(() => {
      setCurrentSanity((prevSanity) => prevSanity + 1);
    }, 360000);

    setTimer(newTimer);
    setSanityIncreaseTimer(increaseSanityTimer);
  };

  const disableNotifications = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    if (sanityIncreaseTimer) {
      clearInterval(sanityIncreaseTimer);
      setSanityIncreaseTimer(null);
    }

    setCountdown("0 hours, 0 minutes, 0 seconds");
    setNotificationsEnabled(false);

    if (currentSanity === null || isNaN(currentSanity)) {
      setEstimatedTime("Calculating...");
    }
  };

  const handleCurrentSanityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newCurrentSanity = parseInt(event.target.value, 10);
    newCurrentSanity =
      isNaN(newCurrentSanity) || newCurrentSanity < 0
        ? 0
        : Math.min(newCurrentSanity, maxSanity);
    setCurrentSanity(newCurrentSanity);
  };

  const handleMaxSanityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newMaxSanity = parseInt(event.target.value, 10);
    newMaxSanity = isNaN(newMaxSanity)
      ? 0
      : Math.min(newMaxSanity, defaultMaxSanity);
    setMaxSanity(newMaxSanity);
  };

  return (
    <div className="flex items-center justify-center pb-10">
      <div>
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Sanity Reminder
        </h1>
        <div className="flex items-center">
          <label>
            Current Sanity:
            <input
              className="text-black disable-arrows mx-1"
              type="number"
              value={currentSanity}
              onChange={handleCurrentSanityChange}
              min={0}
              max={maxSanity}
              inputMode="none"
            />
          </label>
          <label>
            Max Sanity:
            <input
              className="text-black disable-arrows mx-1"
              type="number"
              value={maxSanity}
              onChange={handleMaxSanityChange}
              min={0}
              max={defaultMaxSanity}
              inputMode="none"
            />
          </label>
          {!notificationsEnabled ? (
            <button
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={enableNotifications}
            >
              Enable Notifications
            </button>
          ) : (
            <button
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={disableNotifications}
            >
              Disable Notifications
            </button>
          )}
        </div>
        <p className="text-center">Estimated Time: {estimatedTime}</p>
        <p className="text-center">Countdown: {countdown}</p>
        <div className="mt-2 text-center">
          <p className="font-black text-4xl">
            {currentSanity}/{maxSanity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SanityReminder;
