import { FaBatteryFull, FaVolumeUp } from "react-icons/fa"; // Import icons from react-icons
import { IoIosArrowDown, IoMdVolumeOff } from "react-icons/io"; // Import down triangle icon

const Header = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const fullFormattedDate = `${formattedDate} ${formattedTime}`;

  return (
    <header className="bg-gray-900 text-white text-md flex justify-between items-center px-4 py-1">
      {/* Left Section */}
      <div className=" font-medium">Activities</div>

      {/* Center Section */}
      <div className="">{fullFormattedDate}</div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Speaker Icon */}
        <FaVolumeUp className="text-lg" title="Speaker Volume" />

        {/* Battery Icon */}
        <FaBatteryFull className="text-lg" title="Battery Full" />

        {/* Settings Dropdown */}
        <div className="relative group">
          <IoIosArrowDown className="text-lg cursor-pointer" title="Settings" />
          {/* Dropdown Menu */}
          <div className="quick-settings absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg hidden group-hover:block">
            <ul className="button-list">
              <li className=" battery-btn px-4 py-2 hover:bg-gray-700 cursor-pointer">
                100%
              </li>
              <li className=" screenshot px-4 py-2 hover:bg-gray-700 cursor-pointer">
                'screenshot icon'
              </li>
              <li className=" settings px-4 py-2 hover:bg-gray-700 cursor-pointer">
                settings
              </li>
              <li className=" lock px-4 py-2 hover:bg-gray-700 cursor-pointer">
                lock
              </li>
              <li className=" power px-4 py-2 hover:bg-gray-700 cursor-pointer">
                power off
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
