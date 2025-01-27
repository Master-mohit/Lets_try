import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../config/axios";

const Project = () => {
  const location = useLocation();
// const projectData = location.state || {};
// console.log("Project data from location:", projectData); // Check project data

console.log("Location State:", location.state);
console.log("Project ID:", location.state?.project?._id);

  const [project, setProject] = useState(location.state.project); // Define project state
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]); // Define users state
  const [selectedUserId, setSelectedUserId] = useState(new Set());






  function handleUserClick(userId) {
    setSelectedUserId((prev) => {
      const newSelection = new Set(prev); // Copy previous set
  
      // Toggle the userId: If present, remove; if not, add
      if (newSelection.has(userId)) {
        newSelection.delete(userId); // Remove user if clicked again
      } else {
        newSelection.add(userId); // Add user if clicked first time
      }
  
      return newSelection; // Return the updated set
    });
  }
  

  function addCollaborators() {
    if (!projectData?._id || selectedUserId.size === 0) {
      console.log("Invalid data:", projectData?._id, selectedUserId);
      return;
    }
  
    // Convert Set to array before sending to the backend
    axios
      .put("/projects/add-user", {
        projectId: projectData._id,
        users: Array.from(selectedUserId), // Send only selected users
      })
      .then((res) => {
        console.log("Collaborators added successfully:", res.data);
        setIsModalOpen(false); // Close modal after adding collaborators
        setSelectedUserId(new Set()); // Clear selection after API call
      })
      .catch((err) => {
        console.error("Error adding collaborators:", err);
      });
  }
  
  
  
  
  


  useEffect(() => {
    axios.get(`/projects/get-project/${location.state?.project?._id}`).then(res => {
      console.log(res.data); // Check the response structure
      setProject(res.data.project);
    }).catch(err => {
      console.log("Error fetching project:", err);
    });
  
    axios.get('/users/all').then(res => {
      console.log(res.data); // Check if users are being fetched correctly
      setUsers(res.data.users);
    }).catch(err => {
      console.log("Error fetching users:", err);
    });
  }, []);
  

  return (
    <main className="h-screen w-screen flex bg-gray-900 text-white relative">
      <aside className="left flex flex-col h-full w-80 bg-gray-800 border-r border-gray-700">
        <header className="flex justify-between items-center p-4 bg-gray-700">
          <button className='flex gap-2 items-center' onClick={() => setIsModalOpen(true)}>
            <i className="ri-add-fill mr-1"></i>
            <h1 className="font-semibold text-lg text-gray-100">Collaborators</h1>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 bg-gray-600 rounded-full hover:bg-gray-500"
          >
            <i className="ri-group-fill text-lg"></i>
          </button>
        </header>


     {/* conversation area */}

          <div className="conversation-area flex-grow flex flex-col">
                    <div className="message-box p-1 flex-grow flex flex-col gap-3">
                        <div className="message max-w-56 flex flex-col p-2 bg-slate-600 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                            <p className='text-sm'>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="ml-auto max-w-56 message flex flex-col p-2 bg-slate-600 w-fit rounded-md">
                            <small className='opacity-65 text-xs'>example@gmail.com</small>
                            <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                    <div className="inputField w-full flex">
                        <input className='p-2 px-4 border-none outline-none flex-grow bg-slate-600 text-white font-semibold' type="text" placeholder='Enter message' />
                        <button className='px-5 bg-slate-950 text-white'><i className="ri-send-plane-fill"></i></button>
                    </div>
                </div>

                <div className={`sidePanel w-[300px] h-full flex flex-col gap-2 bg-gray-800 absolute transition-all ${isSidePanelOpen ? "translate-x-0" : "-translate-x-full"} top-0 z-50`}
      >
        <header className="flex justify-between items-center px-4 py-2 bg-gray-700">
          <h1 className="font-semibold text-lg text-gray-100">Collaborators</h1>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 text-gray-100 hover:bg-gray-600"
          >
            <i className="ri-close-fill"></i>
          </button>
        </header>

                <div className="users flex flex-col gap-2">
                    {project.users && project.users.map(user => {
                      return (
                            <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
                             <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                            <i className="ri-user-fill absolute"></i>
                            </div>
                            <h1 className='font-semibold text-lg'>{user.email}</h1>
                             </div>
                            )
                        })}
                </div>

      </div>
      </aside>

     

      {/* <section className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold">{projectData?.name || "Project Name"}</h1>
        <p className="text-gray-400">Collaborators: {projectData?.users?.length || 0}</p>
      </section> */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg w-96 max-w-full relative">
            <header className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Select Users</h2>
              <button onClick={() => setIsModalOpen(false)} className='p-2 text-gray-400 hover:text-white'>
                <i className="ri-close-fill text-2xl"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-4 max-h-96 overflow-auto">
            {users.map(user => (
  <div 
    key={user._id}  // Use user._id as the unique key
    className={`user cursor-pointer hover:bg-slate-700 ${Array.from(selectedUserId).indexOf(user._id) !== -1 ? 'bg-slate-500' : ""} p-2 flex gap-2 items-center`} 
    onClick={() => handleUserClick(user._id)}
  >
    <div className='aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
      <i className="ri-user-fill absolute"></i>
    </div>
    <h1 className='font-semibold text-lg'>{user.email}</h1>
  </div>
))}

              </div>


            <button
              onClick={addCollaborators}
              className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md mt-2'
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;