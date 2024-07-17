import React, { FC, useCallback } from "react";
import { RiCloseFill } from "react-icons/ri";
import Button from "@/components/shared/Button";

interface IModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: FC<IModalProps> = ({
  isOpen,
  children,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled = false,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-neutral-700 bg-opacity-70"
      onKeyDown={(event) => {
        if (event.code === "Enter" && !disabled) {
          onSubmit();
        }
      }}
    >
      <div className="relative w-full h-full lg:w-[550px] lg:h-auto">
        <div className="relative flex flex-col w-full h-full bg-black rounded-lg shadow-lg lg:h-auto">
          <div className="flex items-center justify-between p-8">
            <h5 className="text-3xl font-semibold text-white">{title}</h5>
            <button
              onClick={handleClose}
              className="p-1 transition hover:opacity-70"
            >
              <RiCloseFill size={28} color={"#fff"} />
            </button>
          </div>
          <div className="flex-auto px-8 py-4">{body}</div>
          <div className="flex flex-col items-center text-white  rounded-full  justify-center gap-4 p-8">
            <Button
              label={actionLabel}
              disabled={disabled}
              secondary
              fullWidth
              labelSize="lg"
              labelWeight="semibold"
              onClick={handleSubmit}
            />
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
