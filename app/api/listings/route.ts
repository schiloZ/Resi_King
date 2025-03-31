import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
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
    image,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
  } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      image,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(body.price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
