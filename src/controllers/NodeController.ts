import { Request, Response } from "express";
import { NodeCreateService } from "../services/NodeCreateService";

class NodeController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const service = new NodeCreateService();

    const result = await service.execute(name);

    return res.json(result);
  }
}

export { NodeController };
