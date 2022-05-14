/* eslint-disable no-unused-vars */
function ButtonAndPerPage({ setSize }) {
  return (
    <div className="gap-2 mt-10">
      <button
        className="h-10 border-b border-slate-300 bg-slate-100 w-1/2"
        id="write"
      >
        글쓰기
      </button>
      <select
        name="order"
        id="order"
        className="h-10 border-b border-slate-300 bg-slate-100 text-center w-1/2"
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="">목록개수</option>
        <option value="10"> 10 </option>
        <option value="20"> 20 </option>
        <option value="30"> 30 </option>
        <option value="40"> 40 </option>
        <option value="50"> 50 </option>
        <option value="100"> 100 </option>
      </select>
    </div>
  );
}

export default ButtonAndPerPage;
