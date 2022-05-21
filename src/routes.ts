import { Router } from "express";
import { ForumController } from "./controllers/ForumController";
import { RegisterController } from "./controllers/RegisterController";

const router = Router();

router.post("/register", new RegisterController().handle);
router.post("/forum", new ForumController().handle);

export { router };
