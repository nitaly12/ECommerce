import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>Dashboard</li>
        <li>Manage Users</li>
        <li>Manage Content</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
