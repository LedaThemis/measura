import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import capitalFirstLetter from "../../../utils/capitaliFirstLetter";
import { convertUnits } from "../../../utils/convertUnits";
import { measurementTypesLowerCase } from "../../../utils/measurementTypes";
import measurementTypesDBUnits from "../../../utils/measurementTypesDBUnits";
import measurementTypesUserUnits from "../../../utils/measurementTypesUserUnits";
import { trpc } from "../../../utils/trpc";

const isOriginalState = (
  state: GoalValuesType,
  data: GoalValuesType | null
) => {
  if (!data) return true;

  return measurementTypesLowerCase.every((type) => state[type] === data[type]);
};

const initialGoalValues = {
  weight: null,
  height: null,
  neck: null,
  shoulders: null,
  arms: null,
  chest: null,
  forearms: null,
  wrist: null,
  waist: null,
  hips: null,
  thighs: null,
  calves: null,
};

type GoalValuesType = {
  [key in typeof measurementTypesLowerCase[number]]: number | null;
};

type ErrorsType = {
  [key in typeof measurementTypesLowerCase[number]]?: string[];
};

const GoalForm = () => {
  const getGoalQuery = trpc.me.getGoal.useQuery();
  const setGoalMutation = trpc.me.setGoal.useMutation();

  const [initialGoalValuesState, setInitialGoalValuesState] =
    useState<GoalValuesType | null>(null);
  const [goalValues, setGoalValues] =
    useState<GoalValuesType>(initialGoalValues);
  const [errors, setErrors] = useState<ErrorsType>({});

  useEffect(() => {
    if (getGoalQuery.data && !initialGoalValuesState) {
      const {
        weight,
        height,
        neck,
        shoulders,
        arms,
        chest,
        forearms,
        wrist,
        waist,
        hips,
        thighs,
        calves,
      } = getGoalQuery.data;

      const values = {
        weight,
        height,
        neck,
        shoulders,
        arms,
        chest,
        forearms,
        wrist,
        waist,
        hips,
        thighs,
        calves,
      };

      // From DB Units to Units displayed to user
      const convertedValues = convertUnits(
        values,
        measurementTypesDBUnits,
        measurementTypesUserUnits
      );

      setGoalValues(convertedValues);

      setInitialGoalValuesState(convertedValues);
    }
  }, [getGoalQuery.data, initialGoalValuesState]);

  const handleGoalSubmit = () => {
    const values = {
      weight: goalValues["weight"],
      height: goalValues["height"],
      neck: goalValues["neck"],
      shoulders: goalValues["shoulders"],
      arms: goalValues["arms"],
      chest: goalValues["chest"],
      forearms: goalValues["forearms"],
      wrist: goalValues["wrist"],
      waist: goalValues["waist"],
      hips: goalValues["hips"],
      thighs: goalValues["thighs"],
      calves: goalValues["calves"],
    };

    // From Units Displayed to user to DB Units
    const convertedValues = convertUnits(
      values,
      measurementTypesUserUnits,
      measurementTypesDBUnits
    );

    setGoalMutation.mutate(convertedValues, {
      onSuccess: () => {
        toast.success("Successfully updated goal");
      },
      onError: (error) => {
        if (error.data?.zodError) {
          setErrors({
            ...error.data?.zodError?.fieldErrors,
          });
        } else {
          toast.error(`Something went wrong! ${error.message}`);
        }
      },
    });
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleGoalSubmit();
      }}
    >
      <h2 className="text-2xl">Goal</h2>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {measurementTypesLowerCase.map((type) => (
          <div key={type}>
            <label
              htmlFor={type}
              className="block text-sm font-medium text-gray-700"
            >
              {capitalFirstLetter(type)}
            </label>
            <div className="mt-1 flex gap-1">
              <input
                type="number"
                name={type}
                id={type}
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                // TODO: change this (toFixed(2)) to have an easier time inputting values
                value={goalValues[type]?.toFixed(2) ?? ""}
                onChange={(e) => {
                  const parsed = parseFloat(e.target.value);

                  setGoalValues((prev) => ({
                    ...prev,
                    [type]: isNaN(parsed) ? null : parsed,
                  }));
                }}
              />
              <div className="pointer-events-none rounded-md bg-zinc-500 p-2">
                <p className="text-base text-white">
                  {measurementTypesUserUnits[type.toUpperCase()]}
                </p>
              </div>
            </div>
            {errors[type] && (
              <div className="flex flex-col gap-1">
                {errors[type]?.map((error) => (
                  <span
                    key={error}
                    role="alert"
                    className="pl-1 text-base text-red-500"
                  >
                    {error}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500 sm:w-auto sm:text-sm"
        disabled={
          setGoalMutation.isLoading ||
          isOriginalState(goalValues, initialGoalValuesState)
        }
      >
        Save
      </button>
    </form>
  );
};

export default GoalForm;
