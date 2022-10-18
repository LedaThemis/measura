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

const convertUnits = (
  values: IValues,
  currentUnits: UnitsType,
  targetUnits: UnitsType
) => {
  const final: IValues = values;

  measurementTypesLowerCase.forEach((key) => {
    const value = values[key];
    const currentUnit = currentUnits[key.toUpperCase()];
    const targetUnit = targetUnits[key.toUpperCase()];

    if (value === null) return;
    if (currentUnit === targetUnit) return;

    if (
      (currentUnit === "cm" && targetUnit === "m") ||
      (currentUnit === "m" && targetUnit === "cm")
    ) {
      // We update final with the converted value
      final[key] = convert(value, currentUnit).to(targetUnit);
    }
  });

  return final;
};

export default convertUnits;
