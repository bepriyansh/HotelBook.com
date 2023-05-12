import Express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
const router = Express.Router();

// READ All
router.get('/', getUsers);

// READ One by Id
router.get('/:id', getUser);

// UPDATE
router.patch('/:id', updateUser);

// DELETE
router.delete('/:id', deleteUser);

export default router;