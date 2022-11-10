import { useState } from "react";

import Button from "../Button/Button";
import ToggleButton from "../ToggleButton/ToggleButton";
import ToggleButtonGroup from "../ToggleButtonGroup/ToggleButtonGroup";
import Dropzone from "../Dropzone/Dropzone";
import UploadedFiles from "../UploadedFiles/UploadedFiles";

const Home = () => {
  const [file, setFile] = useState(null);
  const [models, setModels] = useState([]);

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
            <ToggleButton value="mlp" outline>
              MLP Neural Network
            </ToggleButton>
            <ToggleButton value="knn" outline>
              K-Nearest Neighbors
            </ToggleButton>
            <ToggleButton value="svm" outline>
              Support Vector Machine
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="primary"
            size="lg"
            onClick={() => console.log("hello world!")}
            style={{ marginTop: "1rem" }}
          >
            Upload
          </Button>
        </>
      )}
    </div>
  );
};

export default Home;
