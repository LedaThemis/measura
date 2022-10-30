import { Measurement } from "@prisma/client";
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

interface UpdateEntryPopupProps {
  closeModal: () => void;
  measurement: Measurement;
}

const UpdateEntryPopup = forwardRef<HTMLDialogElement, UpdateEntryPopupProps>(
  function UpdateEntryPopup(props, ref) {
    const mutation = trpc.measurements.updateMeasurement.useMutation();

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
        id: props.measurement.id,
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
        title="Update entry"
        closeModal={props.closeModal}
        submitButtonText="Update"
        cancelButtonText="Cancel"
        onSubmit={handleSubmit}
        isLoading={mutation.isLoading}
        initialData={{
          type: props.measurement.type,
          date: props.measurement.date,
          value: convertUnit(
            props.measurement.value,
            props.measurement.type.toLowerCase(),
            measurementTypesDBUnits,
            measurementTypesUserUnits
          ),
          time: {
            hours: props.measurement.date.getHours(),
            minutes: props.measurement.date.getMinutes(),
          },
        }}
      />
    );
  }
);

export default UpdateEntryPopup;
