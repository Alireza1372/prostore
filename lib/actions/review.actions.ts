"use server";

import { z } from "zod";
import { insertReviewSchema } from "../validators";
import { formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

type CreateUpdateReviewInputs = {
  data: z.infer<typeof insertReviewSchema>;
};
export async function createUpdateReview(data: CreateUpdateReviewInputs) {
  try {
    const session = await auth();
    if (!session) throw new Error("user is not authenticated");

    //validate and store the review
    const review = insertReviewSchema.parse({
      ...data,
      userId: session.user.id,
    });

    const product = await prisma.product.findFirst({
      where: { id: review.productId },
    });
    if (!product) throw new Error("product is not found");

    const reviewExist = await prisma.review.findFirst({
      where: { productId: review.productId, userId: review.userId },
    });

    await prisma.$transaction(async (tx) => {
      if (reviewExist) {
        //update
        await tx.review.update({
          where: { id: reviewExist.id },
          data: {
            title: review.title,
            description: review.description,
            rating: review.rating,
          },
        });
      } else {
        await tx.review.create({
          data: review,
        });
        //create
      }

      const averageRating = await tx.review.aggregate({
        _avg: { rating: true },
        where: { productId: review.productId },
      });

      const numReviews = await tx.review.count({
        where: { id: review.productId },
      });

      await tx.product.update({
        where: { id: review.productId },
        data: {
          rating: averageRating._avg.rating || 0,
          numReviews,
        },
      });
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: "Review Updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getReviews({ productId }: { productId: string }) {
  const data = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return { data };
}

export async function getReviewByProductId({
  productId,
}: {
  productId: string;
}) {
  const session = await auth();

  if (!session) throw new Error("User is not authenticated");

  return await prisma.review.findFirst({
    where: {
      productId,
      userId: session?.user?.id,
    },
  });
}
