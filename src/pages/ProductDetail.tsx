import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ShoppingCart} from "lucide-react";
import type { Product } from "@/types/product"; // product type dari types

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const productId = id ? parseInt(id) : 0;
  const isInCart = cart.some((item) => item.id === productId);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; 

      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }


  if (!product) {
    return (
      <div className="text-center py-20 flex flex-col gap-4">
        <p className="text-xl text-gray-500">Product not found.</p>
        <Button onClick={() => navigate("/products")} variant="link">Back</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl shadow-lg">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-6 gap-2 hover:bg-slate-100"
      >
        <ChevronLeft size={18} /> Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Kolom Informasi */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="capitalize text-green-600 text-xs px-3 py-1 font-semibold">
              {product.category}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
              {product.title}
            </h1>
            
          </div>

          <div className="text-2xl font-semibold text-blue-600">
            ${product.price.toLocaleString()}
          </div>

          <div className="pt-6 border-t mt-4 flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 gap-3 h-14 text-lg font-bold shadow-lg shadow-primary/20"
              disabled={isInCart}
              onClick={() => addToCart(product)}
              variant={isInCart ? "secondary" : "default"}
            >
              <ShoppingCart size={22} />
              {isInCart ? "Already in Cart" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;