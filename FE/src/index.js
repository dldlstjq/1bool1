import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

export const BASE_URL = "https://1bool1.com/api/v1/";

axios.defaults.baseURL = "https://1bool1.com/api/v1/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
function success({ coords, timestamp }) {
  window.lat = coords.latitude;   // 위도
  window.lng = coords.longitude; // 경도
  // alert(`위도: ${lat}, 경도: ${lng}, 위치 반환 시간: ${timestamp}`);
  // location.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
}

function getUserLocation() {
  if (!navigator.geolocation) {
      // throw "위치 정보가 지원되지 않습니다.";
  }
  navigator.geolocation.getCurrentPosition(success);
}

getUserLocation();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
