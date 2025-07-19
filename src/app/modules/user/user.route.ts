import { Router } from "express"
import { UserControllers } from "./user.controller"


const router = Router()

router.post("/register", UserControllers.createUser)
router.post("/all-users", UserControllers.getAllUsers)

export const UserRoutes = router