import mongoose from "mongoose";

const listSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        board: {
            type: mongoose.Schema.Types.ObjectId, //reference to the board model
            reuqired: true,
            ref: 'Board',
        },
        position: {
            type: Number, //store the column order (0,1,2, etc)
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const List = mongoose.Model('List', listSchema);
export default List;