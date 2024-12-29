import React from 'react';
import { X } from 'lucide-react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export function AuthModal({ isOpen, onClose, type, onSwitchType }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        
        {type === 'signin' ? (
          <SignInForm onSignUp={() => onSwitchType('signup')} onClose={onClose} />
        ) : (
          <SignUpForm onSignIn={() => onSwitchType('signin')} onClose={onClose} />
        )}
      </div>
    </div>
  );
}