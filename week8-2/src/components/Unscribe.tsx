import useDeleteUser from "../hooks/mutations/useDeleteUser";

interface UnscribeProps {
  onClose: () => void;
}

const Unscribe = ({ onClose }: UnscribeProps) => {
  const { mutate } = useDeleteUser();

  const handleUnscribe = () => {
    mutate();
  };

  return (
    <div className="bg-white w-md h-md p-4 rounded-sm flex flex-col items-center justify-center absolute top-[35%] left-[33%] z-100 m-auto">
      <button className="flex justify-end w-full cursor-pointer" onClick={onClose}>
        ✖️
      </button>
      <h3 className="font-bold text-lg mt-[40px] mb-[40px]">정말 탈퇴하시겠습니까?</h3>

      <div className="flex w-3/4 gap-4">
        <button
          className=" bg-[#ED0086] text-white rounded-sm cursor-pointer hover:bg-[#bf016d] transition duration-300 ease-in-out w-1/2 p-1"
          onClick={handleUnscribe}
        >
          예
        </button>
        <button
          onClick={onClose}
          className=" bg-[#ED0086] text-white rounded-sm cursor-pointer hover:bg-[#bf016d] transition duration-300 ease-in-out w-1/2 p-1"
        >
          아니오
        </button>
      </div>
    </div>
  );
};

export default Unscribe;
