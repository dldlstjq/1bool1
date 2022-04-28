import Article from "./Article";

function Articles() {
  return (
    <div className="articles">
      <div className="title">자유 게시판</div>
      <span>
        여러 모험가님들과 다양한 주제에 대해 자유롭게 소통하는 공간입니다.
      </span>

      <div className="articles-order">
        <input
          type="radio"
          id="order-by-date"
          className="blind"
          name="contact"
          value="email"
        />
        <label htmlFor="order-by-date" style={{ marginLeft: "1rem" }}>
          <i className="icon icon-filter"></i>등록일순
        </label>

        <input
          type="radio"
          id="order-by-views"
          name="contact"
          value="phone"
          className="blind"
        />
        <label htmlFor="order-by-views">
          <i className="icon icon-filter"></i>조회순
        </label>

        <input
          type="radio"
          id="order-by-comments"
          name="contact"
          value="mail"
          className="blind"
        />
        <label htmlFor="order-by-comments">
          <i className="icon icon-filter"></i>댓글순
        </label>

        <input
          type="radio"
          id="order-by-likes"
          name="contact"
          value="mail"
          className="blind"
        />
        <label htmlFor="order-by-likes">
          <i className="icon icon-filter"></i>공감순
        </label>
      </div>

      <ul>
        <Article noti />
        <Article />
      </ul>
    </div>
  );
}

export default Articles;
