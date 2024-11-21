import React, { useState, useRef } from "react";
import { API_URL } from "../constants";  // Assuming API_URL is defined in constants file

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Use useRef to access input values directly
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);  // Set loading to true when submitting

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      name,
      email,
      password,
    };
    console.log(userData);
    

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),  // Send user data as JSON
      });

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        console.log("User signed up successfully", data);
        // Optionally redirect to login page or show success message
      } else {
        // Handle errors from server
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong!");
      }
    } catch (err) {
      // Handle network errors
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);  // Set loading to false after the request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        
        {/* Display error message if present */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}  // Use ref to access the input value
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}  // Use ref to access the input value
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}  // Use ref to access the input value
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Show loading spinner if the request is in progress */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
