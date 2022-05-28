import prismaClient from "../prisma";

class GetUserIdFromTokenService {
  async execute(token: string) {
    const tokenFound = await prismaClient.token.findFirst({
      where: {
        token: {
          equals: token,
        },
      },
    });

    return tokenFound.user_id;
  }
}

export { GetUserIdFromTokenService };
