import { useRef } from "react";
import ButtonBase from "../../bases/ButtonBase";
import NewEntryPopup from "./NewEntryPopup";

const NewEntryButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="mx-4 my-10 flex flex-grow">
      <ButtonBase
        full={true}
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        New entry
      </ButtonBase>
      <NewEntryPopup
        ref={dialogRef}
        closeModal={() => {
          dialogRef.current?.close();
        }}
      />
    </section>
  );
};

export default NewEntryButton;
