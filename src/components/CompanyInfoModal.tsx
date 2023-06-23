import { ModalContainer } from "./ui/ModalContainer";

//TODO: add mora props accordingly
interface ICompanyInfoModal {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyInfoModal = ({ isOpen, onClose }: ICompanyInfoModal) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <div>Company info</div>
    </ModalContainer>
  );
};
