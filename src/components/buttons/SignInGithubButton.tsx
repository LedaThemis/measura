import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import SignInButtonBase from "../bases/SignInButtonBase";

const SignInGithubButton = () => {
  return (
    <SignInButtonBase
      text="Continue with Github"
      onClick={() => signIn("github")}
      Icon={<BsGithub aria-hidden={true} size={"1.25rem"} />}
      className="bg-black hover:bg-gray-800 focus:border focus:border-black focus:bg-white focus:text-black"
    />
  );
};

export default SignInGithubButton;
