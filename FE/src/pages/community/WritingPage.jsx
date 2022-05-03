export default function WritingPage() {
  return (
    <div className="flex flex-col items-center">
      <select className="nav-controller select w-full h-16">
        <option value="">자유 게시판</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
      <input
        type="text"
        className="w-full h-16 mt-4 border border-slate-300 px-4 "
        placeholder="제목을 입력해주세요"
      />
      <textarea
        // name=""
        // id=""
        cols="30"
        rows="10"
        className="w-full mt-4 px-2 border border-slate-300"
      ></textarea>
      <button className="w-32 h-12 bg-32 m-4 text-white ">작성완료</button>
    </div>
  );
}
