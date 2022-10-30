import { useRef } from "react";
import NewEntryPopup from "./NewEntryPopup";

const NewEntryButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <section className="mx-4 my-10 flex flex-grow">
      <button
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-lg text-white hover:bg-blue-600"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        New entry
      </button>
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
