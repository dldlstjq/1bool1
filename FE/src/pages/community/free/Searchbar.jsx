import { useRef } from "react";

function Searchbar() {
  const ref = useRef();
  const ref2 = useRef();
  function activate() {
    ref.current.classList.toggle("active", true);
    ref2.current.classList.toggle("active", true);
  }
  function deactivate() {
    ref.current.classList.toggle("active", false);
    ref2.current.classList.toggle("active", false);
  }

  return (
    <div className="flex justify-center items-end mt-8">
      <select
        // name="_searchType"
        // data-val="true"
        // data-val-number="_searchType 필드는 숫자여야 합니다."
        // data-val-required="The _searchType field is required."
        // id="searchType"
        className="h-12 border border-slate-300"
      >
        <option value="1">제목</option>
        <option value="2">제목+내용</option>
        <option value="3">작성자</option>
      </select>
      <div>
        <input
          name="_searchText"
          placeholder="검색어를 입력해 주세요."
          id="searchText"
          type="text"
          onFocus={activate}
          onBlur={deactivate}
          className="h-12 border border-slate-300"
        />
        <span className="icon-search-box" ref={ref}>
          <i className="icon-box icon-etc icon-search" ref={ref2}></i>
        </span>
      </div>
    </div>
  );
}

export default Searchbar;
