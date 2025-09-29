import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};

type OrderDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};
const OrderDetailsPage = async ({ params }: OrderDetailsPageProps) => {
  const { id } = await params;

  const order = await getOrderById(id);

  console.log(order?.id, "order");

  if (!order) notFound();

  const session = await auth();
  let client_secret = null;

  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(
      process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });

    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      stripeClientSecret={client_secret}
      order={{
        ...order,
        // deliveredAt: null,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
