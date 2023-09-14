import { ModalContainer } from "./ui/ModalContainer";

//TODO: add more props accordingly
interface IPortfolioModal {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal = ({ isOpen, onClose }: IPortfolioModal) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div>Portfolio</div>
    </ModalContainer>
  );
};
