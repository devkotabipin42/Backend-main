import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {handleLogin} = useAuth() 
  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(username,password)
    .then(res=>{
      console.log(res);
      
    })
    
  }

  return (
    <main className="min-h-screen   flex items-center justify-center ">
      <div className="flex flex-col w-full max-w-md">
        <h1 className="text-2xl font-semibold">Login</h1>
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
              setPassword(e.target.value);
            }}
            className="w-full border-2 border-white px-6 py-4 rounded-2xl outline-none"
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button
            className=" w-full px-6 py-4 rounded-2xl bg-[#bd0c23] text-white cursor-pointer active:scale-95 "
            type="submit"
          >
            Login
          </button>
        </form>
        <p>
          Create an account.{" "}
          <Link className="text-red-800" to="/register">
            Register.
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
