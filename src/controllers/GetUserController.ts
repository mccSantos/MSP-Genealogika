import { Request, Response } from "express";
import { GetUserService } from "../services/GetUserService";

class GetUserController {
  async handle(req: Request, res: Response) {
    const service = new GetUserService();
    const { user_id } = req.body;
    const result = await service.execute(user_id);

    return res.json(result);
  }
}

export { GetUserController };
