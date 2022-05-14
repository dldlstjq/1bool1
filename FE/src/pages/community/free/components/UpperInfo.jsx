/* eslint-disable no-unused-vars */
function UpperInfo({ title, createdDate, nickname }) {
  return (
    <>
      <strong className="detail-title">{title}</strong>
      <div style={{ padding: "0.5rem 0", borderBottom: "1px solid #323232" }}>
        작성자 : {nickname}
        <div className="icons">
          <i className="icon-box icon-info icon-views w-5 h-5 relative top-1"></i>
          21
          <i className="icon-box icon-comment icon-info w-5 h-5 relative top-1"></i>
          22
          <i className="icon-box icon-up icon-info w-5 h-5"></i>22
          <i className="icon-box icon-down icon-info w-5 h-5 relative top-1"></i>
          22
        </div>
      </div>
    </>
  );
}

export default UpperInfo;
