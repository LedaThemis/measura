import { forwardRef } from "react";
import toast from "react-hot-toast";
import { convertUnit } from "../../../utils/convertUnits";
import measurementTypesDBUnits from "../../../utils/measurementTypesDBUnits";
import measurementTypesUserUnits from "../../../utils/measurementTypesUserUnits";
import { trpc } from "../../../utils/trpc";
import EntryPopupBase, {
  IErrorType,
  IFormData,
} from "../../bases/EntryPopupBase";

interface NewEntryPopupProps {
  closeModal: () => void;
}

const NewEntryPopup = forwardRef<HTMLDialogElement, NewEntryPopupProps>(
  function NewEntryPopup(props, ref) {
    const mutation = trpc.measurements.createMeasurement.useMutation();

    const handleSubmit = (
      formData: IFormData,
      updateErrors: (error: IErrorType) => void
    ) => {
      const date = new Date(
        formData["date"].getFullYear(),
        formData["date"].getMonth(),
        formData["date"].getDate(),
        formData["time"]["hours"],
        formData["time"]["minutes"]
      );

      const convertedValue = convertUnit(
        formData["value"],
        formData["type"].toLowerCase(),
        measurementTypesUserUnits,
        measurementTypesDBUnits
      );

      const mutationPayload = {
        type: formData["type"],
        value: convertedValue,
        date,
      };

      mutation.mutate(mutationPayload, {
        onSuccess: () => {
          updateErrors({});
          props.closeModal();
        },
        onError(error) {
          if (error.data?.zodError) {
            updateErrors({
              ...error.data?.zodError?.fieldErrors,
            });
          } else {
            toast.error(`Something went wrong! ${error.message}`);
          }
        },
      });
    };

    return (
      <EntryPopupBase
        ref={ref}
        title="Create a new entry"
        closeModal={props.closeModal}
        submitButtonText="Create"
        cancelButtonText="Cancel"
        onSubmit={handleSubmit}
        isLoading={mutation.isLoading}
      />
    );
  }
);

export default NewEntryPopup;
