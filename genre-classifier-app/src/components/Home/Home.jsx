import { useState } from "react";

import "./Home.css";
import firebaseService from "../../services/firebase/firebase";

import Button from "../Button/Button";
import Dropzone from "../Dropzone/Dropzone";
import UploadedFiles from "../UploadedFiles/UploadedFiles";
import ToggleButtonGroup from "../ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "../ToggleButton/ToggleButton";
import ProgressBar from "../ProgressBar/ProgressBar";

const Home = () => {
  const [file, setFile] = useState(null);
  const [genre, setGenre] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [task, setTask] = useState(null);

  const genres = [
    "blues",
    "classical",
    "country",
    "disco",
    "hiphop",
    "jazz",
    "metal",
    "pop",
    "reggae",
    "rock",
  ];

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleGenreChange = (genre) => {
    setGenre(genre);
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

          <ToggleButtonGroup
            value={genre}
            onChange={handleGenreChange}
            exclusive
            required
          >
            {genres.map((genre) => (
              <ToggleButton key={genre} value={genre}>
                {genre}
              </ToggleButton>
            ))}
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
