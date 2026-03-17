"use client";

import { useState } from "react";

export default function AdminLogin() {

  const [name, setname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e:any) => {

    e.preventDefault();

    const res = await fetch("https://avartya-org-1.onrender.com/api/admin/login", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ name, password })

    });

    const data = await res.json();

    if(data.token){

      localStorage.setItem("token", data.token);

      window.location.href="/admin";

    }

    else{
      alert(data.message);
    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleLogin} className="border p-8">

        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          onChange={(e)=>setname(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-700 text-white px-4 py-2">
          Login
        </button>

      </form>

    </div>

  );

}