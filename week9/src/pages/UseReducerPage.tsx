import { useReducer, useState } from "react";

// 1. state에 대한 interface
interface IState {
  counter: number;
}

// 2. reducer에 대한 interface
interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload?: number;
}

function reducer(state: IState, action: IAction) {
  const { type } = action;
  switch (type) {
    case "INCREASE": {
      return {
        ...state, // 원본 값 유지 중요
        counter: state.counter + 1,
      };
    }
    case "DECREASE": {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    case "RESET_TO_ZERO": {
      return {
        ...state,
        counter: 0,
      };
    }
    default:
      return state;
  }
}

const UseReducerPage = () => {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
  });

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <div className="flex flex-col gap-10 items-center justify-center p-4">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl">useState</h2>
        <h1>useState 훅 사용 : {count}</h1>
        <button
          onClick={handleIncrease}
          className="border rounded-sm cursor-pointer border-blue-100 p-1 border-[2px]"
        >
          Increase
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl">useReducer</h2>
        <h1>useReducer 훅 사용 : {state.counter}</h1>
        <div className="flex gap-4">
          <button
            onClick={() =>
              dispatch({
                type: "INCREASE",
              })
            }
            className="border rounded-sm cursor-pointer border-blue-100 p-1 border-[2px]"
          >
            Increase
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "DECREASE",
              })
            }
            className="border rounded-sm cursor-pointer border-blue-100 p-1 border-[2px]"
          >
            Decrease
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "RESET_TO_ZERO",
              })
            }
            className="border rounded-sm cursor-pointer border-blue-100 p-1 border-[2px]"
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseReducerPage;
