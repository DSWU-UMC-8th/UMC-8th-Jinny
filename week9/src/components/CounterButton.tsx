import { useCounterActions } from "../stores/counterStore";

const CounterButton = () => {
  // 가독성 좋음
  // 모든 상태 관리 라이브러리에서도 동일한 패턴을 적용할 수 있음
  const { increment, decrement } = useCounterActions();

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={increment}
          className="border rounded-sm p-2 border-blue-400 cursor-pointer"
        >
          증가
        </button>
        <button
          onClick={decrement}
          className="border rounded-sm p-2 border-blue-400 cursor-pointer"
        >
          감소
        </button>
      </div>
    </>
  );
};

export default CounterButton;
