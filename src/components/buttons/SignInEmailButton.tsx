import SignInButtonBase from "../bases/SignInButtonBase";
import { VscMail } from "react-icons/vsc";

const SignInEmailButton = () => {
  return (
    <SignInButtonBase
      text="Continue with Email"
      Icon={<VscMail aria-hidden={true} size={"1.5rem"} />}
      className="border text-gray-800"
    />
  );
};

export default SignInEmailButton;
