import prismaClient from "../prisma";

class GetTicketsBySubjectService {
  async execute(subject: string) {
    const tickets = await prismaClient.ticket.findMany({
      where: {
        subject: subject,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return tickets;
  }
}

export { GetTicketsBySubjectService };
