import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase.config";

const uploadFile = async (
  file,
  onUploadProgress,
  onUploadComplete,
  onError
) => {
  const storageRef = ref(storage, `audio/${Date.now()}-${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onUploadProgress(progress);
    },
    (error) => {
      onError(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onUploadComplete(downloadURL);
      });
    }
  );
};

const firebaseService = {
  uploadFile,
};

export default firebaseService;
