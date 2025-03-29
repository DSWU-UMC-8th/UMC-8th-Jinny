import { useState } from "react";
import "./App.css";

function heavyComputation(): number {
  let result = 0;
  for (let i = 0; i < 1_000_000; i++) {
    result += 1;
  }
  return result;
}

function App() {
  const [count, setCount] = useState(heavyComputation);
  // const [count, setCount] = useState(() => heavyComputation());

  console.log(heavyComputation());

  const handleIncrease = (): void => {
    setCount((prev): number => prev + 1);

    console.log(count);
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>증가</button>
    </>
  );
}

export default App;
