import { useState } from "react";

import "./Home.css";
import firebaseService from "../../services/firebase/firebase";

import Button from "../Button/Button";
import ToggleButton from "../ToggleButton/ToggleButton";
import ToggleButtonGroup from "../ToggleButtonGroup/ToggleButtonGroup";
import Dropzone from "../Dropzone/Dropzone";
import UploadedFiles from "../UploadedFiles/UploadedFiles";
import ProgressBar from "../ProgressBar/ProgressBar";

const Home = () => {
  const [file, setFile] = useState(null);
  const [models, setModels] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [task, setTask] = useState(null);

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleToggle = (active) => {
    setModels(active);
  };

  const handleUpload = () => {
    setTask("Uploading file to storage service...");

    if (file) {
      firebaseService.uploadFile(
        file,
        (progress) => {
          setUploadProgress(progress);
        },
        (downloadURL) => {
          console.log(downloadURL);
          setTask("File uploaded successfully!");
        },
        (error) => {
          console.log(error);
          setTask("Error uploading file!");
        }
      );
    }
  };

  return (
    <div className="home">
      <h1>Music Genre Classifier</h1>
      <p>Go ahead and upload a song to determine its genre!</p>
      <Dropzone onDrop={handleDrop} />

      {file && (
        <>
          <p>
            <strong>Selected File</strong>
          </p>
          <UploadedFiles files={[file]} removeFile={handleRemoveFile} />

          <p>Now select the models to classify the song with:</p>
          <ToggleButtonGroup value={models} onChange={handleToggle} required>
            <ToggleButton value="mlp" variant="secondary" outline>
              MLP Neural Network
            </ToggleButton>
            <ToggleButton value="knn" variant="secondary" outline>
              K-Nearest Neighbors
            </ToggleButton>
            <ToggleButton value="svm" variant="secondary" outline>
              Support Vector Machine
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="upload-bar">
            {task ? (
              <Button variant="primary" onClick={handleUpload} disabled>
                Upload
              </Button>
            ) : (
              <Button variant="primary" onClick={handleUpload}>
                Upload
              </Button>
            )}

            <ProgressBar progress={uploadProgress} />
          </div>

          <p>{task}</p>
        </>
      )}
    </div>
  );
};

export default Home;
