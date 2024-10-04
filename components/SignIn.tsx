"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="fixed top-0 right-0 flex gap-4 ml-auto justify-center items-center p-4 shadow-lg ">
        <p className="text-sky-600 text-xl font-semibold">
          {session.user.name}
        </p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 pb-3 px-4 rounded-full text-xl"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 pb-5 px-8 rounded-full text-2xl"
      >
        Sign In To Gmail Account NextAuth.
      </button>
    </div>
  );
};

export default SignIn;