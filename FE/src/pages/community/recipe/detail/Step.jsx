/* eslint-disable no-unused-vars */
function Step({ step, img, i }) {
  return (
    <div className="py-2 my-2 border-t-4 border-purple-900">
      <h2 className="text-xl">STEP {i}</h2>
      <img src={img} alt="" className="w-3/4 mx-auto" />
      <p>{step}</p>
    </div>
  );
}

export default Step;
