import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login"; // Make sure this is the correct path
import StudentDashboard from "../pages/StudentDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      {/* Add other routes here */}
    </Routes>
  );
}
