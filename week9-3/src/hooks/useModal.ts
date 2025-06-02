import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  actions: ModalActions;
}

export const useModal = create<ModalState>()(
  immer((set) => ({
    isOpen: false,
    actions: {
      openModal: () => {
        set((state) => {
          state.isOpen = true;
        });
      },
      closeModal: () => {
        set((state) => {
          state.isOpen = false;
        });
      },
    },
  }))
);

export const useModalInfo = () =>
  useModal(
    useShallow((state) => ({
      isOpen: state.isOpen,
    }))
  );
export const useModalActions = () => useModal((state) => state.actions);
