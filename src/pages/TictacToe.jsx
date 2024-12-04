/* eslint-disable react/prop-types */
import { NavLink } from "react-router";
import Title from "../components/Title";
import Layout from "../components/Layout";

const TictacToe = () => {
  return (
    <Layout>
      <Title />
      <div className="flex flex-col items-center gap-4 mt-10">
        <MenuItems to={"/new"} name={"New Game"} />
        <MenuItems to={"/settings"} name={"Settings"} />
        <MenuItems to={"/about"} name={"About"} />
      </div>
    </Layout>
  );
};

export default TictacToe;

const MenuItems = ({ name, to }) => {
  return (
    <NavLink
      to={to}
      className="hover:bg-white hover:text-black px-6 py-2 rounded-sm"
    >
      {name}
    </NavLink>
  );
};
