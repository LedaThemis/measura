import Image from "next/image";

const Hero = () => {
  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
        <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
          <p className="title-font mb-4 text-3xl font-medium text-gray-900 sm:text-4xl">
            Never forget a measurement <br />{" "}
            <span className="text-blue-500">ever again</span>
          </p>
          <p className="mb-8 leading-relaxed">
            Measura helps you keep track of your weight and all your body
            measurements, with the ability to set goals and see how far you are
            from them!
          </p>
          <div className="flex justify-center">
            {/* TODO */}
            {/* <button className="inline-flex rounded border-0 bg-blue-500 py-2 px-6 text-lg text-white hover:bg-blue-600 focus:outline-none">
              Button
            </button>
            <button className="ml-4 inline-flex rounded border-0 bg-gray-100 py-2 px-6 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none">
              Button
            </button> */}
          </div>
        </div>
        {/* TODO: should be replaced with screenshot from app */}
        <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
          <Image
            className="rounded object-cover object-center"
            alt="hero"
            src="https://dummyimage.com/720x600"
            width={720}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
