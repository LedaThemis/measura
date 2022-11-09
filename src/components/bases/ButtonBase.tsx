import { ButtonHTMLAttributes } from "react";

type ButtonBaseProps = {
  full: boolean;
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonBase = ({
  full,
  className = "",
  children,
  ...props
}: ButtonBaseProps) => {
  const fullClassName = full ? "w-full" : "";

  return (
    <button
      className={`rounded-md bg-blue-600 px-4 py-2 text-lg text-white hover:bg-blue-700 ${fullClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
