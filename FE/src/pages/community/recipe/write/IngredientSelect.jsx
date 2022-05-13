/* eslint-disable no-unused-vars */
import { useState } from "react";

import { useFetchListAndUpdate } from "../../common/hooks";

function IngredientSelect({ selected, setSelected }) {
  const convList = ["CS", "cu", "EM", "GS", "MS", "SE"];
  const [conv, setConv] = useState("CS");
  const ingredients = useFetchListAndUpdate("goods/convinence?con=" + conv, [
    conv,
  ]);

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
  function handleSelectedClick({ target }) {
    if (target.matches("span"))
      setSelected(selected.filter((el) => el.goodsId != target.id));
  }

  return (
    <div className="bg-green-100 p-4">
      <h1 className="text-lg">재료</h1>

      <select name="conv" id="" onChange={(e) => setConv(e.target.value)}>
        {convList.map((conv, idx) => (
          <option value={conv} key={idx}>
            {conv}
          </option>
        ))}
      </select>
      <input type="search" list="item-list" onKeyDown={handleInputChange} />
      <datalist id="item-list">
        {ingredients?.map(({ name }, idx) => (
          <option value={name} key={idx} />
        ))}
      </datalist>
      <div className="grid grid-cols-2 gap-1" onClick={handleSelectedClick}>
        {selected.map(({ name, goodsId }, idx) => (
          <span key={idx} id={goodsId}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default IngredientSelect;
