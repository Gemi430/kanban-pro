import mongoose from "mongoose"

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        list: {
            type: mongoose.Schema.Types.ObjectId, //reference to List (column)
            required: true,
            ref: 'List'
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId, //reference to the User
            ref: 'User'
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium'
        },
        position: {
            type: Number, // stores card order within the list
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model('Task', taskSchema);
export default Task;