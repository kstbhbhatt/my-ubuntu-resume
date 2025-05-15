import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./main.css";
import SideBar from "./../Sidebar/SideBar";
import BackgroundImage from "./../../assets/wall-2.webp";
import Window from "./../Window/Window";
import { useDroppable } from "@dnd-kit/core";

const Main = () => {
  const { openWindows, closeWindow } = useContext(AppContext);
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className="main-section flex"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <SideBar />
      {openWindows.map((win) => (
        <Window
          key={win.id}
          windowData={win}
          onClose={() => closeWindow(win.id)}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

export default Main;
