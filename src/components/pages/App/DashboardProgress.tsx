import capitalFirstLetter from "../../../utils/capitaliFirstLetter";
import getPercentageFromGoal from "../../../utils/getPercentageFromGoal";
import { measurementTypesLowerCase } from "../../../utils/measurementTypes";
import { trpc } from "../../../utils/trpc";
import ProgressBar from "../../ProgressBar";

const DashboardProgress = () => {
  const getGoalQuery = trpc.me.getGoal.useQuery();
  const getLatestEntriesQuery = trpc.me.getLatestEntries.useQuery();

  return (
    <section className="mx-4 flex flex-col gap-4">
      <header>
        <h2 className="text-2xl">Progress</h2>
      </header>
      <div className="flex flex-col gap-2">
        {getGoalQuery.data && getLatestEntriesQuery.data ? (
          measurementTypesLowerCase.map((type) => {
            const goalValue = getGoalQuery.data
              ? getGoalQuery.data[type]
              : null;

            if (goalValue === null) {
              return (
                <div
                  key={type}
                  className="max-w-[50%] bg-[rgb(1,1,1,0.2)] rounded p-1"
                >
                  <p>{capitalFirstLetter(type)} (No Goal)</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow">
                      <ProgressBar percentage={0} />
                    </div>
                    <p className="w-10 text-right">0%</p>
                  </div>
                </div>
              );
            }

            const latestEntries = getLatestEntriesQuery.data;

            return (
              <div key={type} className="p-1">
                <p>{capitalFirstLetter(type)}</p>
                <div className="flex max-w-[50%] items-center gap-2">
                  <div className="flex-grow">
                    <ProgressBar
                      percentage={Math.floor(
                        getPercentageFromGoal(latestEntries[type], goalValue)
                      )}
                    />
                  </div>
                  <p className="w-10 text-right">
                    {Math.floor(
                      getPercentageFromGoal(latestEntries[type], goalValue)
                    )}
                    %
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
