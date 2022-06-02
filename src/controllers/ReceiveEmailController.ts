import { Request, Response } from "express";
import { ReceiveEmailService } from "../services/ReceiveEmailService";

class ReceiveEmailController {
  handle(req: Request, res: Response) {
    const { receiverEmail, subject, body } = req.body;

    const service = new ReceiveEmailService();

    const result = service.execute( subject, body);

    return res.json(result);
  }
}

export { ReceiveEmailController };
