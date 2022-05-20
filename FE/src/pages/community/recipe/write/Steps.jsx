/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import Step from "./Step";

function Steps({ content }) {
  const [stepContent, setStepContent] = useState([""]);

  useEffect(() => {
    if (content) {
      setStepContent(JSON.parse(content));
    }
  }, [content]);

  return (
    <div className=" p-4 rounded" style={{backgroundColor:'#ffe2e180'}}>
      <h1 className="text-lg font-bold">요리순서</h1>
      {stepContent.map((content, idx) => (
        <Step content={content} idx={idx} key={idx} />
      ))}
      <button
        type="button"
        className="h-10 w-20 mt-5 bg-lime-500/75 rounded text-white"
        onClick={() => setStepContent([...stepContent, ""])}
      >
        Step 추가
      </button>
      <button
        type="button"
        className="h-10 w-20 mt-5 bg-red-500/75 rounded text-white ml-2"
        onClick={() => setStepContent(stepContent.slice(0, -1))}
      >
        Step 제거
      </button>
    </div>
  );
}

export default Steps;
