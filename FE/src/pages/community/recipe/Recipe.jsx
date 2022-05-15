/* eslint-disable no-unused-vars */
function Recipe({ recipe }) {
  const { id, title, photo, nickname, minute, star } = recipe;

  const photos = photo?.split(",");
  return (
    <div className="text-center border-2 border-purple-900 rounded pt-4">
      <img
        src={photos && photos[0]}
        alt=""
        id={id}
        className="main-photo w-3/4 mx-auto"
      />
      <h1 className="text-center" id={id} style={{ wordBreak: "keep-all" }}>
        <span className="text-purple-900 font-bold">{nickname} </span>님의
        <span className="text-purple-900 font-bold"> {title}</span>
      </h1>
      <div className="flex justify-center">
        <div className="w-7">
          <img src="/images/level.png" alt="" />
        </div>
        {star}
        <div className="w-5 ml-3">
          <img src="/images/clock.png" alt="" />
        </div>
        {minute}
      </div>
    </div>
  );
}

export default Recipe;
