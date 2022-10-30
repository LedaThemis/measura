import { Measurement } from "@prisma/client";
import { forwardRef } from "react";
import toast from "react-hot-toast";
import { trpc } from "../../../utils/trpc";

interface DeleteEntryPopupProps {
  closeModal: () => void;
  measurementId: Measurement["id"];
}

const DeleteEntryPopup = forwardRef<HTMLDialogElement, DeleteEntryPopupProps>(
  function UpdateEntryPopup(props, ref) {
    const mutation = trpc.measurements.deleteMeasurement.useMutation();
    const utils = trpc.useContext();

    const handleSubmit = () => {
      mutation.mutate(
        { id: props.measurementId },
        {
          onSuccess: () => {
            utils.me.getEntries.invalidate();
            utils.me.getLastMonthEntries.invalidate();
            utils.me.getLatestEntries.invalidate();
            props.closeModal();
          },
          onError: (error) => {
            toast.error(`Something went wrong! ${error.message}`);
          },
        }
      );
    };

    return (
      <dialog ref={ref} className="relative overflow-scroll">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-center text-xl font-medium leading-6 text-gray-900">
                  Delete Entry
                </h3>
                <div className="flex flex-grow flex-col gap-2 bg-white">
                  <p className="text-center text-base text-gray-700">
                    Are you sure you want to delete this entry?
                  </p>
                  <p className="text-center text-base font-bold text-red-500">
                    THIS ACTION IS IRREVERSIBLE
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={mutation.isLoading}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    props.closeModal();
                  }}
                  disabled={mutation.isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

export default DeleteEntryPopup;
