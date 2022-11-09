import { useRef } from "react";
import ButtonBase from "../../bases/ButtonBase";
import NewReminderPopup from "./NewReminderPopup";

const NewReminderButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="mx-4 my-10 flex flex-grow">
      <ButtonBase
        full={true}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        New reminder
      </ButtonBase>
      <NewReminderPopup
        ref={dialogRef}
        closeModal={() => {
          dialogRef.current?.close();
        }}
      />
    </section>
  );
};

export default NewReminderButton;
