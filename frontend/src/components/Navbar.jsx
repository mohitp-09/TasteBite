import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Logo } from "./layout/Logo";
import { AuthModal } from "./auth/AuthModal";
import { AuthenticatedNav } from "./AuthenticatedNav";

export function Navbar() {
  const [authType, setAuthType] = useState(null); 
  const navigate = useNavigate();

  const handleClose = () => setAuthType(null);
  const handleSwitchType = (type) => setAuthType(type); 
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // window.location.reload();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-black p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          {!localStorage.getItem("authToken") ? (
            <div className="space-x-4">
              <button
                onClick={() => setAuthType("signin")}
                className="text-white hover:text-yellow-400 transition-colors duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthType("signup")}
                className="bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div>
              <AuthenticatedNav onLogout={handleLogout}/>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={!!authType}
        onClose={handleClose}
        type={authType}
        onSwitchType={handleSwitchType}
      />
    </>
  );
}
