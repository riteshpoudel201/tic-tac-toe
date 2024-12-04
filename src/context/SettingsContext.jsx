/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import defaultSettings from "../data/settings.json";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || defaultSettings
  );

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
