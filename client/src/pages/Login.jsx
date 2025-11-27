// client/src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/authSlice'; // Use login thunk

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message); // Use alert for simple debugging
    }
    if (isSuccess || user) {
      navigate('/dashboard'); 
    }
    dispatch(reset()); 
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)); // Dispatch the login thunk
  };

  if (isLoading) {
    return <h1 className="text-center mt-10 text-xl">Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-xl rounded-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700">Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input type="email" name="email" value={email} onChange={onChange} required placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          <input type="password" name="password" value={password} onChange={onChange} required placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          
          <button type="submit" className="w-full p-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition duration-150">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;