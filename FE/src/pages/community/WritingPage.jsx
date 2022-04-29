export default function WritingPage() {
  return (
    <>
      <select className="nav-controller select">
        <option value="">자유 게시판</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
        <button className="nav-controller-btn">
          <i className="icon icon-arrow"></i>
        </button>
      </select>
      <input
        type="text"
        className="title-input"
        placeholder="제목을 입력해주세요"
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        className="content-textarea"
      ></textarea>

      <button
        className="head write-btn"
        style={{ width: "50%", margin: "0.8rem auto", height: "2.8rem" }}
      >
        작성완료
      </button>
    </>
  );
}
