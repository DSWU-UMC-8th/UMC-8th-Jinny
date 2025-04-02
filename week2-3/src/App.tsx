import { useState } from "react";
import "./App.css";

// function heavyComputation(): number {
//   let result = 0;
//   for (let i = 0; i < 1_000_000; i++) {
//     result += 1;
//   }
//   return result;
// }

function App() {
  const [count, setCount] = useState(0);
  // const [count, setCount] = useState(() => heavyComputation());

  const handleValue = (value: number): void => {
    setCount((prev): number => prev + value);

    console.log(count);
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => handleValue(+1)}>증가</button>
      <button onClick={() => handleValue(-1)}>감소</button>
    </>
  );
}

export default App;
