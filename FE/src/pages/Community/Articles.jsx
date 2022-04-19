import { useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [inputs, setInputs] = useState();

  function changeInputs(e) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  function createArticle() {
    setArticles(articles.concat(inputs));
  }

  return (
    <div>
      <input type="text" name="title" onChange={(e) => changeInputs(e)} />
      <input
        type="text"
        name="content"
        onChange={(e) => changeInputs(e)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            createArticle();
          }
        }}
      />
      <button onClick={() => createArticle()}>post</button>
      {articles.map((article, idx) => (
        <div key={idx}>
          title:{article.title} <b></b>content:{article.content}
        </div>
      ))}
    </div>
  );
}
