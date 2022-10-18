import convert from "convert";
import { measurementTypesLowerCase } from "./measurementTypes";
import measurementTypesDBUnits from "./measurementTypesDBUnits";
import measurementTypesUserUnits from "./measurementTypesUserUnits";

interface IValues {
  weight: number | null;
  height: number | null;
  neck: number | null;
  shoulders: number | null;
  arms: number | null;
  chest: number | null;
  forearms: number | null;
  wrist: number | null;
  waist: number | null;
  hips: number | null;
  thighs: number | null;
  calves: number | null;
}

type UnitsType =
  | typeof measurementTypesUserUnits
  | typeof measurementTypesDBUnits;

export const convertUnit = (
  value: number,
  field: typeof measurementTypesLowerCase[number],
  currentUnits: UnitsType,
  targetUnits: UnitsType
) => {
  const currentUnit = currentUnits[field.toUpperCase()];
  const targetUnit = targetUnits[field.toUpperCase()];

  if (targetUnit === currentUnit) return value;

  if (
    (currentUnit === "cm" && targetUnit === "m") ||
    (currentUnit === "m" && targetUnit === "cm")
  ) {
    // We return the converted value
    return convert(value, currentUnit).to(targetUnit);
  } else {
    // e.g. when current unit is kg and target one is m
    throw new Error("This should be impossible.");
  }
};

export const convertUnits = (
  values: IValues,
  currentUnits: UnitsType,
  targetUnits: UnitsType
) => {
  const final: IValues = values;

  measurementTypesLowerCase.forEach((key) => {
    const value = values[key];

    if (value === null) return;

    final[key] = convertUnit(value, key, currentUnits, targetUnits);
  });

  return final;
};
