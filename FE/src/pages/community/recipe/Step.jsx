/* eslint-disable no-unused-vars */
function Step({ step, img }) {
  console.log(step);
  return (
    <div className="py-7 border-b border-lime-400">
      <p>{step}</p>
      <img src={img} alt="" />
    </div>
  );
}

export default Step;
