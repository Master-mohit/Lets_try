import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    console.log({ projectName });

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        console.log(res);
        setProject(res.data.projects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      {/* Projects Section */}
      <div className="projects">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Your Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md flex items-center gap-2 font-medium"
          >
            <span>Create New Project</span>
            <i className="ri-add-line text-lg"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.map((pro) => (
            <div
              key={pro._id}
              onClick={
                 () => navigate("/project", { 
                state: pro
               })} 
              className="hover:shadow-lg hover:scale-105 transition-transform bg-white p-6 border border-gray-200 rounded-lg shadow-sm cursor-pointer"
            >
              
              <div className="mt-4 text-sm text-gray-600  items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{pro.name}</h2>
                <i className="ri-user-add-line text-gray-500"></i>
                Collaborators: <span className="font-medium">{pro.users.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-700 mb-6">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Project Name</label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
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
