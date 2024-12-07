import { NavLink } from "react-router";
import Layout from "../components/Layout";
import Title from "../components/Title";
import { useSettings } from "../context/SettingsContext";
import { useRef } from "react";

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const playerRef = useRef(null);
  console.log(settings);
  return (
    <div className="relative">
      <h1 className="absolute top-4 left-4 text-gray-300 font-bold tracking-wider">
        Tic-tac-toe
      </h1>
      <Layout>
        <Title value={"Settings"} />
        <div className="flex flex-col gap-4 space-y-4 mt-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="player" className="text-gray-300 font-semibold">
              Player
            </label>
            <select
              name="player"
              id="player"
              className="px-3 py-2 bg-gray-700 text-gray-300 font-semibold rounded-md"
              value={settings?.currentPlayer}
              onChange={(e) =>
                updateSettings({ ...settings, currentPlayer: e.target.value })
              }
              ref={playerRef}
            >
              {settings?.players?.map((player) => (
                <option key={player} value={player} className="capitalize" >
                  {player}
                </option>
              ))}
            </select>
          </div>

          {settings?.currentPlayer === "computer" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="difficulty"
                className="text-gray-300 font-semibold"
              >
                Difficulty
              </label>
              <select
                name="difficulty"
                id="difficulty"
                value={settings?.currentDifficulty}
                className="px-3 py-2 bg-gray-700 text-gray-300 font-semibold rounded-md"
                onChange={(e) =>
                  updateSettings({ ...settings, currentDifficulty: e.target.value })
                }
              >
                {settings?.difficulties?.map((difficulty) => (
                  <option key={difficulty} value={difficulty} className="capitalize" >
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          )}

          <NavLink
            to={"/"}
            className="px-3 py-2 border-[1px] border-gray-300 rounded-md hover:bg-gray-700 hover:border-gray-700 text-center"
          >
            Back
          </NavLink>
        </div>
      </Layout>
    </div>
  );
};

export default Settings;
