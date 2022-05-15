/* eslint-disable no-unused-vars */
function UserInfoBox({ nickname }) {
  return (
    <div className="userinfo-box">
      <i className="icon-box icon-etc icon-user  w-10 h-10"></i>
      <div style={{ marginLeft: "1rem" }}>
        <span style={{ marginLeft: "5px" }}>{nickname}</span>
        <div className="icons">
          <i className="icon-box icon-info icon-article w-5 h-5 relative top-1"></i>
          21
          <i className="icon-box icon-comment icon-info w-5 h-5 ml-1 relative top-1"></i>
          22
        </div>
      </div>
    </div>
  );
}

export default UserInfoBox;
