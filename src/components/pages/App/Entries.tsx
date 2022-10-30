import Link from "next/link";
import capitalFirstLetter from "../../../utils/capitaliFirstLetter";
import { convertUnit } from "../../../utils/convertUnits";
import measurementTypesDBUnits from "../../../utils/measurementTypesDBUnits";
import measurementTypesUserUnits from "../../../utils/measurementTypesUserUnits";
import { trpc } from "../../../utils/trpc";
import UpdateEntryButton from "./UpdateEntryButton";

const Entries = () => {
  const getEntriesQuery = trpc.me.getEntries.useQuery();

  return (
    <section className="mt-10 flex flex-grow flex-col gap-4 px-8 pb-8">
      <header>
        <h2 className="text-2xl">Entries</h2>
      </header>
      {getEntriesQuery.data?.length !== 0 ? (
        <div className="max-w-fit overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Value
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2">
              {getEntriesQuery.data?.map((measurement) => {
                const measurementDate = new Intl.DateTimeFormat(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(measurement.date);
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
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {measurementDate}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {measurementType}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {measurementValue + measurementUnit}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      <div className="flex justify-center gap-2">
                        <UpdateEntryButton measurement={measurement} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
