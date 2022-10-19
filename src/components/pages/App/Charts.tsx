import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { trpc } from "../../../utils/trpc";
import { convertUnit } from "../../../utils/convertUnits";
import measurementTypesDBUnits from "../../../utils/measurementTypesDBUnits";
import measurementTypesUserUnits from "../../../utils/measurementTypesUserUnits";
import { Measurement } from "@prisma/client";
import { measurementTypesLowerCase } from "../../../utils/measurementTypes";
import capitalFirstLetter from "../../../utils/capitaliFirstLetter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
};

const fieldNameHasEntries = (
  fieldName: typeof measurementTypesLowerCase[number],
  entries: Measurement[]
) =>
  entries.filter((measurement) => measurement.type === fieldName.toUpperCase())
    .length !== 0;

const generateDatasetFromField = (
  entries: Measurement[],
  fieldName: typeof measurementTypesLowerCase[number]
) => {
  return entries
    .filter((measurement) => measurement.type === fieldName.toUpperCase())
    .map((measurement) =>
      convertUnit(
        measurement.value,
        measurement.type.toLowerCase(),
        measurementTypesDBUnits,
        measurementTypesUserUnits
      )
    );
};

const generateLabelsFromField = (
  entries: Measurement[],
  fieldName: typeof measurementTypesLowerCase[number]
) => {
  return entries
    .filter((measurement) => measurement.type === fieldName.toUpperCase())
    .map((measurement) => measurement.date.toLocaleString());
};

const Charts = () => {
  const getEntriesQuery = trpc.me.getEntries.useQuery({ sort: "asc" });

  const getFieldData = (
    fieldName: typeof measurementTypesLowerCase[number],
    entries: Measurement[]
  ) => {
    const labels = generateLabelsFromField(entries, fieldName);
    const data = generateDatasetFromField(entries, fieldName);

    return {
      labels,
      datasets: [
        {
          label: capitalFirstLetter(fieldName),
          data,
          borderColor: "skyBlue",
        },
      ],
    };
  };

  return (
    <div>
      {getEntriesQuery.data && (
        <div className="mx-2 flex flex-col gap-8 sm:mx-16">
          {measurementTypesLowerCase.map((type) => (
            <div key={type} className="relative">
              {!fieldNameHasEntries(type, getEntriesQuery.data) && (
                <div className="absolute grid h-full w-full place-content-center bg-gray-500 opacity-50">
                  <p className="text-5xl font-bold">
                    No Data
                    <span className="sr-only">for {type} available</span>
                  </p>
                </div>
              )}
              <Line
                options={options}
                data={getFieldData(type, getEntriesQuery.data)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Charts;
