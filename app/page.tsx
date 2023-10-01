import Image from "next/image";
import Header from "./components/Header";
import DailyStages from "./components/DailyStages";
import SanityReminder from "./components/SanityReminder";
import CountdownTimer from "./components/CountdownTimer";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <CountdownTimer
        startDate="October 1, 2023, 10:00"
        endDate="October 15, 2023, 03:59"
        eventName="Contingency Contract #12: Operation Basepoint"
      />
      <DailyStages />
      <SanityReminder />
      <Footer />
    </>
  );
}
