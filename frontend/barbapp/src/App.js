import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Bookings from "./pages/Bookings";
import ShopDetail from "./pages/ShopDetail";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/profile"
                            element={<PrivateRoute component={Profile} />}
                        />
                        <Route
                            path="/feed"
                            element={<PrivateRoute component={Feed} />}
                        />
                        <Route
                            path="/shop/:id"
                            element={<PrivateRoute component={ShopDetail} />}
                        />
                        <Route
                            path="/shop/:id/bookings"
                            element={<PrivateRoute component={Bookings} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
