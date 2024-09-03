import React, { useState } from 'react';
import axios from 'axios';
import { auth, provider, signInWithPopup } from './../firebase'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginSignupForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // Initialize navigate

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLoginMode ? '/login' : '/signup';
      const response = await axios.post(`http://localhost:5000${url}`, formData);
      console.log(response.data);
      if (!isLoginMode) {
        toggleMode();
        alert("Signup successful! Please log in.");
      } else {
        navigate('/dashboard'); // Navigate to the dashboard
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "An error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = result.credential;
      const token = credential.accessToken;
      
      console.log('User:', user);
      console.log('Token:', token);

      // You can send the token to your backend to handle the user session
      // Example: await axios.post('http://localhost:5000/google-login', { token });

      navigate('/dashboard'); // Navigate to the dashboard

    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="px-12 py-12 border bg-white rounded-xl shadow-sm">
        {isLoginMode ? (
          <>
            <h2 className="text-center mb-4 font-bold text-[25px]">Login</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className='px-2 py-2 border border-gray-200 rounded'
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className='px-2 py-2 border border-gray-200 rounded'
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className='px-2 py-2 bg-blue-500 text-white rounded cursor-pointer' type="submit">Login</button>
              <div className="flex items-center justify-center h-auto">
                <button 
                  className="w-full px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                  onClick={handleGoogleSignIn}
                >
                  <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                  <span>Login with Google</span>
                </button>
              </div>
              <p className="text-center mt-2">Don't have an account? <a href="#" className='text-blue-500 font-bold' onClick={toggleMode}>Sign up</a></p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-center mb-4 font-bold text-[25px]">Sign up</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className='px-2 py-2 border border-gray-200 rounded'
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className='px-2 py-2 border border-gray-200 rounded'
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className='px-2 py-2 border border-gray-200 rounded'
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className='px-2 py-2 bg-blue-500 text-white rounded cursor-pointer' type="submit">Sign up</button>
              <div className="flex items-center justify-center h-auto">
                <button 
                  className="w-full px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                  onClick={handleGoogleSignIn}
                >
                  <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                  <span>Sign up with Google</span>
                </button>
              </div>
              <p className="text-center mt-2">Already have an account? <a href="#" className='text-blue-500 font-bold' onClick={toggleMode}>Login</a></p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginSignupForm;
