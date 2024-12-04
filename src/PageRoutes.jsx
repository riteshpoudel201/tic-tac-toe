import { Routes, Route } from 'react-router-dom'
import NewGame from "./pages/NewGame";
import TictacToe from "./pages/TictacToe";
import Settings from './pages/Settings';
const PageRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<TictacToe />} />
        <Route path="/new" element={<NewGame />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
  )
}

export default PageRoutes
