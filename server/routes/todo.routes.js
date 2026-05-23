import * as controllers from "../controllers/todo.controller.js"
import authenticateToken from "../middleware/auth.middleware.js"
import { Router } from "express";

const router = Router()

router.get('/get', authenticateToken, controllers.getTodos)
router.post('/add', authenticateToken, controllers.addTodo)
router.put('/check',authenticateToken, controllers.checkTodo)
router.delete('/delete',authenticateToken, controllers.deleteTodo)

export default router