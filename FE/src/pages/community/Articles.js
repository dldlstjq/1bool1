import { useState } from "react";

const articles = [];
for (let i = 0; i < 10; i++) {
  articles.push({
    title: `title${i}`,
    content: "content  dasdasdcontentc on",
    author: `user${i}`,
    date: Date(),
  });
}

export default function Articles() {
  return (
    <ul style={{ listStyle: "none" }}>
      {articles.map((a, idx) => (
        <li key={idx}>
          <h3>{a.title}</h3>
          <p>{a.content}</p>
          {a.author} {a.date}
        </li>
      ))}
    </ul>
  );
}
