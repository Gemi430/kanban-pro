import Board from '../models/Board.js';

//@desc     Create a new Board
//@route    POST /api/boards
//@access   private
const createBoard = async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
        res.status(400).json({ message: 'Board name is required' });
        return;
    }

    try {
        const board = await Board.create({
            name,
            description,
            owner: req.user._id,
        });
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//@desc   Get all boards owned by the user
//@route  GET /api/boards
//@access Private
const getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ owner: req.user._id}).select('-members');
        res.status(200).json(boards);                              
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createBoard, getBoards };