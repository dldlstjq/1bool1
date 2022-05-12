import React, { useRef, useState, useCallback } from "react";

/* eslint-disable no-unused-vars */
export const FileUploader = ({ step }) => {
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
        name={"desc" + step}
        className="border-black h-40 grow resize-none"
      ></textarea>
      <div className="inline-block h-40 w-40 cursor-pointer">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full"
          onClick={handleClick}
        />
      </div>
      <input
        type="file"
        className="hidden"
        ref={fileInput}
        accept="image/png, image/jpeg, image/gif"
        onChange={handleFileChange}
        name={"image" + step}
      />
    </div>
  );
};
