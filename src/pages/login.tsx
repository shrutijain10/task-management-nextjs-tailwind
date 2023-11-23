// src/app/login.tsx
"use client";

import React, { ChangeEvent, useState } from "react";
import { auth } from "../../firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const Login: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      if (value.length > 0) {
        setEmailError("");
      } else {
        setEmailError("Please enter valid email");
      }
    } else if (name === "password") {
      setPassword(value);
      if (value.length > 0) {
        setPasswordError("");
      } else {
        setPasswordError("Please enter valid password");
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length === 0) {
      setEmailError("Please enter valid email");
    }
    if (email.length > 0) {
      setEmailError("");
    }
    if (password.trim().length === 0) {
      setPasswordError("Please enter valid password");
    }
    if (password.length > 0) {
      setPasswordError("");
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/task");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          setEmailError("User not found. Please check your email.");
        } else if (error.code === "auth/wrong-password") {
          setPasswordError("Incorrect password. Please check your password.");
        } else {
          console.error("Firebase error:", error);
        }
      } else {
        console.error("Non-Firebase error:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-2/4	">
        <h1 className="mb-4 text-3xl font-semibold">Login</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleInputs(e)}
            required
          />
          <p className="text-red-500  mt-2">{emailError}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={password}
            onChange={handleInputs}
            required
          />
          <p className="text-red-500  mt-2">{passwordError}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
        <span className="block mt-4">
          Don't have an account?{" "}
          <Link href="/signup" passHref className="text-blue-500">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
