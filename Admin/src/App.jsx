import React from "react";
import Navbar from "../src/components/Navbar/Navbar";
import Sidebar from "../src/components/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/add/Add";
import Orders from "./pages/order/Orders";
import List from "./pages/list/List";
// import TrackOrderPage from './pages/TrackOrder/TrackOrderPage';
import Dashboard from "./pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = import.meta.env.VITE_URL;
  return (
    <>
      <ToastContainer />
      <Navbar />

      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
           <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Orders url={url} />} />
          {/* <Route path='/track/:orderId' element={<TrackOrderPage />} /> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
