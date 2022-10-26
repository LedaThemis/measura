import capitalFirstLetter from "../../../utils/capitaliFirstLetter";
import getPercentage from "../../../utils/getPercentage";
import { measurementTypesLowerCase } from "../../../utils/measurementTypes";
import { trpc } from "../../../utils/trpc";
import ProgressBar from "../../ProgressBar";

const DashboardProgress = () => {
  const getGoalQuery = trpc.me.getGoal.useQuery();
  const getLatestEntriesQuery = trpc.me.getLatestEntries.useQuery();
  const getLastMonthEntriesQuery = trpc.me.getLastMonthEntries.useQuery();

  return (
    <section className="mx-4 flex flex-col gap-4">
      <header>
        <h2 className="text-2xl">Progress</h2>
      </header>
      <div className="flex flex-col gap-2">
        {getGoalQuery.data &&
        getLatestEntriesQuery.data &&
        getLastMonthEntriesQuery.data ? (
          measurementTypesLowerCase.map((type) => {
            const goalValue = getGoalQuery.data
              ? getGoalQuery.data[type]
              : null;

            if (goalValue === null) {
              return (
                <div
                  key={type}
                  className="flex  max-w-[800px] flex-col gap-2 rounded bg-[rgb(1,1,1,0.2)] p-1"
                >
                  <p>{capitalFirstLetter(type)}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex-grow">
                      <ProgressBar percentage={0} />
                    </div>
                    <p className="text-center">No Goal</p>
                  </div>
                </div>
              );
            }

            const latestEntries = getLatestEntriesQuery.data;
            const lastMonthEntries = getLastMonthEntriesQuery.data;

            const currentPercentage = Math.floor(
              getPercentage(latestEntries[type], goalValue)
            );
            const percentageFromLastMonth = Math.floor(
              getPercentage(lastMonthEntries[type], latestEntries[type])
            );

            return (
              <div key={type} className="flex flex-col gap-2">
                <p>{capitalFirstLetter(type)}</p>
                <div className="flex max-w-[800px] flex-col gap-2">
                  <div className="w-full flex-grow">
                    <ProgressBar percentage={currentPercentage} />
                  </div>
                  <p className="text-center">
                    {currentPercentage}% (
                    {percentageFromLastMonth >= 0
                      ? "+" + percentageFromLastMonth
                      : "-" + percentageFromLastMonth}
                    % last month)
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>You need to set a goal to see progress.</p>
        )}
      </div>
    </section>
  );
};

export default DashboardProgress;
