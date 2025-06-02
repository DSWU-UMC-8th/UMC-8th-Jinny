import { useModalActions, useModalInfo } from "../hooks/useModal";
import { useCartActions } from "../hooks/useCartStore";

const Modal = () => {
  const { isOpen } = useModalInfo();
  const { closeModal } = useModalActions();
  const { clearCart } = useCartActions();

  if (!isOpen) return null; // 모달 닫혀있는 경우 -> 렌더링 X

  const handleClickYes = () => {
    clearCart();
    closeModal();
  };

  const handleClickNo = () => {
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-500 p-6 rounded-sm shadow-md flex flex-col items-center justify-center">
          <p className="font-bold mb-4">정말 삭제하시겠습니까?</p>
          <div className="flex gap-4">
            <button
              onClick={handleClickNo}
              className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
            >
              아니오
            </button>
            <button
              onClick={handleClickYes}
              className="bg-red-500 px-4 py-2 text-white rounded cursor-pointer hover:bg-red-600"
            >
              네
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
