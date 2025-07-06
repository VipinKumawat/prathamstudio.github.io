import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerHome from "./components/CustomerHome";
import ProductManager from "./components/ProductManager";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="p-4 bg-indigo-600 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold">प्रथम – Custom Studio</h1>
          <div className="space-x-4">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/admin" element={<ProductManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
