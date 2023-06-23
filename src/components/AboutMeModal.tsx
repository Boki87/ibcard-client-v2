import { ModalContainer } from "./ui/ModalContainer";

interface IAboutMeModal {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutMeModal = ({ isOpen, onClose }: IAboutMeModal) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div>About Me</div>
    </ModalContainer>
  );
};
