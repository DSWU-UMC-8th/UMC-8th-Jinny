import "./App.css";
import Counter from "./components/Counter";
import RandomNumberGenerator from "./components/RandomNumberGenerator";
import UseReducerCompany from "./pages/UseReducerCompany";
import UseReducerPage from "./pages/UseReducerPage";

function App() {
  return (
    <>
      <UseReducerPage />
      <hr />
      <UseReducerCompany />
      <hr />
      <Counter />
      <hr />
      <RandomNumberGenerator />
    </>
  );
}

export default App;
