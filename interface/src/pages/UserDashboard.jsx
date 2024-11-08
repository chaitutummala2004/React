// App.js
import React from "react";
import "../assets/css/userDashboard.css";
import DashboardHeader from "../components/userDashboard/DashboardHeader";
import QuickActions from "../components/userDashboard/QuickActions";
import AnnouncementsBanner from "../components/userDashboard/AnnouncementsBanner";
import UserTips from "../components/userDashboard/UserTips";
import FaqAccordion from "../components/userDashboard/FaqAccordion";
import FeedbackSection from "../components/userDashboard/FeedbackSection";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <QuickActions />
      <AnnouncementsBanner />
      <UserTips />
      <FaqAccordion />
      <FeedbackSection />
    </div>
  );
};

export default UserDashboard;
