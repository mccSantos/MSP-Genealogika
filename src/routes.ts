import { Router } from "express";
import { RegisterController } from "./controllers/RegisterController";

const router = Router();

router.post("/register", new RegisterController().handle);

export { router };
