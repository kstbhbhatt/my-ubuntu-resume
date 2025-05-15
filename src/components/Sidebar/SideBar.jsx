import { useContext } from "react";
import viewgrid from "./../../assets/icons/view-app-grid-symbolic (1).svg";
import TrashIcon from "./../../assets/icons/user-trash.png";
import "./sideBar.css";
import { AppContext } from "../../context/AppContext";

const SideBar = () => {
  const { taskBarItems, selectApp } = useContext(AppContext);

  const handleClick = (item) => {
    selectApp(item.id);
  };
  const imgClasses = "h-full w-full object-cover object-center";
  return (
    <div className="side-bar task-bar flex flex-col justify-between">
      <div className="task-bar-icons flex flex-col justify-between">
        {taskBarItems.map((item) => (
          <button
            className={`icon ${item.isSelected ? "selected" : ""}`}
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <img src={item.src} className={imgClasses} alt={item.name} />
          </button>
        ))}
        <hr className="trash-break" />
        <button className="icon selected">
          <img src={TrashIcon} className={imgClasses} alt="Trash" />
        </button>
      </div>
      <div className="task-bar-apps">
        <button className="icon">
          <img src={viewgrid} className={imgClasses} alt="view-grid" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
