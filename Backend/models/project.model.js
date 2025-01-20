import mongoose from "mongoose";
const projectSChema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,    
        required: true,
        trim : true,
        unique: [ true, 'Project name must be unique' ],  
    },
       user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
       ]
});

const project = mongoose.model("Project", projectSChema);

export default project;