import Image from "next/image";
import Header from "./components/Header";
import DailyStages from "./components/DailyStages";
import SanityReminder from "./components/SanityReminder";

export default function Home() {
  return (
    <>
      <Header />
      <DailyStages />
      <SanityReminder />;
    </>
  );
}
