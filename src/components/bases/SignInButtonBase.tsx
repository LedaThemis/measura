interface SignInButtonBaseProps {
  text: string;
  Icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SignInButtonBase = ({
  text,
  Icon,
  className = "",
  onClick,
}: SignInButtonBaseProps) => {
  return (
    <button
      className={`flex h-12 items-center justify-center gap-2 rounded p-2 text-lg text-white ${className}`}
      style={{
        width: "min(300px, 100vw)",
      }}
      onClick={onClick}
    >
      {Icon}
      <p>{text}</p>
    </button>
  );
};

export default SignInButtonBase;
