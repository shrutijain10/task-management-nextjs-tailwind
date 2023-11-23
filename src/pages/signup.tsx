// src/app/signup.tsx
"use client";

import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function isValidEmail(email: string) {
  // This is a simple email validation regex, you can use a more robust one
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { name } = router.query;
  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));

      if (field === "firstName") {
        setFirstName(e.target.value);
      } else if (field === "lastName") {
        setLastName(e.target.value);
      } else if (field === "email") {
        setEmail(e.target.value);
      } else if (field === "password") {
        setPassword(e.target.value);
      } else if (field === "confirmPassword") {
        setConfirmPassword(e.target.value);
      }
    };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    let hasError = false;

    if (!firstName) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        firstName: "First name is required",
      }));
      hasError = true;
    }

    if (!lastName) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        lastName: "Last name is required",
      }));
      hasError = true;
    }

    if (!email) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      hasError = true;
    } else if (!isValidEmail(email)) {
      // Implement isValidEmail function
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      hasError = true;
    }

    if (!password) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      hasError = true;
    } else if (password.length < 6) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      hasError = true;
    }

    if (!confirmPassword) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Please confirm your password",
      }));
      hasError = true;
    } else if (password !== confirmPassword) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }
    setSubmitted(true);
    try {
      console.log("inside try signup");

      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          setSubmitted(false);
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
          });
          router.push({
            pathname: "/task",
            query: { name },
          });
        }
      );
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitted(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-2/4">
        <h1 className="mb-4 text-3xl font-semibold">Sign Up</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={firstName}
              onChange={handleInputChange("firstName")}
              required
            />
            {errorMessages.firstName && (
              <p className="text-red-500 mt-2">{errorMessages.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={lastName}
              onChange={handleInputChange("lastName")}
              required
            />
            {errorMessages.lastName && (
              <p className="text-red-500 mt-2">{errorMessages.lastName}</p>
            )}
          </div>
        </div>
        <div className="mb-4 mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={handleInputChange("email")}
            required
          />
          {errorMessages.email && (
            <p className="text-red-500 mt-2">{errorMessages.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={handleInputChange("password")}
            required
          />
          {errorMessages.password && (
            <p className="text-red-500 mt-2">{errorMessages.password}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            required
          />
          {errorMessages.confirmPassword && (
            <p className="text-red-500 mt-2">{errorMessages.confirmPassword}</p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSignup}
          disabled={submitted}
        >
          Sign Up
        </button>
        <span className="block mt-4">
          {" "}
          Already have an account?
          <Link href="/" className="text-blue-500">
            {" "}
            Log in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignupPage;
