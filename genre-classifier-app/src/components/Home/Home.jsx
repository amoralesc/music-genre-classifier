import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import firebaseService from "../../services/firebase/firebase";
import modelService from "../../services/api/model";

import Button from "../Button/Button";
import Dropzone from "../Dropzone/Dropzone";
import UploadedFiles from "../UploadedFiles/UploadedFiles";
import ToggleButtonGroup from "../ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "../ToggleButton/ToggleButton";
import ProgressBar from "../ProgressBar/ProgressBar";

const Home = () => {
  const navigate = useNavigate();

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
      setUploadProgress(0);
      setGenre([]);
      setTask(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleGenreChange = (genre) => {
    setGenre(genre);
  };

  const handlePredict = async (downloadURL) => {
    const data = {
      fileUrl: downloadURL,
      userGenres: genre,
    };
    const resultId = await modelService.predict(data);
    navigate(`/results/${resultId}`);
  };

  const handleUpload = async () => {
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

          handlePredict(downloadURL);
        },
        (error) => {
          console.log(error);
          setTask("Something went wrong...");
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

          <p>What genre do you think this song is? Select all that apply.</p>
          <ToggleButtonGroup value={genre} onChange={handleGenreChange}>
            {genres.map((genre) => (
              <ToggleButton key={genre} value={genre} variant="secondary">
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
