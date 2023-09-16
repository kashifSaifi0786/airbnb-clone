import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
  } = body;

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
