"use server";
// import { PrismaClient } from "@/lib/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
// const connectionString = `${process.env.DATABASE_URL}`;

// Get the latest products
export async function getLatestProducts() {
  //   const adapter = new PrismaPg({ connectionString });
  //   const prisma = new PrismaClient({ adapter });

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  await prisma.$disconnect();

  return convertToPlainObject(data);
  // return data;
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug: slug } });
}
