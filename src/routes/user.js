import {Router} from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/user.js'
import { verifyJWT } from '../middlewares/auth.js'
const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)

export default router