import "./Chrome.css";
import { useState } from "react";
import ChromeReload from "../../../src/assets/icons/chrome_reload.svg";
import ChromeGlobe from "../../../src/assets/icons/chrome_globe.svg";
import ChromeHome from "../../../src/assets/icons/chrome_home.svg";

function Chrome() {
  const [url, setUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = async () => {
    setUrl(inputValue);
  };
  return (
    <div className="chrome h-full w-full flex flex-col">
      <div className="search-bar flex gap-2">
        <button
          onClick={() => {
            setUrl((prev) => prev);
          }}
        >
          <img src={ChromeReload} />
        </button>
        <button
          onClick={() => {
            setUrl("https://www.google.com");
          }}
        >
          <img src={ChromeHome} />
        </button>
        <form action={handleSubmit}>
          <img src={ChromeGlobe} />
          <input
            name="search"
            type="text"
            value={inputValue} // Controlled input
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search Google or type a URL"
          />
        </form>
      </div>
      <div className="content h-full">
        <iframe src={url} width="100%" height="100%"></iframe>
      </div>
    </div>
  );
}
export default Chrome;
