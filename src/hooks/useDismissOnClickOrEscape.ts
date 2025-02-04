
import { useEffect, useRef } from "react";

export type ClickOrEscapeProps<T extends HTMLElement> = {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen?: VoidFunction;
};

export default function useDismissOnClickOrEscape<T extends HTMLElement>({
  isOpen,
  onClose,
}: ClickOrEscapeProps<T>) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const isHtmlElmentDetected = ref.current && !ref.current.contains(event.target as Node);

      if (isHtmlElmentDetected) onClose();
      
    }

    function handleEscPress(event: KeyboardEvent) {
      
      if (event.key === "Escape") onClose();

    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [isOpen, onClose, ref]);

  return {
    ref,
    isOpen,
    onClose,
  };
}
