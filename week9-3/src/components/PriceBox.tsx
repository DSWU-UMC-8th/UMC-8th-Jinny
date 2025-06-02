import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModal";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  // const handleInitializeCart = () => {
  //   dispatch(clearCart());
  // };

  const handleClickRemoveBtn = () => {
    console.log("click");

    openModal();
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleClickRemoveBtn}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
