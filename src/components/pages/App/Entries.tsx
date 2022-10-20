import Link from "next/link";
import capitalFirstLetter from "../../../utils/capitaliFirstLetter";
import { convertUnit } from "../../../utils/convertUnits";
import measurementTypesDBUnits from "../../../utils/measurementTypesDBUnits";
import measurementTypesUserUnits from "../../../utils/measurementTypesUserUnits";
import { trpc } from "../../../utils/trpc";

const Entries = () => {
  const getEntriesQuery = trpc.me.getEntries.useQuery();

  return (
    <section className="mt-10 flex flex-grow flex-col gap-4 px-8 pb-8">
      <header>
        <h2 className="text-2xl">Entries</h2>
      </header>
      {getEntriesQuery.data?.length !== 0 ? (
        <table className="table-auto border">
          <thead className="border-b-2 bg-slate-50">
            <tr>
              <th scope="col" className="py-3 text-lg">
                Date
              </th>
              <th scope="col" className="py-3 text-lg">
                Type
              </th>
              <th scope="col" className="py-3 text-lg">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2">
            {getEntriesQuery.data?.map((measurement) => {
              const measurementDate =
                measurement.date.toLocaleDateString() +
                " " +
                measurement.date.toLocaleTimeString();
              const measurementType = capitalFirstLetter(measurement.type);
              const measurementValue = convertUnit(
                measurement.value,
                measurement.type.toLowerCase(),
                measurementTypesDBUnits,
                measurementTypesUserUnits
              ).toFixed(2);
              const measurementUnit =
                measurementTypesUserUnits[measurement.type];

              return (
                <tr
                  key={measurement.id}
                  className="odd:bg-white even:bg-slate-50"
                >
                  <th className="py-3 text-base font-medium">
                    {measurementDate}
                  </th>
                  <th className="py-3 text-sm font-medium text-gray-800">
                    {measurementType}
                  </th>
                  <th className="py-3 text-sm text-gray-800">
                    {measurementValue + measurementUnit}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>
          Looks like you don&apos;t have any entries yet, try adding some in{" "}
          <Link href="/app/dashboard">Dashboard</Link>.
        </p>
      )}
    </section>
  );
};

export default Entries;
