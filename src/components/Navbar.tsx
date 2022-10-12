import RightArrow from "../icons/RightArrow";
import RulerIcon from "../icons/RulerIcon";

const Navbar = () => {
  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center justify-between p-5 sm:flex-row">
        <a className="title-font flex items-center font-medium text-gray-900">
          <RulerIcon className="h-10 w-10 rounded-full bg-blue-100 p-2 text-white" />
          <h1 className="ml-3 text-xl">Measura</h1>
        </a>
        <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
          <nav className="flex flex-wrap items-center justify-center gap-5 text-base">
            <a href="#features" className="hover:text-gray-900">
              Features
            </a>
            <a href="#contact" className="hover:text-gray-900">
              Contact
            </a>
          </nav>
          <a
            href="/app"
            className="inline-flex cursor-pointer items-center rounded bg-blue-400 py-1 px-3 text-base text-white hover:bg-blue-500"
          >
            App
            <RightArrow />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
