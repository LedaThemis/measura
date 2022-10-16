const Contact = () => {
  return (
    <section id="contact" className="body-font relative text-gray-600">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col text-center">
          <h2 className="title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl">
            Contact
          </h2>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            If you have an issue to report or see something that isn&apos;t
            right, reach out!
          </p>
        </div>
        <div className="mx-auto md:w-2/3 lg:w-1/2">
          {/* TODO: link form to a form webserver */}
          <form className="-m-2 flex flex-wrap">
            <div className="w-1/2 p-2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-sm leading-7 text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  data-ddg-inputtype="identities.fullName"
                />
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="text-sm leading-7 text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  data-ddg-inputtype="identities.emailAddress"
                  data-ddg-autofill="true"
                />
              </div>
            </div>
            <div className="w-full p-2">
              <div className="relative">
                <label
                  htmlFor="content"
                  className="text-sm leading-7 text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                ></textarea>
              </div>
            </div>
            <div className="w-full p-2">
              <button
                type="submit"
                className="mx-auto flex rounded border-0 bg-blue-500 py-2 px-8 text-lg text-white hover:bg-blue-600 focus:outline-none"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
