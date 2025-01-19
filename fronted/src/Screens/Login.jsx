import React, { useState } from 'react'
import axios from '../config/axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  function submitHandler(e) { 
    e.preventDefault()

    axios.post('/users/login', {email, password

    }).then(res => {
      console.log(res.data)
      navigate('/')
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200">
    <div className="bg-gray-800 bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-transform transform hover:scale-105">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Login to Your Account
      </h2>

      {/* Form */}
      <form onSubmit={submitHandler} className="space-y-6">
        {/* Username */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <i className="fas fa-user"></i>
          </span>
          <input
          onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your username"
            className="w-full pl-10 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-300 placeholder-gray-400"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <i className="fas fa-lock"></i>
          </span>
          <input
          onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full pl-10 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-300 placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Login
        </button>
      </form>

      {/* Bottom Link */}
      <div className="mt-6 text-center">
        <p className="text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Create One
          </a>
        </p>
      </div>
    </div>
  </div>
  )
}

export default Login
