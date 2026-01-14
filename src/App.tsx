import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./components/ui/navigation-menu";
import { AuthProvider } from "./context/useProvider";
import { Products } from "./pages/Products";
import { Button } from "./components/ui/button";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import PrivateRoute from "./lib/privateRoute";
import Dashboard from "./pages/Dashboard";
import DarkModeToggle from "./components/ui/darkMode";

function Header() {
	const { token, logout } = useAuth();

	return (
		<>
			<NavigationMenu className="mx-auto max-w-max flex justify-center items-center p-6">
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link to="/products">products</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
				<NavigationMenuList>
					{token && (
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/dashboard">Dashboard</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
					)}
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							{token ? (
								<Button onClick={logout} variant="destructive">
									Logout
								</Button>
							) : (
								<Button asChild variant="outline">
									<Link to="/login">Login</Link>
								</Button>
							)}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<DarkModeToggle />
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/Products" element={<Products />} />
					<Route path="/dashboard" element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
