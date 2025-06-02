import { useReducer, useState, type ChangeEvent } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}

function reducer(state: IState, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError ? "거부권 행사가능, 카드메이커만 입력 가능합니다." : null,
      };
    }
    default:
      return state;
  }
}

const UseReducerCompany = () => {
  const [state, dispatch] = useReducer(reducer, {
    department: "Software Developer",
    error: null,
  });

  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl">{state.department}</h1>
      {state.error && <p className="text-red-500">{state.error}</p>}

      <div className="flex gap-4">
        <input
          className="w-[600px] border mt-10 p-3 rounded-md "
          value={department}
          onChange={handleChangeDepartment}
          placeholder="변경하시고 싶은 직무를 입력해주세요.단 거부권 행사 가능"
        />

        <button
          onClick={() => dispatch({ type: "CHANGE_DEPARTMENT", payload: department })}
          className="cursor-pointer mt-10 border border-blue-100 rounded-sm p-2 border-[2px]"
        >
          직무 변경하기
        </button>
      </div>
    </div>
  );
};

export default UseReducerCompany;
