import Button from "../Button/Button";

const Home = () => {
  return (
    <div className="home">
      <h1>Music Genre Predictor</h1>
      <p>Go ahead and upload a song to predict its genre!</p>
      <Button variant="primary" onClick={() => console.log("hello world!")}>
        Hello world!
      </Button>
    </div>
  );
};

export default Home;
