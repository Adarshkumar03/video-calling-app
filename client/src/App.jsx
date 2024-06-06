import { Routes, Route } from "react-router-dom";
import "./App.css";
import Lobby from "./routes/Lobby";
import Room from "./routes/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
