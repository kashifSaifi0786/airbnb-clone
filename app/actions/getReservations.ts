import prisma from "@/lib/prismadb";

interface Params {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: Params) {
  try {
    const { authorId, listingId, userId } = params;

    const query: any = {};

    if (authorId) {
      query.listing = { userId: authorId };
    }

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createAt: reservation.createAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
