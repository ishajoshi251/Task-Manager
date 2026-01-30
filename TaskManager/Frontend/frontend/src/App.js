import "./App.css";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import BoardView from './components/BoardView/BoardView'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:user_name/dashboard" element={<Dashboard/>} />
          <Route path="/:user_name/:board_id/board_details" element={<BoardView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
