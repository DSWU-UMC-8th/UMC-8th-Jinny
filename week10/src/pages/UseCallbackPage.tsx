import { useCallback, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

const UseCallbackPage = () => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleIncreaseCount = useCallback(
    (number: number) => {
      setCount(count + number);
    },

    // 빈 배열은 이 함수가 처음 한 번만 만들어져야 함
    // 함수 내부에서 count 값은 0으로 기억하고 있음
    // 두번째 클릭을 해도, 0 + 10 이 되어서 값이 변하지 않음
    // 첫 번째 클릭도 0 + 10
    // 두 번째 클릭도 0 + 10
    [count]
  );

  const handleText = useCallback((text: string) => {
    setText(text);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">같이 배우는 리액트 useCallback</h1>
      <h2>Count: {count}</h2>
      <CountButton onClick={handleIncreaseCount}></CountButton>
      <h2>Text</h2>
      <div className="flex flex-col">
        <span>{text}</span>
        <TextInput onChange={handleText}></TextInput>
      </div>
    </div>
  );
};

export default UseCallbackPage;

// 주의
// 1. 의존성 배열을 신중하게 설정
//    -> 만약 count를 넣지 않으면 최신 값이 반영되지 않을 수 있었다.
//    -> 너무 많은 변수를 넣은 경우는, 최적화 효과가 사라질 수 있다.

// 2. useCallback TradeOff
//    -> useCallback 함수가 메모리에 저장되기 때문에, 메모리를 많이 사용한다.
//    -> 정말 필요할 때 사용하는 것이 좋다.
