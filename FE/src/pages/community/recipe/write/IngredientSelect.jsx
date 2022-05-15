/* eslint-disable no-unused-vars */
import { useState } from "react";

import { useFetchList } from "../../common/hooks";

function IngredientSelect({ selected, setSelected }) {
  const convList = ["CS", "cu", "EM", "GS", "MS", "SE"];
  const [conv, setConv] = useState("CS");
  const ingredients = useFetchList("goods/convinence?con=" + conv);

  function handleInputChange(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      for (let el of ingredients) {
        if (el.name === e.target.value) {
          setSelected([...selected, { name: el.name, goodsId: el.id }]);
          e.target.value = "";
          break;
        }
      }
    }
  }
  function removeFromList({ target }) {
    if (target.matches("span"))
      setSelected(selected.filter((el) => el.goodsId !== parseInt(target.id)));
  }

  return (
    <div className="bg-lime-400 p-4 rounded my-1">
      <h1 className="text-lg text-purple-900 font-bold">재료</h1>

      <select
        name="conv"
        onChange={(e) => setConv(e.target.value)}
        className="bg-purple-900 h-10 rounded-l text-lime-400"
      >
        {convList.map((conv, idx) => (
          <option value={conv} key={idx}>
            {conv}
          </option>
        ))}
      </select>
      <input
        type="search"
        list="item-list"
        onKeyDown={handleInputChange}
        className="bg-purple-900 h-10 rounded-r ml-px text-lime-400"
      />
      <datalist id="item-list">
        {ingredients?.map(({ name }, idx) => (
          <option value={name} key={idx} />
        ))}
      </datalist>
      <div className="grid grid-cols-2 gap-1" onClick={removeFromList}>
        {selected.map(({ name, goodsId }, idx) => (
          <span key={idx} id={goodsId} className="text-purple-900">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default IngredientSelect;
