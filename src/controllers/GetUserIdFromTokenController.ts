import { Request, Response } from "express";
import { GetUserIdFromTokenService } from "../services/GetUserIdFromTokenService";

class GetUserIdFromTokenController {
  async handle(req: Request, res: Response) {
    const { token } = req.body;
    const service = new GetUserIdFromTokenService();

    const result = await service.execute(token);

    return res.json(result);
  }
}

export { GetUserIdFromTokenController };
