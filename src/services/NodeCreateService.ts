import prismaClient from "../prisma";

import { io } from "../app";

class NodeCreateService {
  async execute(name: string) {
    const node = await prismaClient.node.create({
      data: {
        name: name,
      },
    });

    const infoWS = {
      content: node.name,
    };

    io.emit("new_Node", infoWS);

    return node;
  }
}

export { NodeCreateService };
