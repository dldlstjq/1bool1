import "./input.scss";
// import { useState } from "react";
import { Outlet } from "react-router-dom";

import NavController from "./NavController";

function Community() {
  return (
    <div className="community">
      <div className="temp-navbar"></div>
      <NavController />
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Community;
