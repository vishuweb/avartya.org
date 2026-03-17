"use client";

import { useState } from "react";

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    previousWork: "",
    skills: "",
    city: "",
    availability: "",
    motivation: ""
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/volunteers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Volunteer Registration</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-2"/>

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2"/>

        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-2"/>

        <select name="education" onChange={handleChange} className="w-full border p-2">
          <option>Select Education</option>
          <option>B.Tech</option>
          <option>M.Tech</option>
          <option>High School</option>
          <option>Intermediate</option>
        </select>

        <input name="skills" placeholder="Skills" onChange={handleChange} className="w-full border p-2"/>

        <input name="city" placeholder="City" onChange={handleChange} className="w-full border p-2"/>

        <select name="availability" onChange={handleChange} className="w-full border p-2">
          <option>Select Availability</option>
          <option>Weekends</option>
          <option>Weekdays</option>
          <option>Both</option>
        </select>

        <select name="motivation" onChange={handleChange} className="w-full border p-2">
          <option>Select Motivation</option>
          <option>Environment Protection</option>
          <option>Women Safety</option>
          <option>Social Service</option>
        </select>

        <textarea
          name="previousWork"
          placeholder="Previous Work Experience"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>

      </form>
    </div>
  );
}