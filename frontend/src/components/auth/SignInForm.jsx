import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function SignInForm({ onSignUp, onClose }) {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);

        onClose();
        navigate("/");
        // Show SweetAlert success notification
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          toast: true,
          position: "bottom",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: "#ffffff",
          iconColor: "#FFD700",
          customClass: {
            popup: "rounded-xl border-2 border-yellow-400",
            title: "text-gray-800 font-medium text-lg",
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Invalid email or password",
          position: "center",
          showConfirmButton: true,
          confirmButtonText: "Try Again",
          confirmButtonColor: "#EF4444",
          background: "#ffffff",
          iconColor: "#EF4444",
          customClass: {
            popup: "rounded-xl border-2 border-red-400",
            title: "text-gray-800 font-bold text-xl mb-2",
            text: "text-gray-600",
            confirmButton: "px-6 py-2 rounded-lg",
          },
        });
      }
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Failed to connect to the server. Please try again.");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handlesubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 transition-colors"
      >
        Sign In
      </button>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="text-yellow-500 hover:text-yellow-600"
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}
