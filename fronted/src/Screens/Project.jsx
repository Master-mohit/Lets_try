import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Project = () => {
  const location = useLocation();
  const projectData = location.state;

  console.log("Project data received:", projectData);

  return (
    <main className="h-screen w-screen flex bg-gray-900 text-white">
      {/* Left Sidebar */}
      <aside className="left flex flex-col h-full w-80 bg-gray-800 border-r border-gray-700">
        <header className="flex justify-between items-center p-4 bg-gray-700">
          <h1 className="text-lg font-semibold">{projectData?.name || "Project"}</h1>
          <button className="p-2 bg-gray-600 rounded-full hover:bg-gray-500">
            <i className="ri-group-fill text-lg"></i>
          </button>
        </header>

        {/* Chat Section */}
        <div className="conversation-area flex-grow flex flex-col p-4 space-y-4 overflow-y-auto">
          <div className="message self-start bg-gray-700 p-3 rounded-lg max-w-[70%]">
            <small className="opacity-70 text-xs">user1@gmail.com</small>
            <p className="text-sm">Hey, are we ready for the next sprint?</p>
          </div>
          <div className="message self-end bg-blue-600 p-3 rounded-lg max-w-[70%]">
            <small className="opacity-70 text-xs">user2@gmail.com</small>
            <p className="text-sm">Yes, just finalizing some features.</p>
          </div>
        </div>

        {/* Input Field */}
        <div className="inputField flex p-4 border-t border-gray-700 bg-gray-800">
          <input
            className="flex-grow p-3 bg-gray-700 border-none outline-none text-white rounded-l-lg"
            type="text"
            placeholder="Type a message..."
          />
          <button className="px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-r-lg">
            <i className="ri-send-plane-fill text-lg"></i>
          </button>
        </div>
      </aside>

      {/* Right Section */}
      <section className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{projectData?.name || "Project Name"}</h1>
        <p className="text-gray-400">Collaborators: {projectData?.users?.length || 0}</p>
      </section>
    </main>
  );
};

export default Project;
