import React, { useRef, useState, useCallback } from "react";

/* eslint-disable no-unused-vars */
export const FileUploader = ({ content }) => {
  const fileInput = useRef(null);
  const [imageUrl, setImageUrl] = useState("/images/add.gif");

  function handleClick() {
    if (imageUrl === "/images/add.gif") {
      fileInput.current.click();
    } else {
      setImageUrl("/images/add.gif");
    }
  }
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file?.type.search("image") > -1) {
      setImageUrl(URL.createObjectURL(file));
    } else {
      alert("잘못된 형식의 파일입니다");
      return;
    }
  }, []);

  return (
    <div className="flex gap-2">
      <textarea
        name="step"
        className=" rounded h-36 grow resize-none"
        defaultValue={content}
        required
      ></textarea>
      <img
        src={imageUrl}
        alt=""
        className="inline-block h-36 w-36 cursor-pointer rounded"
        onClick={handleClick}
      />
      <input
        type="file"
        className="hidden"
        ref={fileInput}
        accept=".png, .jpeg, .gif, .jpg"
        onChange={handleFileChange}
        name="file"
      />
    </div>
  );
};
