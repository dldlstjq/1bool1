const btnclass = "text-fuchsia-900 w-20 h-10 bg-lime-500 font-bold font-sans ";

const btnclassActive =
  "text-lime-500 w-20 h-10 bg-fuchsia-900 font-bold font-sans ";

function Recipes() {
  return (
    <div>
      <button className={btnclass}>인기</button>
      <button className={btnclassActive}>최신</button>
    </div>
  );
}

export default Recipes;
