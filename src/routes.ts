import { Router } from "express";
import { ForumController } from "./controllers/ForumController";
import { GetTicketsBySubjectController } from "./controllers/GetTicketsBySubjectController";
import { GetTicketsController } from "./controllers/GetTicketsController";
import { GetUserIdFromTokenController } from "./controllers/GetUserIdFromTokenController";
import { LoginController } from "./controllers/LoginController";
import { NodeAddController } from "./controllers/NodeAddController";
import { RegisterController } from "./controllers/RegisterController";
import { TicketCreateController } from "./controllers/TicketCreateController";
import { validateToken } from "./middleware/Authenticate";

const router = Router();

router.post("/register", new RegisterController().handle);
router.post("/forum", new ForumController().handle);

router.post("/create-ticket", new TicketCreateController().handle);

router.post("/login", new LoginController().handle);

router.get("/tickets", validateToken, new GetTicketsController().handle);

router.get("/tickets-by-subject", new GetTicketsBySubjectController().handle);

router.post("/create-node", new NodeAddController().handle);

router.get("/id-from-token", new GetUserIdFromTokenController().handle);

export { router };
