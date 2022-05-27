import prismaClient from "../prisma";

class LoginService {
  async execute(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: { email: email, password: password },
    });
    return user;
  }
}

export { LoginService };
