"use client";

import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";

import { useTransition } from "react";

import { addToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

type AddToCartProps = {
  item: CartItem;
  cart?: Cart;
};
const AddToCart = ({ item, cart }: AddToCartProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isPendingRemove, startTransitionRemove] = useTransition();


  const handleAddToCart = async () => {
    startTransition(async () => {
      const response = await addToCart(item);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast("", {
        description: response.message,
        action: (
          <Button
            className="bg-primary text-white hover:bg-gray-800"
            onClick={() => router.push("cart")}
          >
            Go To Cart
          </Button>
        ),
      });
    });
  };

  const exitInCart =
    cart &&
    (cart.items as CartItem[]).find((x) => x.productId === item.productId);
  ("");

  const handleRemoveFromCart = async () => {
    startTransitionRemove(async () => {
      const res = await removeItemFromCart(item.productId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast("", {
        description: res.message,
      });
    });
  };

  return exitInCart ? (
    <div className="">
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPendingRemove ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>

      <span className="px-2">{exitInCart.qty}</span>

      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
