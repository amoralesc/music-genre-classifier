import { useState, useEffect } from "react";

import firebaseService from "../../services/firebase/firebase";

import AudioFile from "../AudioFile/AudioFile";

const Result = ({ result }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (result) {
        const blob = await firebaseService.downloadFile(result.storagePath);
        const file = new File([blob], result.fileName, { type: blob.type });
        setFile(file);
      }
    };
    fetchFile();
  }, [result, setFile]);

  if (!result) return null;

  return (
    <div className="result">
      <h2>Classification Result</h2>
      {file && <AudioFile file={file} />}
    </div>
  );
};

export default Result;
