import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<IParams> } // Note the Promise type
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Await the params to get the actual values
  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteId = [...(currentUser.favoriteId || [])]; // Note: favoriteId (plural) to match schema
  favoriteId.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteId, // Note: favoriteId (plural)
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> } // Note the Promise type
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Await the params to get the actual values
  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteId = [...(currentUser.favoriteId || [])]; // Note: favoriteId (plural)
  favoriteId = favoriteId.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteId, // Note: favoriteId (plural)
    },
  });

  return NextResponse.json(user);
}
