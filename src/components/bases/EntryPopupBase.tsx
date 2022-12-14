import { forwardRef, useState } from "react";
import capitalFirstLetter from "../../utils/capitaliFirstLetter";
import { measurementTypesUpperCase } from "../../utils/measurementTypes";
import measurementTypesUserUnits from "../../utils/measurementTypesUserUnits";
import TimePicker from "./TimePicker";

interface EntryPopupBase {
  closeModal: () => void;
  title: string;
  initialData?: IFormData;
  submitButtonText: string;
  cancelButtonText: string;
  onSubmit: (
    data: IFormData,
    updateErrors: (error: IErrorType) => void
  ) => void;
  isLoading: boolean;
}

export interface IFormData {
  type: typeof measurementTypesUpperCase[number];
  value: number;
  date: Date;
  time: { hours: number; minutes: number };
}

export interface IErrorType {
  type?: string;
  value?: string;
  date?: string;
}

const defaultFormData: IFormData = {
  type: "WEIGHT",
  value: 0.01,
  date: new Date(),
  time: { hours: 0, minutes: 0 },
};

const EntryPopupBase = forwardRef<HTMLDialogElement, EntryPopupBase>(
  function EntryPopupBase(props, ref) {
    const [errors, setErrors] = useState<IErrorType>({});

    const [formData, setFormData] = useState<IFormData>(
      props.initialData ?? defaultFormData
    );

    return (
      <dialog ref={ref} className="relative overflow-scroll">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <form
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit(formData, (error) => setErrors(error));
              }}
            >
              <div className="flex flex-col gap-4 p-6">
                <h3 className="text-center text-xl font-medium leading-6 text-gray-900">
                  {props.title}
                </h3>
                <div className="flex flex-grow flex-col gap-6 bg-white">
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Measurement Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-1 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      value={formData["type"]}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          type: e.target.value as typeof formData["type"],
                        }));
                      }}
                    >
                      {measurementTypesUpperCase.map((v) => (
                        <option key={v} value={v}>
                          {capitalFirstLetter(v)}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <span
                        role="alert"
                        className="pl-1 text-base text-red-500"
                      >
                        {errors.type}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="value"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Value
                    </label>
                    <div className="mt-1 flex gap-1">
                      <input
                        type="number"
                        name="value"
                        id="value"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        value={formData["value"]}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            value: parseFloat(e.target.value),
                          }));
                        }}
                      />
                      <div className="pointer-events-none rounded-md bg-zinc-500 p-2">
                        <p className="text-base text-white">
                          {measurementTypesUserUnits[formData["type"]]}
                        </p>
                      </div>
                    </div>
                    {errors.value && (
                      <span
                        role="alert"
                        className="pl-1 text-base text-red-500"
                      >
                        {errors.value}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <div className="mt-1 flex gap-1">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        value={formData["date"].toISOString().split("T")[0]}
                        onChange={(e) => {
                          const newDate = e.target.value
                            ? new Date(e.target.value)
                            : new Date();

                          setFormData((prev) => ({
                            ...prev,
                            date: newDate,
                          }));
                        }}
                      />
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
                    {errors.date && (
                      <span
                        role="alert"
                        className="pl-1 text-base text-red-500"
                      >
                        {errors.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={props.isLoading}
                >
                  {props.submitButtonText}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    props.closeModal();
                  }}
                  disabled={props.isLoading}
                >
                  {props.cancelButtonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

export default EntryPopupBase;
