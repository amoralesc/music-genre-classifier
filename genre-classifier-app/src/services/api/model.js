const dummy = {
  status: {
    code: "SUCCESS",
    message: "The model has classified the audio file.",
  },
  fileName: "audio.wav",
  fileUrl:
    "https://firebasestorage.googleapis.com/v0/b/music-genre-classifier-c0d60.appspot.com/o/audio%2F1668211450469-blues.00000.wav?alt=media&token=b150cc14-12d6-4738-be64-b1384f8a09bd",
  storagePath: "audio/1668211450469-blues.00000.wav",
  date: "2021-07-18T12:00:00.000Z",
  prediction: {
    genre: "blues",
    probability: 0.95,
  },
};

const generateDummyId = () => {
  return Math.floor(Math.random() * 1000000000000);
};

const predict = async (_data) => {
  return { id: generateDummyId(), ...dummy };
};

const getResult = async (id) => {
  return { id, ...dummy };
};

const getResults = async () => {
  const results = [];
  for (let i = 0; i < 10; i += 1) {
    results.push({ id: generateDummyId(), ...dummy });
  }
  return results;
};

const modelService = {
  predict,
  getResult,
  getResults,
};

export default modelService;
