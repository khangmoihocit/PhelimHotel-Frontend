import { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditRoom from "./components/room/EditRoom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/edit-room/:roomId" element={<EditRoom />}/>
            <Route path="/existing-rooms" element={<ExistingRooms />}/>
            <Route path="/add-room" element={<AddRoom />}/>
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
