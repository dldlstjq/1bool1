/* eslint-disable no-unused-vars */
import { FileUploader } from "../../common/FileUploader";

function Step({ idx, content }) {
  return (
    <>
      <h2 className="text-lg mt-5">Step {idx + 1}</h2>
      <FileUploader content={content} />
    </>
  );
}

export default Step;
