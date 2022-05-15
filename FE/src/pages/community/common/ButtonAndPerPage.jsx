/* eslint-disable no-unused-vars */
function ButtonAndPerPage({ setSize }) {
  return (
    <div className="grid grid-cols-2 gap-2 my-5">
      <button
        className="h-10 border-b border-slate-300 bg-purple-900 text-lime-400 font-bold text-xl  rounded"
        id="write"
      >
        글쓰기
      </button>
      <select
        name="order"
        id="order"
        className="h-10 border-b border-slate-300 bg-purple-900 text-lime-400 font-bold  rounded text-lg text-center"
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
