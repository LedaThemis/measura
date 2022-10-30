import { Measurement } from "@prisma/client";
import { useRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import DeleteEntryPopup from "./DeleteEntryPopup";

interface DeleteEntryButtonProps {
  measurementId: Measurement["id"];
}

const DeleteEntryButton = ({ measurementId }: DeleteEntryButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-lg text-white hover:bg-blue-600"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <BsTrashFill aria-hidden="true" />
        <span className="sr-only">Delete entry</span>
      </button>
      <DeleteEntryPopup
        ref={dialogRef}
        measurementId={measurementId}
        closeModal={() => dialogRef.current?.close()}
      />
    </div>
  );
};
export default DeleteEntryButton;
