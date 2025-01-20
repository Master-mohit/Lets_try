import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import userModel from '../models/user.model.js';
import { validationResult } from 'express-validator';  // Corrected import statement

export const createProject = async (req, res) => {

    // Validation for incoming request
    const errors = validationResult(req);

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name } = req.body;

        // Fetch the logged-in user from the database using the email from the request
        const loggedInUser = await userModel.findOne({ email: req.user.email });  // Corrected variable name to 'loggedInUser'
     
        const userId = loggedInUser._id;  // Corrected variable name to 'loggedInUser'
     
        // Create a new project associated with the user
        const newProject = await projectService.createProject({ name, userId });
     
        // Respond with the newly created project
        res.status(201).json(newProject);

    } catch (err) {
        // Catch and respond with any error
        res.status(500).json({ message: err.message });
    }
}
