const dummyModel = {
  name: "MLP Neural Network",
  slug: "mlp",
  description: "A multi-layer perceptron neural network",
  createdAt: Date.now(),
};

const get = async () => {
  return dummyModel;
};

const modelService = {
  get,
};

export default modelService;
