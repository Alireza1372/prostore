import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { Princess_Sofia } from "next/font/google";
import ws from "ws";

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;

// const connectionString = `${process.env.DATABASE_URL}`;
const connectionString = process.env.DATABASE_URL!;

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
// const pool = new Pool({
//   connectionString: connectionString,
// });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon({
  connectionString: connectionString,
});

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        compute(cart) {
          return cart.itemsPrice.toString();
        },
        needs: { itemsPrice: true },
      },
      shippingPrice: {
        compute(cart) {
          return cart.shippingPrice.toString();
        },
        needs: { shippingPrice: true },
      },
      taxPrice: {
        compute(cart) {
          return cart.taxPrice.toString();
        },
        needs: { taxPrice: true },
      },
      totalPrice: {
        compute(cart) {
          return cart.totalPrice.toString();
        },
        needs: { totalPrice: true },
      },
    },

    order: {
      itemsPrice: {
        compute(cart) {
          return cart.itemsPrice.toString();
        },
        needs: { itemsPrice: true },
      },
      shippingPrice: {
        compute(cart) {
          return cart.shippingPrice.toString();
        },
        needs: { shippingPrice: true },
      },
      taxPrice: {
        compute(cart) {
          return cart.taxPrice.toString();
        },
        needs: { taxPrice: true },
      },
      totalPrice: {
        compute(cart) {
          return cart.totalPrice.toString();
        },
        needs: { totalPrice: true },
      },
    },
    orderItem: {
      price: {
        compute(cart) {
          return cart.price.toString();
        },
      },
    },
  },
});
