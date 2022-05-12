/* eslint-disable no-unused-vars */
import { FileUploader } from "../../common/FileUploader";
import { useRef, useState } from "react";

function Step({ step, handleFileChange }) {
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   for (const inputval of data) {
  //     console.log(inputval);
  //   }
  // }

  return (
    <>
      <h2 className="text-lg mt-5">Step {step}</h2>
      <FileUploader handleFileChange={handleFileChange} step={step} />
    </>
  );
}

export default Step;
