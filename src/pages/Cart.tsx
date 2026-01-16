import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, isUpdating } = useCart();

  // total harga semua barang di cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1), 
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingBag size={64} className="text-slate-300" />
        <h2 className="text-2xl font-semibold text-slate-600">Your cart is empty</h2>
        <p className="text-slate-400">Let's find your product</p>
        <Link to="/products">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* table daftar barang */}
        <div className="lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="max-w-[200px]">
                        <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                        <p className="text-xs text-slate-400 capitalize">{item.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={isUpdating || (item.quantity || 1) <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      
                      <span className="font-semibold w-4 text-center">
                        {item.quantity || 1}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={isUpdating}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

              {/* bon total belanja */}
        <div className="bg-slate-50 p-6 rounded-xl h-fit border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Invoice</h2>
          <div className="space-y-3 pb-4 border-b">
            <div className="flex justify-between text-slate-600">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold">
            <span>Total Price</span>
            <span className="text-primary">${totalPrice.toFixed(2)}</span>
          </div>
          
          <Button className="w-full h-12 text-lg mt-4 shadow-lg shadow-primary/20">
            Checkout
          </Button>
          
          {isUpdating && (
            <p className="text-center text-xs text-slate-400 mt-2 animate-pulse">
              loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;