import { NavLink } from "react-router"
import Layout from "../components/Layout"
import Title from "../components/Title"

const Settings = () => {
  return (
    <div className="relative">
    <h1 className="absolute top-4 left-4 text-gray-300 font-bold tracking-wider">Tic-tac-toe</h1>
    <Layout>
      <Title value={'Settings'}/>
      <NavLink to={'/'} className="px-3 py-2 border-[1px] border-gray-300 rounded-md hover:bg-gray-700 hover:border-gray-700 text-center">Exit</NavLink>
    </Layout>
    </div>
  )
}

export default Settings
