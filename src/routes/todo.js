import {Router} from 'express'
import { getCompletedTodos, getTodos } from '../controllers/todo.js'
import { verifyJWT } from '../middlewares/auth.js';
import { addTodo } from '../controllers/todo.js';
import { updateTodo } from '../controllers/todo.js';
import { deleteTodo } from '../controllers/todo.js';
import { completeTodo } from '../controllers/todo.js';
const router=Router()

router.route("/gettodos").post(verifyJWT,getTodos)
router.route("/addtodos").post(verifyJWT,addTodo)
router.route("/updatetodo").post(verifyJWT,updateTodo)
router.route("/deletetodo").post(verifyJWT,deleteTodo)
router.route("/completetodo").post(verifyJWT,completeTodo)
router.route("/completedtodos").post(verifyJWT,getCompletedTodos)




export default router