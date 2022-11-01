import { signIn } from "next-auth/react";
import SignInButtonBase from "../bases/SignInButtonBase";
import { FcGoogle } from "react-icons/fc";

const SignInGoogleButton = () => {
  return (
    <SignInButtonBase
      text="Continue with Google"
      onClick={() => signIn("google")}
      Icon={<FcGoogle aria-hidden={true} size={"1.25rem"} />}
      className="border bg-white text-[rgba(0,0,0,0.54)] hover:opacity-90 focus:bg-[#EEE]"
    />
  );
};

export default SignInGoogleButton;
