import mongoose from "mongoose"

const boardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,  // <-- Reference to the User model
            required: true,
            ref: 'User',
        },
        memebers: [{   //To allow collaboration later
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }]

    },
    {
        timestamps: true,
    }
)

const Board = mongoose.model('Board', boardSchema);
export default Board;