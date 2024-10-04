"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";
import SignIn from "@/components/SignIn";
import TicTacToe from "./pages/game";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />{" "}
      </div>
    );
  }

  return (
    <>
      <SignIn />
      {session && session.user && <TicTacToe />}
    </>
  );
}
