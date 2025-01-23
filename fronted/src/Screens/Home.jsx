import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user.context'
import axios from "../config/axios"

const Home = () => {

    const { user } = useContext(UserContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ projectName, setProjectName ] = useState(null)
    const [project, setproject] = useState([])

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

    useEffect(() => {
      axios.get('/projects/all').then((res) => {    
                console.log(res);
                setproject(res.data.projects);
            }).catch((error) => {
                console.log(error);
            })
    }, [])
    

    return (
        <main className='p-4'>
            <div className="projects">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md font-semibold">
                    New Project
                    <i className="ri-link ml-2"></i>
                </button>
                <div className='gap-4 grid grid-cols-3 mt-4 '>
           {project.map((pro) => {
           return (
            <div key={pro._id} className="hover:bg-zinc-200 hover:shadow-mdproject p-4 border cursor-pointer border-slate-300 rounded-md">
                {pro.name}
                <div className="mt-2">
                    <h1><i class="ri-user-add-line"></i> Collaborators:  {pro.users.length} </h1>
                   
                </div>
            </div>
              );
               })}
           </div>

            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


        </main>
    )
}

export default Home