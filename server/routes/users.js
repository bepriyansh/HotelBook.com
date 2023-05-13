import Express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verification.js";
const router = Express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.send({ message: "Hello user, You're logged in successfully", user: req.user });
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send({ message: "Hello user, You're logged in and You can delete your account", user: req.user });
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send({ message: "Hello Admin, You're logged in and You can delete any account", user: req.user });
// });

// READ All
router.get('/', verifyAdmin, getUsers); //Only admin can access all users

// READ One by Id
router.get('/:id', verifyUser, getUser);

// UPDATE
router.patch('/:id', verifyUser, updateUser); //Only user can update it's account

// DELETE
router.delete('/:id', verifyUser, deleteUser); //Only user can delete it's account

export default router;