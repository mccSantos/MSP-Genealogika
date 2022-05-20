import { Request, Response } from "express";
import { RegisterService } from "../services/RegisterService";

class RegisterController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const service = new RegisterService();

    const result = await service.execute(name, email, password);

    return res.json(result);
  }
}

export { RegisterController };
