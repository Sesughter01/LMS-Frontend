import { X } from "lucide-react";
import React, { useEffect } from "react";
import Modal from "react-modal";
import "react-phone-input-2/lib/style.css";

// Define props types for InstructorModal
interface DisableModalProps {
  isOpen: boolean;
  onClose: () => void;
  awaitSubmit: () => void;
  secondaryColor: any;
}

const DisableModal: React.FC<DisableModalProps> = ({ isOpen, onClose, awaitSubmit, secondaryColor }) => {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New Instructor Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 w-full max-w-lg" // Tailwind CSS classes for styling
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center" // Tailwind CSS classes for overlay
    >
      {/* Your modal content goes here */}
      <div className="space-y-4 font-montserrat">
        <div onClick={onClose} className="flex cursor-pointer justify-end ">
          <X />
        </div>
        <div className="flex flex-col justify-center text-center gap-6 items-center">
          <h1 className="text-black text-2xl font-medium">Are you sure you want to disable/enable this instructor?</h1>
          <p className="text-black text-base font-medium">
            You are about to disable/enable this instructor. Click on the “confirm” button to proceed.
          </p>
          <div className="flex justify-start items-center gap-4">
            <button onClick={onClose} className="bg-[#ACACAC] rounded-lg px-4 py-2 text-white font-semibold text-base">
              Cancel
            </button>
            <button
              style={{ backgroundColor: secondaryColor }}
              className="rounded-lg px-4 py-2 text-white font-semibold text-base"
              onClick={awaitSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DisableModal;
