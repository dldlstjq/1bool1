/* eslint-disable no-unused-vars */

function Popover({ x, y, children }) {
  return (
    <div
      className="w-20 h-20 fixed"
      // style={{ top: `${y + 20}px`, left: `${x - 25}px` }}
    >
      {/* <Link to="/user/1/activities" className="popover-link">
        활동 내역
      </Link>
      <Link to="/user/1/profile" className="popover-link">
        유저 프로필
      </Link> */}
      계획에 없음계획에 없음계획에 없음계획에 없음계획에 없음계획에 없음계획에
      없음계획에 없음계획에 없음계획에 없음계획에 없음계획에 없음계획에
      없음계획에 없음계획에 없음계획에 없음계획에 없음계획에 없음
      {children}
    </div>
  );
}

export default Popover;
