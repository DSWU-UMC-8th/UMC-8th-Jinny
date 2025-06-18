import { useMemo, useState } from "react";
import TextInput from "../components/TextInput";
import { findPrimeNumbers } from "../utils/math";

const UseMemoPage = () => {
  console.log("UseMemoPage rendered");

  const [limit, setLimit] = useState<number>(0);
  const [text, setText] = useState("");

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const primes = useMemo(() => findPrimeNumbers(limit), [limit]);

  return (
    <div className="flex flex-col gap-4 h-dvh">
      <h1 className="text-2xl">같이 배우는 리액트 useMemo</h1>
      <label>
        숫자 입력 (소수 찾기):
        <input
          value={limit}
          className="border border-blue-500 rounded-lg p-4"
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </label>

      <h2>소수 리스트:</h2>
      <div className="flex flex-wrap gap-2">
        {primes.map((prime) => (
          <div key={prime}>{prime}</div>
        ))}
      </div>

      <label>
        {text}
        다른 입력 테스트: <TextInput onChange={handleChangeText} />
      </label>
    </div>
  );
};

export default UseMemoPage;

// useMemo
// 역할: 연산 결과를 캐싱 (값)
// 언제 사용?: 비싼 연산 작업 (배열 정렬,필터링, 복잡한 계산) 최적화 할 때 사용
