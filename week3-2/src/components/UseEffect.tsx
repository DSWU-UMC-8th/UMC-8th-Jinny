import { useEffect, useState } from "react";

const UseEffect = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);

    // console.log("setState", count); // 업데이트 되기 전 값이 출력됨
  };

  useEffect(() => {
    // 실행하고 싶은 코드
    console.log("count", count);

    // (optional) return function
    // cleanup function

    return () => {
      console.log("cleanup function");
    };
  }, [count]); // 의존성 배열 (dependency array)

  return (
    <>
      <h3>{count}</h3>
      <button onClick={handleIncrease}>+</button>
    </>
  );
};

export default UseEffect;
