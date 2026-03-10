import React, { useState } from "react";
import Login from "./Login";
import { Link } from "react-router";
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e){
    e.preventDefault()

    
  }

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col w-full max-w-md">
        <h1 className="text-2xl font-semibold">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            className=" w-full  border-2 border-white px-6 py-4 rounded-2xl outline-none bg-transparent"
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border-2 border-white px-6 py-4 rounded-2xl outline-none"
            type="email"
            name="w-full Email"
            placeholder="Enter Email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full border-2 border-white px-6 py-4 rounded-2xl outline-none"
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button
            className="w-full px-6 py-4 rounded-2xl bg-[#bd0c23] text-white cursor-pointe active:scale-95 "
            type="submit"
          >
            Register
          </button>
        </form>
        <p>
          Already have a account?{" "}
          <Link className="text-red-800" to="/login">
            Login.
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
