import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/vendors/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import UserNavbar from "./components/templates/UserNavbar";
import Profile from "./components/common/Profile";
import Login from "./components/common/login";
import Dashboard from "./components/common/Dashboard";
import VendorOrders from "./components/vendors/VendorOrders";
import VendorMenu from "./components/vendors/VendorMenu";
import BuyerOrders from "./components/buyers/BuyerOrders";
import BuyerMenu from "./components/buyers/BuyerMenu";
import Statistics from "./components/vendors/statistics";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<UserLayout />}>
          <Route path="dashboard/vendororders" element={<VendorOrders />} />
          <Route path="dashboard/vendormenu" element={<VendorMenu />} />
          <Route path="dashboard/buyerorders" element={<BuyerOrders />} />
          <Route path="dashboard/buyermenu" element={<BuyerMenu />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
