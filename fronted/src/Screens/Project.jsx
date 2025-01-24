import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


const Project = () => {
    const location = useLocation();
const projectData = location.state;


console.log("Project data received:", projectData);


return (
  <div>
   projects
  </div>
);

}

export default Project
