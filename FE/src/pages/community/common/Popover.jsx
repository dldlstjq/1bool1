/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

function Popover({ x, y, children }) {
  return (
    <div
      className="popover"
      style={{ top: `${y + 20}px`, left: `${x - 25}px` }}
    >
      {/* <Link to="/user/1/activities" className="popover-link">
        활동 내역
      </Link>
      <Link to="/user/1/profile" className="popover-link">
        유저 프로필
      </Link> */}
      {children}
    </div>
  );
}

export default Popover;
