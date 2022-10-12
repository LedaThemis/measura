import { BsGraphUp, BsAlarm, BsPerson } from "react-icons/bs";

const Features = () => {
  return (
    <section id="features" className="body-font text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <h2 className="title-font mb-10 text-center text-5xl font-medium text-gray-900 sm:text-3xl">
          Features
        </h2>
        <div className="-mx-4 -mb-10 -mt-4 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0">
          <div className="flex p-4 md:w-1/3">
            <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <BsPerson size={"1.5rem"} />
            </div>
            <div className="flex-grow pl-6">
              <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                Track body measurements
              </h2>
              <p className="text-base leading-relaxed">
                Keep track and update your body measurements in an easy-to-use
                table.
              </p>
            </div>
          </div>
          <div className="flex p-4 md:w-1/3">
            <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <BsGraphUp size={"1.25rem"} />
            </div>
            <div className="flex-grow pl-6">
              <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                See progress
              </h2>
              <p className="text-base leading-relaxed">
                See your progress for this month, this year or all-time in a
                nicely-drawn graph.
              </p>
            </div>
          </div>
          <div className="flex p-4 md:w-1/3">
            <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
              <BsAlarm size={"1.25rem"} />
            </div>
            <div className="flex-grow pl-6">
              <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                Reminders
              </h2>
              <p className="text-base leading-relaxed">
                You can set recurring reminders that will remind you to update
                your measurements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
