import Image from "next/image";
import SanityReminder from "./components/SanityReminder";
import WeeklyStages from "./components/WeeklyStages";

export default function Home() {
  return (
    <>
      <WeeklyStages />
      <SanityReminder />;
    </>
  );
}
