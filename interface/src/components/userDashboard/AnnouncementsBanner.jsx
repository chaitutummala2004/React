// components/AnnouncementsBanner.js
import React from "react";

const AnnouncementsBanner = () => (
  <div className="announcements-banner">
    <h2>Important Announcements</h2>
    <div className="announcement-cards">
      <div className="announcement-card">
        <h3>Early Bird Seating</h3>
        <p>Register early to reserve preferred seating for family.</p>
        <button>Learn More</button>
      </div>
      <div className="announcement-card">
        <h3>Gown Collection</h3>
        <p>Pick up your graduation gown on campus from next week!</p>
        <button>Learn More</button>
      </div>
    </div>
  </div>
);

export default AnnouncementsBanner;
