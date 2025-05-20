import "./App.css";
import { DndContext } from "@dnd-kit/core";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
import FolderIcon from "./assets/icons/folder.png";
import TerminalIcon from "./assets/icons/terminal.png";
import vsCodeIcon from "./assets/icons/vscode.svg";
import ChromeIcon from "./assets/icons/chrome-logo.svg";
import Chrome from "./components/Chrome/Chrome";

function App() {
  // Single source of truth for all app/window state
  const [apps, setApps] = useState({
    chrome: {
      id: "chrome",
      name: "Chrome",
      src: ChromeIcon,
      isOpen: false,
      isSelected: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100, y: 100 },
      size: { width: 800, height: 500 },
      content: <Chrome />,
      zIndex: 0,
    },
    aboutMe: {
      id: "aboutMe",
      name: "About Me",
      src: FolderIcon,
      isOpen: false,
      isSelected: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 150, y: 150 },
      size: { width: 800, height: 500 },
      content: "About Me content",
      zIndex: 0,
    },
    terminal: {
      id: "terminal",
      name: "Terminal",
      src: TerminalIcon,
      isOpen: false,
      isSelected: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 200, y: 200 },
      size: { width: 800, height: 500 },
      content: "Terminal content",
      zIndex: 0,
    },
    vsCode: {
      id: "vsCode",
      name: "VS Code",
      src: vsCodeIcon,
      isOpen: false,
      isSelected: false,
      isMinimized: false,
      isMaximized: false,
      position: { x: 250, y: 250 },
      size: { width: 800, height: 500 },
      content: "VS Code content",
      zIndex: 0,
    },
  });

  // Derived state - all apps for the sidebar
  const taskBarItems = Object.values(apps);

  // Derived state - only open apps for windows
  const openWindows = Object.values(apps).filter((app) => app.isOpen);

  // Max z-index for managing focus
  const [maxZIndex, setMaxZIndex] = useState(1);

  const bringToFront = (appId) => {
    setMaxZIndex((z) => z + 1);
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        zIndex: maxZIndex,
      },
    }));
  };

  // Toggle app open/minimize
  const toggleApp = (appId) => {
    setApps((prev) => {
      const app = prev[appId];
      return {
        ...prev,
        [appId]: {
          ...app,
          isOpen: !app.isOpen || app.isMinimized,
          isMinimized: app.isOpen && !app.isMinimized,
          isSelected: true,
          zIndex: maxZIndex + 1,
        },
      };
    });

    setMaxZIndex((z) => z + 1);
  };

  // Select app (open or un-minimize)
  const selectApp = (appId) => {
    setApps((prev) => {
      const app = prev[appId];

      // If not open, open it
      if (!app.isOpen) {
        return {
          ...prev,
          [appId]: {
            ...app,
            isOpen: true,
            isSelected: true,
            isMinimized: false,
            zIndex: maxZIndex + 1,
          },
        };
      }

      // If open but minimized, un-minimize
      if (app.isMinimized) {
        return {
          ...prev,
          [appId]: {
            ...app,
            isMinimized: false,
            isSelected: true,
            zIndex: maxZIndex + 1,
          },
        };
      }

      // If already open and not minimized, just bring to front
      return {
        ...prev,
        [appId]: {
          ...app,
          isSelected: true,
          zIndex: maxZIndex + 1,
        },
      };
    });

    setMaxZIndex((z) => z + 1);
  };

  // Deselect app
  const deselectApp = (appId) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isSelected: false,
      },
    }));
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const appId = active.id;

    setApps((prev) => {
      if (!prev[appId]) return prev;

      return {
        ...prev,
        [appId]: {
          ...prev[appId],
          position: {
            x: Math.max(
              0,
              Math.min(
                window.innerWidth - prev[appId].size.width,
                prev[appId].position.x + delta.x
              )
            ),
            y: Math.max(
              0,
              Math.min(
                window.innerHeight - 50,
                prev[appId].position.y + delta.y
              )
            ),
          },
        },
      };
    });
  };

  // Window control handlers
  const handleMaximize = (appId) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMaximized: !prev[appId].isMaximized,
        zIndex: maxZIndex + 1,
      },
    }));

    setMaxZIndex((z) => z + 1);
  };

  const handleMinimize = (appId) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: true,
      },
    }));
  };

  const closeWindow = (appId) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false,
        isSelected: false,
      },
    }));
  };

  // Update window size during resize
  const updateWindowSize = (appId, width, height) => {
    setApps((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        size: { width, height },
      },
    }));
  };

  const dragOptions = {
    autoScroll: false,
    activationConstraint: {
      delay: 0,
      tolerance: 0,
    },
    measuring: {
      frequency: "always",
    },
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        taskBarItems,
        openWindows,
        selectApp,
        deselectApp,
        toggleApp,
        closeWindow,
        handleMaximize,
        handleMinimize,
        updateWindowSize,
        bringToFront,
      }}
    >
      <DndContext onDragEnd={handleDragEnd} {...dragOptions}>
        <div>
          <Header />
          <Main />
        </div>
      </DndContext>
    </AppContext.Provider>
  );
}

export default App;
