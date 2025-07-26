import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";

type ProductCardProps = {
  product: any;
};

const ProductCard = (product: ProductCardProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.product.slug}`}>
          <Image
            src={product.product.images[0]}
            alt={product.product.name}
            width={300}
            height={300}
            priority={true}
          />
        </Link>
      </CardHeader>

      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.product.brand}</div>
        <Link href={`/product/${product.product.slug}`}>
          <h2 className="text-sm font-medium">{product.product.name}</h2>
          <div className="flex-between gap-4">
            <p>{product.product.rating} Stars</p>
            {product.product.stock > 0 ? (
              <ProductPrice value={product.product.price} />
            ) : (
              <p className="text-destructive">Out Of stock</p>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
