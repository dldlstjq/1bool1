/* eslint-disable no-unused-vars */
function Recipe({ data }) {
  const photos = data.photo?.split(",");
  return (
    <div className="">
      <img
        src={photos && photos[0]}
        alt=""
        id={data.id}
        className="main-photo"
      />
      <h1 className="text-center keep-all" id={data.id}>
        {data.nickname}님의 {data.title}
      </h1>
      <p className="text-center">평가:10/10</p>
      <div className="flex justify-center">
        <div className="w-7">
          <img src="/level.png" alt="" className="" />
        </div>
        초급
        <div className="w-5 ml-3">
          <img src="/clock.png" alt="" className="" />
        </div>
        30분
      </div>
    </div>
  );
}

export default Recipe;
