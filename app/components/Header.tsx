import React from "react";
import ServerTime from "./ServerTime";

const Header: React.FC = () => {
  return (
    <div className="lg:flex justify-between items-center px-44">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-8xl font-semibold mt-4">Arktime</h1>
        <p className="text-xs font-semibold mb-8">Arknights Reminder App</p>
      </div>
      <ServerTime />
    </div>
  );
};

export default Header;
