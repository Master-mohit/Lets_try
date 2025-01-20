import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import * as projectService from '../services/project.service.js';
import userModel from '../models/user.model.js';

export const createProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        if (!loggedInUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newProject = await projectService.createProject({
            name,
            userId: loggedInUser._id
        });

        return res.status(201).json({
            message: 'Project created successfully',
            project: newProject
        });
    } catch (err) {
        console.error('Error creating project:', err);
        return res.status(500).json({ error: err.message });
    }
};


export const getAllProjects = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        if (!loggedInUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const allUserProjects = await projectService.getAllProjectBYUserId(
            loggedInUser._id.toString()
        );

        return res.status(200).json({
            projects: allUserProjects
        });
    } catch (err) {
        console.error('Error fetching projects:', err);
        return res.status(500).json({ error: err.message });
    }
};


