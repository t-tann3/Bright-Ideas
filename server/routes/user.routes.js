import { Router } from "express";
import { UserController } from "../controller/user.controller.js";

const router = Router()
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/ideas', UserController.saveIdeas)
router.get('/get/user/:id', UserController.getLoggedInUser)
router.get('/ideas', UserController.getIdeas)
router.post('/deleteIdea', UserController.deleteIdeas)
export default router;