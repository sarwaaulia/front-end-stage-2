import { useEffect, useState, ChangeEvent } from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { api } from "@/services/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types/product";
import { useDebounce } from "@/hooks/useDebounce";
import { useCart } from "@/context/CartContext"; // cart dari context

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // input pencarian menggunakan state
    
    const { addToCart, cart } = useCart(); // ambil func dari context
    const debouncedSearch = useDebounce(search, 500); // debounce search

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get("/products");
                
                // filter product
                const filteredProducts = response.data.filter((p: Product) =>
                    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
                );
                
                setProducts(filteredProducts);
            } catch (error) {
                console.error("failed fetch data products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch]);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-center font-bold text-2xl mb-6 underline uppercase">Products</h1>

            {/* Input Pencarian dr shadcn */}
            <div className="mb-8 flex justify-center">
                <Input
                    placeholder="Search your favorite products..."
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    className="max-w-md shadow-sm"
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* placeholder skeleton untuk loading */}
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                </div>
            ) : products.length === 0 ? (
                // msg jika product tidak ditemukan
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">Product "{debouncedSearch}" not found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
                    {products.map((product) => {
                        // cek product sudah ada/bl di cart
                        const isAlreadyInCart = cart.some((item) => item.id === product.id);

                        return (
                            <Card key={product.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="font-semibold text-base line-clamp-1">
                                        {product.title}
                                    </CardTitle>
                                    <CardDescription className="text-blue-600 font-bold text-lg">
                                        ${product.price}
                                    </CardDescription>
                                    <p className="text-xs uppercase tracking-wider text-green-600 font-semibold bg-green-50 w-fit px-2 py-1 rounded">
                                        {product.category}
                                    </p>
                                </CardHeader>
                                
                                <CardFooter className="mt-auto pt-4">
                                    <div className="flex gap-2 w-full">
                                        <Link to={`/${product.id}`} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                Detail
                                            </Button>
                                        </Link>
                                        
                                        {/* conditional rendering jika product sudah di cart maka button berubah warna jadi abu2 */}
                                        <Button 
                                            className="flex-1"
                                            disabled={isAlreadyInCart}
                                            onClick={() => addToCart(product)}
                                            variant={isAlreadyInCart ? "secondary" : "default"}
                                        >
                                            {isAlreadyInCart ? "In Cart" : "+ Cart"}
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}