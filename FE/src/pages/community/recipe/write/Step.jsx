/* eslint-disable no-unused-vars */
import { FileUploader } from "../../common/FileUploader";

function Step({ content, idx }) {
  return (
    <div className="my-4">
      <span className="text-lg font-bold">Step {idx + 1}</span>
      <FileUploader content={content} />
    </div>
  );
}

export default Step;
