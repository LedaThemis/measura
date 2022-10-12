import RulerIcon from "../icons/RulerIcon";

const Navbar = () => {
  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex items-center justify-between p-5">
        <a className="title-font flex items-center font-medium text-gray-900">
          <RulerIcon />
          <h1 className="ml-3 text-xl">Measura</h1>
        </a>
        <nav className="flex flex-wrap items-center justify-center gap-5 text-base">
          <a href="#features" className="hover:text-gray-900">
            Features
          </a>
          <a href="#contact" className="hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
