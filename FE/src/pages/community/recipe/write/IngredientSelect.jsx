/* eslint-disable no-unused-vars */
import { height } from "@mui/system";
import { useState } from "react";
import { Container, Grid, Typography, Box, Button, TextField} from '@mui/material';
import { useFetchList } from "../../common/hooks";
import CardMedia from '@mui/material/CardMedia';

function IngredientSelect({ selected, setSelected }) {
  const convList = ["cs", "cu", "em", "gs", "ms", "se"];
  const [conv, setConv] = useState("CS");
  const ingredients = useFetchList("goods/convinence?con=" + conv);

  function handleInputChange(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      for (let el of ingredients) {
        if (el.name === e.target.value) {
          setSelected([...selected, { name: el.name, goodsId: el.id, img_link : el.photoPath, goodsPrice: el.price}]);
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
    <div className="p-4 rounded my-1" style={{backgroundColor:'#ffe5e4'}}>
      {/* e9c2c0 */}
      <h1 className="text-lg font-bold">재료</h1>

      <select
        name="conv"
        onChange={(e) => setConv(e.target.value)}
        className=" h-10 rounded-l"
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
        className=" h-10 rounded-r ml-px w-1/4"
      />
      <datalist id="item-list">
        {ingredients?.map(({ name }, idx) => (
          <option value={name} key={idx} />
        ))}
      </datalist>
      <div className="grid grid-cols-3" onClick={removeFromList}>
        {selected.map(({ name, goodsId, img_link, goodsPrice }, idx) => (
          <Box sx={{width:'400px', height:'400px', marginTop:'1rem'}}>
            <span key={idx} id={goodsId}>
              {name}
              <CardMedia
                component="img"
                alt="이미지 준비중"
                sx={{ width: '80%', height:'80%' }}
                image={img_link}
              />
              <p>{goodsPrice} 원</p>
            </span>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default IngredientSelect;
