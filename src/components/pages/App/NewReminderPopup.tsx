import { forwardRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TimePicker from "../../bases/TimePicker";

interface NewReminderPopupProps {
  closeModal: () => void;
}

type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface FormDataTypeBase {
  time: {
    hours: number;
    minutes: number;
  };
}

interface FormDataTypeDaily extends FormDataTypeBase {
  frequency: "daily";
}

interface FormDataTypeWeekly extends FormDataTypeBase {
  frequency: "weekly";
  daysOfWeek: DayOfWeek[];
}

type FormDataType = FormDataTypeDaily | FormDataTypeWeekly;

const initialFormData: FormDataType = {
  frequency: "daily",
  time: {
    hours: 0,
    minutes: 0,
  },
};

const NewReminderPopup = forwardRef<HTMLDialogElement, NewReminderPopupProps>(
  function NewReminderPopup(props, ref) {
    const { register, handleSubmit } = useForm();

    const [formData, setFormData] = useState<FormDataType>(initialFormData);

    const onSubmit: SubmitHandler<FormDataType> = (data) => console.log(data);

    console.log(formData);

    return (
      <dialog ref={ref} className="relative overflow-scroll">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-center text-xl font-medium leading-6 text-gray-900">
                  Create a new reminder
                </h3>
                <div className="flex flex-grow flex-col gap-6 bg-white">
                  <div>
                    <label
                      htmlFor="frequency"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Frequency
                    </label>
                    <div className="mt-1 flex gap-1">
                      <select
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        {...register("frequency", { required: true })}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                  {formData["frequency"] === "weekly" && (
                    <div>
                      <label htmlFor="days-of-week">Days</label>
                      <div className="mt-1 flex gap-1">
                        <select
                          className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                          multiple={true}
                          {...register("daysOfWeek", { required: true })}
                        >
                          <option value="sunday">Sunday</option>
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                          <option value="saturday">Saturday</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <div>
                    <label htmlFor="time">Time</label>
                    <TimePicker
                      time={formData["time"]}
                      setTime={(minutes, hours) =>
                        setFormData((prev) => ({
                          ...prev,
                          time: { hours, minutes },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  //   disabled={props.isLoading}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    props.closeModal();
                  }}
                  //   disabled={props.isLoading}
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

export default NewReminderPopup;
