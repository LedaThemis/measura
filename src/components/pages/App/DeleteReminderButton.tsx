import { useRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import { ReminderType } from "../../../utils/interfaces/Reminders";
import DeleteReminderPopup from "./DeleteReminderPopup";

interface DeleteReminderButtonProps {
  reminderId: ReminderType["id"];
}

const DeleteReminderButton = ({ reminderId }: DeleteReminderButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <button
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-lg text-white hover:bg-blue-700"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <BsTrashFill aria-hidden="true" />
        <span className="sr-only">Delete reminder</span>
      </button>
      <DeleteReminderPopup
        ref={dialogRef}
        reminderId={reminderId}
        closeModal={() => dialogRef.current?.close()}
      />
    </div>
  );
};
export default DeleteReminderButton;
