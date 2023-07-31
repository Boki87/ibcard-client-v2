import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

export const ModalPortal = ({ children }: { children: ReactNode }) => {
  const modalContainer = document.getElementById("modals");
  const el = document.createElement("div");

  useEffect(() => {
    modalContainer?.appendChild(el);
    return () => {
      modalContainer?.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};
