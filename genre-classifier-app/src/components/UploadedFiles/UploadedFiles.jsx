import { useAudio } from "../../hooks";
import Button from "../Button/Button";

import "./UploadedFiles.css";

const UploadedFiles = ({ files, removeFile }) => {
  const audios = files.map((file) => useAudio(URL.createObjectURL(file)));

  const handleRemoveFile = async (file, index) => {
    if (audios[index][0]) {
      await audios[index][1]();
    }
    URL.revokeObjectURL(file);
    removeFile(file);
  };

  return (
    <div className="uploaded-files">
      {files.map((file, index) => (
        <div key={file.name} className="uploaded-file">
          <div>
            {file.name} - {file.size} bytes
          </div>
          <div>
            <Button
              variant={audios[index][0] ? "info" : "success"}
              size="sm"
              onClick={audios[index][1]}
            >
              {audios[index][0] ? "pause" : "play"}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleRemoveFile(file, index)}
              style={{ marginLeft: "0.5rem" }}
            >
              remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedFiles;
