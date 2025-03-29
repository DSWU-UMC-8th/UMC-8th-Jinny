import { createContext, useState, ReactNode, useContext } from "react";

// Context 타입 정의
interface CounterContextType {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

// Context 생성 (초기값은 undefined로 설정)
// 이후 Provider에서 값을 채워주는 방식으로 구현
export const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Context Provider 생성
// Context의 데이터를 공급하는 역할
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => prev - 1);

  return (
    <CounterContext.Provider value={{ count, handleIncrement, handleDecrement }}>{children}</CounterContext.Provider>
  );
};

// Context를 쉽게 가져오는 커스텀 훅
export const useCount = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCount는 반드시 CounterProvider 내부에서 사용되어야 합니다.");
  }
  return context;
};
