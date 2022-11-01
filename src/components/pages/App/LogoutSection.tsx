import { signOut } from "next-auth/react";

const LogoutSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Logout</h2>
      <button
        className="rounded-lg bg-blue-500 p-2 text-xl text-white hover:bg-blue-600"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutSection;
