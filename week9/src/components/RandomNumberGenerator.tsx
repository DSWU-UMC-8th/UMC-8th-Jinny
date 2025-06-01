import { useCounterStore } from "../stores/counterStore";

const RandomNumberGenerator = () => {
  // const { randomNumber, random } = useCounterStore(
  //   useShallow((state) => ({
  //     random: state.random,
  //     randomNumber: state.randomNumber,
  //   }))
  // );

  const randomNumber = useCounterStore((state) => state.randomNumber);
  const random = useCounterStore((state) => state.actions.random);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl">{randomNumber}</h1>
      <button
        onClick={random}
        className="border rounded-sm p-2 border-blue-400 cursor-pointer"
      >
        랜덤 번호 생성기{" "}
      </button>
    </div>
  );
};

export default RandomNumberGenerator;
