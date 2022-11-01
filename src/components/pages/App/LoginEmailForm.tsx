import { signIn } from "next-auth/react";
import { useState } from "react";
import SignInEmailButton from "../../buttons/SignInEmailButton";

const LoginEmailForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex flex-col gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        signIn("email", { email });
      }}
    >
      <div>
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 w-full rounded border px-4"
        />
      </div>
      <SignInEmailButton />
    </form>
  );
};

export default LoginEmailForm;
