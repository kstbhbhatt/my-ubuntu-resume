import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import "./window.css";
import { useDraggable } from "@dnd-kit/core";
import closeIcon from "./../../assets/icons/window-close.png";

export const Window = ({ windowData, children, onClose = () => {} }) => {
  const {
    id,
    name,
    position = { x: 0, y: 0 },
    size: initialSize,
    isMinimized = false,
    isMaximized = false,
    appType,
    zIndex = 1,
  } = windowData;

  const { deselectApp, handleMaximize, handleMinimize, bringToFront } =
    useContext(AppContext);
  const [size, setSize] = useState(initialSize || { width: 800, height: 500 });
  const [resizing, setResizing] = useState(false);

  // Bring window to front when clicked
  const handleWindowClick = () => {
    bringToFront(id);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: isMaximized || resizing,
  });

  const style = {
    transform: isMaximized
      ? undefined
      : transform
      ? `translate3d(${position.x + transform.x}px, ${
          position.y + transform.y
        }px, 0)`
      : `translate3d(${position.x}px, ${position.y}px, 0)`,
    width: isMaximized ? "100%" : `${size.width}px`,
    height: isMaximized ? "100%" : `${size.height}px`,
    // You can add a will-change property for better performance
    willChange: "transform",
  };

  // Handle resize
  const handleResize = (e) => {
    if (resizing && !isMaximized) {
      const dx = e.movementX;
      const dy = e.movementY;

      setSize((prev) => ({
        width: Math.max(400, prev.width + dx),
        height: Math.max(300, prev.height + dy),
      }));
    }
  };

  // Resize events
  const startResize = () => setResizing(true);
  const stopResize = () => setResizing(false);

  useEffect(() => {
    if (resizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", stopResize);
      return () => {
        window.removeEventListener("mousemove", handleResize);
        window.removeEventListener("mouseup", stopResize);
      };
    }
  }, [resizing]);

  const handleClose = () => {
    if (appType) {
      deselectApp(appType);
    }
    onClose();
  };

  const handleButtonClick = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback(id);
  };

  return (
    <div
      className={`ubuntu-window ${isMaximized ? "maximized" : ""} ${
        isMinimized ? "minimized" : ""
      }`}
      style={isMaximized || isMinimized ? undefined : style}
      onClick={handleWindowClick}
    >
      <div className="window-titlebar">
        <div
          className="window-title"
          ref={setNodeRef}
          {...(isMaximized ? {} : listeners)}
          {...(isMaximized ? {} : attributes)}
          style={{ flex: 1 }}
        >
          {name}
        </div>

        <div className="window-controls" onClick={(e) => e.stopPropagation()}>
          {/* Changed order to match Ubuntu: close, minimize, maximize */}
          <button
            className="window-control close"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => handleButtonClick(e, handleClose)}
            aria-label="Close"
          >
            <img src={closeIcon} alt="Close" />
          </button>
          <button
            className="window-control minimize"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => handleButtonClick(e, handleMinimize)}
            aria-label="Minimize"
          >
            {/* Minimize icon */}
          </button>
          <button
            className="window-control maximize"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => handleButtonClick(e, handleMaximize)}
            aria-label="Maximize"
          >
            {/* Maximize icon */}
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>

      {/* Add resize handle */}
      {!isMaximized && (
        <div
          className="resize-handle"
          onMouseDown={(e) => {
            e.stopPropagation();
            startResize();
          }}
        />
      )}
    </div>
  );
};

export default Window;
