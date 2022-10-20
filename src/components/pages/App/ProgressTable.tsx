import { Measurement } from "@prisma/client";
import { convertUnit } from "../../../utils/convertUnits";
import { measurementTypesLowerCase } from "../../../utils/measurementTypes";
import measurementTypesDBUnits from "../../../utils/measurementTypesDBUnits";
import measurementTypesUserUnits from "../../../utils/measurementTypesUserUnits";

interface ProgressTableProps {
  measurements: Measurement[];
  type: typeof measurementTypesLowerCase[number];
}

const ProgressTable = ({ measurements, type }: ProgressTableProps) => {
  if (measurements.length === 0) {
    return <p className="sr-only">No data for {type} progress</p>;
  }

  return (
    <table className="sr-only">
      <caption>Table for {type} progress</caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {measurements.map((measurement) => {
          const measurementDate =
            measurement.date.toLocaleDateString() +
            " " +
            measurement.date.toLocaleTimeString();
          const measurementValue = convertUnit(
            measurement.value,
            measurement.type.toLowerCase(),
            measurementTypesDBUnits,
            measurementTypesUserUnits
          ).toFixed(2);
          const measurementUnit = measurementTypesUserUnits[measurement.type];

          return (
            <tr key={measurement.id}>
              <td>{measurementDate}</td>
              <td>{measurementValue + measurementUnit}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProgressTable;
