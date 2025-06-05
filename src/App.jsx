import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import ScrollToTop from "./components/common/ScrollToTop";
import Checkout from "./components/booking/Checkout";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import { AuthProvider } from "./components/auth/AuthProvider";
import RequireAuth from "./components/auth/RequireAuth";
import AuthDebugger from "./components/debug/AuthDebugger";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <main>
        <Router>
          <ScrollToTop />
          <Navbar />
          <AuthDebugger />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/book-room/:roomId"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/existing-bookings" element={<Bookings />} />
              <Route path="/find-booking" element={<FindBooking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App;
