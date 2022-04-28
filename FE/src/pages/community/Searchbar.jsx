function Searchbar() {
  return (
    <div class="search">
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
          value=""
        />
        <button class="btn_search">
          <i class="blind">검색</i>
        </button>
      </span>
    </div>
  );
}

export default Searchbar;
