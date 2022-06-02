import { Request, Response } from "express";
import { CreateParentService } from "../services/CreateParentService";

class AddParentController {
  async handle(req: Request, res: Response) {
    const { name, parent } = req.body;

    const service = new CreateParentService();

    const result = await service.execute(name,parent);

    return res.json(result);
  }
}

export { AddParentController };
