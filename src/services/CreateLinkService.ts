import prismaClient from "../prisma";

import { io } from "../app";

class CreateLinkService {
  async execute(childId: string) {
    const link = await prismaClient.link.create({
      data: {
        childId,
      },
    });

    const infoWS = {
      content: link.childId,
    };

    io.emit("new_Link", infoWS);

    return link;
  }
}

export { CreateLinkService };
