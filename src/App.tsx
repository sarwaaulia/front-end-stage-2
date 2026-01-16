import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/useProvider";
import { Products } from "./pages/Products";
import Login from "./pages/Login";
import PrivateRoute from "./lib/privateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Header from "./pages/Header";


function App() {
	return (
		<CartProvider>
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Products" element={<Products />} />
						<Route path="/:id" element={<ProductDetail />} />
						<Route path="/cart" element={<CartPage />} />
						<Route
							path="/dashboard"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route path="/login" element={<Login />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</CartProvider>
	);
}

export default App;
