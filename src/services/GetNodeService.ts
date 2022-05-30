import prismaClient from "../prisma";

class GetNodeService {
  async execute() {
    const nodes = await prismaClient.node.findMany();

    return nodes;
  }
}

export { GetNodeService };
