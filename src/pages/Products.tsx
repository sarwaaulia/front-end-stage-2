import { useEffect, useState } from "react";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/services/api";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

type ProductType = {
	id: number;
	title: string;
	price: number;
	category: string;
};

export function Products() {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [loading, setLoading] = useState(true);
	// const [detailProduct, setDetailProducts] = useState<ProductType | null>;

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get("/products");
				setProducts(response.data);
			} catch (error) {
				console.error("failed fetch data products", error);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	function setDetailProducts(products: ProductType[]): void {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="p-4">
			<h1 className="text-center font-bold text-lg mb-6 underline">Products</h1> 
			{loading ? (
				<p className="text-card">loading..</p>
			) : (
				<ul className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-base">
					{products.map((product) => (
						<Dialog key={product.id}>
							<DialogTrigger asChild>
								<Card
									onClick={() => setDetailProducts(products)}
									className="cursor-pointer hover:shadow-md transition"
								>
									<CardHeader>
										<CardTitle>{product.title}</CardTitle>
										<CardDescription>{product.price}</CardDescription>
									</CardHeader>
									<CardFooter>
										<p>{product.category}</p>
									</CardFooter>
								</Card>
							</DialogTrigger>
						</Dialog>

					))}
				</ul>
			)}
		</div>
	);
}
