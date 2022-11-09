import { trpc } from "../../../utils/trpc";
import DeleteReminderButton from "./DeleteReminderButton";

const RemindersTable = () => {
  const getEntriesQuery = trpc.reminders.getReminders.useQuery();

  return (
    <section className="mt-10 flex flex-grow flex-col gap-4 px-8 pb-8">
      <header>
        <h2 className="text-2xl">Reminders</h2>
      </header>
      {getEntriesQuery.data?.state === "success" &&
      getEntriesQuery.data.reminders.length !== 0 ? (
        <div className="max-w-fit overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Text
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2">
              {getEntriesQuery.data.reminders.map((reminder) => {
                const reminderDueDate = new Intl.DateTimeFormat(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZoneName: "short",
                }).format(new Date(reminder.dueDate));

                return (
                  <tr
                    key={reminder.id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {reminderDueDate}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {reminder.text}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      <div className="flex justify-center gap-2">
                        <DeleteReminderButton reminderId={reminder.id} />
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
          Looks like you don&apos;t have any reminders yet, try adding some from
          above
        </p>
      )}
    </section>
  );
};

export default RemindersTable;
