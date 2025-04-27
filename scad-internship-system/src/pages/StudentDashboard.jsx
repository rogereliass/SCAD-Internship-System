import React from "react";
import "../styles/global.css"; // Include global styles

const StudentDashboard = () => {
  return (
    <div className="page-padding">
      <div className="dashboard-header">
        <h1>Welcome, Student</h1>
        <img className="guc-logo" src="../assets/guc.jpg" alt="GUC Logo" />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Your Internships</h2>
          <p>View and manage your internships here.</p>
        </div>
        <div className="dashboard-card">
          <h2>Your Profile</h2>
          <p>Update your profile information and track progress.</p>
        </div>
        <div className="dashboard-card">
          <h2>Available Internships</h2>
          <p>Browse and apply for internships that match your skills.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
