import { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditRoom from "./components/room/EditRoom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Room from "./components/room/Room";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/edit-room/:roomId" element={<EditRoom />}/>
            <Route path="/existing-rooms" element={<ExistingRooms />}/>
            <Route path="/add-room" element={<AddRoom />}/>
            <Route path="/room" element={<Room />}/>
          </Routes>
        </Router>
        <Footer/>
      </main>
    </>
  );
}

export default App;
