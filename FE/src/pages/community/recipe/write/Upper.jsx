/* eslint-disable no-unused-vars */
function Upper({ nickname, password, description, minute, star, title }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center  my-8 text-purple-900">
        레시피 등록
      </h1>
      <div className="grid grid-cols-2 gap-2 border-b p-4 bg-purple-900 rounded ">
        <input
          type="text"
          name="nickname"
          defaultValue={nickname}
          required
          placeholder="닉네임"
          className="bg-lime-400 h-10 rounded"
        />
        <input
          type="password"
          name="password"
          defaultValue={password}
          className="bg-lime-400 h-10 rounded"
          placeholder="비밀번호"
          required
        />
        <input
          type="text"
          className="bg-lime-400 h-10 rounded col-span-2"
          placeholder="레시피 제목"
          name="title"
          defaultValue={title}
          required
        />
        <textarea
          name="description"
          className="bg-lime-400 h-20 rounded col-span-2"
          placeholder="요리소개"
          defaultValue={description}
        ></textarea>
        <input
          type="text"
          className="bg-lime-400 h-10 rounded"
          placeholder="요리시간(분)"
          name="minute"
          defaultValue={minute}
        />
        <select
          className="bg-lime-400 h-10 rounded"
          placeholder="난이도"
          name="star"
          defaultValue={star}
        >
          <option defaultValue="">난이도</option>
          <option defaultValue="1">1</option>
          <option defaultValue="2">2</option>
          <option defaultValue="3">3</option>
        </select>
        <span className="text-lg text-lime-400">메인사진</span>
        <input type="file" name="file" required />
      </div>
    </>
  );
}

export default Upper;
