import React, {useState} from "react";
import Swal from "sweetalert2";

export function SignUpForm({ onSignIn }) {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);
      
      if (json.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Your account has been created successfully.',
          position: 'center',
          showConfirmButton: true,
          confirmButtonText: 'Start Exploring',
          confirmButtonColor: '#FFD700',
          background: '#ffffff',
          iconColor: '#FFD700',
          customClass: {
            popup: 'rounded-xl border-2 border-yellow-400',
            title: 'text-gray-800 font-bold text-xl mb-2',
            text: 'text-gray-600',
            confirmButton: 'px-6 py-2 rounded-lg'
          }
        }).then(() => {
          onSignIn(); 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
          position: 'center',
          showConfirmButton: true,
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#EF4444',
          background: '#ffffff',
          iconColor: '#EF4444',
          customClass: {
            popup: 'rounded-xl border-2 border-red-400',
            title: 'text-gray-800 font-bold text-xl mb-2',
            text: 'text-gray-600',
            confirmButton: 'px-6 py-2 rounded-lg'
          }
        });
      }
  
    } catch (error) {
      console.error("Error during signup:", error);
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
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          name="name"
          value={credentials.name}
          onChange={onChange}
        />
      </div>
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
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          name="geolocation"
          value={credentials.geolocation}
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
        Sign Up
      </button>
      <p className="text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSignIn}
          className="text-yellow-500 hover:text-yellow-600"
        >
          Sign In
        </button>
      </p>
    </form>
  );
}
