import projectModel from '../models/project.model.js';
import mongoose from 'mongoose';



export const createProject = async ({ name, userId }) => {
    if (!name) {
        throw new Error('Name is required');
    }
    if (!userId) {
        throw new Error('UserId is required');
    }

    try {
        // Convert userId to ObjectId
        const userObjectId = mongoose.Types.ObjectId(userId);

        const project = await projectModel.create({
            name,
            users: [userObjectId] // Store users as an array of ObjectId
        });

        return project;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }
};


export const getAllProjectBYUserId = async (userId) => {
    if (!userId) {
        console.log('UserId is missing:', userId);
        throw new Error('User is required');
    }

    console.log('Fetching projects for userId:', userId);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const allUserProjects = await projectModel.find({
        users: userObjectId
    });

    console.log('Projects found:', allUserProjects);

    return allUserProjects;
};



