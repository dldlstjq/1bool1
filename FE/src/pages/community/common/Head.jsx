/* eslint-disable no-unused-vars */
import axios from "axios";

function Head({ setState }) {
  function orderByLike() {
    axios({
      method: "get",
      url: "board/like",
    })
      .then((res) => setState(res.data.object))
  }
  return (
    <div className="head ">
      <input
        type="radio"
        id="order-by-date"
        className="blind"
        name="contact"
        value="email"
      />
      <label htmlFor="order-by-date" className="tracking-tighter text-white">
        <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
        등록일순
      </label>

      <input
        type="radio"
        id="order-by-views"
        name="contact"
        value="phone"
        className="blind"
      />
      <label
        htmlFor="order-by-views"
        className="tracking-tighter ml-3 text-white"
      >
        <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
        조회순
      </label>

      <input
        type="radio"
        id="order-by-comments"
        name="contact"
        value="mail"
        className="blind"
      />
      <label
        htmlFor="order-by-comments"
        className="tracking-tighter ml-3 text-white"
      >
        <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
        댓글순
      </label>

      <input
        type="radio"
        id="order-by-likes"
        name="contact"
        value="mail"
        className="blind"
      />
      <label
        onClick={orderByLike}
        htmlFor="order-by-likes"
        className="tracking-tighter ml-3 text-white"
      >
        <i className="icon-box icon-info icon-down w-5 h-4 relative"></i>
        좋아요순
      </label>
    </div>
  );
}

export default Head;
