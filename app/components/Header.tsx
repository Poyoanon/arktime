import React from "react";
import ServerTime from "./ServerTime";

const Header: React.FC = () => {
  return (
    <div className="bg-black py-4">
      <div className="container mx-auto">
        <div className="lg:flex justify-between items-center">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-4xl lg:text-8xl font-semibold mt-4 text-center lg:text-left">
              Arktime
            </h1>
            <p className="text-sm lg:text-xs font-semibold mb-4 lg:mb-8 text-center lg:text-left">
              Arknights Reminder App
            </p>
          </div>
          <ServerTime />
        </div>
      </div>
    </div>
  );
};

export default Header;
