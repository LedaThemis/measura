import { forwardRef, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  DayOfMonth,
  DayOfWeek,
  MonthOfYear,
  ReminderFrequency,
} from "../../../types/reminders";
import generateCronExpression from "../../../utils/generateCronExpression";
import { trpc } from "../../../utils/trpc";
import TimePicker from "../../bases/TimePicker";

interface NewReminderPopupProps {
  closeModal: () => void;
}

type FormDataType = {
  frequency: ReminderFrequency;
  daysOfWeek: DayOfWeek[];
  daysOfMonth: DayOfMonth[];
  monthsOfYear: MonthOfYear[];
  text: string;
};

const daysOfWeekInputOptions = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
] as const;

const daysOfMonthInputOptions = [
  { value: 1, label: "1st" },
  { value: 2, label: "2nd" },
  { value: 3, label: "3rd" },
  { value: 4, label: "4th" },
  { value: 5, label: "5th" },
  { value: 6, label: "6th" },
  { value: 7, label: "7th" },
  { value: 8, label: "8th" },
  { value: 9, label: "9th" },
  { value: 10, label: "11th" },
  { value: 12, label: "12th" },
  { value: 13, label: "13th" },
  { value: 14, label: "14th" },
  { value: 15, label: "15th" },
  { value: 16, label: "16th" },
  { value: 17, label: "17th" },
  { value: 18, label: "18th" },
  { value: 19, label: "19th" },
  { value: 20, label: "20th" },
  { value: 21, label: "21st" },
  { value: 22, label: "22nd" },
  { value: 23, label: "23rd" },
  { value: 24, label: "24th" },
  { value: 25, label: "25th" },
  { value: 26, label: "26th" },
  { value: 27, label: "27th" },
  { value: 28, label: "28th" },
  { value: 29, label: "29th" },
  { value: 30, label: "30th" },
  { value: 31, label: "31st" },
] as const;

const monthsOfYearInputOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;

const initialFormData: FormDataType = {
  frequency: "daily",
  daysOfWeek: [],
  daysOfMonth: [],
  monthsOfYear: [],
  text: "",
};

const NewReminderPopup = forwardRef<HTMLDialogElement, NewReminderPopupProps>(
  function NewReminderPopup(props, ref) {
    const mutation = trpc.reminders.createReminder.useMutation();
    const utils = trpc.useContext();

    const {
      control,
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<FormDataType>({
      defaultValues: initialFormData,
    });

    const [time, setTime] = useState<{ hours: number; minutes: number }>({
      hours: 0,
      minutes: 0,
    });
    const [error, setError] = useState("");

    const onSubmit: SubmitHandler<FormDataType> = (data) => {
      let cron = "";

      switch (data.frequency) {
        case "daily":
          cron = generateCronExpression({ frequency: "daily", time });
          break;
        case "weekly":
          cron = generateCronExpression({
            frequency: "weekly",
            daysOfWeek: data.daysOfWeek,
            time,
          });
          break;
        case "monthly":
          cron = generateCronExpression({
            frequency: "monthly",
            daysOfMonth: data.daysOfMonth,
            time,
          });
          break;
        case "yearly":
          cron = generateCronExpression({
            frequency: "yearly",
            monthsOfYear: data.monthsOfYear,
            daysOfMonth: data.daysOfMonth,
            time,
          });
          break;
      }

      mutation.mutate(
        { text: data.text, cron },
        {
          onSuccess: (data) => {
            switch (data.state) {
              case "success":
                utils.reminders.getReminders.invalidate();
                setError("");
                props.closeModal();
                break;
              case "failed":
                setError(data.error);
                break;
            }
          },
          onError: (error) => {
            toast.error(`Something went wrong! ${error.message}`);
          },
        }
      );
    };

    const { frequency } = watch();

    return (
      <dialog ref={ref} className="relative overflow-scroll">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
              className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
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
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Frequency
                    </label>
                    <div className="flex gap-1">
                      <select
                        className="block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        {...register("frequency", { required: true })}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <p>{errors.frequency?.message}</p>
                  </div>
                  {frequency === "weekly" && (
                    <div>
                      <label
                        htmlFor="daysOfWeek"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Days
                      </label>
                      <div className="flex h-fit gap-1">
                        <Controller
                          name="daysOfWeek"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="w-full rounded-md bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                              isMulti
                              required
                              placeholder="Days of week..."
                              options={daysOfWeekInputOptions}
                            />
                          )}
                        />
                      </div>
                      <p>{errors.daysOfWeek?.message}</p>
                    </div>
                  )}
                  {frequency === "yearly" && (
                    <div>
                      <label htmlFor="monthsOfYear">Months</label>
                      <div className="flex h-fit gap-1">
                        <Controller
                          name="monthsOfYear"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="w-full rounded-md bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                              isMulti
                              required
                              placeholder="Months of year..."
                              options={monthsOfYearInputOptions}
                            />
                          )}
                        />
                      </div>
                      <p>{errors.monthsOfYear?.message}</p>
                    </div>
                  )}
                  {(frequency === "monthly" || frequency === "yearly") && (
                    <div>
                      <label
                        htmlFor="daysOfMonth"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        On the...
                      </label>
                      <div className="flex h-fit gap-1">
                        <Controller
                          name="daysOfMonth"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="w-full rounded-md bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                              isMulti
                              required
                              placeholder="Days of month..."
                              options={daysOfMonthInputOptions}
                            />
                          )}
                        />
                      </div>
                      <p>{errors.daysOfMonth?.message}</p>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="time"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Time
                    </label>
                    <div className="flex items-stretch gap-1">
                      <TimePicker
                        time={time}
                        setTime={(minutes, hours) =>
                          setTime({ hours, minutes })
                        }
                      />
                      <p className="rounded-md bg-zinc-500 p-2 text-white">
                        UTC
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Text
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      placeholder="Measurement Time!"
                      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      required
                      {...register("text", { required: true })}
                    />
                  </div>
                  <p>{errors.frequency?.message}</p>
                </div>
                <div>
                  <p className="text-red-500">{error}</p>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={mutation.isLoading}
                >
                  Create
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

export default NewReminderPopup;
