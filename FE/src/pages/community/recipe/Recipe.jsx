/* eslint-disable no-unused-vars */
function Recipe({ recipe }) {
  const { id, title, photo, nickname, minute, star } = recipe;

  const photos = photo?.split(",");
  return (
    <div className="text-center">
      <img
        src={photos && photos[0]}
        alt=""
        id={id}
        className="main-photo w-2/3 mx-auto"
      />
      <h1 className="text-center keep-all" id={id}>
        {nickname}님의 {title}
      </h1>
      {/* <p className="text-center">평가:10/10</p> */}
      <div className="flex justify-center">
        <div className="w-7">
          <img src="/images/level.png" alt="" className="" />
        </div>
        {star}
        <div className="w-5 ml-3">
          <img src="/images/clock.png" alt="" className="" />
        </div>
        {minute}
      </div>
    </div>
  );
}

export default Recipe;
