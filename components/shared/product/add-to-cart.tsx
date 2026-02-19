"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { CartItem, Cart } from "@/types";
import { useTransition } from "react";
import { Plus, Minus, Loader } from "lucide-react";
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  // console.log('cart ', cart);
  // console.log('item ', item);
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = async () => {
    startTransition(async () => {
      // Execute the addItemToCart action
      // console.log("----item----", item);
      const res = await addItemToCart(item);

      // Display appropriate toast message based on the result
      if (!res.success) {
        toast.error(res.message, {
          style: {
            color: "red",
          },
        });
        return;
      }

      toast.success(res.message, {
        // action: (
        //   <Button
        //     onClick={() => router.push("/cart")}
        //     className="bg-primary text-white hover:bg-gray-800"
        //   >
        //     Go to cart
        //   </Button>
        // ),
        // description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Go to cart",
          onClick: () => router.push("/cart"),
        },
        style: {
          color: "green",
        },
      });
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (res.success) {
        toast.success(res.message, {
          style: {
            color: "green",
          },
        });
      } else {
        toast.error(res.message, {
          style: {
            color: "red",
          },
        });
      }

      return;
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type="button"
        disabled={isPending}
        variant="outline"
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        disabled={isPending}
        variant="outline"
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      disabled={isPending}
      type="button"
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
