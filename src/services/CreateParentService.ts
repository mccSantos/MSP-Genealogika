import prismaClient from "../prisma";

import { io } from "../app";

class CreateParentService {
  async execute(name: string, id: string ) {
    const node = await prismaClient.node.create({
      
      data: {
        name,
        parents: {
          connect : [{id}]
        },
      },
    },
  );

    return node;
  }
}

export { CreateParentService };
