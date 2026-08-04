import api from "./services/api";

function App() {

  const generateApplication = async () => {
    try {
      const response = await api.post("/generate", {
        prompt: "Créer une application e-commerce"
      });

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <h1>NLP IA Agent</h1>

      <button onClick={generateApplication}>
        Générer Application
      </button>
    </>
  );
}

export default App;