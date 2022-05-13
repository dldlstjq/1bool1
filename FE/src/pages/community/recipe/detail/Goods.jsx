/* eslint-disable no-unused-vars */
function Goods({ goods }) {
  return (
    <>
      <h1 className="text-xl">재료</h1>
      <div className="grid grid-cols-3">
        {goods.map(({ goods_photo }, i) => (
          <img src={goods_photo} key={i} alt="" />
        ))}
      </div>
    </>
  );
}

export default Goods;
