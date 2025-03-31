import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const listingAndReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate: new Date(startDate), // Ensure dates are parsed correctly
            endDate: new Date(endDate),
            totalPrice,
          },
        },
      },
      include: {
        reservations: true, // Include the reservations in the response
      },
    });

    return NextResponse.json(listingAndReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
