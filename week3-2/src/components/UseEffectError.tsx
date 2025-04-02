import { useEffect, useState } from "react";

const UseEffectError = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrease = () => {
    setCounter((counter) => counter + 1);
  };

  useEffect(() => {
    // 1. 초기 렌더링 시작 (counter ++)
    // setCounter((counter) => counter + 1); // 무한 증가
    // 2. counter 값이 변경될 때마다 실행행
  }, [counter]);
  // 1번과 2번 과정이 반복해서 일어남 -> 무한 렌더링 사태
  // 이런식으로 코드를 작성하면 X

  return <div onClick={handleIncrease}>{counter}</div>;
};

export default UseEffectError;
