import { Router } from "express";
import { ForumController } from "./controllers/ForumController";
import { GetNodeController } from "./controllers/GetNodeController";
import { GetTicketsBySubjectController } from "./controllers/GetTicketsBySubjectController";
import { GetTicketsController } from "./controllers/GetTicketsController";
import { AddParentController } from "./controllers/AddParentController";
import { GetUserController } from "./controllers/GetUserController";
import { GetUserIdFromTokenController } from "./controllers/GetUserIdFromTokenController";
import { LoginController } from "./controllers/LoginController";
import { NodeAddController } from "./controllers/NodeAddController";
import { RegisterController } from "./controllers/RegisterController";
import { SendEmailController } from "./controllers/SendEmailController";
import { TicketCreateController } from "./controllers/TicketCreateController";
import { validateToken } from "./middleware/Authenticate";
import { DeleteNodeController } from "./controllers/DeleteNodeController";
import { LinkParentController } from "./controllers/LinkParentController";
import { ReceiveEmailController } from "./controllers/ReceiveEmailController";

const router = Router();

router.post("/register", new RegisterController().handle);
router.post("/forum", new ForumController().handle);

router.post("/create-ticket", new TicketCreateController().handle);

router.post("/login", new LoginController().handle);

router.get("/tickets", validateToken, new GetTicketsController().handle);

router.post("/tickets-by-subject", new GetTicketsBySubjectController().handle);

router.post("/create-node", new NodeAddController().handle);

router.post("/id-from-token", new GetUserIdFromTokenController().handle);

router.get("/nodes", new GetNodeController().handle);

router.get("/validate-token", validateToken);

router.post("/users", new GetUserController().handle);

router.post("/email", new SendEmailController().handle);

router.post("/create-node-parent", new AddParentController().handle);

router.post("/delete-node", new DeleteNodeController().handle);

router.put("/link-parent", new LinkParentController().handle);

router.post("/email-receiver" , new ReceiveEmailController().handle);
export { router };
