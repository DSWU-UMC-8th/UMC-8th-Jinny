import ButtonGroup from "./components/ButtonGroup";
import { useCount } from "./context/CounterProvider";

function App() {
  // const context = useContext(CounterContext); // CounterProvider에서 전달한 값 가져옴
  const { count } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup />
    </>
  );
}

export default App;
