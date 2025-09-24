import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

import { PAYMENT_METHODS } from "./constants";

const currency = z.coerce
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must be a valid currency format with two decimal places"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "product must be at least 1 image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

//schema for sign in user
export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "password must be at least 6 character"),
});

//schema for sign up user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "name must be at least 3 character"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 character"),
    confirmPassword: z.string().min(6, "Confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password do not match",
    path: ["confirmPassword"],
  });

//cart Schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});

//schema for shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z
    .string()
    .min(3, "Street Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "postalCode must be at least 3 characters"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

//schema for payment method

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

//schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  totalPrice: currency,
  taxPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAddress: shippingAddressSchema,
});

//schema for inserting orderItem
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must me at least 3 characters"),
  email: z.string().min(3, "Email must me at least 3 characters"),
});
