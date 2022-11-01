import { Measurement } from "@prisma/client";
import { useRef } from "react";
import { BsPencilFill } from "react-icons/bs";
import UpdateEntryPopup from "./UpdateEntryPopup";

interface UpdateEntryButtonProps {
  measurement: Measurement;
}

const UpdateEntryButton = ({ measurement }: UpdateEntryButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-lg text-white hover:bg-blue-700"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <BsPencilFill aria-hidden="true" />
        <span className="sr-only">Update entry</span>
      </button>
      <UpdateEntryPopup
        ref={dialogRef}
        measurement={measurement}
        closeModal={() => {
          dialogRef.current?.close();
        }}
      />
    </div>
  );
};
export default UpdateEntryButton;
