import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import SignUpForm from '../components/auth/SignUpForm';

const SignUp = () => {
  const navigate = useNavigate();

  const handleToggleMode = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    // Handle sign up logic here
    // After successful signup, redirect to login or dashboard
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the marine community"
    >
      <SignUpForm 
        onToggleMode={handleToggleMode}
        onSubmit={handleSignUp}
      />
    </AuthLayout>
  );
};

export default SignUp;