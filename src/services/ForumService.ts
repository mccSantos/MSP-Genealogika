import prismaClient from "../prisma";

class ForumService {
  async execute(subject: string, content: string, user: User) {
    const ticket = await prismaClient.tickets.create({
      data: {
        subject: subject,
        content: content,
        user: user,
      },
    });

    return ticket;
  }
}

export { ForumService };
