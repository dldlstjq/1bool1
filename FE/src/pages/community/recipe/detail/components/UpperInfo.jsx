/* eslint-disable no-unused-vars */

function UpperInfo({ photo, star, title, minute, modifiedDate, nickname }) {
  return (
    <>
      <img src={photo} alt="" className="main-photo w-3/4 mx-auto" />
      <div className="flex justify-between mb-3">
        <div>
          <h1>
            <span className="text-lg font-bold text-purple-900">
              {nickname}{" "}
            </span>
            님의
          </h1>
          <span className="text-lg font-bold text-purple-900"> {title}</span>
        </div>
        <div id="icons" className="flex justify-end items-center">
          <img src="/images/bookmark.png" alt="" className="w-6" />
          <img src="/images/share.png" alt="" className="w-8" />
        </div>
      </div>
      <div className="inline-block w-1/2">
        난이도
        {[...Array(star)].map((e, i) => (
          <img
            src="/images/star.png"
            alt=""
            key={i}
            className="w-5 inline-block"
          />
        ))}
      </div>
      소요시간 : {minute}분<p> 수정일자 {modifiedDate?.split(".")[0]}</p>
    </>
  );
}

export default UpperInfo;
