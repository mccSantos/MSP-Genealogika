import { Router } from "express";
import { ForumController } from "./controllers/ForumController";
import { GetTicketsBySubjectController } from "./controllers/GetTicketsBySubjectController";
import { GetTicketsController } from "./controllers/GetTicketsController";
import { RegisterController } from "./controllers/RegisterController";
import { TicketCreateController } from "./controllers/TicketCreateController";
const router = Router();

router.post("/register", new RegisterController().handle);
router.post("/forum", new ForumController().handle);

router.post("/create-ticket", new TicketCreateController().handle);

router.get("/tickets", new GetTicketsController().handle);

router.get("/tickets-by-subject", new GetTicketsBySubjectController().handle);

export { router };
