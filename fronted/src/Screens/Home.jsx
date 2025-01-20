import React, { useContext, useState } from 'react';
import { UserContext } from '../context/User.context';
import axios from '../config/axios';

const Home = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState("");
  
    function createProject(e) {
        e.preventDefault()
        console.log({ projectName })

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res)
                setIsModalOpen(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
  
    return (
      <main className="p-4 bg-gray-900 text-gray-200 min-h-screen">
        <div className="projects flex justify-center items-center h-64">
          <button
            onClick={() => setIsModalOpen(true)}
            className="project p-4 px-8 text-lg font-semibold text-gray-100 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none relative group">
            <span className="flex items-center">
              <i className="ri-add-circle-line text-2xl mr-2"></i>
              New Project
            </span>
            <div className="absolute -inset-1 rounded-full opacity-50 blur-xl bg-gradient-to-r from-purple-500 to-blue-500 group-hover:opacity-100 transition-all"></div>
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3 text-gray-200 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 text-xl">
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-6">Create New Project</h2>
              <form onSubmit={createProject}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Project Name
                  </label>
                  <input
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    type="text"
                    className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-4 px-4 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-gray-100 transition-all"
                    onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    );
  };
  

export default Home;
