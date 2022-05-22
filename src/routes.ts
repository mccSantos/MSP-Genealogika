import { Router } from "express";
import { GetTicketsController } from "./controllers/GetTicketsController";
import { RegisterController } from "./controllers/RegisterController";
import { TicketCreateController } from "./controllers/TicketCreateController";
const router = Router();

router.post("/register", new RegisterController().handle);

router.post("/create-ticket", new TicketCreateController().handle);

router.get("/tickets", new GetTicketsController().handle);

export { router };
