import { BsGithub, BsGlobe2 } from "react-icons/bs";
import RulerIcon from "../icons/RulerIcon";

const Footer = () => {
  return (
    <footer className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        <p className="title-font flex items-center justify-center font-medium text-gray-900 md:justify-start">
          <RulerIcon className="h-10 w-10 rounded-full bg-blue-100 p-2 text-white" />
          <span className="ml-3 text-xl">Measura</span>
        </p>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          © 2022 Leda
        </p>
        <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
          <a
            href="https://github.com/LedaThemis/measura"
            target="_blank"
            rel="noreferrer noopener"
            className="ml-3 text-gray-500 transition-colors duration-150 hover:text-gray-800"
          >
            <BsGithub aria-hidden="true" className="h-5 w-5 cursor-pointer" />
            <span className="sr-only">Github (opens in new tab)</span>
          </a>
          <a
            href="https://www.leda.dev"
            target="_blank"
            rel="noreferrer noopener"
            className="ml-3 text-gray-500 transition-colors duration-150 hover:text-gray-800"
          >
            <BsGlobe2 aria-hidden="true" className="h-5 w-5 cursor-pointer" />
            <span className="sr-only">Personal website (opens in new tab)</span>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
