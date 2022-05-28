import prismaClient from "../prisma";

import { io } from "../app";

class NodeCreateService {
  async execute(name: string) {
    const node = await prismaClient.node.create({
      data: {
        name: name,
      },
      include: {
        node: true,
      },
    });

    const infoWS = {
      
      content: node.name,
      user_id: ticket.user_id,
      user: {
        name: ticket.user.name,
      },
    };

    io.emit("new_Node", infoWS);

    return node;
  }
}

export { NodeCreateService };
