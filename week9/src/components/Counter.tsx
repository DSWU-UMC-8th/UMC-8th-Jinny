import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../stores/counterStore";
import CounterButton from "./CounterButton";

const Counter = () => {
  const { count } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
    }))
  );

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl">{count}</h1>
      <CounterButton />
    </div>
  );
};

export default Counter;
