import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteId || [])],
        },
      },
    });

    const safeFavorites = favoriteListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
