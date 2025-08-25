import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  try {
    const prisma = new PrismaClient();
    await prisma.product.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();
    await prisma.product.createMany({ data: sampleData.products });
    console.log("Products seeded successfully.");
    await prisma.user.createMany({ data: sampleData.users });
    console.log("users seeded successfully.");

  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

main();
