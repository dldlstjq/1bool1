import { useRef } from "react";

function Searchbar() {
  const ref = useRef();

  function activate() {
    ref.current.classList.toggle("active", true);
  }
  function deactivate() {
    ref.current.classList.toggle("active", false);
  }

  return (
    <div className="search">
      <select
        name="_searchType"
        data-val="true"
        data-val-number="_searchType 필드는 숫자여야 합니다."
        data-val-required="The _searchType field is required."
        id="searchType"
      >
        <option value="1">제목</option>
        <option value="2">제목+내용</option>
        <option value="3">작성자</option>
      </select>
      <span>
        <input
          name="_searchText"
          placeholder="검색어를 입력해 주세요."
          id="searchText"
          type="text"
          // value=""
          onFocus={activate}
          onBlur={deactivate}
        />
        <button className="search-icon" ref={ref}>
          <i className="blind">검색</i>
        </button>
      </span>
    </div>
  );
}

export default Searchbar;
