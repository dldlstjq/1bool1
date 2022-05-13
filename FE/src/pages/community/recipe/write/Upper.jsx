/* eslint-disable no-unused-vars */
function Upper({ nickname, password, description, minute, star, title }) {
  return (
    <>
      <h1 className="text-xl text-center my-8">| 레시피 등록 |</h1>
      <div className="grid grid-cols-2 gap-2 border-b border-slate-300 p-4 bg-green-200 ">
        <input
          type="text"
          name="nickname"
          defaultValue={nickname}
          // onChange={setInputs}
          required
        />
        <input
          type="password"
          name="password"
          defaultValue={password}
          // onChange={setInputs}
          required
        />
        <input
          type="text"
          className=" bg-slate-200 border border-slate-300 h-12 rounded col-span-2 focus:bg-white"
          placeholder="레시피 제목"
          name="title"
          defaultValue={title}
          // onChange={setInputs}
          required
        />
        <textarea
          name="description"
          className="bg-slate-200 border border-slate-300 h-24 rounded col-span-2 focus:bg-white"
          placeholder="요리소개"
          defaultValue={description}
          // onChange={setInputs}
        ></textarea>
        <input
          type="text"
          className=" bg-slate-200 border border-slate-300 h-12 rounded focus:bg-white"
          placeholder="요리시간(분)"
          name="minute"
          defaultValue={minute}
          // onChange={setInputs}
        />
        <select
          className="text-slate-400 bg-slate-200 border border-slate-300 h-12 rounded focus:bg-white"
          placeholder="난이도"
          name="star"
          defaultValue={star}
          // onChange={setInputs}
        >
          <option defaultValue="">난이도</option>
          <option defaultValue="1">1</option>
          <option defaultValue="2">2</option>
          <option defaultValue="3">3</option>
        </select>
        메인사진
        <input type="file" name="file" required />
      </div>
    </>
  );
}

export default Upper;
