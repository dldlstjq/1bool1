function Detail() {
  return (
    <div>
      <strong className="detail-title">고수님들 사양 좀 봐주세요</strong>
      <div style={{ marginTop: "0.5rem" }}>
        <div className="author-and-date">[GM]루아 | 2022-04-29 15:32</div>
        <div className="icons">
          <span className="icon-and-number" style={{ paddingLeft: 0 }}>
            <i className="icon icon-view"></i>21
          </span>
          <span className="icon-and-number">
            <i className="icon icon-comment"></i>22
          </span>
          <span className="icon-and-number">
            <i className="icon icon-up"></i>22
          </span>
          <span className="icon-and-number">
            <i className="icon icon-down"></i>22
          </span>
        </div>
      </div>
    </div>
  );
}

export default Detail;
